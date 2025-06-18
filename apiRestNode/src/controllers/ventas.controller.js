import pool from "../db.js"

export const getAllVentas = async (req, res) => {
    try {
        const sql = await pool.ventas.findMany()
        if (sql) {
            return res.status(200).json(sql)
        }
    }
    catch (error) {
        console.error(error)
        return res.status(500).json({ msg: "Internal server error" })
    }
}

export const createVentas = async (req, res) => {
    try {
        const sql = await pool.ventas.create({
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

export const updateVentas = async (req, res) => {
    try {
        const id = req.params.id
        const sql = await pool.ventas.update({
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