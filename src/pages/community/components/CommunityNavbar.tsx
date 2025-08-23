import { Button } from "@/components/ui/button";
import { Users, MessageSquareMore } from "lucide-react";

interface CommunityNavbarProps {
  onMessagesClick: () => void;
}

const CommunityNavbar = ({ onMessagesClick }: CommunityNavbarProps) => {
  return (
    <div className="bg-background border-b sticky top-16 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Left side - Title */}
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">Community</h1>
          </div>
          
          {/* Right side - Messages Icon */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onMessagesClick}
            className="hover:bg-muted"
          >
            <div className="relative">
              {/* Custom cube-shaped icon combining people + chat */}
              <div className="w-6 h-6 relative">
                <MessageSquareMore className="w-6 h-6" />
                <div className="absolute -top-1 -right-1 w-3 h-3">
                  <Users className="w-3 h-3 text-muted-foreground" />
                </div>
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunityNavbar;