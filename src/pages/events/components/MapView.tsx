
import { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Utensils, Hotel, Coffee } from "lucide-react";
import { EventType } from "../types";

interface MapViewProps {
  events: EventType[];
  activeTab: string;
}

const MapView = ({ events, activeTab }: MapViewProps) => {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  
  return (
    <>
      <TabsContent value="events" className="mt-0">
        <div className="h-[600px] bg-white rounded-lg shadow-sm p-4">
          <div className="relative h-full rounded-md overflow-hidden">
            <img 
              src="/lovable-uploads/47ee11ca-db78-4616-baed-fafacf5986a8.png" 
              alt="Map of Sri Lanka"
              className="w-full h-full object-cover"
            />
            
            {/* Event markers */}
            {events.filter(event => !event.isPromotion).map(event => (
              <div 
                key={event.id}
                className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-white font-medium -ml-4 -mt-4 cursor-pointer ${event.attending ? 'bg-green-500' : 'bg-gray-400'}`}
                style={{
                  top: `${100 - (event.coordinates[0] - 5.9) * 30}%`,
                  left: `${(event.coordinates[1] - 79.5) * 60}%`,
                }}
                onClick={() => setSelectedEvent(event)}
              >
                {event.id}
              </div>
            ))}
            
            {/* Legend */}
            <div className="absolute bottom-2 right-2 bg-white p-2 rounded-md shadow-md text-xs">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Attending</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <span>Not Attending</span>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="promotions" className="mt-0">
        <div className="h-[600px] bg-white rounded-lg shadow-sm p-4">
          <div className="relative h-full rounded-md overflow-hidden">
            <img 
              src="/lovable-uploads/47ee11ca-db78-4616-baed-fafacf5986a8.png" 
              alt="Map of Sri Lanka"
              className="w-full h-full object-cover"
            />
            
            {/* Promotion markers with custom icons */}
            {events.filter(event => event.isPromotion).map(promotion => (
              <div 
                key={promotion.id}
                className={`absolute w-10 h-10 rounded-full flex items-center justify-center text-white font-medium -ml-5 -mt-5 cursor-pointer ${
                  promotion.promotionType === 'restaurant' ? 'bg-orange-500' :
                  promotion.promotionType === 'hotel' ? 'bg-blue-500' : 
                  'bg-purple-500'
                }`}
                style={{
                  top: `${100 - (promotion.coordinates[0] - 5.9) * 30}%`,
                  left: `${(promotion.coordinates[1] - 79.5) * 60}%`,
                }}
                onClick={() => setSelectedEvent(promotion)}
              >
                {promotion.promotionType === 'restaurant' ? 
                  <Utensils className="w-5 h-5" /> : 
                  promotion.promotionType === 'hotel' ? 
                  <Hotel className="w-5 h-5" /> : 
                  <Coffee className="w-5 h-5" />
                }
              </div>
            ))}
            
            {/* Legend */}
            <div className="absolute bottom-2 right-2 bg-white p-2 rounded-md shadow-md text-xs">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span>Restaurants</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Hotels</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span>Cafés</span>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="all" className="mt-0">
        <div className="h-[600px] bg-white rounded-lg shadow-sm p-4">
          <div className="relative h-full rounded-md overflow-hidden">
            <img 
              src="/lovable-uploads/47ee11ca-db78-4616-baed-fafacf5986a8.png" 
              alt="Map of Sri Lanka"
              className="w-full h-full object-cover"
            />
            
            {/* All event markers */}
            {events.map(event => {
              if (event.isPromotion) {
                return (
                  <div 
                    key={event.id}
                    className={`absolute w-10 h-10 rounded-full flex items-center justify-center text-white font-medium -ml-5 -mt-5 cursor-pointer ${
                      event.promotionType === 'restaurant' ? 'bg-orange-500' :
                      event.promotionType === 'hotel' ? 'bg-blue-500' : 
                      'bg-purple-500'
                    }`}
                    style={{
                      top: `${100 - (event.coordinates[0] - 5.9) * 30}%`,
                      left: `${(event.coordinates[1] - 79.5) * 60}%`,
                    }}
                    onClick={() => setSelectedEvent(event)}
                  >
                    {event.promotionType === 'restaurant' ? 
                      <Utensils className="w-5 h-5" /> : 
                      event.promotionType === 'hotel' ? 
                      <Hotel className="w-5 h-5" /> : 
                      <Coffee className="w-5 h-5" />
                    }
                  </div>
                );
              } else {
                return (
                  <div 
                    key={event.id}
                    className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-white font-medium -ml-4 -mt-4 cursor-pointer ${event.attending ? 'bg-green-500' : 'bg-gray-400'}`}
                    style={{
                      top: `${100 - (event.coordinates[0] - 5.9) * 30}%`,
                      left: `${(event.coordinates[1] - 79.5) * 60}%`,
                    }}
                    onClick={() => setSelectedEvent(event)}
                  >
                    {event.id}
                  </div>
                );
              }
            })}
            
            {/* Combined Legend */}
            <div className="absolute bottom-2 right-2 bg-white p-2 rounded-md shadow-md text-xs">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Attending Events</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <span>Other Events</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span>Restaurants</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Hotels</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span>Cafés</span>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </>
  );
};

export default MapView;
