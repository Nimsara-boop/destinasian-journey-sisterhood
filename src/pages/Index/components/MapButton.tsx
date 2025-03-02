
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MapButtonProps {
  isFemaleExperience: boolean;
  onClick: () => void;
}

const MapButton = ({ isFemaleExperience, onClick }: MapButtonProps) => {
  return (
    <div className="fixed right-4 bottom-4 z-20">
      <Button
        className={`${isFemaleExperience ? 'bg-green-500 hover:bg-green-600' : 'bg-green-500 hover:bg-green-600'} text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center`}
        onClick={onClick}
      >
        <MapPin className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default MapButton;
