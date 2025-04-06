export interface Sensor {
  id: number;  
  tipo_sensor: string;         
  datos_sensor: number;        
  fecha: string;               
  lote_id: number | null;
  era_id: number | null;        
}

export interface SensorConExtras extends Sensor {
  unidad: string;              
  alerta: boolean;              
}

export interface Umbral {
  id: number;
  sensor_id: number;
  valor_minimo: number;
  valor_maximo: number;
  tipo_sensor?: string; 
}
