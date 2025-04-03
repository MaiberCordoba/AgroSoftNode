import pool from "../db.js";

export const createActividad = async(req,res) => {
    try{
        const {fk_Cultivos,fk_Usuarios,titulo,descripcion,fecha,estado}=req.body
        const sql = "INSERT INTO actividades (fk_Cultivos,fk_Usuarios,titulo,descripcion,fecha,estado) VALUES (?,?,?,?,?,?)"
        const [rows] = await pool.query(sql,[fk_Cultivos,fk_Usuarios,titulo,descripcion,fecha,estado]) 
        if (rows.affectedRows > 0){
            return res.status(201).json({msg : "Actividad creada correctamente"})
        }
        else{
            return res.status(400).json({msg : "Error al crear la actividad"})
        }
    }
    catch(error){
        console.error(error)
        res.status(500).json({msg : "Internal server error"})
    }
}

export const getAllActividad = async(req,res) => {
    try{
        const sql = "SELECT * FROM actividades"
        const [rows] = await pool.query(sql)
        if (rows.length > 0){
            return res.status(200).json({rows})
        }
        else{
            return res.status(404).json({msg : "No se encontraron actividades"})
        }
    }
    catch(error){
        console.error(error)
        res.status(500).json({msg : "Internal server error"})
    }
}
export const updateActividad = async(req,res) => {
    try{
        const id = req.params.id
        const {fk_Cultivos,fk_Usuarios,titulo,descripcion,fecha,estado}=req.body
        const sql = `UPDATE actividades SET fk_Cultivos=?,fk_Usuarios=?,titulo=?,descripcion=?,fecha=?,estado=? WHERE id = ${id}`
        const [rows] = await pool.query(sql,[fk_Cultivos,fk_Usuarios,titulo,descripcion,fecha,estado]) 
        if (rows.affectedRows > 0){
            return res.status(201).json({msg : "Actividad actualizada correctamente"})
        }
        else{
            return res.status(400).json({msg : "Error al actualizar la actividad"})
        }
    }
    catch(error){
        console.error(error)
        res.status(500).json({msg : "Internal server error"})
    }
}
