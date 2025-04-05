import pool from '../db.js';

export const RegistrarUmbral = async (req, res) => {
    try {
        const { sensor_id, valor_minimo, valor_maximo } = req.body;

        const [sensor] = await pool.query('SELECT id FROM sensores WHERE id = ?', [sensor_id]);
        if (sensor.length === 0) {
            return res.status(404).json({ message: "El sensor no existe." });
        }

        await pool.query(
            `INSERT INTO umbrales (sensor_id, valor_minimo, valor_maximo) VALUES (?, ?, ?)`,
            [sensor_id, valor_minimo, valor_maximo]
        );

        return res.status(201).json({ message: "Umbral registrado correctamente" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al registrar el umbral" });
    }
}
export const ListarUmbrales = async (req, res) => {
    try {
        const [result] = await pool.query(`
            SELECT u.id, u.sensor_id, s.tipo_sensor, u.valor_minimo, u.valor_maximo 
            FROM umbrales u 
            JOIN sensores s ON u.sensor_id = s.id
        `);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al listar los umbrales" });
    }
}
export const ActualizarUmbral = async (req, res) => {
    try {
        const { id } = req.params;
        const { valor_minimo, valor_maximo } = req.body;

        const [result] = await pool.query(
            `UPDATE umbrales SET valor_minimo = ?, valor_maximo = ? WHERE id = ?`,
            [valor_minimo, valor_maximo, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Umbral no encontrado" });
        }

        return res.status(200).json({ message: "Umbral actualizado correctamente" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al actualizar el umbral" });
    }
}
export const EliminarUmbral = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(`DELETE FROM umbrales WHERE id = ?`, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Umbral no encontrado" });
        }

        return res.status(200).json({ message: "Umbral eliminado correctamente" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al eliminar el umbral" });
    }
}
