import pool from "../db.js";

// Obtener todos los lotes
export const getAllLotes = async (req, res) => {
  try {
    const sql = `SELECT * FROM lotes`;
    const [rows] = await pool.query(sql);
    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Crear un nuevo lote
export const createLote = async (req, res) => {
    try {
      const { nombre, descripcion, tamX, tamY, estado, posX, posY } = req.body;
  
      // ✅ Validación corregida (estado puede ser false)
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
  
      const sql = `
        INSERT INTO lotes (nombre, descripcion, tamX, tamY, estado, posX, posY)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      
      const [rows] = await pool.query(sql, [
        nombre,
        descripcion,
        tamX,
        tamY,
        estado,
        posX,
        posY,
      ]);
  
      return res.status(201).json({ msg: "Lote registrado correctamente" });
    } catch (error) {
      console.error(error);
  
      if (error.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .json({ msg: "El nombre del lote ya existe. Debe ser único." });
      }
  
      return res.status(500).json({ msg: "Internal server error" });
    }
  };
  

// Actualizar un lote por ID
export const patchLote = async (req, res) => {
    try {
      const id = req.params.id;
      const { nombre, descripcion, tamX, tamY, estado, posX, posY } = req.body;
  
      // Obtener el lote actual
      const [existingRows] = await pool.query(`SELECT * FROM lotes WHERE id = ?`, [id]);
      if (existingRows.length === 0) {
        return res.status(404).json({ msg: "Lote no encontrado" });
      }
  
      const loteActual = existingRows[0];
  
      // Usar valores actuales si no vienen en el body
      const updatedLote = {
        nombre: nombre ?? loteActual.nombre,
        descripcion: descripcion ?? loteActual.descripcion,
        tamX: tamX ?? loteActual.tamX,
        tamY: tamY ?? loteActual.tamY,
        estado: typeof estado === 'boolean' ? estado : loteActual.estado,
        posX: posX ?? loteActual.posX,
        posY: posY ?? loteActual.posY,
      };
  
      const sql = `
        UPDATE lotes
        SET nombre = ?, descripcion = ?, tamX = ?, tamY = ?, estado = ?, posX = ?, posY = ?
        WHERE id = ?
      `;
      const [rows] = await pool.query(sql, [
        updatedLote.nombre,
        updatedLote.descripcion,
        updatedLote.tamX,
        updatedLote.tamY,
        updatedLote.estado,
        updatedLote.posX,
        updatedLote.posY,
        id,
      ]);
  
      return res.status(200).json({ msg: "Lote actualizado correctamente" });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };
  
// Eliminar un lote por ID
export const deleteLote = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `DELETE FROM lotes WHERE id = ?`;
    const [rows] = await pool.query(sql, [id]);

    if (rows.affectedRows > 0) {
      return res.status(200).json({ msg: "Lote eliminado correctamente" });
    } else {
      return res.status(404).json({ msg: "Lote no encontrado" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Obtener un lote por ID
export const getLoteById = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `SELECT * FROM lotes WHERE id = ?`;
    const [rows] = await pool.query(sql, [id]);

    if (rows.length > 0) {
      return res.status(200).json(rows[0]);
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

    const sql = `SELECT * FROM lotes WHERE posX = ? AND posY = ?`;
    const [rows] = await pool.query(sql, [parseFloat(posX), parseFloat(posY)]);

    if (rows.length > 0) {
      return res.status(200).json(rows);
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

    const sql = `SELECT * FROM lotes WHERE estado = ?`;
    const [rows] = await pool.query(sql, [estado]);

    if (rows.length > 0) {
      return res.status(200).json(rows);
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
    const sql = `SELECT * FROM lotes WHERE tamX = ? AND tamY = ?`;
    const [rows] = await pool.query(sql, [tamX, tamY]);

    if (rows.length > 0) {
      return res.status(200).json(rows);
    } else {
      return res.status(404).json({ msg: "No hay lotes con esas dimensiones" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
