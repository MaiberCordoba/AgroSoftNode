import pool from "../db.js";

export const createVelocidadViento = async (req,res) => {
    try{
        const {fk_Lotes,fecha,kilomhora}=req.body
        const sql = "INSERT INTO velocidadViento (fk_Lotes,fecha,kilomhora) VALUES (?,?,?)"
        const [rows] = await pool.query(sql,[fk_Lotes,fecha,kilomhora])
        if (rows.affectedRows > 0){
            return res.status(200).json({msg : "Velocidad del viento recolectada correctamente"})
        } 
    
        else{
            return res.status(400).json({msg : "Error al recolectar los datos de las Velocidad del viento"})
        }

    }
    catch(error){
        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}

export const getAllVelocidadViento = async (req,res) => {
    try{
        const sql = "SELECT lot.nombre AS Lote, vv.fecha , vv.kilomhora FROM velocidadViento vv JOIN lotes lot ON vv.fk_Lotes = lot.id "
        const [rows] = await pool.query(sql)
        if (rows.length > 0){
            return res.status(200).json({rows})
        }
        else{
            return res.status(404).json({msg : "No se encontro una velocidad del viento registrada en la base de datos"})
        }
    }
    catch(error){
        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}