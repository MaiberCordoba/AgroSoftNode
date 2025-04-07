import pool from "../db.js";

export const listarUsoProductoControl = async (req, resp) => {
  try {
    const sql = `SELECT UPC.id AS id_UPC, UPC.cantidadProducto AS cantidadProducto_UPC,
      PC.id AS id_PC, PC.nombre AS nombre_PC, PC.compuestoActivo, PC.tipoContenido AS tipoContenido_PC, PC.unidades AS unidades_PC,
      co.id AS id_co, co.descripcion AS descripcion_co, co.fechaControl,
      tpC.id AS id_tpC, tpC.nombre AS nombre_tpC, tpC.descripcion AS descripcion_tpC,
      a.id, a.fechaEncuentro, a.estado, a.fk_plagas,
      p.nombre AS nombre_plaga, p.fk_TiposPlaga AS idTipoPlaga, tp.nombre AS tipo_plaga,
      pl.id AS id_plantaciones,
      c.id AS id_cultivo, c.nombre AS nombre_cultivo, c.unidades AS unCultivo,
      er.id AS id_era, er.posX AS posXera, er.posY AS posYera,
      lo.id AS id_lote, lo.posX AS posXlote, lo.posY AS posYlote 
    FROM usoproductocontrol UPC
    JOIN productoscontrol PC ON fk_ProductosControl = PC.id
    JOIN controles co ON fk_Controles = co.id   
    JOIN tiposcontrol tpC ON fk_TiposControl = tpC.id
    JOIN afecciones a ON fk_Afecciones = a.id
    JOIN plagas p ON a.fk_Plagas = p.id
    JOIN tiposPlaga tp ON p.fk_TiposPlaga = tp.id
    JOIN plantaciones pl ON fk_Plantaciones = pl.id
    JOIN cultivos c ON fk_Cultivos = c.id
    JOIN eras er ON fk_Eras = er.id
    JOIN lotes lo ON fk_Lotes = lo.id`;

    const [result] = await pool.query(sql);

    const usosPC = result.map((usos) => ({
      id_usoProductoControl: usos.id_UPC,
      fk_ProductosControl: {
        id_productoControl: usos.id_PC,
        nombre: usos.nombre_PC,
        compuestoActivo: usos.compuestoActivo,
        tipoContenido: usos.tipoContenido_PC,
        unidades: usos.unidades_PC,
      },
      cantidad_producto_usada: usos.cantidadProducto_UPC,
      fk_Controles: {
        id: usos.id_co,
        descripcion: usos.descripcion_co,
        fechaControl: usos.fechaControl,
        fk_TipoContro: {
          id: usos.id_tpC,
          nombre: usos.nombre_tpC,
          descripcion: usos.descripcion_tpC,
        },
        fk_Afecciones: {
          id: usos.id,
          fechaEncuentro: usos.fechaEncuentro,
          estado: usos.estado,
          fk_Plagas: {
            idPlaga: usos.id,
            nombre: usos.nombre_plaga,
          },
          fk_Plantaciones: {
            id: usos.id_plantaciones,
            fk_cultivo: {
              id_cultivo: usos.id_cultivo,
              nombre: usos.nombre_cultivo,
              unidades: usos.unCultivo,
            },
            fk_era: {
              id: usos.id_era,
              posX: usos.posXera,
              posY: usos.posYera,
              fk_lote: {
                id: usos.id_lote,
                posX: usos.posXlote,
                posY: usos.posYlote,
              },
            },
          },
        },
      },
    }));

    return resp.status(200).json(usosPC); // ✅ Siempre responde con array, aunque esté vacío

  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "Error en el sistema" });
  }
};

export const registrarUsoProductosControl = async (req, resp) => {
  try {
    const { fk_ProductoControl, fk_Control, cantidadProducto } = req.body;

    const sql = `INSERT INTO usoproductocontrol (fk_ProductosControl, fk_Controles, cantidadProducto) VALUES (?,?,?)`;

    const [rows] = await pool.query(sql, [
      fk_ProductoControl,
      fk_Control,
      cantidadProducto,
    ]);

    if (rows.affectedRows > 0) {
      return resp
        .status(200)
        .json({ message: "se ha registrado correctamente" });
    } else {
      return resp.status(400).json({ message: "No fue posible registrar" });
    }
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "Error en el sistema" });
  }
};

