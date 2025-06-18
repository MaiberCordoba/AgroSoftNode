import pool from '../db.js';

export const RegistrarUmbral = async (req, res) => {
    try {
        const { sensorId, valorMinimo, valorMaximo } = req.body;

        // 1. Verificar si el SENSOR existe (no el umbral)
        const sensor = await pool.sensores.findUnique({
            where: { id: parseInt(sensorId) }
        });

        if (!sensor) {
            return res.status(404).json({ message: "El sensor no existe." });
        }

        // 2. Validar los valores numéricos
        if (isNaN(parseFloat(valorMinimo)) || isNaN(parseFloat(valorMaximo))) {
            return res.status(400).json({ message: "Los valores deben ser números válidos." });
        }

        // 3. Validar que el mínimo sea menor que el máximo
        if (parseFloat(valorMinimo) >= parseFloat(valorMaximo)) {
            return res.status(400).json({ message: "El valor mínimo debe ser menor que el valor máximo." });
        }

        // 4. Crear el nuevo umbral
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
        return res.status(500).json({ 
            message: "Error al registrar el umbral",
            error: error.message  // Agregar mensaje de error para diagnóstico
        });
    }
}
export const ListarUmbrales = async (req, res) => {
    try {
        const umbrales = await pool.umbrales.findMany();
        return res.status(200).json(umbrales);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error al listar los umbrales" });
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