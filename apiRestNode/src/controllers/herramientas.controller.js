import pool from "../db.js";

export const createHerramientas = async(req,res) => {
    try{
        const {fk_Lotes,nombre,descripcion,unidades}=req.body
        const sql = "INSERT INTO herramientas (fk_Lotes,nombre,descripcion,unidades) VALUES (?,?,?,?)"
        const [rows] = await pool.query(sql,[fk_Lotes,nombre,descripcion,unidades])
        if (rows.affectedRows > 0){
            return res.status(201).json({msg : "Herramienta creada correctamente"})
        }
        else{
            return res.status(400).json({msg : "Error al agregar la herramienta"})
        }
    }
    catch(error){
        console.error(error)
        res.status(500).json({msg : "Internal server error"})
    }
}

export const getAllHerramientas = async(req,res) => {
    try{
        const sql = "SELECT * FROM herramientas"
        const [rows] = await pool.query(sql)
        if (rows.length > 0){
            return res.status(200).json({rows})
        }
        else{
            return res.status(404).json({msg : "No se encontraron herramientas"})
        }
    }
    catch(error){
        console.error(error)
        res.status(500).json({msg : "Internal server error"})
    }
}
export const updateHerramientas = async(req,res) => {
    try{
        const {fk_Lotes,nombre,descripcion,unidades}=req.body
        const id = req.params.id
        const sql = `UPDATE herramientas SET fk_Lotes=?,nombre=?,descripcion=?,unidades=? WHERE id = ${id}`
        const [rows] = await pool.query(sql,[fk_Lotes,nombre,descripcion,unidades])
        if (rows.affectedRows > 0){
            return res.status(201).json({msg : "Herramienta actualizada correctamente"})
        }
        else{
            return res.status(400).json({msg : "Error al actualizar la herramienta"})
        }
    }
    catch(error){
        console.error(error)
        res.status(500).json({msg : "Internal server error"})
    }
}