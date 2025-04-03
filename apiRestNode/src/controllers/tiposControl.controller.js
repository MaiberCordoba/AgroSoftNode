import pool from "../db.js";

export const listarTiposControl = async (req, resp) => {
  try {
    const [result] = await pool.query("SELECT * FROM tiposcontrol");
    if (result.length > 0) {
      return resp.status(200).json(result);
    } else {
      return resp
        .status(404)
        .json({ message: "Tipos de control no encontrados" });
    }
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "Error en el sistema" });
  }
};

export const registrarTipoControl = async (req, resp) => {
  try {
    const { nombre, descripcion } = req.body;
    const sql = `INSERT INTO tiposcontrol (nombre, descripcion) VALUES (?, ?)`;
    const [rows] = await pool.query(sql, [nombre, descripcion]);

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

export const actualizarTipoControl = async (req, resp) => {
  try {
    const id = req.params.id;
    const { nombre, descripcion } = req.body;
    const sql = `UPDATE tiposcontrol SET nombre=?, descripcion=? WHERE id=?`;

    const [rows] = await pool.query(sql, [nombre, descripcion, id]);

    if (rows.affectedRows > 0) {
      return resp.status(200).json({ message: "Tipo de control actualizado" });
    } else {
      return resp
        .status(400)
        .json({ message: "No se pudo actualizar el tipo de control" });
    }
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "Error en el sistema" });
  }
};

export const eliminarTipoControl = async (req, resp) => {
  try {
    const id = req.params.id;
    const sql = `DELETE FROM tiposcontrol WHERE id=?`;

    const [rows] = await pool.query(sql, [id]);

    if (rows.affectedRows > 0) {
      return resp.status(200).json({ message: "Tipo de control eliminado" });
    } else {
      return resp
        .status(400)
        .json({ message: "No se pudo eliminar el tipo de control" });
    }
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "Error en el sistema" });
  }
};

export const buscarTipoControl = async (req, resp) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query("SELECT * FROM tiposcontrol WHERE id=?", [
      id,
    ]);

    if (result.length > 0) {
      return resp.status(200).json(result);
    } else {
      return resp
        .status(404)
        .json({ message: "Tipo de control no encontrado" });
    }
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "Error en el sistema" });
  }
};
