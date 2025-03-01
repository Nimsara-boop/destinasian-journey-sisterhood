
import React, { useEffect, useRef, useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, X, ZoomIn, ZoomOut, Users } from "lucide-react";

type Location = {
  id: string;
  name: string;
  coordinates: [number, number]; // [latitude, longitude]
  lastSeen: string;
  avatar?: string;
};

interface MapModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MapModal = ({ open, onOpenChange }: MapModalProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  // Mock data for travelers' locations
  const locations: Location[] = [
    {
      id: "user1",
      name: "Sarah Chen",
      coordinates: [7.2906, 80.6337], // Kandy
      lastSeen: "2 hours ago",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150"
    },
    {
      id: "user2",
      name: "Maya Patel",
      coordinates: [6.0174, 80.2489], // Galle
      lastSeen: "5 hours ago",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
    },
    {
      id: "user3",
      name: "Carlos Rodriguez",
      coordinates: [6.9271, 79.8612], // Colombo
      lastSeen: "yesterday",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150"
    },
    {
      id: "user4",
      name: "Emma Wilson",
      coordinates: [5.9549, 80.4535], // Mirissa
      lastSeen: "3 days ago",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
    },
    {
      id: "user5",
      name: "Jamal Hassan",
      coordinates: [8.3114, 80.4037], // Anuradhapura
      lastSeen: "1 week ago",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150"
    }
  ];

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Traveler Locations</DialogTitle>
          <DialogDescription>
            View the last known locations of fellow travelers in Sri Lanka
          </DialogDescription>
        </DialogHeader>
        
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
            {/* Offline map image */}
            <img
              src="https://images.unsplash.com/photo-1624967075088-5af3d40dee39?w=800&h=600&fit=crop"
              alt="Map of Sri Lanka"
              className="w-full h-full object-cover"
              draggable="false"
            />
            
            {/* Location markers */}
            {locations.map((location) => {
              const position = getMarkerPosition(location.coordinates);
              return (
                <div
                  key={location.id}
                  className="absolute flex flex-col items-center cursor-pointer group"
                  style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => showLocationInfo(location)}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10 border-2 border-white shadow-md">
                      <AvatarImage src={location.avatar} alt={location.name} />
                      <AvatarFallback>{location.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-3 h-3"></span>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded py-1 px-2 absolute -bottom-8 whitespace-nowrap">
                    {location.name}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Controls */}
          <div className="absolute top-2 right-2 bg-white rounded-md shadow p-2 space-y-2">
            <Button size="icon" variant="outline" onClick={handleZoomIn} className="h-8 w-8">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" onClick={handleZoomOut} className="h-8 w-8">
              <ZoomOut className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Information panel */}
          {selectedLocation && (
            <div className="absolute bottom-2 left-2 bg-white rounded-md shadow p-3 w-64">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={selectedLocation.avatar} alt={selectedLocation.name} />
                    <AvatarFallback>{selectedLocation.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium">{selectedLocation.name}</h3>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6"
                  onClick={() => setSelectedLocation(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {selectedLocation.coordinates[0].toFixed(2)}, {selectedLocation.coordinates[1].toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Last active {selectedLocation.lastSeen}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapModal;
