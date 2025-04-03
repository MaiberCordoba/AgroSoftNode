import pool from "../db.js";

export const createHumedadAmbiental = async (req,res) => {
    try{
        const {fk_Lotes,fecha,porcentaje}=req.body
        const sql = "INSERT INTO humedadambiental (fk_Lotes,fecha,porcentaje) VALUES (?,?,?)"
        const [rows] = await pool.query(sql,[fk_Lotes,fecha,porcentaje])
        if (rows.affectedRows > 0){
            return res.status(200).json({msg : "humedad ambiental recolectada correctamente"})
        } 
    
        else{
            return res.status(402).json({msg : "Error al recolectar los datos de  humedad ambiental"})
        }

    }
    catch(error){
        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}

export const getAllHumedadAmbiental = async (req,res) => {
    try{
        const sql = "SELECT * FROM humedadambiental"
        const [rows] = await pool.query(sql)
        if (rows.length > 0){
            return res.status(200).json({rows})
        }
        else{
            return res.status(400).json({msg : "No se encontraron registros en la base de datos"})
        }
    }
    catch(error){
        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}