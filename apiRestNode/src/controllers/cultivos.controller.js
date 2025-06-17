import pool from "../db.js";

export const getCultivos = async (req, res) => {
  try {
    const cultivos = await pool.cultivo.findMany();
    return res.status(200).json(cultivos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al listar los cultivos" });
  }
};

export const postCultivo = async (req, res) => {
  try {
    const { fk_Especies, nombre, unidades, activo, fechaSiembra } = req.body;

    if (fk_Especies === undefined || !nombre || !unidades || activo === undefined || !fechaSiembra) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    await pool.cultivo.create({
      data: {
        fk_Especies: parseInt(fk_Especies),
        nombre,
        unidades: parseInt(unidades),
        activo: Boolean(activo),
        fechaSiembra: new Date(fechaSiembra),
      },
    });

    return res.status(201).json({ message: "✅ Cultivo registrado correctamente" });
  } catch (error) {
    console.error("❌ Error al registrar el cultivo:", error);
    return res.status(500).json({ message: "Error al registrar el cultivo" });
  }
};

export const patchCultivo = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { fk_Especies, nombre, unidades, activo, fechaSiembra } = req.body;

    const data = {};
    if (fk_Especies !== undefined) data.fk_Especies = parseInt(fk_Especies);
    if (nombre !== undefined) data.nombre = nombre;
    if (unidades !== undefined) data.unidades = parseInt(unidades);
    if (activo !== undefined) data.activo = Boolean(activo);
    if (fechaSiembra !== undefined) data.fechaSiembra = new Date(fechaSiembra);

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ message: "No se proporcionaron campos para actualizar" });
    }

    const updatedCultivo = await pool.cultivo.update({
      where: { id },
      data,
    });

    return res.status(200).json(updatedCultivo);
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Cultivo no encontrado" });
    }
    return res.status(500).json({ message: "Error al actualizar el cultivo" });
  }
};

export const deleteCultivo = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await pool.cultivo.delete({
      where: { id },
    });

    return res.status(200).json({ message: "Cultivo eliminado correctamente" });
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Cultivo no encontrado" });
    }
    return res.status(500).json({ message: "Error al eliminar el cultivo" });
  }
};

export const getCultivoPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const cultivo = await pool.cultivo.findUnique({
      where: { id },
    });

    if (cultivo) {
      return res.status(200).json(cultivo);
    } else {
      return res.status(404).json({ message: "Cultivo no encontrado" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al buscar el cultivo" });
  }
};

export const getCultivosPorEspecie = async (req, res) => {
  try {
    const fk_Especies = parseInt(req.params.fk_Especies);

    const cultivos = await pool.cultivo.findMany({
      where: { fk_Especies },
    });

    return res.status(200).json(cultivos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al listar los cultivos por especie" });
  }
};

export const getCultivosPorSiembra = async (req, res) => {
  try {
    const { fechaSiembra } = req.params;

    if (!fechaSiembra) {
      return res.status(400).json({ message: "Debe proporcionar una fecha de siembra" });
    }

    const cultivos = await pool.cultivo.findMany({
      where: { fechaSiembra: new Date(fechaSiembra) },
    });

    if (cultivos.length === 0) {
      return res.status(404).json({ message: "No hay cultivos registrados en esa fecha" });
    }

    return res.status(200).json({
      titulo: "📅 Reporte de Cultivos por Fecha de Siembra",
      fechaGeneracion: new Date().toLocaleString(),
      fechaConsultada: fechaSiembra,
      totalCultivos: cultivos.length,
      cultivos,
    });
  } catch (error) {
    console.error("❌ Error al listar cultivos por fecha de siembra:", error);
    return res.status(500).json({ message: "Error al listar los cultivos por fecha de siembra" });
  }
};

export const getReporteCultivosActivos = async (req, res) => {
  try {
    const result = await pool.cultivo.groupBy({
      by: ["nombre"],
      where: { activo: true },
      _count: { nombre: true },
    });

    const formattedResult = result.map((item) => ({
      nombre: item.nombre,
      cantidad: item._count.nombre,
    }));

    return res.status(200).json(formattedResult);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al generar el reporte de cultivos activos" });
  }
};