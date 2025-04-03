import pool from "../db.js";

export const createTemperaturas = async (req,res) => {
    try{
        const {fk_Lotes,gradosC,fecha}=req.body
        const sql = "INSERT INTO temperaturas (fk_Lotes,gradosC,fecha) VALUES (?,?,?)"
        const [rows] = await pool.query(sql,[fk_Lotes,gradosC,fecha])
        if (rows.affectedRows > 0){
            return res.status(200).json({msg : "Temperatura recolectada correctamente"})
        } 
    
        else{
            return res.status(400).json({msg : "Error al recolectar los datos de las Temperaturas"})
        }

    }
    catch(error){
        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}

export const getAllTemperaturas = async (req,res) => {
    try{
        const sql = "SELECT lot.nombre AS Lote, tem.gradosC , tem.fecha FROM temperaturas tem JOIN lotes lot ON tem.fk_Lotes = lot.id "
        const [rows] = await pool.query(sql)
        if (rows.length > 0){
            return res.status(200).json({rows})
        }
        else{
            return res.status(404).json({msg : "No se encontraron temperaturas registradas en la base de datos"})
        }
    }
    catch(error){
        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}