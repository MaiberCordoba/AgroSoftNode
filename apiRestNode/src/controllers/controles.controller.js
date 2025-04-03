import pool from "../db.js";

export const listarControles = async (req, resp) => {
  try {
    const sql = `select co.id as id_co, co.descripcion as descripcion_co, co.fechaControl,
      tpC.id as id_tpC, tpC.nombre as nombre_tpC, tpC.descripcion as descripcion_tpC,
      a.id, a.fechaEncuentro, a. estado, a.fk_plagas,
      p.nombre as nombre_plaga, p.fk_TiposPlaga as idTipoPlaga, tp.nombre as tipo_plaga,
      pl.id as id_plantaciones,
      c.id as id_cultivo, c.nombre as nombre_cultivo, c.unidades as unCultivo,
      er.id as id_era, er.posX as posXera, er.posY as posYera,
      lo.id as id_lote, lo.posX as posXlote, lo.posY as posYlote 
    from controles co
    join tiposcontrol tpC on fk_TiposControl = tpC.id
    join afecciones a on fk_Afecciones = a.id
    join plagas p on a.fk_Plagas = p.id
    join tiposPlaga tp on p.fk_TiposPlaga = tp.id
    join plantaciones pl on fk_Plantaciones = pl.id
    join cultivos c on fk_Cultivos = c.id
    join eras er on fk_Eras = er.id
    join lotes lo on fk_Lotes = lo.id`;

    const [result] = await pool.query(sql);
    if (result.length > 0) {
      const afecciones = result.map((control) => ({
        id: control.id_co,
        descripcion: control.descripcion_co,
        fechaControl: control.fechaControl,
        fk_TipoContro: {
          id: control.id_tpC,
          nombre: control.nombre_tpC,
          descripcion: control.descripcion_tpC,
        },
        fk_Afecciones: {
          id: control.id,
          fechaEncuentro: control.fechaEncuentro,
          estado: control.estado,
          fk_Plagas: {
            idPlaga: control.id,
            nombre: control.nombre_plaga,
          },
          fk_Plantaciones: {
            id: control.id_plantaciones,
            fk_cultivo: {
              id_cultivo: control.id_cultivo,
              nombre: control.nombre_cultivo,
              unidades: control.unCultivo,
            },
            fk_era: {
              id: control.id_era,
              posX: control.posXera,
              posY: control.posYera,
              fk_lote: {
                id: control.id_lote,
                posX: control.posXlote,
                posY: control.posYlote,
              },
            },
          },
        },
      }));
      return resp.status(200).json(afecciones);
    } else {
      return resp.status(404).json({ message: "controles no encontrados" });
    }
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "Error en el sistema" });
  }
};

export const registrarControles = async (req, resp) => {
  try {
    const { fk_Afecciones, fk_TiposControl, descripcion, fechaControl } =
      req.body;
    const sql = `INSERT INTO controles (fk_Afecciones, fk_TiposControl,descripcion,fechaControl) VALUES (?,?,?,?)`;
    const [rows] = await pool.query(sql, [
      fk_Afecciones,
      fk_TiposControl,
      descripcion,
      fechaControl,
    ]);

    if (rows.affectedRows > 0) {
      return resp.status(200).json({ message: "Tipo de control registrado" });
    } else {
      return resp
        .status(400)
        .json({ message: "No se pudo registrar el tipo de control" });
    }
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "Error en el sistema" });
  }
};

export const actualizarControles = async (req, resp) => {
  try {
    const id = req.params.id;
    const { fk_Afecciones, fk_TiposControl, descripcion, fechaControl } =
      req.body;
    const sql = `UPDATE controles SET fk_Afecciones=?, fk_TiposControl=?, descripcion=?,fechaControl=?
     WHERE id=${id}`;

    const [rows] = await pool.query(sql, [
      fk_Afecciones,
      fk_TiposControl,
      descripcion,
      fechaControl,
    ]);

    if (rows.affectedRows > 0) {
      return resp.status(200).json({ message: "control actualizado" });
    } else {
      return resp
        .status(400)
        .json({ message: "No se pudo actualizar el control" });
    }
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "Error en el sistema" });
  }
};

export const eliminarControles = async (req, resp) => {
  try {
    const id = req.params.id;
    const sql = `DELETE FROM controles WHERE id=?`;

    const [rows] = await pool.query(sql, [id]);

    if (rows.affectedRows > 0) {
      return resp.status(200).json({ message: "Control eliminado" });
    } else {
      return resp
        .status(400)
        .json({ message: "No se pudo eliminar el control" });
    }
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "Error en el sistema" });
  }
};
