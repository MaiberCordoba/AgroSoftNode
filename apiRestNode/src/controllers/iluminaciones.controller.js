import pool from "../db.js";

export const createIluminaciones = async (req,res) => {
    try{
        const {fk_Lotes,fecha,lumens}=req.body
        const sql = "INSERT INTO iluminaciones (fk_Lotes,fecha,lumens) VALUES (?,?,?)"
        const [rows] = await pool.query(sql,[fk_Lotes,fecha,lumens])
        if (rows.affectedRows > 0){
            return res.status(200).json({msg : "Iluminacion recolectada correctamente"})
        } 
    
        else{
            return res.status(400).json({msg : "Error al recolectar los datos de las iluminaciones"})
        }

    }
    catch(error){
        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}

export const getAllIluminaciones = async (req,res) => {
    try{
        const sql = "SELECT lot.nombre AS Lote, ilu.fecha , ilu.lumens FROM iluminaciones ilu JOIN lotes lot ON ilu.fk_Lotes = lot.id"
        const [rows] = await pool.query(sql)
        if (rows.length > 0){
            return res.status(200).json({rows})
        }
        else{
            return res.status(404).json({msg : "No se encontraron iluminaciones registradas en la base de datos"})
        }
    }
    catch(error){
        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}