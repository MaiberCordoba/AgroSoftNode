import pool from "../db.js";

export const listarControles = async (req, resp) => {
  try {
    const controles = await pool.controles.findMany({
      include: {
        tiposControl: true,
        afecciones: {
          include: {
            plagas: {
              include: {
                tiposPlaga: true,
              },
            },
            plantaciones: {
              include: {
                cultivos: true,
                eras: {
                  include: {
                    lotes: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return resp.json(controles);
  } catch (error) {
    return resp.status(500).json({ error: "Error al listar controles" });
  }
};

export const registrarControles = async (req, resp) => {
  try {
    const { fk_Afeccion, fk_TipoControl, descripcion, fechaControl } = req.body;

    await pool.controles.create({
      data: {
        fkAfecciones: fk_Afeccion,
        fkTiposControl: fk_TipoControl,
        descripcion,
        fechaControl: new Date(fechaControl),
      },
    });

    return resp.status(201).json({ message: "Control registrado" });
  } catch (error) {
    console.error("🔥 Error al registrar control:", error);
    return resp.status(500).json({ message: "Error en el sistema" });
  }
};

export const actualizarControles = async (req, resp) => {
  try {
    const id = parseInt(req.params.id);
    const { fk_Afeccion, fk_TipoControl, descripcion, fechaControl } = req.body;

    await pool.controles.update({
      where: { id },
      data: {
        fk_Afecciones: fk_Afeccion,
        fk_TiposControl: fk_TipoControl,
        descripcion,
        fechaControl: new Date(fechaControl),
      },
    });

    return resp.status(200).json({ message: "Control actualizado" });
  } catch (error) {
    console.error("🔥 Error al actualizar control:", error);
    return resp.status(500).json({ message: "Error en el sistema" });
  }
};

export const eliminarControles = async (req, resp) => {
  try {
    const id = parseInt(req.params.id);

    await pool.controles.delete({
      where: { id },
    });

    return resp.status(200).json({ message: "Control eliminado" });
  } catch (error) {
    console.error("🔥 Error al eliminar control:", error);
    return resp.status(500).json({ message: "Error en el sistema" });
  }
};
