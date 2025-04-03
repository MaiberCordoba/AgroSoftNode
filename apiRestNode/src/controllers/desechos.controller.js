import pool from "../db.js"

export const getAllDesechos = async (req,res) => {
    try{
        const sql = `SELECT * FROM desechos`
        const [rows] = await pool.query(sql)
        if (rows.length > 0){
            return res.status(200).json(rows)
        }
        else{
            return res.status(404).json({msg : "No se encontraron datos de desechos."})
        }
    }
    catch(error){

        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}

export const createDesechos = async (req,res) => {
    try{
        const {fk_Cultivos,fk_TiposDesecho,nombre,descripcion}=req.body
        const sql = "INSERT INTO desechos (fk_Cultivos,fk_TiposDesecho,nombre,descripcion) VALUES (?,?,?,?)"
        const [rows] = await pool.query(sql,[fk_Cultivos,fk_TiposDesecho,nombre,descripcion])
        if (rows.affectedRows > 0){
            return res.status(200).json({msg : "El desecho fue registrado exitosamente"})
        }
        else{
            return res.status(400).json({msg : "Error al registrar el desecho"})
        }
    }
    catch(error){
        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}

export const updateDesechos = async (req,res) => {
    try{
        const id =req.params.id
        const {fk_Cultivos,fk_TiposDesecho,nombre,descripcion}=req.body
        const sql = `UPDATE desechos SET fk_Cultivos=?,fk_TiposDesecho=?,nombre=?,descripcion=? WHERE id=${id}`
        const [rows] = await pool.query(sql,[fk_Cultivos,fk_TiposDesecho,nombre,descripcion])
        if (rows.affectedRows > 0){
            return res.status(200).json({msg : "El desecho fue actualizado exitosamente"})
        }
        else{
            return res.status(400).json({msg : "Error al actualizar el desecho"})
        }
    }
    catch(error){
        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}