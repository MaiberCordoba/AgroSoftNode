import pool from "../db.js";

// Obtener todas las especies
export const getAllEspecies = async (req, res) => {
  try {
    const sql = `SELECT * FROM especies`;
    const [rows] = await pool.query(sql);
    if (rows.length > 0) {
      return res.status(200).json(rows);
    } else {
      return res.status(404).json({ msg: "No se encontraron datos de especies registradas." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Crear una nueva especie
export const createEspecies = async (req, res) => {
  try {
    const { nombre, descripcion, img, tiempoCrecimiento, fk_TiposEspecie } = req.body;
    const sql = `
      INSERT INTO especies (nombre, descripcion, img, tiempoCrecimiento, fk_TiposEspecie) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const [rows] = await pool.query(sql, [nombre, descripcion, img, tiempoCrecimiento, fk_TiposEspecie]);
    if (rows.affectedRows > 0) {
      return res.status(200).json({ msg: "La especie fue registrada exitosamente" });
    } else {
      return res.status(400).json({ msg: "Error al registrar la especie" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Actualizar parcialmente una especie
export const patchEspecies = async (req, res) => {
  try {
    const { id } = req.params;
    const campos = req.body;

    if (!id || Object.keys(campos).length === 0) {
      return res.status(400).json({ msg: "Faltan datos para actualizar." });
    }

    const valores = [];
    const columnas = [];

    for (const key in campos) {
      columnas.push(`${key} = ?`);
      valores.push(campos[key]);
    }

    const sql = `UPDATE especies SET ${columnas.join(", ")} WHERE id = ?`;
    valores.push(id);

    const [result] = await pool.query(sql, valores);
    if (result.affectedRows > 0) {
      return res.status(200).json({ msg: "La especie fue actualizada exitosamente" });
    } else {
      return res.status(404).json({ msg: "No se encontró la especie a actualizar" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Eliminar una especie
export const deleteEspecies = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `DELETE FROM especies WHERE id = ?`;
    const [result] = await pool.query(sql, [id]);

    if (result.affectedRows > 0) {
      return res.status(200).json({ msg: "La especie fue eliminada exitosamente" });
    } else {
      return res.status(404).json({ msg: "No se encontró la especie a eliminar" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
