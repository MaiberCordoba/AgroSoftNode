import pool from "../db.js";

export const createPrecipitaciones = async (req,res) => {
    try{
        const {fk_Lotes,fecha,mm}=req.body
        const sql = "INSERT INTO Precipitaciones (fk_Lotes,fecha,mm) VALUES (?,?,?)"
        const [rows] = await pool.query(sql,[fk_Lotes,fecha,mm])
        if (rows.affectedRows > 0){
            return res.status(200).json({msg : "Precipitacion recolectada correctamente"})
        } 
    
        else{
            return res.status(400).json({msg : "Error al recolectar los datos de las precipitaciones"})
        }

    }
    catch(error){
        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}

export const getAllPrecipitaciones = async (req,res) => {
    try{
        const sql = "SELECT lot.nombre AS Lote, pre.fecha , pre.mm AS milimetros FROM precipitaciones pre JOIN lotes lot ON pre.fk_Lotes = lot.id"
        const [rows] = await pool.query(sql)
        if (rows.length > 0){
            return res.status(200).json({rows})
        }
        else{
            return res.status(404).json({msg : "No se encontraron Precipitaciones registradas en la base de datos"})
        }
    }
    catch(error){
        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}