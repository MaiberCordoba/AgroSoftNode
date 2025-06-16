import pool from "../db.js";

export const listarTipoPlaga = async (req, resp) => {
  try {
    const [result] = await pool.query("SELECT * FROM tiposplaga");

    // Siempre devolver un array, incluso si está vacío
    return resp.status(200).json(result);
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};


export const registrarTipoPlaga = async (req, resp) => {
  try {
    const { nombre, descripcion, img } = req.body;
    const sql = `insert into tiposplaga (nombre,descripcion,img) values (?,?,?)`;
    const [rows] = await pool.query(sql, [nombre, descripcion, img]);
    if (rows.affectedRows > 0) {
      return resp.status(200).json({ message: "tipo de plaga registrada" });
    } else {
      return resp
        .status(400)
        .json({ message: "el tipo de plaga no se pudo registrar" });
    }
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};

export const actualizarTipoPlaga = async (req, resp) => {
  try {
    const id = req.params.id;
    const { nombre, descripcion, img } = req.body;
    const sql = `update tiposplaga set nombre=?,descripcion=?,img=? where id=${id}`;

    const [rows] = await pool.query(sql, [nombre, descripcion, img]);
    if (rows.affectedRows > 0) {
      return resp.status(200).json({ message: "tipo de plaga actualizada" });
    } else {
      return resp
        .status(400)
        .json({ message: "no fue posible actualizar el tipo de plaga" });
    }
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};

export const eliminarTipoPlaga = async (req, resp) => {
  try {
    const id = req.params.id;
    const sql = `delete from tiposplaga where id=${id}`;

    const [rows] = await pool.query(sql);
    if (rows.affectedRows > 0) {
      return resp.status(200).json({ message: "tipo de plaga eliminada" });
    } else {
      return resp
        .status(400)
        .json({ message: "no fue posible eliminar el tipo de plaga" });
    }
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};

export const buscarTipoPlaga = async (req, resp) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query(
      `select * from tiposplaga where id=${id}`
    );
    if (result.length > 0) {
      return resp.status(200).json(result);
    } else {
      return resp
        .status(404)
        .json({ message: "tipos de plaga no encontrados" });
    }
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};
