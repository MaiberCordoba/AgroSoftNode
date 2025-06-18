import { WebSocketServer } from 'ws';
import pool from './src/db.js'; 

const wss = new WebSocketServer({ port: 8080 });

// Mapa para convertir rutas a tipos de sensor en formato ENUM
const sensorTypeMap = {
  viento: 'VIENTO',
  temperatura: 'TEMPERATURA',
  luzSolar: 'ILUMINACION',
  humedad: 'HUMEDAD_TERRENO',
  humedadAmbiente: 'HUMEDAD_AMBIENTAL',
  lluvia: 'LLUVIA'
};

wss.on('connection', (ws, req) => {
  // Extraer el tipo de sensor de la URL
  const sensorType = req.url?.split('/')[1] || '';
  const sensorTypeDB = sensorTypeMap[sensorType] || sensorType.toUpperCase();
  
  console.log(`Cliente conectado al WebSocket para ${sensorTypeDB}`);

  const sendSensorData = async () => {
    try {
      // Obtener sensores del tipo específico
      const sensores = await pool.sensores.findMany({
        where: {
          tipoSensor: sensorTypeDB
        }
      });
      
      if (sensores.length === 0) {
        console.warn(`No hay sensores de tipo ${sensorTypeDB}`);
        return;
      }

      const sensor = sensores[Math.floor(Math.random() * sensores.length)];
      const randomValue = parseFloat((Math.random() * 100).toFixed(2));
      const fecha = new Date();

      // Actualizar el sensor en la base de datos
      await pool.sensores.update({
        where: { id: sensor.id },
        data: {
          datosSensor: randomValue,
          fecha: fecha
        }
      });

      // Obtener umbrales para este sensor
      const umbrales = await pool.umbrales.findMany({
        where: { sensorId: sensor.id }
      });

      const alerta = umbrales.length > 0 &&
        (randomValue < umbrales[0].valorMinimo || randomValue > umbrales[0].valorMaximo);

      // Preparar datos para enviar
      const data = {
        id: sensor.id,
        tipoSensor: sensor.tipoSensor,
        valor: randomValue,
        alerta,
        fecha: fecha.toISOString()
      };

      ws.send(JSON.stringify(data));
    } catch (err) {
      console.error('Error simulando datos del sensor:', err);
    }
  };

  const interval = setInterval(sendSensorData, 5000);

  ws.on('close', () => {
    clearInterval(interval);
    console.log(`Cliente desconectado de ${sensorTypeDB}`);
  });
});

console.log('Servidor WebSocket corriendo en ws://localhost:8080');