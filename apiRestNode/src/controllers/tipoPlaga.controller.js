import pool from "../db.js";

// ✅ LISTAR
export const listarTipoPlaga = async (req, resp) => {
  try {
    const tiposPlaga = await pool.tipoPlaga.findMany();
    return resp.status(200).json(tiposPlaga);
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};

// ✅ REGISTRAR
export const registrarTipoPlaga = async (req, resp) => {
  try {
    const { nombre, descripcion, img } = req.body;

    await pool.tipoPlaga.create({
      data: { nombre, descripcion, img },
    });

    return resp.status(200).json({ message: "tipo de plaga registrada" });
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};

// ✅ ACTUALIZAR
export const actualizarTipoPlaga = async (req, resp) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, descripcion, img } = req.body;

    await pool.tipoPlaga.update({
      where: { id },
      data: { nombre, descripcion, img },
    });

    return resp.status(200).json({ message: "tipo de plaga actualizada" });
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};

// ✅ ELIMINAR
export const eliminarTipoPlaga = async (req, resp) => {
  try {
    const id = parseInt(req.params.id);

    await pool.tipoPlaga.delete({
      where: { id },
    });

    return resp.status(200).json({ message: "tipo de plaga eliminada" });
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};

// ✅ BUSCAR
export const buscarTipoPlaga = async (req, resp) => {
  try {
    const id = parseInt(req.params.id);

    const tipoPlaga = await pool.tipoPlaga.findUnique({
      where: { id },
    });

    if (tipoPlaga) {
      return resp.status(200).json(tipoPlaga);
    } else {
      return resp.status(404).json({ message: "tipo de plaga no encontrada" });
    }
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};
