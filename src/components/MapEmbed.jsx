import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';

const icon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function MapEmbed({ listings = [], center, zoom = 11, height = 400 }) {
  const safeCenter = center ||
    listings[0]?.location ||
    { lat: 50.4501, lng: 30.5234 };

  return (
    <div
      style={{
        height,
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '1px solid var(--border)',
      }}
    >
      <MapContainer
        center={[safeCenter.lat, safeCenter.lng]}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {listings.map((l) =>
          l.location ? (
            <Marker key={l.id} position={[l.location.lat, l.location.lng]} icon={icon}>
              <Popup>
                <div style={{ minWidth: 180 }}>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{l.title}</div>
                  <div style={{ color: '#0f766e', fontWeight: 600, marginBottom: 6 }}>
                    {l.price?.toLocaleString('uk-UA')} ₴
                  </div>
                  <Link to={`/listing/${l.id}`} style={{ color: '#0c4a6e', fontWeight: 600 }}>
                    Детальніше →
                  </Link>
                </div>
              </Popup>
            </Marker>
          ) : null,
        )}
      </MapContainer>
    </div>
  );
}
