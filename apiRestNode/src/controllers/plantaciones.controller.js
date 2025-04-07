import pool from '../db.js';

export const getAllPlantaciones = async (req, res) => {
    try {
        const sql = `SELECT * FROM plantaciones`;
        const [result] = await pool.query(sql);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error al listar las plantaciones" });
    }
};

export const createPlantacion = async (req, res) => {
    try {
        const { fk_Cultivos, fk_Eras } = req.body;

        if (!fk_Cultivos || !fk_Eras) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const sql = `INSERT INTO plantaciones (fk_Cultivos, fk_Eras) VALUES (?,?)`;
        const [rows] = await pool.query(sql, [fk_Cultivos, fk_Eras]);

        return res.status(201).json({ message: "Plantación registrada correctamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al registrar la plantación" });
    }
};

export const patchPlantacion = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const fields = Object.keys(updates).map(key => `${key}=?`).join(", ");
        const values = Object.values(updates);

        const sql = `UPDATE plantaciones SET ${fields} WHERE id=?`;
        const [rows] = await pool.query(sql, [...values, id]);

        return res.status(200).json({ message: "Plantación actualizada correctamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al actualizar la plantación" });
    }
};

export const deletePlantacion = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `DELETE FROM plantaciones WHERE id=?`;
        const [rows] = await pool.query(sql, [id]);
        return res.status(200).json({ message: "Plantación eliminada correctamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al eliminar la plantación" });
    }
};

export const getPlantacionById = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = `SELECT * FROM plantaciones WHERE id=?`;
        const [result] = await pool.query(sql, [id]);
        return res.status(200).json(result[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al buscar la plantación" });
    }
};

export const getPlantacionesByEraAndCrop = async (req, res) => {
    try {
        const { fk_Eras, fk_Cultivos } = req.params;
        const sql = `SELECT * FROM plantaciones WHERE fk_Eras=? AND fk_Cultivos=?`;
        const [result] = await pool.query(sql, [fk_Eras, fk_Cultivos]);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al listar las plantaciones por era y cultivo" });
    }
};

export const getPlantacionesByEra = async (req, res) => {
    try {
        const { fk_Eras } = req.params;

        const sql = `SELECT * FROM plantaciones WHERE fk_Eras = ?`;
        const [result] = await pool.query(sql, [fk_Eras]);

        if (result.length > 0) {
            return res.status(200).json({
                message: "🌱 Plantaciones encontradas",
                total: result.length,
                datos: result
            });
        } else {
            return res.status(404).json({ message: "No hay plantaciones registradas en esta era" });
        }
    } catch (error) {
        console.error("Error al listar las plantaciones por era:", error);
        return res.status(500).json({ message: "Error al listar las plantaciones por era" });
    }
};

export const getPlantacionesByCrop = async (req, res) => {
    try {
        const { fk_Cultivos } = req.params;
        const sql = `SELECT * FROM plantaciones WHERE fk_Cultivos=?`;
        const [result] = await pool.query(sql, [fk_Cultivos]);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al listar las plantaciones por cultivo" });
    }
};

export const getPlantacionesByCropAndEra = async (req, res) => {
    try {
        const { fk_Cultivos, fk_Eras } = req.params;
        const sql = `SELECT * FROM plantaciones WHERE fk_Cultivos=? AND fk_Eras=?`;
        const [result] = await pool.query(sql, [fk_Cultivos, fk_Eras]);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al listar las plantaciones por cultivo y era" });
    }
};
