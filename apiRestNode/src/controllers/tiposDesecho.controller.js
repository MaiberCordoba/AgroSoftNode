import pool from "../db.js"

export const getAllTipoDesechos = async (req, res) => {
    try {
        const sql = await pool.tipoDesecho.findMany({
            data: req.body
        })
        if (sql) {
            return res.status(200).json(sql)
        }
    }
    catch (error) {
        console.error(error)
        return res.status(500).json({ msg: "Internal server error" })
    }
}

export const createTipoDesechos = async (req, res) => {
    try {
        const sql = await pool.tipoDesecho.create({
            data: req.body
        })
        if (sql) {
            return res.status(201).json({ msg: "Se creo correctamente" })
        }
    }
    catch (error) {
        console.error(error)
        return res.status(500).json({ msg: "Internal server error" })
    }
}

export const updateTipoDesechos = async (req, res) => {
    try {
        const id = req.params.id
        const sql = await pool.tipoDesecho.update({
            where: { id: parseInt(id) },
            data: req.body
        })
        if (sql) {
            return res.status(200).json({ msg: "Se actualizo correctamente" }, sql)
        }
        else {
            return res.status(404).json({ msg: "No se encontro el ID" })
        }
    }
    catch (error) {
        console.error(error)
        if (error.code == "P2025") {
            return res.status(404).json({ msg: "No se encontro el ID" })
        }
        return res.status(500).json({ msg: "Error en el servidor" })
    }
}