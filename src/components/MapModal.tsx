
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import InteractiveMap from "./map/InteractiveMap";
import { useFriendLocations } from "@/hooks/useFriendLocations";
import { FriendManagementModal } from "./FriendManagementModal";

interface MapModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MapModal = ({ open, onOpenChange }: MapModalProps) => {
  const { locations, loading } = useFriendLocations();
  const [friendManagementOpen, setFriendManagementOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>Friend Map</DialogTitle>
              <DialogDescription>
                View the last known locations of your chosen fellow travelers
              </DialogDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFriendManagementOpen(true)}
            >
              <Settings className="w-4 h-4 mr-2" />
              Manage Connections
            </Button>
          </div>
        </DialogHeader>
        
        {loading ? (
          <div className="h-[500px] flex items-center justify-center">
            <p className="text-muted-foreground">Loading friend locations...</p>
          </div>
        ) : (
          <InteractiveMap locations={locations} />
        )}
        
        <FriendManagementModal 
          open={friendManagementOpen} 
          onOpenChange={setFriendManagementOpen} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default MapModal;
