import prisma from "../db.js";

// ✅ LISTAR AFECCIONES
export const listarAfecciones = async (req, resp) => {
  try {
    const afecciones = await prisma.afeccion.findMany({
      include: {
        plaga: {
          include: {
            tipoPlaga: true
          }
        },
        plantacion: {
          include: {
            cultivo: true,
            era: {
              include: {
                lote: true
              }
            }
          }
        }
      }
    });

    const resultado = afecciones.map((a) => ({
      id: a.id,
      fechaEncuentro: a.fechaEncuentro,
      estado: a.estado,
      fk_Plagas: {
        idPlaga: a.plaga.id,
        nombre: a.plaga.nombre,
      },
      fk_Plantaciones: {
        id: a.plantacion.id,
        fk_cultivo: {
          id_cultivo: a.plantacion.cultivo.id,
          nombre: a.plantacion.cultivo.nombre,
          unidades: a.plantacion.cultivo.unidades,
        },
        fk_era: {
          id: a.plantacion.era.id,
          posX: a.plantacion.era.posX,
          posY: a.plantacion.era.posY,
          fk_lote: {
            id: a.plantacion.era.lote.id,
            posX: a.plantacion.era.lote.posX,
            posY: a.plantacion.era.lote.posY,
          },
        },
      },
    }));

    return resp.status(200).json(resultado);
  } catch (error) {
    console.error("🔥 Error al listar afecciones:", error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};

// ✅ REGISTRAR AFECCION
export const registrarAfecciones = async (req, resp) => {
  try {
    const { fk_Plantaciones, fk_Plagas, fechaEncuentro, estado } = req.body;

    await prisma.afeccion.create({
      data: {
        fechaEncuentro,
        estado,
        plaga: {
          connect: { id: fk_Plagas }
        },
        plantacion: {
          connect: { id: fk_Plantaciones }
        }
      }
    });

    return resp.status(200).json({ message: "afección registrada" });
  } catch (error) {
    console.error("🔥 Error al registrar afección:", error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};

// ✅ ACTUALIZAR AFECCION
export const actualizarAfecciones = async (req, resp) => {
  try {
    const id = parseInt(req.params.id);
    const { fk_Plantaciones, fk_Plagas, fechaEncuentro, estado } = req.body;

    await prisma.afeccion.update({
      where: { id },
      data: {
        fechaEncuentro,
        estado,
        plaga: {
          connect: { id: fk_Plagas }
        },
        plantacion: {
          connect: { id: fk_Plantaciones }
        }
      }
    });

    return resp.status(200).json({ message: "afección actualizada" });
  } catch (error) {
    console.error("🔥 Error al actualizar afección:", error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};

// ✅ ELIMINAR AFECCION
export const eliminarAfecciones = async (req, resp) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.afeccion.delete({
      where: { id }
    });

    return resp.status(200).json({ message: "afección eliminada" });
  } catch (error) {
    console.error("🔥 Error al eliminar afección:", error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};

// ✅ BUSCAR POR ID
export const buscarAfecciones = async (req, resp) => {
  try {
    const id = parseInt(req.params.id);

    const a = await prisma.afeccion.findUnique({
      where: { id },
      include: {
        plaga: {
          include: {
            tipoPlaga: true
          }
        },
        plantacion: {
          include: {
            cultivo: true,
            era: {
              include: {
                lote: true
              }
            }
          }
        }
      }
    });

    if (!a) return resp.status(404).json({ message: "afección no encontrada" });

    const resultado = {
      id: a.id,
      fechaEncuentro: a.fechaEncuentro,
      estado: a.estado,
      fk_Plagas: {
        idPlaga: a.plaga.id,
        nombre: a.plaga.nombre,
      },
      fk_Plantaciones: {
        id: a.plantacion.id,
        fk_cultivo: {
          id_cultivo: a.plantacion.cultivo.id,
          nombre: a.plantacion.cultivo.nombre,
          unidades: a.plantacion.cultivo.unidades,
        },
        fk_era: {
          id: a.plantacion.era.id,
          posX: a.plantacion.era.posX,
          posY: a.plantacion.era.posY,
          fk_lote: {
            id: a.plantacion.era.lote.id,
            posX: a.plantacion.era.lote.posX,
            posY: a.plantacion.era.lote.posY,
          },
        },
      },
    };

    return resp.status(200).json(resultado);
  } catch (error) {
    console.error("🔥 Error al buscar afección:", error);
    return resp.status(500).json({ message: "error en el sistema" });
  }
};
