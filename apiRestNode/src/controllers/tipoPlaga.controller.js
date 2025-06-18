import pool from "../db.js";

export const listarTipoPlaga = async (req, resp) => {
  try {
    const tiposPlaga = await pool.tiposPlaga.findMany();
    return resp.status(200).json(tiposPlaga);
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};

export const registrarTipoPlaga = async (req, resp) => {
  try {
    const { nombre, descripcion, img } = req.body;

    await pool.tiposPlaga.create({
      data: { nombre, descripcion, img },
    });

    return resp.status(200).json({ message: "tipo de plaga registrada" });
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};

export const actualizarTipoPlaga = async (req, resp) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, descripcion, img } = req.body;

    await pool.tiposPlaga.update({
      where: { id },
      data: { nombre, descripcion, img },
    });

    return resp.status(200).json({ message: "tipo de plaga actualizada" });
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};

export const eliminarTipoPlaga = async (req, resp) => {
  try {
    const id = parseInt(req.params.id);

    await pool.tiposPlaga.delete({
      where: { id },
    });

    return resp.status(200).json({ message: "tipo de plaga eliminada" });
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};

export const buscarTipoPlaga = async (req, resp) => {
  try {
    const id = parseInt(req.params.id);

    const tipoPlaga = await pool.tiposPlaga.findUnique({
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
