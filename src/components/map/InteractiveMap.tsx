
import React, { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import LocationInfoPanel from "./LocationInfoPanel";
import { Location } from "./types";
import { useFriendLocations } from "@/hooks/useFriendLocations";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface InteractiveMapProps {
  locations: Location[];
}

const InteractiveMap = ({ locations: propLocations }: InteractiveMapProps) => {
  const { searchQuery, setSearchQuery } = useFriendLocations();
  const filteredLocations = propLocations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapRef.current) return;

    // Set Mapbox access token - using the token directly since it's public
    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHV6aWVua3EwZjRpMmlxdm02NGVneXpyIn0.TJI8CKNqKMJIRVINWQBIhA';

    // Initialize map
    mapInstanceRef.current = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [80.7718, 7.8731], // Center on Sri Lanka
      zoom: 7,
      pitch: 0,
      bearing: 0
    });

    // Add navigation controls
    mapInstanceRef.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    mapInstanceRef.current.on('load', () => {
      setMapLoaded(true);
    });

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !mapLoaded) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers for each location
    filteredLocations.forEach(location => {
      // Create a custom marker element
      const markerEl = document.createElement('div');
      markerEl.className = 'cursor-pointer';
      markerEl.innerHTML = `
        <div class="relative">
          <div class="w-10 h-10 bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
            ${location.avatar 
              ? `<img src="${location.avatar}" alt="${location.name}" class="w-8 h-8 rounded-full object-cover" />`
              : `<div class="w-8 h-8 rounded-full bg-primary-foreground flex items-center justify-center text-xs font-medium text-primary">${location.name.charAt(0).toUpperCase()}</div>`
            }
          </div>
          <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rotate-45"></div>
        </div>
      `;

      // Create marker
      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat([location.coordinates[1], location.coordinates[0]])
        .addTo(mapInstanceRef.current!);

      // Add click event
      markerEl.addEventListener('click', () => {
        setSelectedLocation(location);
      });

      markersRef.current.push(marker);
    });

    // Fit map to show all markers if there are any
    if (filteredLocations.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      filteredLocations.forEach(location => {
        bounds.extend([location.coordinates[1], location.coordinates[0]]);
      });
      
      mapInstanceRef.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 12
      });
    }
  }, [filteredLocations, mapLoaded]);

  const handleMessage = (location: Location) => {
    console.log('Message user:', location.name);
    setSelectedLocation(location);
  };

  return (
    <div className="relative h-[500px] overflow-hidden border rounded-md bg-gray-50">
      {/* Search Bar */}
      <div className="absolute top-4 left-4 z-10 w-80">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search friends by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background/95 backdrop-blur-sm shadow-sm"
          />
        </div>
      </div>

      {/* Map container */}
      <div
        ref={mapRef}
        className="w-full h-full"
      />
      
      {/* Information panel */}
      {selectedLocation && (
        <LocationInfoPanel 
          location={selectedLocation} 
          onClose={() => setSelectedLocation(null)}
          onMessage={handleMessage}
        />
      )}
    </div>
  );
};

export default InteractiveMap;
