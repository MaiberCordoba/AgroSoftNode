import pool from "../db.js";

// Listar todas las eras
export const getAllEras = async (_req, res) => {
  try {
    const eras = await pool.eras.findMany();
    return res.status(200).json(eras);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al obtener las eras" });
  }
};

// Obtener una era por ID
export const getEraById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const era = await pool.eras.findUnique({
      where: { id },
    });

    if (!era) {
      return res.status(404).json({ msg: "Era no encontrada" });
    }

    return res.status(200).json(era);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al buscar la era" });
  }
};

// Registrar una nueva era
export const createEra = async (req, res) => {
  try {
    const { fk_Lotes, tamX, tamY, posX, posY, estado } = req.body;

    if ([fk_Lotes, tamX, tamY, posX, posY, estado].some(field => field === undefined)) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    const nuevaEra = await pool.eras.create({
      data: {
        fk_Lotes: parseInt(fk_Lotes),
        tamX: parseFloat(tamX),
        tamY: parseFloat(tamY),
        posX: parseFloat(posX),
        posY: parseFloat(posY),
        estado: Boolean(estado),
      },
    });

    if (nuevaEra) {
      return res.status(201).json({ msg: "Era registrada correctamente" });
    }

    return res.status(400).json({ msg: "No se pudo registrar la era" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al registrar la era" });
  }
};

// Actualizar una era por ID
export const patchEra = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;

    const updates = {};
    if (data.fk_Lotes !== undefined) updates.fk_Lotes = parseInt(data.fk_Lotes);
    if (data.tamX !== undefined) updates.tamX = parseFloat(data.tamX);
    if (data.tamY !== undefined) updates.tamY = parseFloat(data.tamY);
    if (data.posX !== undefined) updates.posX = parseFloat(data.posX);
    if (data.posY !== undefined) updates.posY = parseFloat(data.posY);
    if (data.estado !== undefined) updates.estado = Boolean(data.estado);

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ msg: "No se proporcionaron campos para actualizar" });
    }

    const updatedEra = await pool.eras.update({
      where: { id },
      data: updates,
    });

    if (updatedEra) {
      return res.status(200).json({ msg: "Era actualizada correctamente" });
    }

    return res.status(404).json({ msg: "Era no encontrada" });
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ msg: "Era no encontrada" });
    }
    return res.status(500).json({ msg: "Error al actualizar la era" });
  }
};

// Eliminar una era por ID
export const deleteEra = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const deletedEra = await pool.eras.delete({
      where: { id },
    });

    if (deletedEra) {
      return res.status(200).json({ msg: "Era eliminada correctamente" });
    }

    return res.status(404).json({ msg: "Era no encontrada" });
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ msg: "Era no encontrada" });
    }
    return res.status(500).json({ msg: "Error al eliminar la era" });
  }
};

// Reporte: Eras por lote
export const getErasByLoteId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const eras = await pool.eras.findMany({
      where: { fk_Lotes: id },
    });

    if (eras.length === 0) {
      return res.status(404).json({ msg: "No hay eras registradas para este lote" });
    }

    return res.status(200).json(eras);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al obtener el reporte" });
  }
};