import pool from '../db.js';

// Controlador para sensores
export const ListarSensores = async (req, res) => {
    try {
        const sensores = await pool.sensores.findMany();
        return res.status(200).json(sensores);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error al listar los sensores" });
    }
}

export const RegistrarSensor = async (req, res) => {
    try {
        const { tipoSensor, datosSensor, fecha, eraId, loteId } = req.body;

        // Mapeo de tipos de sensor a enum de Prisma
        const tipoSensorMap = {
            'Temperatura': 'TEMPERATURA',
            'Iluminación': 'ILUMINACION',
            'Humedad Ambiental': 'HUMEDAD_AMBIENTAL',
            'Humedad del Terreno': 'HUMEDAD_TERRENO',
            'Nivel de PH': 'PH',
            'Viento': 'VIENTO',
            'Lluvia': 'LLUVIA'
        };

        const tipoSensorEnum = tipoSensorMap[tipoSensor];
        if (!tipoSensorEnum) {
            return res.status(400).json({ message: "Tipo de sensor inválido." });
        }

        let unidad = '';
        switch (tipoSensor) {
            case 'Temperatura': unidad = '°C'; break;
            case 'Iluminación': unidad = 'lux'; break;
            case 'Humedad Ambiental':
            case 'Humedad del Terreno': unidad = '%'; break;
            case 'Nivel de PH': unidad = 'pH'; break;
            case 'Viento': unidad = 'km/h'; break;
            case 'Lluvia': unidad = 'mm'; break;
            default: return res.status(400).json({ message: "Tipo de sensor inválido." });
        }

        const sensoresLote = ['Temperatura', 'Iluminación', 'Humedad Ambiental', 'Viento', 'Lluvia'];
        const sensoresEra  = ['Humedad del Terreno', 'Nivel de PH'];
        
        if (sensoresLote.includes(tipoSensor) && !loteId) {
            return res.status(400).json({ message: `El sensor tipo '${tipoSensor}' debe registrarse en un lote.` });
        }

        if (sensoresEra.includes(tipoSensor) && !eraId) {
            return res.status(400).json({ message: `El sensor tipo '${tipoSensor}' debe registrarse en una era.` });
        }

        const sensor = await pool.sensores.create({
            data: {
                tipoSensor: tipoSensorEnum,
                datosSensor: datosSensor,
                fecha: fecha ? new Date(fecha) : new Date(),
                eraId: eraId || null,
                loteId: loteId || null
            }
        });

        return res.status(201).json({ 
            message: "Sensor registrado correctamente",
            unidad: unidad,
            sensor: sensor
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al registrar el sensor" });
    }
}

export const ActualizarSensor = async (req, res) => {
    try {
        const { id } = req.params;
        const { tipoSensor, datosSensor, fecha, eraId, loteId } = req.body;

        // Validar que existe el sensor
        const sensorExistente = await pool.sensores.findUnique({
            where: { id: parseInt(id) }
        });

        if (!sensorExistente) {
            return res.status(404).json({ message: "Sensor no encontrado" });
        }

        // Mapeo de tipos de sensor
        const tipoSensorMap = {
            'Temperatura': 'TEMPERATURA',
            'Iluminación': 'ILUMINACION',
            'Humedad Ambiental': 'HUMEDAD_AMBIENTAL',
            'Humedad del Terreno': 'HUMEDAD_TERRENO',
            'Nivel de PH': 'PH',
            'Viento': 'VIENTO',
            'Lluvia': 'LLUVIA'
        };

        let tipoSensorEnum;
        if (tipoSensor) {
            tipoSensorEnum = tipoSensorMap[tipoSensor];
            if (!tipoSensorEnum) {
                return res.status(400).json({ message: "Tipo de sensor inválido." });
            }
        }

        const sensoresLote = ['Temperatura', 'Iluminación', 'Humedad Ambiental', 'Viento', 'Lluvia'];
        const sensoresEra  = ['Humedad del Terreno', 'Nivel de PH'];

        if (tipoSensor) {
            if (sensoresLote.includes(tipoSensor) && !loteId) {
                return res.status(400).json({ message: `El sensor tipo '${tipoSensor}' debe registrarse en un lote.` });
            }

            if (sensoresEra.includes(tipoSensor) && !eraId) {
                return res.status(400).json({ message: `El sensor tipo '${tipoSensor}' debe registrarse en una era.` });
            }
        }

        const sensorActualizado = await pool.sensor.update({
            where: { id: parseInt(id) },
            data: {
                tipoSensor: tipoSensor ? tipoSensorEnum : sensorExistente.tipoSensor,
                datosSensor: datosSensor !== undefined ? datosSensor : sensorExistente.datosSensor,
                fecha: fecha ? new Date(fecha) : sensorExistente.fecha,
                eraId: eraId !== undefined ? (eraId || null) : sensorExistente.eraId,
                loteId: loteId !== undefined ? (loteId || null) : sensorExistente.loteId
            }
        });

        return res.status(200).json({ 
            message: "Sensor actualizado correctamente",
            sensor: sensorActualizado
        });
    } catch (error) {
        console.error("Error al actualizar sensor:", error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Sensor no encontrado" });
        }
        return res.status(500).json({ message: "Error al actualizar el sensor" });
    }
}

export const EliminarSensor = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.sensores.delete({
            where: { id: parseInt(id) }
        });

        return res.status(200).json({ message: "Sensor eliminado correctamente" });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Sensor no encontrado" });
        }
        return res.status(500).json({ message: "Error al eliminar el sensor" });
    }
}

export const ObtenerSensorPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const sensor = await pool.sensores.findUnique({
            where: { id: parseInt(id) }
        });

        if (!sensor) {
            return res.status(404).json({ message: "Sensor no encontrado" });
        }

        return res.status(200).json(sensor);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener el sensor" });
    }
}

export const ObtenerHistoricoSensor = async (req, res) => {
    try {
        const { id } = req.params;
        const { fechaInicio, fechaFin } = req.query;

        const historico = await pool.sensores.findMany({
            where: {
                id: parseInt(id),
                fecha: {
                    gte: new Date(fechaInicio),
                    lte: new Date(fechaFin)
                }
            },
            orderBy: {
                fecha: 'asc'
            }
        });

        // Mapear para agregar unidad
        const historicoConUnidad = historico.map(registro => {
            let unidad = '';
            switch (registro.tipoSensor) {
                case 'TEMPERATURA': unidad = '°C'; break;
                case 'ILUMINACION': unidad = 'lux'; break;
                case 'HUMEDAD_AMBIENTAL':
                case 'HUMEDAD_TERRENO': unidad = '%'; break;
                case 'PH': unidad = 'pH'; break;
                case 'VIENTO': unidad = 'km/h'; break;
                case 'LLUVIA': unidad = 'mm'; break;
                default: unidad = '';
            }
            return {
                ...registro,
                unidad
            };
        });

        return res.status(200).json(historicoConUnidad);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener histórico del sensor" });
    }
};
