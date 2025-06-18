import prisma from "../db.js";

export const listarPlagas = async (req, res) => {
  try {
    const plagas = await prisma.plagas.findMany({
      include: {
        tiposPlaga: true, // Relación con TipoPlaga
      },
    });

    const resultado = plagas.map((plaga) => ({
      id: plaga.id,
      nombre: plaga.nombre,
      descripcion: plaga.descripcion,
      img: plaga.img,
      tiposPlaga: {
        id: plaga.tiposPlaga.id,
        nombre: plaga.tiposPlaga.nombre,
        descripcion: plaga.tiposPlaga.descripcion,
        img: plaga.tiposPlaga.img,
      },
    }));

    return res.status(200).json(resultado);
  } catch (error) {
    console.error("🔥 Error al listar plagas:", error);
    return res.status(500).json({ message: "error en el sistema" });
  }
};

export const registrarPlagas = async (req, res) => {
  try {
    const { fk_Tipo, nombre, descripcion, img } = req.body;

    await prisma.plagas.create({
      data: {
        nombre,
        descripcion,
        img,
        fkTiposPlaga: fk_Tipo,
      },
    });

    return res.status(201).json({ message: "Plaga registrada" });
  } catch (error) {
    console.error("🔥 Error al registrar plaga:", error);
    return res.status(500).json({ message: "error en el sistema" });
  }
};

export const actualizarPlagas = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { fk_Tipo, nombre, descripcion, img } = req.body;

    await prisma.plagas.update({
      where: { id },
      data: {
        nombre,
        descripcion,
        img,
        fkTiposPlaga: fk_Tipo,
      },
    });

    return res.status(200).json({ message: "Plaga actualizada" });
  } catch (error) {
    console.error("🔥 Error al actualizar plaga:", error);
    return res.status(500).json({ message: "error en el sistema" });
  }
};

export const eliminarPlagas = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.plagas.delete({
      where: { id },
    });

    return res.status(200).json({ message: "Plaga eliminada" });
  } catch (error) {
    console.error("🔥 Error al eliminar plaga:", error);
    return res.status(500).json({ message: "error en el sistema" });
  }
};

export const buscarPlaga = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const plaga = await prisma.plagas.findUnique({
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
