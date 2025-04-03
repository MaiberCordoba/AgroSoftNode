import pool from "../db.js";

export const listarPlagas = async (req, resp) => {
  try {
    const [result] =
      await pool.query(`select p.nombre, p.descripcion, p.img, p.fk_TiposPlaga as id_tipo_plaga, tp.nombre as tipo_plaga, tp.descripcion as descipcion_tipo_plaga, tp.img as imagen_tipo_plaga
       from plagas p join tiposplaga tp on p.fk_TiposPlaga = tp.id`);
    if (result.length > 0) {
      const plagas = result.map((plaga) => ({
        nombre: plaga.nombre,
        descripcion: plaga.descripcion,
        img: plaga.img,
        tipoPlaga: {
          id: plaga.id_tipo_plaga,
          nombre: plaga.tipo_plaga,
          descripcion: plaga.descripcion_tipo_plaga,
          img: plaga.imagen_tipo_plaga,
        },
      }));
      return resp.status(200).json(plagas);
    } else {
      return resp.status(404).json({ message: "plaga no encontrados" });
    }
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};

export const registrarPlagas = async (req, resp) => {
  try {
    const { fk_TiposPlaga, nombre, descripcion, img } = req.body;
    const sql = `insert into plagas (fk_TiposPlaga,nombre,descripcion,img) values (?,?,?,?)`;
    const [rows] = await pool.query(sql, [
      fk_TiposPlaga,
      nombre,
      descripcion,
      img,
    ]);
    if (rows.affectedRows > 0) {
      return resp.status(200).json({ message: " plaga registrada" });
    } else {
      return resp
        .status(400)
        .json({ message: " nueva plaga no se pudo registrar" });
    }
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};

export const actualizarPlagas = async (req, resp) => {
  try {
    const id = req.params.id;
    const { fk_TiposPlaga, nombre, descripcion, img } = req.body;
    const sql = `update plagas set fk_TiposPlaga=?,nombre=?,descripcion=?,img=? where id=${id}`;

    const [rows] = await pool.query(sql, [
      fk_TiposPlaga,
      nombre,
      descripcion,
      img,
    ]);
    if (rows.affectedRows > 0) {
      return resp.status(200).json({ message: "plaga actualizada" });
    } else {
      return resp
        .status(400)
        .json({ message: "no fue posible actualizar esta plaga" });
    }
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};

export const eliminarPlagas = async (req, resp) => {
  try {
    const id = req.params.id;
    const sql = `delete from plagas where id=${id}`;

    const [rows] = await pool.query(sql);
    if (rows.affectedRows > 0) {
      return resp.status(200).json({ message: " plaga eliminada" });
    } else {
      return resp
        .status(400)
        .json({ message: "no fue posible eliminar la plaga" });
    }
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};

export const buscarPlaga = async (req, resp) => {
  try {
    const id = req.params.id;
    const [result] =
      await pool.query(`select p.nombre, p.descripcion, p.img, p.fk_TiposPlaga as id_tipo_plaga, tp.nombre as tipo_plaga, tp.descripcion as descipcion_tipo_plaga, tp.img as imagen_tipo_plaga
       from plagas p join tiposplaga tp on p.fk_TiposPlaga = tp.id where p.id=${id}`);
    if (result.length > 0) {
      const plagas = result.map((plaga) => ({
        nombre: plaga.nombre,
        descripcion: plaga.descripcion,
        img: plaga.img,
        fk_TiposPlaga: {
          id: plaga.id_tipo_plaga,
          nombre: plaga.tipo_plaga,
          descripcion: plaga.descripcion_tipo_plaga,
          img: plaga.imagen_tipo_plaga,
        },
      }));
      return resp.status(200).json(plagas);
    } else {
      return resp.status(404).json({ message: "plaga no encontrados" });
    }
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};
