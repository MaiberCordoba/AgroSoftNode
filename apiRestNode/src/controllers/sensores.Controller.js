import pool from '../db.js'

export const ListarSensores= async (req, res) => {
    try {
        const sql = `SELECT * FROM sensores`
        const [result] = await pool.query(sql)
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error al listar los sensores" });
    }
}
export const RegistrarSensor = async (req, res) => {
    try {
        const { tipo_sensor, datos_sensor, fecha, era_id, lote_id } = req.body;

        let unidad = '';
        switch (tipo_sensor) {
            case 'Temperatura':
                unidad = '°C';
                break;
            case 'Iluminación':
                unidad = 'lux';
                break;
            case 'Humedad Ambiental':
            case 'Humedad del Terreno':
                unidad = '%';
                break;
            case 'Nivel de PH':
                unidad = 'pH';
                break;
            case 'Viento':
                unidad = 'km/h';
                break;
            case 'Lluvia':
                unidad = 'mm';
                break;
            default:
                if(tipo_sensor == tipo_sensor){
                    return res.status(500).json({ message: "no existe ese tipo de sensor en tipo de sensor. Para los lotes estan los tipos 'Temperatura', 'Iluminación', 'Humedad Ambiental', 'Viento', 'Lluvia' y para las eras los tipos 'Humedad del Terreno', 'Nivel de PH' " });
                }
                return res.status(400).json({ message: "Tipo de sensor inválido." });
        }

        const sensoresLote = ['Temperatura', 'Iluminación', 'Humedad Ambiental', 'Viento', 'Lluvia'];
        const sensoresEra  = ['Humedad del Terreno', 'Nivel de PH'];
        
        if (sensoresLote.includes(tipo_sensor) && !lote_id) {
            return res.status(400).json({ message: `El sensor tipo '${tipo_sensor}' debe registrarse en un lote.` });
        }

        if (sensoresEra.includes(tipo_sensor) && !era_id) {
            return res.status(400).json({ message: `El sensor tipo '${tipo_sensor}' debe registrarse en una era.` });
        }


        const sql = `INSERT INTO sensores (tipo_sensor, datos_sensor, fecha, era_id, lote_id) VALUES (?, ?, ?, ?, ?)`;
        const [rows] = await pool.query(sql, [tipo_sensor, datos_sensor, fecha, era_id || null, lote_id || null]);

        return res.status(201).json({ 
            message: "Sensor registrado correctamente",
            unidad: unidad 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al registrar el sensor" });
    }
}
export const ActualizarSensor = async (req, res) => {
    try {
        const { id } = req.params;
        const { tipo_sensor, datos_sensor, fecha, era_id, lote_id } = req.body;

        // Validación de tipo y ubicación
        const sensoresLote = ['Temperatura', 'Iluminación', 'Humedad Ambiental', 'Viento', 'Lluvia'];
        const sensoresEra  = ['Humedad del Terreno', 'Nivel de PH'];

        if (sensoresLote.includes(tipo_sensor) && !lote_id) {
            return res.status(400).json({ message: `El sensor tipo '${tipo_sensor}' debe registrarse en un lote.` });
        }

        if (sensoresEra.includes(tipo_sensor) && !era_id) {
            return res.status(400).json({ message: `El sensor tipo '${tipo_sensor}' debe registrarse en una era.` });
        }

        if (era_id && lote_id) {
            return res.status(400).json({ message: "Un sensor no puede estar en una era y lote al mismo tiempo." });
        }

        // Validar que el tipo de sensor sea válido
        const tiposValidos = [...sensoresLote, ...sensoresEra];
        if (!tiposValidos.includes(tipo_sensor)) {
            return res.status(400).json({
                message: "Tipo de sensor inválido. Para los lotes: 'Temperatura', 'Iluminación', 'Humedad Ambiental', 'Viento', 'Lluvia'. Para las eras: 'Humedad del Terreno', 'Nivel de PH'."
            });
        }

        // Obtener datos actuales si no se envía datos_sensor
        const [rows] = await pool.query("SELECT datos_sensor FROM sensores WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Sensor no encontrado" });
        }

        const datosSensorFinal = datos_sensor !== undefined ? datos_sensor : rows[0].datos_sensor;

        const sql = `UPDATE sensores SET tipo_sensor = ?, datos_sensor = ?, fecha = ?, era_id = ?, lote_id = ? WHERE id = ?`;
        const [result] = await pool.query(sql, [
            tipo_sensor,
            datosSensorFinal,
            fecha,
            era_id || null,
            lote_id || null,
            id,
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Sensor no encontrado" });
        }

        return res.status(200).json({ message: "Sensor actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar sensor:", error);
        return res.status(500).json({ message: "Error al actualizar el sensor" });
    }
}

export const EliminarSensor = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `DELETE FROM sensores WHERE id = ?`;
        const [result] = await pool.query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Sensor no encontrado" });
        }

        return res.status(200).json({ message: "Sensor eliminado correctamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al eliminar el sensor" });
    }
}
export const ObtenerSensorPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `SELECT * FROM sensores WHERE id = ?`;
        const [rows] = await pool.query(sql, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Sensor no encontrado" });
        }

        return res.status(200).json(rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener el sensor" });
    }
}