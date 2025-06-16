import pool from "../db.js";

export const listarAfecciones = async (req, resp) => {
  try {
    const sql = `SELECT a.id, a.fechaEncuentro, a.estado, a.fk_plagas,
      p.nombre as nombre_plaga, p.fk_TiposPlaga as idTipoPlaga, tp.nombre as tipo_plaga,
      pl.id as id_plantaciones,
      c.id as id_cultivo, c.nombre as nombre_cultivo, c.unidades as unCultivo,
      er.id as id_era, er.posX as posXera, er.posY as posYera,
      lo.id as id_lote, lo.posX as posXlote, lo.posY as posYlote 
    FROM afecciones a
    JOIN plagas p ON a.fk_Plagas = p.id
    JOIN tiposPlaga tp ON p.fk_TiposPlaga = tp.id
    JOIN plantaciones pl ON fk_Plantaciones = pl.id
    JOIN cultivos c ON fk_Cultivos = c.id
    JOIN eras er ON fk_Eras = er.id
    JOIN lotes lo ON fk_Lotes = lo.id`;

    const [result] = await pool.query(sql);

    const afecciones = result.map((afeccion) => ({
      id: afeccion.id,
      fechaEncuentro: afeccion.fechaEncuentro,
      estado: afeccion.estado,
      fk_Plagas: {
        idPlaga: afeccion.fk_plagas,
        nombre: afeccion.nombre_plaga,
      },
      fk_Plantaciones: {
        id: afeccion.id_plantaciones,
        fk_cultivo: {
          id_cultivo: afeccion.id_cultivo,
          nombre: afeccion.nombre_cultivo,
          unidades: afeccion.unCultivo,
        },
        fk_era: {
          id: afeccion.id_era,
          posX: afeccion.posXera,
          posY: afeccion.posYera,
          fk_lote: {
            id: afeccion.id_lote,
            posX: afeccion.posXlote,
            posY: afeccion.posYlote,
          },
        },
      },
    }));

    return resp.status(200).json(afecciones);
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};

export const registrarAfecciones = async (req, resp) => {
  try {
    const { fk_Plantaciones, fk_Plagas, fechaEncuentro, estado } = req.body;

    // Agregamos logs para depurar
    console.log("Recibiendo datos:");
    console.log("fk_Plantaciones:", fk_Plantaciones);
    console.log("fk_Plagas:", fk_Plagas);
    console.log("fechaEncuentro:", fechaEncuentro);
    console.log("estado:", estado);

    const sql = `insert into afecciones (fk_Plantaciones,fk_Plagas,fechaEncuentro,estado) values (?,?,?,?)`;
    const [rows] = await pool.query(sql, [
      fk_Plantaciones,
      fk_Plagas,
      fechaEncuentro,
      estado,
    ]);

    if (rows.affectedRows > 0) {
      return resp.status(200).json({ message: "afección registrada" });
    } else {
      return resp.status(400).json({ message: "no se pudo registrar" });
    }
  } catch (error) {
    console.error("Error en registrarAfecciones:", error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};


export const actualizarAfecciones = async (req, resp) => {
  try {
    const id = req.params.id;
    const { fk_Plantaciones, fk_Plagas, fechaEncuentro, estado } = req.body;
    const sql = `update afecciones set fk_Plantaciones=?,fk_Plagas=?,fechaEncuentro=?,estado=? where id=${id}`;

    const [rows] = await pool.query(sql, [
      fk_Plantaciones,
      fk_Plagas,
      fechaEncuentro,
      estado,
    ]);
    if (rows.affectedRows > 0) {
      return resp.status(200).json({ message: "afeccion actualizada" });
    } else {
      return resp
        .status(400)
        .json({ message: "no fue posible actualizar esta afeccion" });
    }
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};

export const eliminarAfecciones = async (req, resp) => {
  try {
    const id = req.params.id;
    const sql = `delete from afecciones where id=${id}`;

    const [rows] = await pool.query(sql);
    if (rows.affectedRows > 0) {
      return resp.status(200).json({ message: "tipo de afeccion eliminada" });
    } else {
      return resp
        .status(400)
        .json({ message: "no fue posible eliminar la afeccion" });
    }
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};

export const buscarAfecciones = async (req, resp) => {
  try {
    const id = req.params.id;
    const sql = `select a.id, a.fechaEncuentro, a. estado, a.fk_plagas,
      p.nombre as nombre_plaga, p.fk_TiposPlaga as idTipoPlaga, tp.nombre as tipo_plaga,
      pl.id as id_plantaciones,
      c.id as id_cultivo, c.nombre as nombre_cultivo, c.unidades as unCultivo,
      er.id as id_era, er.posX as posXera, er.posY as posYera,
      lo.id as id_lote, lo.posX as posXlote, lo.posY as posYlote 
    from afecciones a
    join plagas p on a.fk_Plagas = p.id
    join tiposPlaga tp on p.fk_TiposPlaga = tp.id
    join plantaciones pl on fk_Plantaciones = pl.id
    join cultivos c on fk_Cultivos = c.id
    join eras er on fk_Eras = er.id
    join lotes lo on fk_Lotes = lo.id
    where a.id=${id}`;

    const [result] = await pool.query(sql);
    if (result.length > 0) {
      const afecciones = result.map((afeccion) => ({
        id: afeccion.id,
        fechaEncuentro: afeccion.fechaEncuentro,
        estado: afeccion.estado,
        fk_Plagas: {
          idPlaga: afeccion.id,
          nombre: afeccion.nombre_plaga,
        },
        fk_Plantaciones: {
          id: afeccion.id_plantaciones,
          fk_cultivo: {
            id_cultivo: afeccion.id_cultivo,
            nombre: afeccion.nombre_cultivo,
            unidades: afeccion.unCultivo,
          },
          fk_era: {
            id: afeccion.id_era,
            posX: afeccion.posXera,
            posY: afeccion.posYera,
            fk_lote: {
              id: afeccion.id_lote,
              posX: afeccion.posXlote,
              posY: afeccion.posYlote,
            },
          },
        },
      }));
      return resp.status(200).json(afecciones);
    } else {
      return resp.status(404).json({ message: "afeccion no encontrada" });
    }
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};
