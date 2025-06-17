import pool from "../db.js";

// ✅ LISTAR
export const listarTiposControl = async (req, resp) => {
  try {
    const tiposControl = await pool.tipoControl.findMany(); // correcto
    return resp.status(200).json(tiposControl);
  } catch (error) {
    console.error("🔥 Error al listar tipos de control:", error);
    return resp.status(500).json({ message: "Error en el sistema" });
  }
};

// ✅ REGISTRAR
export const registrarTipoControl = async (req, resp) => {
  try {
    const { nombre, descripcion } = req.body;

    await pool.tipoControl.create({
      data: { nombre, descripcion },
    });

    return resp.status(200).json({ message: "Tipo de control registrado" });
  } catch (error) {
    console.error("🔥 Error al registrar tipo de control:", error);
    return resp.status(500).json({ message: "Error en el sistema" });
  }
};

// ✅ ACTUALIZAR
export const actualizarTipoControl = async (req, resp) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, descripcion } = req.body;

    await pool.tipoControl.update({
      where: { id },
      data: { nombre, descripcion },
    });

    return resp.status(200).json({ message: "Tipo de control actualizado" });
  } catch (error) {
    console.error("🔥 Error al actualizar tipo de control:", error);
    return resp.status(500).json({ message: "Error en el sistema" });
  }
};

// ✅ ELIMINAR
export const eliminarTipoControl = async (req, resp) => {
  try {
    const id = parseInt(req.params.id);

    await pool.tipoControl.delete({
      where: { id },
    });

    return resp.status(200).json({ message: "Tipo de control eliminado" });
  } catch (error) {
    console.error("🔥 Error al eliminar tipo de control:", error);
    return resp.status(500).json({ message: "Error en el sistema" });
  }
};

// ✅ BUSCAR POR ID
export const buscarTipoControl = async (req, resp) => {
  try {
    const id = parseInt(req.params.id);

    const tipoControl = await pool.tipoControl.findUnique({
      where: { id },
    });

    if (tipoControl) {
      return resp.status(200).json(tipoControl);
    } else {
      return resp.status(404).json({ message: "Tipo de control no encontrado" });
    }
  } catch (error) {
    console.error("🔥 Error al buscar tipo de control:", error);
    return resp.status(500).json({ message: "Error en el sistema" });
  }
};
