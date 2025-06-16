import pool from "../db.js";

export const createUsosHerramientas = async (req, res) => {
    try {
        const { fk_Herramientas, fk_Actividades } = req.body
        const sql = "INSERT INTO usosherramientas (fk_Herramientas,fk_Actividades) VALUES (?,?)"
        const [rows] = await pool.query(sql, [fk_Herramientas, fk_Actividades])
        if (rows.affectedRows > 0) {
            return res.status(201).json({ msg: "Uso de herramienta agregado correctamente" })
        }
        else {
            return res.status(400).json({ msg: "Error al agregar el uso de la herramienta" })
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Internal server error" })
    }
}

export const updateUsoHerramienta = async (req, res) => {
    try{

        const id = req.params.id
        const { fk_Herramientas, fk_Actividades } = req.body
        const sql = `UPDATE usosherramientas SET fk_Herramientas=?,fk_Actividades=? WHERE id = ${id}`
        const [rows] = await pool.query(sql, [fk_Herramientas, fk_Actividades])
        if (rows.affectedRows > 0) {
            return res.status(201).json({ msg: "Uso de Herramienta actualizado correctamente" })
        }
        else {
            return res.status(400).json({ msg: "Error al actualizar la actividad" })
        }
    }
    catch (error) {
    console.error(error)
    res.status(500).json({ msg: "Internal server error" })
}
}

export const getAllUsosHerramientas = async (req, res) => {
    try {
        const sql = "SELECT * FROM usosherramientas"
        const [rows] = await pool.query(sql)
        if (rows.length > 0) {
            return res.status(200).json({ rows })
        }
        else {
            return res.status(404).json({ msg: "No se encontraron usos de herramientas registrados" })
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Internal server error" })
    }
}