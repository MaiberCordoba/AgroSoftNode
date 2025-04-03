import pool from '../db.js'

export const ListarHumedad = async (req, res) => {
    try {
        const sql = `SELECT * FROM humedadterreno`
        const [result] = await pool.query(sql)
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error al listar la humedad del terrreno" });
    }
}
export const RegistrarHumedad = async (req, res) => {
    try {
        const {fk_Eras, porcentaje, fecha} = req.body
        const sql = `INSERT INTO humedadterreno (fk_Eras, porcentaje, fecha) VALUES (?,?,?)`
        const [rows] = await pool.query(sql, [fk_Eras, porcentaje, fecha])
        return res.status(201).json({ "message": "Humedad de terreno registrada correctamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error al registrar la humedad del terreno" });
    }
}
export const ActualizarHumedad = async (req, res) => { 
    try {
        const {fk_Eras, porcentaje, fecha} = req.body
        const {id} = req.params.id
        const sql = `UPDATE humedadterreno SET fk_Eras=?, porcentaje=?, fecha=? WHERE id=?`
        const [rows] = await pool.query(sql, [fk_Eras, porcentaje, fecha, id])
        return res.status(200).json({ "message": "Humedad de terreno actualizada correctamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error al actualizar la humedad del terreno" });
    }
}
export const EliminarHumedad = async (req, res) => {
    try {
        const {id} = req.params.id
        const sql = `DELETE FROM humedadterreno WHERE id=?`
        const [rows] = await pool.query(sql, [id])
        return res.status(200).json({ "message": "Humedad de terreno eliminada correctamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error al eliminar la humedad del terreno" });
    }
}
export const BuscarHumedad = async (req, res) => {
    try {
        const id = req.params.id
        const sql = `SELECT * FROM humedadterreno WHERE id=?`
        const [result] = await pool.query(sql, [id])
        return res.status(200).json(result[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error al buscar la humedad del terreno" });
    }
} 
