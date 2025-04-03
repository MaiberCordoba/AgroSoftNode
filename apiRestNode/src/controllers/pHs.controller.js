import pool from '../db.js'

export const ListarPhs = async (req, res) => {
    try {
        const sql = `SELECT * FROM phs`
        const [result] = await pool.query(sql)
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error al listar los PHs" });
    }
}
export const RegistrarPhs = async (req, res) => {
    try {
        const {fk_Eras, acidez, fecha} = req.body
        const sql = `INSERT INTO phs (fk_Eras, acidez, fecha) VALUES (?,?,?)`
        const [rows] = await pool.query(sql, [fk_Eras, acidez, fecha])
        return res.status(201).json({ "message": "PH registrado correctamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error al registrar el PH" });
    }
}
export const ActualizarPhs = async (req, res) => {
    try {
        const {fk_Eras, acidez, fecha} = req.body
        const id= req.params.id
        const sql = `UPDATE phs SET fk_Eras=?, acidez=?, fecha=? WHERE id=?`
        const [rows] = await pool.query(sql, [fk_Eras, acidez, fecha, id])
        if (rows.affectedRows === 0) {
            return res.status(404).json({ "message": "PH no encontrado" });
        }
        return res.status(200).json({ "message": "PH actualizado correctamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error al actualizar el PH" });
    }
}
export const EliminarPhs = async (req, res) => {
    try {
        const id = req.params.id
        const sql = `DELETE FROM phs WHERE id=?`
        const [rows] = await pool.query(sql, [id])
        if (rows.affectedRows === 0) {
            return res.status(404).json({ "message": "PH no encontrado" });
        }
        return res.status(200).json({ "message": "PH eliminado correctamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error al eliminar el PH" });
    }
}
export const BuscarPhs = async (req, res) => {
    try {
        const id = req.params.id
        const sql = `SELECT * FROM phs WHERE id=?`
        const [result] = await pool.query(sql, [id])
        if (!result[0]) {
            return res.status(404).json({ "message": "PH no encontrado" });
        }
        return res.status(200).json(result[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error al buscar el PH" });
    }
}