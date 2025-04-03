import pool from "../db.js"

export const getAllTiposDesecho = async (req,res) => {
    try{
        const sql = `SELECT * FROM tiposDesechos`
        const [rows] = await pool.query(sql)
        if (rows.length > 0){
            return res.status(200).json(rows)
        }
        else{
            return res.status(404).json({msg : "No se encontraron tipos de desechos registrados."})
        }
    }
    catch(error){

        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}

export const createTiposDesecho = async (req,res) => {
    try{
        const {nombre,descripcion}=req.body
        const sql = "INSERT INTO tiposdesecho (nombre,descripcion) VALUES (?,?)"
        const [rows] = await pool.query(sql,[nombre,descripcion])
        if (rows.affectedRows > 0){
            return res.status(200).json({msg : "El tipo de desecho fue registrado exitosamente"})
        }
        else{
            return res.status(400).json({msg : "Error al registrar el tipo de desecho"})
        }
    }
    catch(error){
        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}

export const updateTiposDesecho = async (req,res) => {
    try{
        const id =req.params.id
        const {nombre,descripcion}=req.body
        const sql = `UPDATE tiposdesecho SET nombre=?,descripcion=? WHERE id=${id}`
        const [rows] = await pool.query(sql,[nombre,descripcion])
        if (rows.affectedRows > 0){
            return res.status(200).json({msg : "El tipo de desecho fue actualizado exitosamente"})
        }
        else{
            return res.status(400).json({msg : "Error al actualizar el tipo de desecho"})
        }
    }
    catch(error){
        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}