
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Users, X, MessageCircle } from "lucide-react";
import { Location } from "./types";

interface LocationInfoPanelProps {
  location: Location;
  onClose: () => void;
  onMessage?: (location: Location) => void;
}

const LocationInfoPanel = ({ location, onClose, onMessage }: LocationInfoPanelProps) => {
  return (
    <div className="absolute bottom-2 left-2 bg-white rounded-md shadow p-3 w-64">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={location.avatar} alt={location.name} />
            <AvatarFallback>{location.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h3 className="font-medium">{location.name}</h3>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-1 text-sm">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>
            {location.coordinates[0].toFixed(2)}, {location.coordinates[1].toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>Last active {location.lastSeen}</span>
        </div>
      </div>
      
      {/* Message Button */}
      {onMessage && (
        <div className="mt-3">
          <Button
            size="sm"
            className="w-full"
            onClick={() => onMessage(location)}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </div>
      )}
    </div>
  );
};

export default LocationInfoPanel;
