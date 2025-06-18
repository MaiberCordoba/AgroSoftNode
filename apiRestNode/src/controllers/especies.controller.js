import pool from "../db.js";

// Obtener todas las especies
export const getAllEspecies = async (req, res) => {
  try {
    const especies = await pool.especies.findMany();
    if (especies) {
      return res.status(200).json(especies);
    } else {
      return res.status(404).json({ msg: "No se encontraron datos de especies registradas." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Crear una nueva especie
export const createEspecies = async (req, res) => {
  try {
    const { nombre, descripcion, img, tiempoCrecimiento, fk_TiposEspecie } = req.body;

    const nuevaEspecie = await pool.especies.create({
      data: {
        nombre,
        descripcion,
        img,
        tiempoCrecimiento: tiempoCrecimiento ? parseInt(tiempoCrecimiento) : null,
        fk_TiposEspecie: parseInt(fk_TiposEspecie),
      },
    });

    if (nuevaEspecie) {
      return res.status(200).json({ msg: "La especie fue registrada exitosamente" });
    } else {
      return res.status(400).json({ msg: "Error al registrar la especie" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Actualizar parcialmente una especie
export const patchEspecies = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const campos = req.body;

    if (!id || Object.keys(campos).length === 0) {
      return res.status(400).json({ msg: "Faltan datos para actualizar." });
    }

    // Convertir tipos según el modelo
    if (campos.tiempoCrecimiento) {
      campos.tiempoCrecimiento = parseInt(campos.tiempoCrecimiento);
    }
    if (campos.fk_TiposEspecie) {
      campos.fk_TiposEspecie = parseInt(campos.fk_TiposEspecie);
    }

    const updatedEspecie = await pool.especies.update({
      where: { id },
      data: campos,
    });

    if (updatedEspecie) {
      return res.status(200).json({ msg: "La especie fue actualizada exitosamente" });
    } else {
      return res.status(404).json({ msg: "No se encontró la especie a actualizar" });
    }
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ msg: "No se encontró la especie a actualizar" });
    }
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Eliminar una especie
export const deleteEspecies = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const deletedEspecie = await pool.especies.delete({
      where: { id },
    });

    if (deletedEspecie) {
      return res.status(200).json({ msg: "La especie fue eliminada exitosamente" });
    } else {
      return res.status(404).json({ msg: "No se encontró la especie a eliminar" });
    }
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ msg: "No se encontró la especie a eliminar" });
    }
    return res.status(500).json({ msg: "Internal server error" });
  }
};