import pool from "../db.js"

export const getAllVentas = async (req,res) => {
    try{
        const sql = `SELECT * FROM ventas`
        const [rows] = await pool.query(sql)
        if (rows.length > 0){
            return res.status(200).json(rows)
        }
        else{
            return res.status(404).json({msg : "No se encontraron datos de ventas."})
        }
    }
    catch(error){

        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}

export const createVentas = async (req,res) => {
    try{
        const {fk_Cosechas,precioUnitario,fecha}=req.body
        const sql = "INSERT INTO ventas (fk_Cosechas,precioUnitario,fecha) VALUES (?,?,?)"
        const [rows] = await pool.query(sql,[fk_Cosechas,precioUnitario,fecha])
        if (rows.affectedRows > 0){
            return res.status(200).json({msg : "La venta fue registrada exitosamente"})
        }
        else{
            return res.status(400).json({msg : "Error al registrar la venta"})
        }
    }
    catch(error){
        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}

export const updateVentas = async (req,res) => {
    try{
        const id =req.params.id
        const {fk_Cosechas,precioUnitario,fecha}=req.body
        const sql = `UPDATE ventas SET fk_Cosechas=?,precioUnitario=?,fecha=? WHERE id=${id}`
        const [rows] = await pool.query(sql,[fk_Cosechas,precioUnitario,fecha])
        if (rows.affectedRows > 0){
            return res.status(200).json({msg : "La venta fue actualizada exitosamente"})
        }
        else{
            return res.status(400).json({msg : "Error al actualizar la venta"})
        }
    }
    catch(error){
        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}

export const registroVentas = async (req, res) => {
    try{
        const sql = `SELECT es.nombre AS Producto, co.unidades AS Cantidad, v.precioUnitario AS PrecioProducto,(co.unidades*precioUnitario) AS PrecioFinal, v.fecha AS FechaVenta  FROM ventas v
        JOIN cosechas co ON v.fk_Cosechas = co.id
        JOIN cultivos cu ON co.fk_Cultivos = cu.id  
        JOIN especies es ON cu.fk_Especies = es.id`

        const [rows] = await pool.query(sql)
        if (rows.length > 0){
            return res.status(200).json(rows)
        }
        else{
            return res.status(404).json({"msg": "No se encontraron resultados"})
        }
    }
    catch(error){
        console.error(error)
        return res.status(500).json({msg : "Internal server error"})
    }
}