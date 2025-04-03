import pool from "../db.js"

export const getAllTiposEspecie = async (req,res) => {
    try{
        const sql = `SELECT * FROM tiposespecie`
        const [rows] = await pool.query(sql)
        if (rows.length > 0){
            return res.status(200).json(rows)
        }
        else{
            return res.status(404).json({msg : "No se encontraron tipos de especies registrados"})
        }
    }
    catch(error){

        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}

export const createTiposEspecie = async (req,res) => {
    try{
        const {nombre,descripcion,img}=req.body
        const sql = "INSERT INTO tiposespecie (nombre,descripcion,img) VALUES (?,?,?)"
        const [rows] = await pool.query(sql,[nombre,descripcion,img])
        if (rows.affectedRows > 0){
            return res.status(200).json({msg : "El tipo de especie fue registrado exitosamente"})
        }
        else{
            return res.status(400).json({msg : "Error al registrar el tipo de especie"})
        }
    }
    catch(error){
        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}

export const updateTiposEspecie = async (req,res) => {
    try{
        const id =req.params.id
        const {nombre,descripcion,img}=req.body
        const sql = `UPDATE tiposespecie SET nombre=?,descripcion=?,img=? WHERE id=${id}`
        const [rows] = await pool.query(sql,[nombre,descripcion,img])
        if (rows.affectedRows > 0){
            return res.status(200).json({msg : "El tipo de especie fue actualizado exitosamente"})
        }
        else{
            return res.status(400).json({msg : "Error al actualizar el tipo de especie"})
        }
    }
    catch(error){
        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}