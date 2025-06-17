import pool from "../db.js";

export const getAllPlantaciones = async (req, res) => {
  try {
    const plantaciones = await pool.plantacion.findMany();
    return res.status(200).json(plantaciones);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al listar las plantaciones" });
  }
};

export const createPlantacion = async (req, res) => {
  try {
    const { fk_Cultivos, fk_Eras } = req.body;

    if (!fk_Cultivos || !fk_Eras) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const nuevaPlantacion = await pool.plantacion.create({
      data: {
        fk_Cultivos: parseInt(fk_Cultivos),
        fk_Eras: parseInt(fk_Eras),
      },
    });

    if (nuevaPlantacion) {
      return res.status(201).json({ message: "Plantación registrada correctamente" });
    }

    return res.status(400).json({ message: "No se pudo registrar la plantación" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al registrar la plantación" });
  }
};

export const patchPlantacion = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updates = req.body;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No se proporcionaron campos para actualizar" });
    }

    const data = {};
    if (updates.fk_Cultivos !== undefined) data.fk_Cultivos = parseInt(updates.fk_Cultivos);
    if (updates.fk_Eras !== undefined) data.fk_Eras = parseInt(updates.fk_Eras);

    const updatedPlantacion = await pool.plantacion.update({
      where: { id },
      data,
    });

    if (updatedPlantacion) {
      return res.status(200).json({ message: "Plantación actualizada correctamente" });
    }

    return res.status(404).json({ message: "Plantación no encontrada" });
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Plantación no encontrada" });
    }
    return res.status(500).json({ message: "Error al actualizar la plantación" });
  }
};

export const deletePlantacion = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const deletedPlantacion = await pool.plantacion.delete({
      where: { id },
    });

    if (deletedPlantacion) {
      return res.status(200).json({ message: "Plantación eliminada correctamente" });
    }

    return res.status(404).json({ message: "Plantación no encontrada" });
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Plantación no encontrada" });
    }
    return res.status(500).json({ message: "Error al eliminar la plantación" });
  }
};

export const getPlantacionById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const plantacion = await pool.plantacion.findUnique({
      where: { id },
    });

    if (plantacion) {
      return res.status(200).json(plantacion);
    }

    return res.status(404).json({ message: "Plantación no encontrada" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al buscar la plantación" });
  }
};

export const getPlantacionesByEraAndCrop = async (req, res) => {
  try {
    const fk_Eras = parseInt(req.params.fk_Eras);
    const fk_Cultivos = parseInt(req.params.fk_Cultivos);

    const plantaciones = await pool.plantacion.findMany({
      where: {
        fk_Eras,
        fk_Cultivos,
      },
    });

    return res.status(200).json(plantaciones);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al listar las plantaciones por era y cultivo" });
  }
};

export const getPlantacionesByEra = async (req, res) => {
  try {
    const fk_Eras = parseInt(req.params.fk_Eras);

    const plantaciones = await pool.plantacion.findMany({
      where: { fk_Eras },
    });

    if (plantaciones.length > 0) {
      return res.status(200).json({
        message: "🌱 Plantaciones encontradas",
        total: plantaciones.length,
        datos: plantaciones,
      });
    }

    return res.status(404).json({ message: "No hay plantaciones registradas en esta era" });
  } catch (error) {
    console.error("Error al listar las plantaciones por era:", error);
    return res.status(500).json({ message: "Error al listar las plantaciones por era" });
  }
};

export const getPlantacionesByCrop = async (req, res) => {
  try {
    const fk_Cultivos = parseInt(req.params.fk_Cultivos);

    const plantaciones = await pool.plantacion.findMany({
      where: { fk_Cultivos },
    });

    return res.status(200).json(plantaciones);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al listar las plantaciones por cultivo" });
  }
};

export const getPlantacionesByCropAndEra = async (req, res) => {
  try {
    const fk_Cultivos = parseInt(req.params.fk_Cultivos);
    const fk_Eras = parseInt(req.params.fk_Eras);

    const plantaciones = await pool.plantacion.findMany({
      where: {
        fk_Cultivos,
        fk_Eras,
      },
    });

    return res.status(200).json(plantaciones);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al listar las plantaciones por cultivo y era" });
  }
};