import { WebSocketServer } from 'ws';
import pool from './src/db.js'; 

const wss = new WebSocketServer({ port: 8080 });

// Mapa corregido para tipos de sensor (usando valores exactos del enum)
const sensorTypeMap = {
  viento: 'Viento',
  temperatura: 'Temperatura',
  iluminacion: 'Iluminación',
  humedadsuelo: 'Humedad_del_Terreno',
  humedadambiente: 'Humedad_Ambiental',
  lluvia: 'Lluvia',
  ph: 'Nivel_de_PH'
};

// Almacenar conexiones activas por tipo de sensor
const activeConnections = {
  Temperatura: new Set(),
  Iluminación: new Set(),
  Humedad_del_Terreno: new Set(),
  Humedad_Ambiental: new Set(),
  Viento: new Set(),
  Lluvia: new Set(),
  Nivel_de_PH: new Set()
};

// Generar datos simulados para cada tipo de sensor
const generateSensorData = (sensorType) => {
  switch (sensorType) {
    case 'Temperatura':
      return (Math.random() * 50).toFixed(1); // 0-50°C
    case 'Iluminación':
      return (Math.random() * 10000).toFixed(0); // 0-10000 lux
    case 'Humedad_del_Terreno':
    case 'Humedad_Ambiental':
      return (Math.random() * 100).toFixed(1); // 0-100%
    case 'Nivel_de_PH':
      return (Math.random() * 14).toFixed(1); // 0-14 pH
    case 'Viento':
      return (Math.random() * 100).toFixed(1); // 0-100 km/h
    case 'Lluvia':
      return (Math.random() * 50).toFixed(1); // 0-50 mm
    default:
      return (Math.random() * 100).toFixed(2);
  }
};

// Función para obtener umbrales de un sensor
const getSensorThresholds = async (sensorId) => {
  try {
    const thresholds = await pool.umbrales.findMany({
      where: { sensorId: sensorId }
    });
    return thresholds.length > 0 ? thresholds[0] : null;
  } catch (error) {
    console.error('Error obteniendo umbrales:', error);
    return null;
  }
};

// Función para actualizar un sensor en la base de datos
const updateSensorInDB = async (sensorId, value) => {
  try {
    await pool.sensores.update({
      where: { id: sensorId },
      data: {
        datosSensor: parseFloat(value),
        fecha: new Date()
      }
    });
    return true;
  } catch (error) {
    console.error('Error actualizando sensor:', error);
    return false;
  }
};

// Simular datos periódicamente
const simulateData = async () => {
  try {
    // Obtener todos los sensores
    const allSensors = await pool.sensores.findMany();
    
    if (allSensors.length === 0) {
      console.warn('No hay sensores en la base de datos');
      return;
    }

    for (const sensorType in activeConnections) {
      // Obtener sensores de este tipo
      const sensorsOfType = allSensors.filter(s => s.tipoSensor === sensorType);
      
      if (sensorsOfType.length === 0) {
        console.warn(`No hay sensores de tipo ${sensorType}`);
        continue;
      }

      // Seleccionar un sensor aleatorio de este tipo
      const sensor = sensorsOfType[Math.floor(Math.random() * sensorsOfType.length)];
      
      // Generar nuevo valor
      const newValue = generateSensorData(sensorType);
      
      // Actualizar en base de datos
      const updateSuccess = await updateSensorInDB(sensor.id, newValue);
      
      if (!updateSuccess) continue;
      
      // Obtener umbrales
      const thresholds = await getSensorThresholds(sensor.id);
      
      // Verificar alerta
      const alert = thresholds && 
                   (newValue < thresholds.valorMinimo || 
                    newValue > thresholds.valorMaximo);
      
      // Preparar datos para enviar
      const data = {
        id: sensor.id,
        tipoSensor: sensor.tipoSensor,
        valor: newValue,
        alerta: alert,
        fecha: new Date().toISOString(),
        unidad: getUnitForSensor(sensorType)
      };
      
      // Enviar a todos los clientes suscritos a este tipo
      activeConnections[sensorType].forEach(client => {
        if (client.readyState === 1) { // CONNECTING = 0, OPEN = 1, CLOSING = 2, CLOSED = 3
          client.send(JSON.stringify(data));
        }
      });
    }
  } catch (error) {
    console.error('Error en simulación de datos:', error);
  }
};

// Obtener unidad de medida para tipo de sensor
const getUnitForSensor = (sensorType) => {
  switch (sensorType) {
    case 'Temperatura': return '°C';
    case 'Iluminación': return 'lux';
    case 'Humedad_del_Terreno':
    case 'Humedad_Ambiental': return '%';
    case 'Nivel_de_PH': return 'pH';
    case 'Viento': return 'km/h';
    case 'Lluvia': return 'mm';
    default: return '';
  }
};

// Iniciar intervalo de simulación
setInterval(simulateData, 5000);

wss.on('connection', (ws, req) => {
  // Extraer el tipo de sensor de la URL
  const path = req.url?.split('/')[1] || '';
  const sensorType = sensorTypeMap[path] || path.charAt(0).toUpperCase() + path.slice(1);
  
  if (!sensorType || !activeConnections[sensorType]) {
    console.warn(`Tipo de sensor no válido: ${path}`);
    ws.close();
    return;
  }

  console.log(`Cliente conectado al WebSocket para ${sensorType}`);
  
  // Registrar conexión
  activeConnections[sensorType].add(ws);
  
  ws.on('close', () => {
    console.log(`Cliente desconectado de ${sensorType}`);
    activeConnections[sensorType].delete(ws);
  });
  
  ws.on('error', (error) => {
    console.error(`Error en conexión WebSocket (${sensorType}):`, error);
    activeConnections[sensorType].delete(ws);
  });
});

console.log('Servidor WebSocket corriendo en ws://localhost:8080');