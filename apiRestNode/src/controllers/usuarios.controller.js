import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const VALID_ROLES = ["admin", "instructor", "pasante", "aprendiz", "visitante"];

const formatUser = (user) => ({
  ...user,
  fechaNacimiento: user.fechaNacimiento
    ? user.fechaNacimiento.toISOString().split("T")[0]
    : null,
});

const formatUsers = (users) =>
  Array.isArray(users)
    ? users.map(formatUser)
    : formatUser(users);

export const getAll = async (req, res) => {
  try {
    const usuarios = await pool.usuario.findMany();
    res.status(200).json(formatUsers(usuarios));
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const create = async (req, res) => {
  try {
    const {
      identificacion,
      nombre,
      apellidos,
      fechaNacimiento,
      telefono,
      correoElectronico,
      password,
      rol = "visitante",
      estado = "activo",
    } = req.body;

    if (!VALID_ROLES.includes(rol)) {
      return res.status(400).json({
        msg: "Rol inválido. Debe ser admin, instructor, pasante, aprendiz o visitante",
      });
    }

    const fechaValida = new Date(fechaNacimiento);
    if (isNaN(fechaValida)) {
      return res.status(400).json({ msg: "Fecha de nacimiento inválida" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const nuevo = await pool.usuario.create({
      data: {
        identificacion: parseInt(identificacion),
        nombre,
        apellidos,
        fechaNacimiento: fechaValida,
        telefono,
        correoElectronico,
        passwordHash,
        rol,
        estado,
      },
    });

    res.status(201).json({ msg: "Usuario creado", data: formatUser(nuevo) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error interno al crear usuario" });
  }
};

export const login = async (req, res) => {
  try {
    const { correoElectronico, password } = req.body;

    const user = await pool.usuario.findUnique({
      where: { correoElectronico },
    });

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(400).json({ msg: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      {
        identificacion: user.identificacion,
        nombre: `${user.nombre} ${user.apellidos}`,
        correoElectronico: user.correoElectronico,
        rol: user.rol,
      },
      process.env.SECRET_KEY
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al iniciar sesión" });
  }
};

export const update = async (req, res) => {
  try {
    const identificacion = parseInt(req.params.id);
    const updates = { ...req.body };

    if (updates.password) {
      updates.passwordHash = await bcrypt.hash(updates.password, 10);
      delete updates.password;
    }

    if (updates.identificacion) delete updates.identificacion;

    // Convertir fechaNacimiento a Date 
    if (updates.fechaNacimiento) {
      const fechaValida = new Date(updates.fechaNacimiento);
      updates.fechaNacimiento = fechaValida;
    }

    const updated = await pool.usuario.update({
      where: { identificacion },
      data: updates,
    });

    res.status(200).json({ msg: "Usuario actualizado", data: formatUser(updated) });
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).json({ msg: "Error de validación en los datos proporcionados" });
    }
    res.status(500).json({ msg: "Error al actualizar usuario" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const { identificacion, nombre, correoElectronico, rol } = req.user;
    if (!identificacion || !correoElectronico) {
      return res.status(400).json({ msg: "Token incompleto" });
    }

    res.status(200).json({
      success: true,
      user: {
        id: identificacion,
        nombre,
        email: correoElectronico,
        rol,
      },
    });
  } catch (error) {
    console.error("Error en getCurrentUser:", error);
    res.status(500).json({ msg: "Error interno" });
  }
};

export const getTotalUsers = async (req, res) => {
  try {
    const total = await pool.usuario.count();
    const activos = await pool.usuario.count({ where: { estado: "activo" } });
    const inactivos = total - activos;

    res.status(200).json({
      total_usuarios: total,
      usuarios_activos: activos,
      usuarios_inactivos: inactivos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al contar usuarios" });
  }
};
