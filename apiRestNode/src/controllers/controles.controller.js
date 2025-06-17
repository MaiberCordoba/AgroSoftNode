import pool from "../db.js";

// ✅ LISTAR CONTROLES
export const listarControles = async (req, resp) => {
  try {
    const controles = await pool.control.findMany({
      include: {
        tipoControl: true,
        afeccion: {
          include: {
            plaga: {
              include: {
                tipoPlaga: true,
              },
            },
            plantacion: {
              include: {
                cultivo: true,
                era: {
                  include: {
                    lote: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const resultado = controles.map((control) => ({
      id: control.id,
      descripcion: control.descripcion,
      fechaControl: control.fechaControl,
      fk_TipoControl: {
        id: control.tipoControl.id,
        nombre: control.tipoControl.nombre,
        descripcion: control.tipoControl.descripcion,
      },
      fk_Afecciones: {
        id: control.afeccion.id,
        fechaEncuentro: control.afeccion.fechaEncuentro,
        estado: control.afeccion.estado,
        fk_Plagas: {
          id: control.afeccion.plaga.id,
          nombre: control.afeccion.plaga.nombre,
          tipo: {
            id: control.afeccion.plaga.tipoPlaga.id,
            nombre: control.afeccion.plaga.tipoPlaga.nombre,
          },
        },
        fk_Plantaciones: {
          id: control.afeccion.plantacion.id,
          fk_cultivo: {
            id: control.afeccion.plantacion.cultivo.id,
            nombre: control.afeccion.plantacion.cultivo.nombre,
            unidades: control.afeccion.plantacion.cultivo.unidades,
          },
          fk_era: {
            id: control.afeccion.plantacion.era.id,
            posX: control.afeccion.plantacion.era.posX,
            posY: control.afeccion.plantacion.era.posY,
            fk_lote: {
              id: control.afeccion.plantacion.era.lote.id,
              posX: control.afeccion.plantacion.era.lote.posX,
              posY: control.afeccion.plantacion.era.lote.posY,
            },
          },
        },
      },
    }));

    return resp.status(200).json(resultado);
  } catch (error) {
    console.error("🔥 Error al listar controles:", error);
    return resp.status(500).json({ message: "Error en el sistema" });
  }
};

// ✅ REGISTRAR CONTROL
export const registrarControles = async (req, resp) => {
  try {
    const { fk_Afeccion, fk_TipoControl, descripcion, fechaControl } = req.body;

    await pool.control.create({
      data: {
        fk_Afecciones: fk_Afeccion,
        fk_TiposControl: fk_TipoControl,
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

// ✅ ACTUALIZAR CONTROL
export const actualizarControles = async (req, resp) => {
  try {
    const id = parseInt(req.params.id);
    const { fk_Afeccion, fk_TipoControl, descripcion, fechaControl } = req.body;

    await pool.control.update({
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

// ✅ ELIMINAR CONTROL
export const eliminarControles = async (req, resp) => {
  try {
    const id = parseInt(req.params.id);

    await pool.control.delete({
      where: { id },
    });

    return resp.status(200).json({ message: "Control eliminado" });
  } catch (error) {
    console.error("🔥 Error al eliminar control:", error);
    return resp.status(500).json({ message: "Error en el sistema" });
  }
};
