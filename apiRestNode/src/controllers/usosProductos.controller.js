import pool from "../db.js";

export const createUsosProductos = async(req,res) => {
    try{
        const {fk_Insumos,fk_Actividades,cantidadProducto}=req.body
        const sql = "INSERT INTO usosproductos (fk_Insumos,fk_Actividades,cantidadProducto) VALUES (?,?,?)"
        const [rows] = await pool.query(sql,[fk_Insumos,fk_Actividades,cantidadProducto])
        if (rows.affectedRows > 0){
            return res.status(201).json({msg : "Uso del producto agregado correctamente"})
        }
        else{
            return res.status(400).json({msg : "Error al agregar el uso del producto"})
        }
    }
    catch(error){
        console.error(error)
        res.status(500).json({msg : "Internal server error"})
    }
}

export const getAllUsosProductos = async(req,res) => {
    try{
        const sql = "SELECT * FROM usosproductos"
        const [rows] = await pool.query(sql)
        if (rows.length > 0){
            return res.status(200).json({rows})
        }
        else{
            return res.status(404).json({msg : "No se encontraron usos de productos registrados"})
        }
    }
    catch(error){
        console.error(error)
        res.status(500).json({msg : "Internal server error"})
    }
}
export const updateUsosProductos = async(req,res) => {
    try{
        const id = req.params.id;
        const {fk_Insumos,fk_Actividades,cantidadProducto}=req.body
        const sql = `UPDATE usosproductos SET fk_Insumos=?,fk_Actividades=?,cantidadProducto=? WHERE id=${id}`
        const [rows] = await pool.query(sql,[fk_Insumos,fk_Actividades,cantidadProducto])
        if (rows.affectedRows > 0){
            return res.status(201).json({msg : "Uso del producto agregado correctamente"})
        }
        else{
            return res.status(400).json({msg : "Error al agregar el uso del producto"})
        }
    }
    catch(error){
        console.error(error)
        res.status(500).json({msg : "Internal server error"})
    }
}