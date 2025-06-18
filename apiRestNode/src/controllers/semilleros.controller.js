import pool from "../db.js";

export const getAllSemilleros = async (req, res) => {
  try {
    const semilleros = await pool.semilleros.findMany();
    return res.status(200).json(semilleros);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const createSemilleros = async (req, res) => {
  try {
    const { fk_Especies, unidades, fechaSiembra, fechaEstimada } = req.body;

    const nuevoSemillero = await pool.semilleros.create({
      data: {
        fkEspecies: parseInt(fk_Especies),
        unidades: parseInt(unidades),
        fechaSiembra: new Date(fechaSiembra),
        fechaEstimada: new Date(fechaEstimada),
      },
    });

    if (nuevoSemillero) {
      return res.status(200).json({ msg: "El semillero fue registrado exitosamente" });
    } else {
      return res.status(400).json({ msg: "Error al registrar el semillero" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const patchSemillero = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { fk_Especies, unidades, fechaSiembra, fechaEstimada } = req.body;

    const data = {};
    if (fk_Especies !== undefined) data.fk_Especies = parseInt(fk_Especies);
    if (unidades !== undefined) data.unidades = parseInt(unidades);
    if (fechaSiembra !== undefined) data.fechaSiembra = new Date(fechaSiembra);
    if (fechaEstimada !== undefined) data.fechaEstimada = new Date(fechaEstimada);

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ msg: "No se proporcionaron campos para actualizar" });
    }

    const updatedSemillero = await pool.semilleros.update({
      where: { id },
      data,
    });

    return res.status(200).json(updatedSemillero);
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ msg: "No se encontró el semillero con ese ID" });
    }
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const deleteSemillero = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await pool.semilleros.delete({
      where: { id },
    });

    return res.status(200).json({ msg: "El semillero fue eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ msg: "No se encontró el semillero con ese ID" });
    }
    return res.status(500).json({ msg: "Internal server error" });
  }
};