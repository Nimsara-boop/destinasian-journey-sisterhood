
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import InteractiveMap from "./map/InteractiveMap";
import { Location } from "./map/types";

interface MapModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MapModal = ({ open, onOpenChange }: MapModalProps) => {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Friend Map</DialogTitle>
          <DialogDescription>
            View the last known locations of your friends and other travelers
          </DialogDescription>
        </DialogHeader>
        
        <InteractiveMap locations={locations} />
      </DialogContent>
    </Dialog>
  );
};

export default MapModal;
