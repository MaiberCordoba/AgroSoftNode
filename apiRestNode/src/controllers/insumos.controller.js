import pool from "../db.js";

export const createInsumo = async(req,res) => {
    try{
        const {nombre,descripcion,precio,unidades}=req.body
        const sql = "INSERT INTO insumos (nombre,descripcion,precio,unidades) VALUES (?,?,?,?)"
        const [rows] = await pool.query(sql,[nombre,descripcion,precio,unidades])
        if (rows.affectedRows > 0){
            return res.status(201).json({msg : "Insumo agregado correctamente"})
        }
        else{
            return res.status(400).json({msg : "Error al agregar el insumo"})
        }
    }
    catch(error){
        console.error(error)
        res.status(500).json({msg : "Internal server error"})
    }
}

export const getAllInsumos = async(req,res) => {
    try{
        const sql = "SELECT * FROM insumos"
        const [rows] = await pool.query(sql)
        if (rows.length > 0){
            return res.status(200).json({rows})
        }
        else{
            return res.status(404).json({msg : "No se encontraron insumos"})
        }
    }
    catch(error){
        console.error(error)
        res.status(500).json({msg : "Internal server error"})
    }
}
export const updateInsumos = async(req,res) => {
    try{
        const {nombre,descripcion,precio,unidades}=req.body
        const id = req.params.id
        const sql = `UPDATE insumos SET nombre=?,descripcion=?,precio=?,unidades=? WHERE id = ${id}`
        const [rows] = await pool.query(sql,[nombre,descripcion,precio,unidades])
        if (rows.affectedRows > 0){
            return res.status(201).json({msg : "Insumo actualizado correctamente"})
        }
        else{
            return res.status(400).json({msg : "Error al actualizar el insumo"})
        }
    }
    catch(error){
        console.error(error)
        res.status(500).json({msg : "Internal server error"})
    }
}