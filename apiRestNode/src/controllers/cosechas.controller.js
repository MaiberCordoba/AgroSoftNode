import pool from "../db.js"

export const getAllCosechas = async (req,res) => {
    try{
        const sql = `SELECT * FROM cosechas`
        const [rows] = await pool.query(sql)
        if (rows.length > 0){

            const cosechasFormateadas = rows.map((cosecha)=>({
                ...cosecha,
                fecha:cosecha.fecha.toISOString().split("T")[0],
            }))
            return res.status(200).json({rows:cosechasFormateadas})
        }
        else{
            return res.status(404).json({msg : "No se encontraron datos de cosechas."})
        }
    }
    catch(error){

        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}

export const createCosechas = async (req,res) => {
    try{
        const {fk_Cultivos,unidades,fecha}=req.body
        const sql = "INSERT INTO cosechas (fk_Cultivos,unidades,fecha) VALUES (?,?,?)"
        const [rows] = await pool.query(sql,[fk_Cultivos,unidades,fecha])
        if (rows.affectedRows > 0){
            return res.status(200).json({msg : "La cosecha fue registrada exitosamente"})
        }
        else{
            return res.status(400).json({msg : "Error al registrar la cosecha"})
        }
    }
    catch(error){
        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}

export const updateCosechas = async (req,res) => {
    try{
        const id =req.params.id
        const {fk_Cultivos,unidades,fecha}=req.body
        const sql = `UPDATE cosechas SET fk_Cultivos=?,unidades=?,fecha=? WHERE id=${id}`
        const [rows] = await pool.query(sql,[fk_Cultivos,unidades,fecha])
        if (rows.affectedRows > 0){
            return res.status(200).json({msg : "La cosecha fue actualizada exitosamente"})
        }
        else{
            return res.status(400).json({msg : "Error al actualizar la cosecha"})
        }
    }
    catch(error){
        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}
