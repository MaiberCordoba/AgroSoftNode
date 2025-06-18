import pool from '../db.js';

export const RegistrarUmbral = async (req, res) => {
    try {
        const { sensorId, valorMinimo, valorMaximo } = req.body;

        // Verificar si el sensor existe
        const sensor = await pool.umbrales.findUnique({
            where: { id: parseInt(sensorId) }
        });

        if (!sensor) {
            return res.status(404).json({ message: "El sensor no existe." });
        }

        // Crear el nuevo umbral
        const nuevoUmbral = await pool.umbrales.create({
            data: {
                sensorId: parseInt(sensorId),
                valorMinimo: parseFloat(valorMinimo),
                valorMaximo: parseFloat(valorMaximo)
            }
        });

        return res.status(201).json({
            message: "Umbral registrado correctamente",
            umbral: nuevoUmbral
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al registrar el umbral" });
    }
}

export const ListarUmbrales = async (req, res) => {
    try {
        const umbrales = await pool.umbrales.findMany({
            include: {
                sensor: {
                    select: {
                        id: true,
                        tipoSensor: true
                    }
                }
            }
        });

        // Mapear para dar formato similar al original
        const resultado = umbrales.map(umbral => ({
            id: umbral.id,
            sensorId: umbral.sensorId,
            tipoSensor: umbral.sensores.tipoSensor,
            valorMinimo: umbral.valorMinimo,
            valorMaximo: umbral.valorMaximo
        }));

        return res.status(200).json(resultado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al listar los umbrales" });
    }
}

export const ActualizarUmbral = async (req, res) => {
    try {
        const { id } = req.params;
        const { valorMinimo, valorMaximo } = req.body;

        const umbralActualizado = await pool.umbrales.update({
            where: { id: parseInt(id) },
            data: {
                valorMinimo: parseFloat(valorMinimo),
                valorMaximo: parseFloat(valorMaximo)
            }
        });

        return res.status(200).json({
            message: "Umbral actualizado correctamente",
            umbral: umbralActualizado
        });

    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Umbral no encontrado" });
        }
        return res.status(500).json({ message: "Error al actualizar el umbral" });
    }
}

export const EliminarUmbral = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.umbrales.delete({
            where: { id: parseInt(id) }
        });

        return res.status(200).json({ message: "Umbral eliminado correctamente" });

    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Umbral no encontrado" });
        }
        return res.status(500).json({ message: "Error al eliminar el umbral" });
    }
}