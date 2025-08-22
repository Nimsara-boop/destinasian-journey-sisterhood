
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Calendar as CalendarIcon, Globe, MapPin } from "lucide-react";
import { EventType } from "../types";
import Autoplay from "embla-carousel-autoplay";

interface EventCalendarProps {
  events: EventType[];
  location: string;
  onEventSelect: (eventId: number) => void;
}

const EventCalendar = ({ events, location, onEventSelect }: EventCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [calendarView, setCalendarView] = useState<"worldwide" | "local">("local");
  
  // Mock data for recent event highlights
  const recentEventHighlights = [
    {
      id: 1,
      image: "/public/lovable-uploads/47ee11ca-db78-4616-baed-fafacf5986a8.png",
      title: "Tokyo Tech Meetup",
      attendees: 150,
      location: "Tokyo, Japan"
    },
    {
      id: 2,
      image: "/public/lovable-uploads/ab6e39c4-5a77-4f4c-a047-6d81cbc3aaeb.png",
      title: "Singapore Startup Weekend",
      attendees: 200,
      location: "Singapore"
    },
    {
      id: 3,
      image: "/public/lovable-uploads/47ee11ca-db78-4616-baed-fafacf5986a8.png",
      title: "Bangkok Digital Nomads",
      attendees: 120,
      location: "Bangkok, Thailand"
    },
    {
      id: 4,
      image: "/public/lovable-uploads/ab6e39c4-5a77-4f4c-a047-6d81cbc3aaeb.png",
      title: "Seoul Innovation Summit",
      attendees: 300,
      location: "Seoul, South Korea"
    }
  ];
  
  // Convert event dates to Date objects for comparison
  const eventDates = events.map(event => {
    // Skip events with "Every" in the date as they are recurring
    if (event.date.includes("Every")) return null;
    
    // Parse date string to Date object
    const dateParts = event.date.split(", ")[0].split(" ");
    const month = ["January", "February", "March", "April", "May", "June", "July", 
      "August", "September", "October", "November", "December"].indexOf(dateParts[0]);
    const day = parseInt(dateParts[1]);
    const year = parseInt(dateParts[2]);
    
    return new Date(year, month, day);
  }).filter(Boolean) as Date[];
  
  // Function to check if a date has events
  const hasEventOnDate = (date: Date) => {
    return eventDates.some(eventDate => 
      eventDate.getDate() === date.getDate() && 
      eventDate.getMonth() === date.getMonth() && 
      eventDate.getFullYear() === date.getFullYear()
    );
  };
  
  // Filter events for the selected date or show hottest events if no date selected
  const eventsOnSelectedDate = selectedDate ? events.filter(event => {
    if (event.date.includes("Every")) return true; // Include recurring events
    
    const dateParts = event.date.split(", ")[0].split(" ");
    const month = ["January", "February", "March", "April", "May", "June", "July", 
      "August", "September", "October", "November", "December"].indexOf(dateParts[0]);
    const day = parseInt(dateParts[1]);
    const year = parseInt(dateParts[2]);
    const eventDate = new Date(year, month, day);
    
    return eventDate.getDate() === selectedDate.getDate() && 
      eventDate.getMonth() === selectedDate.getMonth() && 
      eventDate.getFullYear() === selectedDate.getFullYear();
  }) : events
      .filter(event => {
        // For Asia region, include various Asian countries
        const asianCountries = ['Japan', 'Thailand', 'Indonesia', 'China', 'South Korea', 'Singapore', 'Sri Lanka', 'India', 'Malaysia', 'Philippines', 'Vietnam'];
        return asianCountries.some(country => event.location.includes(country));
      })
      .sort((a, b) => b.attendees - a.attendees) // Sort by attendees (hottest events first)
      .slice(0, 6); // Show top 6 hottest events
  
  // Further filter events based on calendar view
  const filteredEvents = calendarView === "local" 
    ? eventsOnSelectedDate.filter(event => {
        // For Asia region, include various Asian countries
        const asianCountries = ['Japan', 'Thailand', 'Indonesia', 'China', 'South Korea', 'Singapore', 'Sri Lanka', 'India', 'Malaysia', 'Philippines', 'Vietnam'];
        return asianCountries.some(country => event.location.includes(country));
      })
    : eventsOnSelectedDate;
  
  return (
    <div className="space-y-6">
      {/* Recent Event Highlights Carousel */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Recent Event Highlights</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Carousel
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {recentEventHighlights.map((highlight) => (
                <CarouselItem key={highlight.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="relative group cursor-pointer">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={highlight.image}
                        alt={highlight.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-semibold text-lg mb-1">{highlight.title}</h3>
                      <p className="text-sm text-white/80">{highlight.location}</p>
                      <p className="text-xs text-white/70 mt-1">{highlight.attendees} attendees</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Events Across Asia</h2>
        <div className="flex space-x-2">
          <Button 
            variant={calendarView === "local" ? "default" : "outline"}
            size="sm"
            onClick={() => setCalendarView("local")}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Asian Events
          </Button>
          <Button 
            variant={calendarView === "worldwide" ? "default" : "outline"}
            size="sm"
            onClick={() => setCalendarView("worldwide")}
          >
            <Globe className="w-4 h-4 mr-2" />
            Worldwide
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5" />
              Event Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border p-3 pointer-events-auto"
              modifiers={{
                booked: date => hasEventOnDate(date)
              }}
              modifiersStyles={{
                booked: { fontWeight: 'bold', backgroundColor: 'rgb(219 234 254)' }
              }}
            />
          </CardContent>
        </Card>
        
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedDate 
                ? `Events on ${selectedDate.toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}`
                : "🔥 Hottest Events in Asia"
              }
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredEvents.length > 0 ? (
              <div className="space-y-4">
                {filteredEvents.map(event => (
                  <div 
                    key={event.id} 
                    className="p-4 border rounded-lg transition-colors hover:bg-gray-50 cursor-pointer"
                    onClick={() => onEventSelect(event.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{event.title}</h3>
                        <p className="text-muted-foreground text-sm mt-1">{event.location}</p>
                      </div>
                      <Badge>{event.category}</Badge>
                    </div>
                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <CalendarIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-1">No events found</h3>
                <p className="text-muted-foreground">
                  {selectedDate 
                    ? `There are no ${calendarView === "local" ? "Asian" : "worldwide"} events scheduled for this date.`
                    : "No events available to display."
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventCalendar;
