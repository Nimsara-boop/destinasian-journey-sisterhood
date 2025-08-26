
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Location } from "./types";

interface LocationMarkerProps {
  location: Location;
  position: { x: number; y: number };
  onClick: (location: Location) => void;
  onMessage?: (location: Location) => void;
}

const LocationMarker = ({ location, position, onClick, onMessage }: LocationMarkerProps) => {
  return (
    <div
      className="absolute flex flex-col items-center cursor-pointer group"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
      onClick={() => onClick(location)}
    >
      <div className="relative">
        <Avatar className="h-10 w-10 border-2 border-white shadow-md">
          <AvatarImage src={location.avatar} alt={location.name} />
          <AvatarFallback>{location.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-3 h-3"></span>
        
        {/* Message Button */}
        {onMessage && (
          <Button
            size="sm"
            variant="secondary"
            className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onMessage(location);
            }}
          >
            <MessageCircle className="h-3 w-3" />
          </Button>
        )}
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded py-1 px-2 absolute -bottom-8 whitespace-nowrap">
        {location.name}
      </div>
    </div>
  );
};

export default LocationMarker;
