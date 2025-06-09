import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useGetEras } from '../hooks/eras/useGetEras';

// Corrige el ícono por defecto de Leaflet (necesario para React)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const MapaEras = () => {
  const { data: eras, isLoading, error } = useGetEras();

   const centroMapa = [1.892321, -76.090273]; 

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar las eras: {error.message}</div>;

  return (
    <MapContainer
      center={centroMapa}
      zoom={26}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {eras &&
        eras.map((era) => (
          <Marker key={era.fk_Lotes} position={[era.posY, era.posX]}>
            <Popup>
              Era: {era.fk_Lotes} <br />
              Lat: {era.posY}, Lon: {era.posX}
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default MapaEras;