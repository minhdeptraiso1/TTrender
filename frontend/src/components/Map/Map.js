import React, { useState, useEffect } from 'react';
import classes from './map.module.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent, useMap } from 'react-leaflet';
import { toast } from 'react-toastify';
import L from 'leaflet';

export default function Map({ readonly, location, onChange }) {
  return (
    <div className={classes.container}>
      <MapContainer
        className={classes.map}
        center={location || [21.0278, 105.8342]} // Mặc định Hà Nội
        zoom={location ? 13 : 5}
        dragging={!readonly}
        touchZoom={!readonly}
        doubleClickZoom={!readonly}
        scrollWheelZoom={!readonly}
        boxZoom={!readonly}
        keyboard={!readonly}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FindButtonAndMarker readonly={readonly} location={location} onChange={onChange} />
      </MapContainer>
    </div>
  );
}

function FindButtonAndMarker({ readonly, location, onChange }) {
  const [position, setPosition] = useState(location);
  
  const map = useMap();

  // Khi location prop thay đổi từ cha => cập nhật vị trí marker
  useEffect(() => {
    if (location) {
      setPosition(location);
      map.setView(location, 13);
    }
  }, [location]);

  useMapEvent({
    click(e) {
      if (!readonly) {
        const latlng = e.latlng;
        setPosition(latlng);
        onChange && onChange(latlng);
      }
    },
    locationfound(e) {
      setPosition(e.latlng);
      onChange && onChange(e.latlng);
      map.flyTo(e.latlng, 13);
    },
    locationerror() {
      toast.error('Không tìm thấy vị trí');
    }
  });

  return (
    <>
      {!readonly && (
        <button
          type="button"
          className={classes.find_location}
          onClick={() => map.locate()}
        >
          Tìm địa chỉ của bạn
        </button>
      )}
      {position && (
        <Marker
          position={position}
          draggable={!readonly}
          eventHandlers={{
            dragend: (e) => {
              const latlng = e.target.getLatLng();
              setPosition(latlng);
              onChange && onChange(latlng);
            }
          }}
        >
          <Popup>Địa chỉ đã chọn</Popup>
        </Marker>
      )}
    </>
  );
}
