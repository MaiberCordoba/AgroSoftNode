import pool from "../db.js"

export const getAllEspecies = async (req,res) => {
    try{
        const sql = `SELECT * FROM especies`
        const [rows] = await pool.query(sql)
        if (rows.length > 0){
            return res.status(200).json(rows)
        }
        else{
            return res.status(404).json({msg : "No se encontraron datos de especies registradas."})
        }
    }
    catch(error){

        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}

export const createEspecies = async (req,res) => {
    try{
        const {nombre,descripcion,img,tiempoCrecimiento,fk_TiposEspecie}=req.body
        const sql = "INSERT INTO especies (nombre,descripcion,img,tiempoCrecimiento,fk_TiposEspecie) VALUES (?,?,?,?,?)"
        const [rows] = await pool.query(sql,[nombre,descripcion,img,tiempoCrecimiento,fk_TiposEspecie])
        if (rows.affectedRows > 0){
            return res.status(200).json({msg : "La especie fue registrada exitosamente"})
        }
        else{
            return res.status(400).json({msg : "Error al registrar la especie"})
        }
    }
    catch(error){
        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}

export const updateEspecies = async (req,res) => {
    try{
        const id =req.params.id
        const {nombre,descripcion,img,tiempoCrecimiento,fk_TiposEspecie}=req.body
        const sql = `UPDATE especies SET nombre=?,descripcion=?,img=?,tiempoCrecimiento=?,fk_TiposEspecie=? WHERE id=${id}`
        const [rows] = await pool.query(sql,[nombre,descripcion,img,tiempoCrecimiento,fk_TiposEspecie])
        if (rows.affectedRows > 0){
            return res.status(200).json({msg : "La especie fue actualizada exitosamente"})
        }
        else{
            return res.status(400).json({msg : "Error al actualizar la especie"})
        }
    }
    catch(error){
        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}