export const actualizarUsoProductoControl = async (req, resp) => {
  try {
    const id = req.params.id;
    const { fk_ProductosControl, fk_Controles, cantidadProducto } = req.body;
    const sql = `UPDATE usoproductocontrol SET fk_ProductosControl=?, fk_Controles=?, cantidadProducto=?  WHERE id=${id}`;

    const [rows] = await pool.query(sql, [
      fk_ProductosControl,
      fk_Controles,
      cantidadProducto,
    ]);

    if (rows.affectedRows > 0) {
      return resp
        .status(200)
        .json({ message: "uso del producto de control actualizado" });
    } else {
      return resp.status(400).json({ message: "No fue posible actualizar " });
    }
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "Error en el sistema" });
  }
};

export const eliminarUsoProductoControl = async (req, resp) => {
  try {
    const id = req.params.id;
    const sql = `DELETE FROM usoproductocontrol WHERE id=${id}`;

    const [rows] = await pool.query(sql);

    if (rows.affectedRows > 0) {
      return resp
        .status(200)
        .json({ message: "se ha eliminado correctamente" });
    } else {
      return resp.status(400).json({
        message: "no fue posible eliminar el registro de uso del producto",
      });
    }
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "Error en el sistema" });
  }
};

export const buscarUsoProductoControl = async (req, resp) => {
  try {
    const id = req.params.id;
    const sql = `select UPC.id as id_UPC, UPC.cantidadProducto as cantidadProducto_UPC,
      PC.id as id_PC, PC.nombre as nombre_PC, PC.compuestoActivo, PC.tipoContenido as tipoContenido_PC, PC.unidades as unidades_PC,
      co.id as id_co, co.descripcion as descripcion_co, co.fechaControl,
      tpC.id as id_tpC, tpC.nombre as nombre_tpC, tpC.descripcion as descripcion_tpC,
      a.id, a.fechaEncuentro, a. estado, a.fk_plagas,
      p.nombre as nombre_plaga, p.fk_TiposPlaga as idTipoPlaga, tp.nombre as tipo_plaga,
      pl.id as id_plantaciones,
      c.id as id_cultivo, c.nombre as nombre_cultivo, c.unidades as unCultivo,
      er.id as id_era, er.posX as posXera, er.posY as posYera,
      lo.id as id_lote, lo.posX as posXlote, lo.posY as posYlote 
    from usoproductocontrol UPC
    join productoscontrol PC on fk_ProductosControl = PC.id
    join controles co on fk_Controles = co.id   
    join tiposcontrol tpC on fk_TiposControl = tpC.id
    join afecciones a on fk_Afecciones = a.id
    join plagas p on a.fk_Plagas = p.id
    join tiposPlaga tp on p.fk_TiposPlaga = tp.id
    join plantaciones pl on fk_Plantaciones = pl.id
    join cultivos c on fk_Cultivos = c.id
    join eras er on fk_Eras = er.id
    join lotes lo on fk_Lotes = lo.id
    where id=${id}`;
    const [result] = await pool.query(sql);

    if (result.length > 0) {
      const usosPC = result.map((usos) => ({
        id_usoProductoControl: usos.id_UPC,
        fk_ProductosControl: {
          id_productoControl: usos.id_PC,
          nombre: usos.nombre_PC,
          compuestoActivo: usos.compuestoActivo,
          tipoContenido: usos.tipoContenido_PC,
          unidades: usos.unidades_PC,
        },
        cantidad_producto_usada: usos.cantidadProducto_UPC,
        fk_Controles: {
          id: usos.id_co,
          descripcion: usos.descripcion_co,
          fechaControl: usos.fechaControl,
          fk_TipoContro: {
            id: usos.id_tpC,
            nombre: usos.nombre_tpC,
            descripcion: usos.descripcion_tpC,
          },
          fk_Afecciones: {
            id: usos.id,
            fechaEncuentro: usos.fechaEncuentro,
            estado: usos.estado,
            fk_Plagas: {
              idPlaga: usos.id,
              nombre: usos.nombre_plaga,
            },
            fk_Plantaciones: {
              id: usos.id_plantaciones,
              fk_cultivo: {
                id_cultivo: usos.id_cultivo,
                nombre: usos.nombre_cultivo,
                unidades: usos.unCultivo,
              },
              fk_era: {
                id: usos.id_era,
                posX: usos.posXera,
                posY: usos.posYera,
                fk_lote: {
                  id: usos.id_lote,
                  posX: usos.posXlote,
                  posY: usos.posYlote,
                },
              },
            },
          },
        },
      }));
      return resp.status(200).json(usosPC);
    } else {
      return resp.status(404).json({ message: "registro no encotrado" });
    }
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "Error en el sistema" });
  }
};
