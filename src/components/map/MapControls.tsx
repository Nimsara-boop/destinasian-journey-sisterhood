
import React from "react";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut } from "lucide-react";

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const MapControls = ({ onZoomIn, onZoomOut }: MapControlsProps) => {
  return (
    <div className="absolute top-2 right-2 bg-white rounded-md shadow p-2 space-y-2">
      <Button size="icon" variant="outline" onClick={onZoomIn} className="h-8 w-8">
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="outline" onClick={onZoomOut} className="h-8 w-8">
        <ZoomOut className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default MapControls;
