
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Location } from "./types";

interface LocationMarkerProps {
  location: Location;
  position: { x: number; y: number };
  onClick: (location: Location) => void;
}

const LocationMarker = ({ location, position, onClick }: LocationMarkerProps) => {
  // Updated to handle image errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Fallback to these Asia-related traveler profile photos
    const fallbackImages = [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80'
    ];
    
    const randomIndex = Math.floor(Math.random() * fallbackImages.length);
    e.currentTarget.src = fallbackImages[randomIndex];
  };

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
          <AvatarImage 
            src={location.avatar} 
            alt={location.name} 
            onError={handleImageError}
          />
          <AvatarFallback>{location.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-3 h-3"></span>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded py-1 px-2 absolute -bottom-8 whitespace-nowrap">
        {location.name}
      </div>
    </div>
  );
};

export default LocationMarker;
