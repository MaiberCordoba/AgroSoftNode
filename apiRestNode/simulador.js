import { WebSocketServer } from 'ws';
import pool from './src/db.js'; // ✅ corregido aquí

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Cliente conectado al WebSocket');

  const sendSensorData = async () => {
    try {
      const [sensores] = await pool.query('SELECT * FROM sensores');
      if (sensores.length === 0) return;

      const sensor = sensores[Math.floor(Math.random() * sensores.length)];
      const randomValue = parseFloat((Math.random() * 100).toFixed(2));
      const fecha = new Date();

      await pool.query(
        'UPDATE sensores SET datos_sensor = ?, fecha = ? WHERE id = ?',
        [randomValue, fecha, sensor.id]
      );

      const [umbral] = await pool.query('SELECT * FROM umbrales WHERE sensor_id = ?', [sensor.id]);

      const alerta = umbral.length > 0 &&
        (randomValue < umbral[0].valor_minimo || randomValue > umbral[0].valor_maximo);

      const data = {
        id: sensor.id,
        tipo_sensor: sensor.tipo_sensor,
        valor: randomValue,
        unidad: sensor.unidad || '',
        alerta,
        fecha,
      };

      ws.send(JSON.stringify(data));
    } catch (err) {
      console.error('Error simulando datos del sensor:', err);
    }
  };

  const interval = setInterval(sendSensorData, 1000);

  ws.on('close', () => {
    clearInterval(interval);
    console.log('Cliente desconectado');
  });
});

console.log('Servidor WebSocket corriendo en ws://localhost:8080');
