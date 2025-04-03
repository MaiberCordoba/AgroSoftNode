import pool from "../db.js"

export const getAllSemilleros = async (req,res) => {
    try{
        const sql = `SELECT * FROM semilleros`
        const [rows] = await pool.query(sql)
        if (rows.length > 0){
            return res.status(200).json(rows)
        }
        else{
            return res.status(404).json({msg : "No se encontraron semilleros registrados."})
        }
    }
    catch(error){

        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}

export const createSemilleros = async (req,res) => {
    try{
        const {fk_Especies,unidades,fechaSiembra,fechaEstimada}=req.body
        const sql = "INSERT INTO semilleros (fk_Especies,unidades,fechaSiembra,fechaEstimada) VALUES (?,?,?,?)"
        const [rows] = await pool.query(sql,[fk_Especies,unidades,fechaSiembra,fechaEstimada])
        if (rows.affectedRows > 0){
            return res.status(200).json({msg : "El semillero fue registrado exitosamente"})
        }
        else{
            return res.status(400).json({msg : "Error al registrar el semillero"})
        }
    }
    catch(error){
        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}

export const updateSemillero = async (req,res) => {
    try{
        const id =req.params.id
        const {fk_Especies,unidades,fechaSiembra,fechaEstimada}=req.body
        const sql = `UPDATE semilleros SET fk_Especies=?,unidades=?,fechaSiembra=?,fechaEstimada=? WHERE id=${id}`
        const [rows] = await pool.query(sql,[fk_Especies,unidades,fechaSiembra,fechaEstimada])
        if (rows.affectedRows > 0){
            return res.status(200).json({msg : "El semillero fue actualizado exitosamente"})
        }
        else{
            return res.status(400).json({msg : "Error al actualizar el semillero"})
        }
    }
    catch(error){
        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}