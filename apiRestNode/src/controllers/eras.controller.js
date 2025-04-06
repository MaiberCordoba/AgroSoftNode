import pool from '../db.js';

// Listar todas las eras
export const getAllEras = async (_req, res) => {
  try {
    const sql = 'SELECT * FROM eras';
    const [rows] = await pool.query(sql);
    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Error al obtener las eras' });
  }
};

// Obtener una era por ID
export const getEraById = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM eras WHERE id = ?';
    const [rows] = await pool.query(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ msg: 'Era no encontrada' });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Error al buscar la era' });
  }
};

// Registrar una nueva era
export const createEra = async (req, res) => {
  try {
    const { fk_Lotes, tamX, tamY, posX, posY, estado } = req.body;

    if ([fk_Lotes, tamX, tamY, posX, posY, estado].some(field => field === undefined)) {
      return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
    }

    const sql = `
      INSERT INTO eras (fk_Lotes, tamX, tamY, posX, posY, estado)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, [fk_Lotes, tamX, tamY, posX, posY, estado]);

    if (result.affectedRows > 0) {
      return res.status(201).json({ msg: 'Era registrada correctamente' });
    }

    return res.status(400).json({ msg: 'No se pudo registrar la era' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Error al registrar la era' });
  }
};

// Actualizar una era por ID
export const patchEra = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const campos = ['fk_Lotes', 'tamX', 'tamY', 'posX', 'posY', 'estado'];
    const updates = [];
    const values = [];

    campos.forEach((campo) => {
      if (data[campo] !== undefined) {
        updates.push(`${campo} = ?`);
        values.push(data[campo]);
      }
    });

    if (updates.length === 0) {
      return res.status(400).json({ msg: 'No se proporcionaron campos para actualizar' });
    }

    values.push(id);
    const sql = `UPDATE eras SET ${updates.join(', ')} WHERE id = ?`;
    const [result] = await pool.query(sql, values);

    if (result.affectedRows > 0) {
      return res.status(200).json({ msg: 'Era actualizada correctamente' });
    }

    return res.status(404).json({ msg: 'Era no encontrada' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Error al actualizar la era' });
  }
};

// Eliminar una era por ID
export const deleteEra = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'DELETE FROM eras WHERE id = ?';
    const [result] = await pool.query(sql, [id]);

    if (result.affectedRows > 0) {
      return res.status(200).json({ msg: 'Era eliminada correctamente' });
    }

    return res.status(404).json({ msg: 'Era no encontrada' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Error al eliminar la era' });
  }
};

// Reporte: Eras por lote
export const getErasByLoteId = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM eras WHERE fk_Lotes = ?';
    const [rows] = await pool.query(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ msg: 'No hay eras registradas para este lote' });
    }

    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Error al obtener el reporte' });
  }
};
