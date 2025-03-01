
import { Calendar, Utensils, Menu, MapPin } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface EventTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  viewMode: "grid" | "map";
  onViewModeChange: (mode: "grid" | "map") => void;
}

const EventTabs = ({ activeTab, onTabChange, viewMode, onViewModeChange }: EventTabsProps) => {
  return (
    <Tabs 
      defaultValue="events" 
      value={activeTab} 
      onValueChange={onTabChange}
      className="mb-6"
    >
      <div className="flex justify-between items-center mb-4">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="events">
            <Calendar className="w-4 h-4 mr-2" />
            Events
          </TabsTrigger>
          <TabsTrigger value="promotions">
            <Utensils className="w-4 h-4 mr-2" />
            Promotions
          </TabsTrigger>
          <TabsTrigger value="all">
            <Menu className="w-4 h-4 mr-2" />
            All
          </TabsTrigger>
        </TabsList>
        
        <div className="flex items-center gap-2">
          <Button 
            variant={viewMode === "grid" ? "default" : "outline"} 
            size="sm" 
            onClick={() => onViewModeChange("grid")}
          >
            <Menu className="w-4 h-4" />
          </Button>
          <Button 
            variant={viewMode === "map" ? "default" : "outline"} 
            size="sm" 
            onClick={() => onViewModeChange("map")}
          >
            <MapPin className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Tabs>
  );
};

export default EventTabs;
