import pool from "../db.js";

// Obtener todos los tipos de especie
export const getAllTiposEspecie = async (req, res) => {
  try {
    const tiposEspecie = await pool.tiposEspecie.findMany();
    return res.status(200).json(tiposEspecie);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};


// Crear un nuevo tipo de especie
export const createTiposEspecie = async (req, res) => {
  try {
    const { nombre, descripcion, img } = req.body;

    const nuevoTipoEspecie = await pool.tiposEspecie.create({
      data: {
        nombre,
        descripcion,
        img,
      },
    });

    if (nuevoTipoEspecie) {
      return res.status(200).json({ msg: "El tipo de especie fue registrado exitosamente" });
    } else {
      return res.status(400).json({ msg: "Error al registrar el tipo de especie" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Actualizar un tipo de especie existente
export const updateTiposEspecie = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, descripcion, img } = req.body;

    const updatedTipoEspecie = await pool.tiposEspecie.update({
      where: { id },
      data: {
        nombre,
        descripcion,
        img,
      },
    });

    if (updatedTipoEspecie) {
      return res.status(200).json({ msg: "El tipo de especie fue actualizado exitosamente" });
    } else {
      return res.status(400).json({ msg: "Error al actualizar el tipo de especie" });
    }
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ msg: "No se encontró el tipo de especie con ese ID" });
    }
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Eliminar un tipo de especie
export const deleteTiposEspecie = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const deletedTipoEspecie = await pool.tiposEspecie.delete({
      where: { id },
    });

    if (deletedTipoEspecie) {
      return res.status(200).json({ msg: "El tipo de especie fue eliminado exitosamente" });
    } else {
      return res.status(404).json({ msg: "No se encontró el tipo de especie con ese ID" });
    }
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ msg: "No se encontró el tipo de especie con ese ID" });
    }
    return res.status(500).json({ msg: "Internal server error" });
  }
};  