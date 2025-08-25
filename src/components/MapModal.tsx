
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import InteractiveMap from "./map/InteractiveMap";
import { useFriendLocations } from "@/hooks/useFriendLocations";

interface MapModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MapModal = ({ open, onOpenChange }: MapModalProps) => {
  const { locations, loading } = useFriendLocations();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Friend Map</DialogTitle>
          <DialogDescription>
            View the last known locations of your friends and other travelers
          </DialogDescription>
        </DialogHeader>
        
        {loading ? (
          <div className="h-[500px] flex items-center justify-center">
            <p className="text-muted-foreground">Loading friend locations...</p>
          </div>
        ) : (
          <InteractiveMap locations={locations} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MapModal;
