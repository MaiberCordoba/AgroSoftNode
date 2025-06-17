import pool from "../db.js";

export const createActividad = async (req, res) => {
  try {
    const sql = await pool.actividad.create({
      data: req.body
    })
    if (sql) {
      return res.status(201).json({ msg: "Actividad creada correctamente" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const getAllActividad = async (req, res) => {
  try {
    const sql = await pool.actividad.findMany()

    if (sql) {
      return res.status(200).json(sql)
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateActividad = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = await pool.actividad.update({
      where: { id: parseInt(id) },
      data: req.body
    })
    if (sql) {
      return res.status(200).json({ msg: "Se actualizo Correctamente" }, sql)
    }
  } catch (error) {
    console.error(error)
    if (error.code == "P2025") {
      return res.status(404).json({ msg: "No se encontro el ID" })
    }
    return res.status(500).json({ msg: "Error en el servidor" })
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
                    `;
    const [rows] = await pool.query(sql);
    if (rows.length > 0) {
      return res.status(200).json(rows);
    } else {
      return res
        .status(404)
        .json({ msg: "No se encontraron reportes de Rentantabilidad" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const graficoActividades = async (req, res) => {
  try {
    const sql = `SELECT 
                    ac.titulo AS Actividad, ac.fecha AS Fecha,hm.minutos AS Tiempo
                    FROM actividades ac
                    JOIN pasantes pa ON ac.fk_Usuarios = pa.fk_Usuarios
                    JOIN horasmensuales hm ON hm.fk_Pasantes = pa.id
                    JOIN usuarios us ON pa.fk_Usuarios = us.identificacion
                    `;
    const [rows] = await pool.query(sql);
    if (rows.length > 0) {
      return res.status(200).json(rows);
    } else {
      return res.status(404).json({ msg: "No se encontraron reportes" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

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
                    `;
    const [rows] = await pool.query(sql);
    if (rows.length > 0) {
      return res.status(200).json(rows);
    } else {
      return res.status(404).json({ msg: "No se encontraron reportes" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
