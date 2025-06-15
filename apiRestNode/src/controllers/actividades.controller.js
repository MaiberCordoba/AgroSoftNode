import pool from "../db.js";

export const createActividad = async (req, res) => {
    try {
        const { fk_Cultivos, fk_Usuarios, titulo, descripcion, fecha, estado } = req.body
        const sql = "INSERT INTO actividades (fk_Cultivos,fk_Usuarios,titulo,descripcion,fecha,estado) VALUES (?,?,?,?,?,?)"
        const [rows] = await pool.query(sql, [fk_Cultivos, fk_Usuarios, titulo, descripcion, fecha, estado])
        if (rows.affectedRows > 0) {
            return res.status(201).json({ msg: "Actividad creada correctamente" })
        }
        else {
            return res.status(400).json({ msg: "Error al crear la actividad" })
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Internal server error" })
    }
}

export const getAllActividad = async (req, res) => {
    try {
        const sql = "SELECT * FROM actividades";
        const [rows] = await pool.query(sql);

        if (rows.length > 0) {
            // Formatear la fecha al formato YYYY-MM-DD
            const actividadesFormateadas = rows.map((actividad) => ({
                ...actividad,
                fecha: actividad.fecha.toISOString().split("T")[0],
            }));

            return res.status(200).json({ rows: actividadesFormateadas });
        } else {
            return res.status(404).json({ msg: "No se encontraron actividades" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const updateActividad = async (req, res) => {
    try {
        const id = req.params.id
        const { fk_Cultivos, fk_Usuarios, titulo, descripcion, fecha, estado } = req.body
        const sql = `UPDATE actividades SET fk_Cultivos=?,fk_Usuarios=?,titulo=?,descripcion=?,fecha=?,estado=? WHERE id = ${id}`
        const [rows] = await pool.query(sql, [fk_Cultivos, fk_Usuarios, titulo, descripcion, fecha, estado])
        if (rows.affectedRows > 0) {
            return res.status(201).json({ msg: "Actividad actualizada correctamente" })
        }
        else {
            return res.status(400).json({ msg: "Error al actualizar la actividad" })
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Internal server error" })
    }
}

export const reporteRentabilidad = async (req, res) => {
    try {
        const sql = `SELECT 
                    cu.nombre AS Cultivo,
                    (co.unidades * ve.precioUnitario) AS Ingresos,
                    us.nombre AS Pasante,
                    ac.titulo AS ActividadRealizada,
                    ROUND(hm.minutos * (pa.salarioHora / 60)) AS Egresos,
                    ROUND((co.unidades * ve.precioUnitario) - (hm.minutos * (pa.salarioHora / 60))) AS Rentabilidad
                    FROM actividades ac
                    JOIN cultivos cu ON ac.fk_Cultivos = cu.id
                    JOIN cosechas co ON co.fk_Cultivos = cu.id
                    JOIN ventas ve ON ve.fk_Cosechas = co.id
                    JOIN pasantes pa ON ac.fk_Usuarios = pa.fk_Usuarios
                    JOIN horasmensuales hm ON hm.fk_Pasantes = pa.id
                    JOIN usuarios us ON pa.fk_Usuarios = us.identificacion
                    `
        const [rows] = await pool.query(sql)
        if (rows.length > 0) {
            return res.status(200).json(rows)
        }
        else {
            return res.status(404).json({ msg: "No se encontraron reportes de Rentantabilidad" })
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Internal server error" })
    }
}

export const graficoActividades = async (req, res) => {
    try {
        const sql = `SELECT 
                    ac.titulo AS Actividad, ac.fecha AS Fecha,hm.minutos AS Tiempo
                    FROM actividades ac
                    JOIN pasantes pa ON ac.fk_Usuarios = pa.fk_Usuarios
                    JOIN horasmensuales hm ON hm.fk_Pasantes = pa.id
                    JOIN usuarios us ON pa.fk_Usuarios = us.identificacion
                    `
        const [rows] = await pool.query(sql)
        if (rows.length > 0) {
            return res.status(200).json(rows)
        }
        else {
            return res.status(404).json({ msg: "No se encontraron reportes" })
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Internal server error" })
    }
}

export const reporteCostoActividad = async (req, res) => {
    try {
        const sql = `SELECT 
                        ins.nombre AS Insumo,
                        ins.precio AS PrecioInsumo,
                        up.cantidadProducto AS CantidadInsumoUtilizado,
                        (ins.precio * up.cantidadProducto) AS CostoTotalInsumo,
                        hm.minutos AS MinutosTrabajados,
                        ROUND((pa.salarioHora / 60) * hm.minutos) AS PagoPasante,
                        ROUND((ins.precio * up.cantidadProducto) + ((pa.salarioHora / 60) * hm.minutos)) AS ValorActividad
                        FROM actividades ac
                        JOIN pasantes pa ON ac.fk_Usuarios = pa.fk_Usuarios
                        JOIN horasmensuales hm ON hm.fk_Pasantes = pa.id
                        JOIN usuarios us ON pa.fk_Usuarios = us.identificacion
                        JOIN usosProductos up ON up.fk_Actividades = ac.id
                        JOIN insumos ins ON up.fk_Insumos = ins.id;
                    `
        const [rows] = await pool.query(sql)
        if (rows.length > 0) {
            return res.status(200).json(rows)
        }
        else {
            return res.status(404).json({ msg: "No se encontraron reportes" })
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Internal server error" })
    }
}