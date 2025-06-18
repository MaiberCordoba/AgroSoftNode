import pool from "../db.js";

// Obtener todos los lotes
export const getAllLotes = async (req, res) => {
  try {
    const lotes = await pool.lotes.findMany();
    return res.status(200).json(lotes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Crear un nuevo lote
export const createLote = async (req, res) => {
  try {
    const { nombre, descripcion, tamX, tamY, estado, posX, posY } = req.body;

    if (
      !nombre ||
      !descripcion ||
      tamX == null ||
      tamY == null ||
      typeof estado !== "boolean" ||
      posX == null ||
      posY == null
    ) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    const nuevoLote = await pool.lotes.create({
      data: {
        nombre,
        descripcion,
        tamX: parseFloat(tamX),
        tamY: parseFloat(tamY),
        estado,
        posX: parseFloat(posX),
        posY: parseFloat(posY),
      },
    });

    return res.status(201).json({ msg: "Lote registrado correctamente" });
  } catch (error) {
    console.error(error);
    if (error.code === "P2002") {
      return res.status(409).json({ msg: "El nombre del lote ya existe. Debe ser único." });
    }
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Actualizar un lote por ID
export const patchLote = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, descripcion, tamX, tamY, estado, posX, posY } = req.body;

    const loteActual = await pool.lote.findUnique({ where: { id } });
    if (!loteActual) {
      return res.status(404).json({ msg: "Lote no encontrado" });
    }

    const updatedLote = {
      nombre: nombre ?? loteActual.nombre,
      descripcion: descripcion ?? loteActual.descripcion,
      tamX: tamX != null ? parseFloat(tamX) : loteActual.tamX,
      tamY: tamY != null ? parseFloat(tamY) : loteActual.tamY,
      estado: typeof estado === "boolean" ? estado : loteActual.estado,
      posX: posX != null ? parseFloat(posX) : loteActual.posX,
      posY: posY != null ? parseFloat(posY) : loteActual.posY,
    };

    await pool.lotes.update({
      where: { id },
      data: updatedLote,
    });

    return res.status(200).json({ msg: "Lote actualizado correctamente" });
  } catch (error) {
    console.error(error);
    if (error.code === "P2002") {
      return res.status(409).json({ msg: "El nombre del lote ya existe. Debe ser único." });
    }
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Eliminar un lote por ID
export const deleteLote = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const deletedLote = await pool.lotes.delete({
      where: { id },
    });

    if (deletedLote) {
      return res.status(200).json({ msg: "Lote eliminado correctamente" });
    }
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ msg: "Lote no encontrado" });
    }
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Obtener un lote por ID
export const getLoteById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const lote = await pool.lotes.findUnique({
      where: { id },
    });

    if (lote) {
      return res.status(200).json(lote);
    } else {
      return res.status(404).json({ msg: "Lote no encontrado" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Buscar por ubicación
export const getLotesByUbicacion = async (req, res) => {
  try {
    const { posX, posY } = req.params;

    if (!posX || !posY || isNaN(posX) || isNaN(posY)) {
      return res.status(400).json({ msg: "Posiciones inválidas" });
    }

    const lotes = await pool.lotes.findMany({
      where: {
        posX: parseFloat(posX),
        posY: parseFloat(posY),
      },
    });

    if (lotes.length > 0) {
      return res.status(200).json(lotes);
    } else {
      return res.status(404).json({ msg: "No hay lotes en esa ubicación" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Buscar por estado
export const getLotesByEstado = async (req, res) => {
  try {
    const estado = parseInt(req.params.estado, 10);

    if (isNaN(estado) || (estado !== 0 && estado !== 1)) {
      return res.status(400).json({ msg: "El estado debe ser 0 o 1" });
    }

    const lotes = await pool.lotes.findMany({
      where: { estado: Boolean(estado) },
    });

    if (lotes.length > 0) {
      return res.status(200).json(lotes);
    } else {
      return res.status(404).json({ msg: "No hay lotes en ese estado" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Reporte por dimensiones
export const getLotesByDimensiones = async (req, res) => {
  try {
    const { tamX, tamY } = req.params;

    const lotes = await pool.lotes.findMany({
      where: {
        tamX: parseFloat(tamX),
        tamY: parseFloat(tamY),
      },
    });

    if (lotes.length > 0) {
      return res.status(200).json(lotes);
    } else {
      return res.status(404).json({ msg: "No hay lotes con esas dimensiones" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};