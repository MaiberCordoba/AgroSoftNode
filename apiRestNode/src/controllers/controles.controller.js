import pool from "../db.js";
export const listarControles = async (req, resp) => {
  try {
    const sql = `SELECT 
      co.id AS id_co, co.descripcion AS descripcion_co, co.fechaControl,
      tpC.id AS id_tpC, tpC.nombre AS nombre_tpC, tpC.descripcion AS descripcion_tpC,
      a.id, a.fechaEncuentro, a.estado, a.fk_plagas,
      p.nombre AS nombre_plaga, p.fk_TiposPlaga AS idTipoPlaga, tp.nombre AS tipo_plaga,
      pl.id AS id_plantaciones,
      c.id AS id_cultivo, c.nombre AS nombre_cultivo, c.unidades AS unCultivo,
      er.id AS id_era, er.posX AS posXera, er.posY AS posYera,
      lo.id AS id_lote, lo.posX AS posXlote, lo.posY AS posYlote 
    FROM controles co
    JOIN tiposcontrol tpC ON fk_TiposControl = tpC.id
    JOIN afecciones a ON fk_Afecciones = a.id
    JOIN plagas p ON a.fk_Plagas = p.id
    JOIN tiposPlaga tp ON p.fk_TiposPlaga = tp.id
    JOIN plantaciones pl ON fk_Plantaciones = pl.id
    JOIN cultivos c ON fk_Cultivos = c.id
    JOIN eras er ON fk_Eras = er.id
    JOIN lotes lo ON fk_Lotes = lo.id`;

    const [result] = await pool.query(sql);

    const controles = result.map((control) => ({
      id: control.id_co,
      descripcion: control.descripcion_co,
      fechaControl: control.fechaControl,
      fk_TipoControl: {
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

    return resp.status(200).json(controles); // siempre devuelve 200, aunque sea []
    
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "Error en el sistema" });
  }
};



export const registrarControles = async (req, resp) => {
  try {
    const { fk_Afeccion, fk_TipoControl, descripcion, fechaControl } =
      req.body;
    const sql = `INSERT INTO controles (fk_Afecciones, fk_TiposControl,descripcion,fechaControl) VALUES (?,?,?,?)`;
    const [rows] = await pool.query(sql, [
      fk_Afeccion,
      fk_TipoControl,
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
    const { fk_Afeccion, fk_TipoControl, descripcion, fechaControl } =
      req.body;
    const sql = `UPDATE controles SET fk_Afecciones=?, fk_TiposControl=?, descripcion=?,fechaControl=?
     WHERE id=${id}`;

    const [rows] = await pool.query(sql, [
      fk_Afeccion,
      fk_TipoControl,
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
