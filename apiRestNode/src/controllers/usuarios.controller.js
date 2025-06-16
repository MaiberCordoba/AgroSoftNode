import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Lista válida de roles
const VALID_ROLES = ["admin", "instructor", "pasante", "aprendiz", "visitante"];

export async function getAll(req, res) {
  try {
    const sql = "SELECT * FROM Usuarios";
    const [usuarios] = await pool.query(sql);
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
}

export async function create(req, res) {
  try {
    const {
      identificacion,
      nombre,
      apellidos,
      fechaNacimiento,
      telefono,
      correoElectronico,
      password,
      rol,
      estado,
    } = req.body;

    // Validar que el rol sea válido
    if (rol && !VALID_ROLES.includes(rol)) {
      return res.status(400).json({
        msg: "Rol inválido. Debe ser admin, instructor, pasante, aprendiz o visitante",
      });
    }

    const sql =
      "INSERT INTO Usuarios (identificacion, nombre, apellidos, fechaNacimiento, telefono, correoElectronico, passwordHash, rol, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const passwordHash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(sql, [
      identificacion,
      nombre,
      apellidos,
      fechaNacimiento,
      telefono,
      correoElectronico,
      passwordHash,
      rol || "visitante",
      estado,
    ]);
    if (result.affectedRows > 0) {
      return res.status(201).json({ msg: "Usuario created successfully" });
    }
    res.status(400).json({ msg: "Error creating usuario" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
}

export async function login(req, res) {
  try {
    const { correoElectronico, password } = req.body;
    const sql = "SELECT * FROM Usuarios WHERE correoElectronico = ?";
    const [[user]] = await pool.query(sql, [correoElectronico]);
    if (!user) {
      return res.status(404).json({ msg: "Usuario not found" });
    }

    const verified = await bcrypt.compare(password, user.passwordHash);
    if (!verified) {
      return res.status(400).json({ msg: "Wrong password for usuario" });
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
    res.status(500).json({ msg: "Internal server error" });
  }
}

export async function update(req, res) {
  const identificacion = parseInt(req.params.id);
  const { ...updateFields } = req.body;

  if (Object.keys(updateFields).length === 0) {
    return res.status(400).json({ error: "No fields provided to update" });
  }

  try {
    const setClauses = [];
    const values = [];

    for (const key of Object.keys(updateFields)) {
      if (key === "identificacion") {
        continue;
      }

      if (key === "password") {
        const passwordHash = await bcrypt.hash(updateFields[key], 10);
        setClauses.push("passwordHash = ?");
        values.push(passwordHash);
      } else if (key === "rol" && !VALID_ROLES.includes(updateFields[key])) {
        return res.status(400).json({
          msg: "Rol inválido. Debe ser admin, instructor, pasante, aprendiz o visitante",
        });
      } else {
        setClauses.push(`${key} = ?`);
        values.push(updateFields[key]);
      }
    }

    values.push(identificacion);

    const sql = `UPDATE Usuarios SET ${setClauses.join(
      ", "
    )} WHERE identificacion = ?`;
    const [result] = await pool.query(sql, values);

    if (result.affectedRows > 0) {
      return res.status(200).json({ msg: "Usuario updated successfully" });
    }
    res.status(400).json({ msg: "Error updating usuario" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
}

export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "Datos de usuario no disponibles" });
    }

    const { identificacion, nombre, correoElectronico, rol } = req.user;

    if (!identificacion || !correoElectronico) {
      return res.status(400).json({
        msg: "Token incompleto",
        missingFields: {
          identificacion: !identificacion,
          correoElectronico: !correoElectronico,
        },
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: identificacion,
        nombre: nombre || "No especificado",
        email: correoElectronico,
        rol: rol || "visitante",
      },
    });
  } catch (error) {
    console.error("Error en getCurrentUser:", error);
    res.status(500).json({
      msg: "Error al obtener datos del usuario",
      error: error.message,
    });
  }
};

export const getTotalUsers = async (req, res) => {
  try {
    const sql = `
            SELECT 
                COUNT(identificacion) AS total_usuarios,
                SUM(CASE WHEN estado = 'activo' THEN 1 ELSE 0 END) AS usuarios_activos,
                SUM(CASE WHEN estado = 'inactivo' THEN 1 ELSE 0 END) AS usuarios_inactivos
            FROM Usuarios
        `;
    const [result] = await pool.query(sql);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
