import pool from "../db.js";

export const createEvapotranspiraciones = async (req,res) => {
    try{
        const {fk_Lotes,fecha,milimetrosMCuadrado}=req.body
        const sql = "INSERT INTO evapotranspiraciones (fk_Lotes,fecha,milimetrosMCuadrado) VALUES (?,?,?)"
        const [rows] = await pool.query(sql,[fk_Lotes,fecha,milimetrosMCuadrado])
        if (rows.affectedRows > 0){
            return res.status(200).json({msg : "Evapotranspiracion recolectada correctamente"})
        } 
    
        else{
            return res.status(400).json({msg : "Error al recolectar la evapotranspiracion"})
        }

    }
    catch(error){
        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}

export const getAllEvapotranspiraciones = async (req,res) => {
    try{
        const sql = "SELECT lot.nombre AS Lote, eva.fecha , eva.milimetrosMCuadrado FROM evapotranspiraciones eva JOIN lotes lot ON eva.fk_Lotes = lot.id"
        const [rows] = await pool.query(sql)
        if (rows.length > 0){
            return res.status(200).json({rows})
        }
        else{
            return res.status(404).json({msg : "No se encontraron evapotranspiraciones registradas en la base de datos"})
        }
    }
    catch(error){
        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}