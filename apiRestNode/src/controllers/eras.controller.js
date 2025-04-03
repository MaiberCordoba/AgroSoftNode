import pool from '../db.js'

export const ListarEras = async (req, res) => {
    try {
        const sql = `SELECT * FROM eras`
        const [result] = await pool.query(sql)
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error al listar las eras" });
    }
}
export const RegistarEras = async (req, res) => {
    try {
        const { fk_Lotes, tamX, tamY, posX, posY, estado } = req.body;
        if (!fk_Lotes || !tamX || !tamY || !posX || !posY || !estado) {
            return res.status(400).json({ error: "Todos los campos son requeridos" });
        }

        const sql = `INSERT INTO eras (fk_Lotes, tamX, tamY, posX, posY, estado) VALUES (?, ?, ?, ?, ?, ?)`;
        const [rows] = await pool.query(sql, [fk_Lotes, tamX, tamY, posX, posY, estado]);

        if (rows.affectedRows > 0) {
            return res.status(200).json({ "message": "Era registrada" });
        } else {
            return res.status(404).json({ "message": "Era no registrada" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error del sistema" });
    }
}
export const ActualizarEras = async (req, res) => {
    try {
        const { fk_Lotes, tamX, tamY, posX, posY, estado } = req.body;
        const id = req.params.id
        const sql = `UPDATE eras SET fk_Lotes=?, tamX=?, tamY=?, posX=?, posY=?, estado=? WHERE id=?`;
        const [rows] = await pool.query(sql, [fk_Lotes, tamX, tamY, posX, posY, estado, id]);
        if (rows.affectedRows > 0) {
            return res.status(200).json({ "message": "Era actualizada" });
        } else {
            return res.status(404).json({ "message": "Era no encontrada" });
        }
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error del sistema" });
    }
}
export const EliminarEras = async (req, res) => {
    try {
        const id = req.params.id
        const sql = `DELETE FROM eras WHERE id=?`;
        const [rows] = await pool.query(sql, [id]);
        if (rows.affectedRows > 0) {
            return res.status(200).json({ "message": "Era eliminada" });
        } else {
            return res.status(404).json({ "message": "Era no encontrada" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error del sistema" });
    }
}
export const BuscarEras = async (req, res) => {
    try {
        const id = req.params.id
        const sql = `SELECT * FROM eras WHERE id=?`;
        const [result] = await pool.query(sql, [id]);
        if (result.length > 0) {
            return res.status(200).json(result[0]);
        } else {
            return res.status(404).json({ "message": "Era no encontrada" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error del sistema" });
    }
}

//REPORTES DE HISTORIAL DE LAS ERAS
export const ReporteErasPorLote = async (req, res) => {
    try {
        const id = req.params.id
        const sql = `SELECT * FROM eras WHERE fk_Lotes = ?`;
        const [result] = await pool.query(sql, [id]);
        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ "message": "No hay eras registradas para este lote" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error del sistema" });
    }
}