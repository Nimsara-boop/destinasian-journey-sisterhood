
import React, { useRef, useState } from "react";
import LocationMarker from "./LocationMarker";
import MapControls from "./MapControls";
import LocationInfoPanel from "./LocationInfoPanel";
import { Location } from "./types";

interface InteractiveMapProps {
  locations: Location[];
}

const InteractiveMap = ({ locations }: InteractiveMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const handleZoomIn = () => {
    if (zoom < 3) setZoom(zoom + 0.5);
  };

  const handleZoomOut = () => {
    if (zoom > 0.5) setZoom(zoom - 0.5);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStart({ x: e.clientX - mapPosition.x, y: e.clientY - mapPosition.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStart) {
      setMapPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setDragStart(null);
  };

  const showLocationInfo = (location: Location) => {
    setSelectedLocation(location);
  };

  // Calculate marker positions based on coordinates
  const getMarkerPosition = (coordinates: [number, number]) => {
    // These are approximate mappings for Sri Lanka's coordinates to the map image
    // The actual values might need adjustment based on the map image used
    const mapWidth = 800;
    const mapHeight = 600;
    
    // Map Sri Lanka's coordinates (roughly 5.9-9.8 lat, 79.5-82 lng)
    const latRange = 9.8 - 5.9;
    const lngRange = 82 - 79.5;
    
    const x = ((coordinates[1] - 79.5) / lngRange) * mapWidth;
    const y = ((9.8 - coordinates[0]) / latRange) * mapHeight;
    
    return { x, y };
  };

  return (
    <div className="relative h-[500px] overflow-hidden border rounded-md bg-gray-50">
      {/* Map container */}
      <div
        ref={mapRef}
        className="absolute w-[800px] h-[600px] cursor-grab active:cursor-grabbing"
        style={{
          transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${zoom})`,
          transition: dragStart ? 'none' : 'transform 0.1s ease-out',
          transformOrigin: '0 0'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Map image */}
        <img
          src="/lovable-uploads/47ee11ca-db78-4616-baed-fafacf5986a8.png"
          alt="Map of Sri Lanka"
          className="w-full h-full object-cover"
          draggable="false"
        />
        
        {/* Location markers */}
        {locations.map((location) => {
          const position = getMarkerPosition(location.coordinates);
          return (
            <LocationMarker
              key={location.id}
              location={location}
              position={position}
              onClick={showLocationInfo}
            />
          );
        })}
      </div>
      
      {/* Controls */}
      <MapControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      
      {/* Information panel */}
      {selectedLocation && (
        <LocationInfoPanel 
          location={selectedLocation} 
          onClose={() => setSelectedLocation(null)} 
        />
      )}
    </div>
  );
};

export default InteractiveMap;
