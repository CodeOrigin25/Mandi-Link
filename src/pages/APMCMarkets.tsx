import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const APMCMarketsPage: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const mapInstance = useRef<google.maps.Map>();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      typeof window.google === 'undefined' ||
      !mapRef.current ||
      !searchRef.current
    ) {
      console.warn('Google Maps script not loaded yet.');
      return;
    }

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 22.9734, lng: 78.6569 },
      zoom: 5,
    });

    const input = searchRef.current;
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo("bounds", map);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) return;

      map.setCenter(place.geometry.location);
      map.setZoom(12);
      new window.google.maps.Marker({
        map,
        position: place.geometry.location,
      });
    });

    mapInstance.current = map;
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">APMC Markets</h1>
      <input
        type="text"
        ref={searchRef}
        placeholder="Search for APMC or location..."
        className="w-full p-2 mb-4 border rounded"
      />
      <div ref={mapRef} style={{ width: '100%', height: '500px' }} />
      <button
        onClick={() => navigate('/')}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Back to Home
      </button>
    </div>
  );
};

export default APMCMarketsPage;
