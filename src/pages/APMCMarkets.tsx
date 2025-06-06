import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const APMCMarketsPage: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!mapRef.current) return;

    mapInstance.current = L.map(mapRef.current).setView([22.9734, 78.6569], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance.current);

    const markets = [
      { name: 'APMC Bangalore', lat: 12.9716, lng: 77.5946 },
      { name: 'APMC Navi Mumbai', lat: 19.033, lng: 73.0297 },
      { name: 'APMC Hyderabad', lat: 17.385, lng: 78.4867 },
    ];

    markets.forEach((market) => {
      L.marker([market.lat, market.lng])
        .addTo(mapInstance.current!)
        .bindPopup(market.name);
    });

    return () => {
      mapInstance.current?.remove();
    };
  }, []);

  // 🌍 Updated search using Nominatim API
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    const query = encodeURIComponent(searchQuery.trim());
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;

    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'MandiLink-Project/1.0 (your_email@example.com)',
          'Referer': window.location.origin
        }
      });

      const data = await response.json();

      if (data.length === 0) {
        alert('Location not found. Please try a different search.');
        return;
      }

      const { lat, lon, display_name } = data[0];
      const latLng: [number, number] = [parseFloat(lat), parseFloat(lon)];

      mapInstance.current?.setView(latLng, 13);

      if (markerRef.current) {
        mapInstance.current?.removeLayer(markerRef.current);
      }

      markerRef.current = L.marker(latLng)
        .addTo(mapInstance.current!)
        .bindPopup(`📍 ${display_name}`)
        .openPopup();

    } catch (error) {
      console.error('Search error:', error);
      alert('Error while searching. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">APMC Markets</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for APMC or location..."
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          🔎 Search
        </button>
      </div>
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
