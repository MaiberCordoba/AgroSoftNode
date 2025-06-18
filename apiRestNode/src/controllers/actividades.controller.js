import pool from "../db.js";

export const createActividad = async (req, res) => {
  try {
    const sql = await pool.actividades.create({
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
    const sql = await pool.actividades.findMany()

    if (sql) {
      return res.status(200).json(sql)
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const getOneActividad = async (req, res) => {
  try {
    const id = req.params.id
    const sql = await pool.actividades.findUnique({
      where : {id :parseInt(id)}
    })

    if (sql) {
      return res.status(200).json(sql)
    }
    else{
      return res.status(404).json({msg : "No se encontro el ID"})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateActividad = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = await pool.actividades.update({
      where: { id: parseInt(id) },
      data: req.body
    })
    if (sql) {
      return res.status(200).json({ msg: "Se actualizo Correctamente" })
    }
  } catch (error) {
    console.error(error)
    if (error.code == "P2025") {
      return res.status(404).json({ msg: "No se encontro el ID" })
    }
    return res.status(500).json({ msg: "Error en el servidor" })
  }
}


