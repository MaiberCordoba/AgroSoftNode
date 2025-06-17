import prisma from "../db.js";

// ✅ LISTAR
export const listarPlagas = async (req, res) => {
  try {
    const plagas = await prisma.plaga.findMany({
      include: {
        tipoPlaga: true, // Relación con TipoPlaga
      },
    });

    const resultado = plagas.map((plaga) => ({
      id: plaga.id,
      nombre: plaga.nombre,
      descripcion: plaga.descripcion,
      img: plaga.img,
      tipoPlaga: {
        id: plaga.tipoPlaga.id,
        nombre: plaga.tipoPlaga.nombre,
        descripcion: plaga.tipoPlaga.descripcion,
        img: plaga.tipoPlaga.img,
      },
    }));

    return res.status(200).json(resultado);
  } catch (error) {
    console.error("🔥 Error al listar plagas:", error);
    return res.status(500).json({ message: "error en el sistema" });
  }
};

// ✅ REGISTRAR
export const registrarPlagas = async (req, res) => {
  try {
    const { fk_Tipo, nombre, descripcion, img } = req.body;

    await prisma.plaga.create({
      data: {
        nombre,
        descripcion,
        img,
        tipoPlaga: {
          connect: { id: fk_Tipo },
        },
      },
    });

    return res.status(201).json({ message: "Plaga registrada" });
  } catch (error) {
    console.error("🔥 Error al registrar plaga:", error);
    return res.status(500).json({ message: "error en el sistema" });
  }
};

// ✅ ACTUALIZAR
export const actualizarPlagas = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { fk_TiposPlaga, nombre, descripcion, img } = req.body;

    await prisma.plaga.update({
      where: { id },
      data: {
        nombre,
        descripcion,
        img,
        tipoPlaga: {
          connect: { id: fk_TiposPlaga },
        },
      },
    });

    return res.status(200).json({ message: "Plaga actualizada" });
  } catch (error) {
    console.error("🔥 Error al actualizar plaga:", error);
    return res.status(500).json({ message: "error en el sistema" });
  }
};

// ✅ ELIMINAR
export const eliminarPlagas = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.plaga.delete({
      where: { id },
    });

    return res.status(200).json({ message: "Plaga eliminada" });
  } catch (error) {
    console.error("🔥 Error al eliminar plaga:", error);
    return res.status(500).json({ message: "error en el sistema" });
  }
};

// ✅ BUSCAR POR ID
export const buscarPlaga = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const plaga = await prisma.plaga.findUnique({
      where: { id },
      include: {
        tipoPlaga: true,
      },
    });

    if (!plaga) {
      return res.status(404).json({ message: "Plaga no encontrada" });
    }

    const resultado = {
      id: plaga.id,
      nombre: plaga.nombre,
      descripcion: plaga.descripcion,
      img: plaga.img,
      tipoPlaga: {
        id: plaga.tipoPlaga.id,
        nombre: plaga.tipoPlaga.nombre,
        descripcion: plaga.tipoPlaga.descripcion,
        img: plaga.tipoPlaga.img,
      },
    };

    return res.status(200).json(resultado);
  } catch (error) {
    console.error("🔥 Error al buscar plaga:", error);
    return res.status(500).json({ message: "error en el sistema" });
  }
};
