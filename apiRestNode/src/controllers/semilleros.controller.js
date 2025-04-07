import pool from "../db.js"

export const getAllSemilleros = async (req,res) => {
    try {
        const sql = `SELECT * FROM semilleros`;
        const [rows] = await pool.query(sql);
        // ✅ Devuelve 200 siempre, incluso si está vacío
        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}


export const createSemilleros = async (req, res) => {
    try {
        const { fk_Especies, unidades, fechaSiembra, fechaEstimada } = req.body
        const sql = "INSERT INTO semilleros (fk_Especies, unidades, fechaSiembra, fechaEstimada) VALUES (?,?,?,?)"
        const [rows] = await pool.query(sql, [fk_Especies, unidades, fechaSiembra, fechaEstimada])
        if (rows.affectedRows > 0) {
            return res.status(200).json({ msg: "El semillero fue registrado exitosamente" })
        } else {
            return res.status(400).json({ msg: "Error al registrar el semillero" })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({ msg: "Internal server error" })
    }
}

export const patchSemillero = async (req, res) => {
    try {
      const id = req.params.id;
      const { fk_Especies, unidades, fechaSiembra, fechaEstimada } = req.body;
  
      const fields = [];
      const values = [];
  
      if (fk_Especies !== undefined) {
        fields.push("fk_Especies = ?");
        values.push(fk_Especies);
      }
  
      if (unidades !== undefined) {
        fields.push("unidades = ?");
        values.push(unidades);
      }
  
      if (fechaSiembra !== undefined) {
        fields.push("fechaSiembra = ?");
        values.push(fechaSiembra);
      }
  
      if (fechaEstimada !== undefined) {
        fields.push("fechaEstimada = ?");
        values.push(fechaEstimada);
      }
  
      if (fields.length === 0) {
        return res
          .status(400)
          .json({ msg: "No se proporcionaron campos para actualizar" });
      }
  
      const sql = `UPDATE semilleros SET ${fields.join(", ")} WHERE id = ?`;
      values.push(id);
  
      const [result] = await pool.query(sql, values);
  
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ msg: "No se encontró el semillero con ese ID" });
      }
  
      // 🔁 Volver a consultar el semillero actualizado
      const [updatedRows] = await pool.query(
        "SELECT * FROM semilleros WHERE id = ?",
        [id]
      );
  
      // ✅ Enviar el objeto actualizado como respuesta
      return res.status(200).json(updatedRows[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };
  


export const deleteSemillero = async (req, res) => {
    try {
        const id = req.params.id
        const sql = `DELETE FROM semilleros WHERE id = ?`
        const [rows] = await pool.query(sql, [id])
        if (rows.affectedRows > 0) {
            return res.status(200).json({ msg: "El semillero fue eliminado exitosamente" })
        } else {
            return res.status(404).json({ msg: "No se encontró el semillero con ese ID" })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({ msg: "Internal server error" })
    }
}
