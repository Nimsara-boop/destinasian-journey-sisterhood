
import { Calendar, Utensils, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import EventCard from "./EventCard";
import { EventType } from "../types";

interface EventGridProps {
  events: EventType[];
  activeTab: string;
  toggleAttendance: (eventId: number) => void;
}

const EventGrid = ({ events, activeTab, toggleAttendance }: EventGridProps) => {
  if (events.length === 0) {
    return (
      <>
        <TabsContent value="events" className="mt-0">
          <div className="col-span-full text-center py-12">
            <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground mb-4">
              No events match your current filters or search criteria.
            </p>
            <Button onClick={() => { /* Reset filters */ }}>
              View All Events
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="promotions" className="mt-0">
          <div className="col-span-full text-center py-12">
            <Utensils className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No promotions found</h3>
            <p className="text-muted-foreground mb-4">
              No restaurant or hotel promotions match your current search criteria.
            </p>
            <Button onClick={() => { /* Reset filters */ }}>
              View All Promotions
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="all" className="mt-0">
          <div className="col-span-full text-center py-12">
            <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground mb-4">
              No events or promotions match your current search criteria.
            </p>
            <Button onClick={() => { /* Reset filters */ }}>
              View All
            </Button>
          </div>
        </TabsContent>
      </>
    );
  }

  return (
    <>
      <TabsContent value="events" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.filter(event => !event.isPromotion).map((event) => (
            <EventCard key={event.id} event={event} toggleAttendance={toggleAttendance} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="promotions" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.filter(event => event.isPromotion).map((promotion) => (
            <EventCard key={promotion.id} event={promotion} toggleAttendance={toggleAttendance} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="all" className="mt-0">
        <div className="space-y-8">
          {/* Featured Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Featured Promotions</h2>
              <Button variant="link" className="text-primary">
                See all <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.filter(event => event.isPromotion).slice(0, 3).map((promotion) => (
                <EventCard key={promotion.id} event={promotion} toggleAttendance={toggleAttendance} />
              ))}
            </div>
          </div>
          
          {/* Events Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Upcoming Events</h2>
              <Button variant="link" className="text-primary">
                See all <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.filter(event => !event.isPromotion).slice(0, 3).map((event) => (
                <EventCard key={event.id} event={event} toggleAttendance={toggleAttendance} />
              ))}
            </div>
          </div>
        </div>
      </TabsContent>
    </>
  );
};

export default EventGrid;
