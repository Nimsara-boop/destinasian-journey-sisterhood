
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Globe, MapPin } from "lucide-react";
import { EventType } from "../types";

interface EventCalendarProps {
  events: EventType[];
  location: string;
  onEventSelect: (eventId: number) => void;
}

const EventCalendar = ({ events, location, onEventSelect }: EventCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [calendarView, setCalendarView] = useState<"worldwide" | "local">("local");
  
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
  
  // Filter events for the selected date
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
  }) : [];
  
  // Further filter events based on calendar view
  const filteredEvents = calendarView === "local" 
    ? eventsOnSelectedDate.filter(event => event.location.includes(location))
    : eventsOnSelectedDate;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Cultural & National Events</h2>
        <div className="flex space-x-2">
          <Button 
            variant={calendarView === "local" ? "default" : "outline"}
            size="sm"
            onClick={() => setCalendarView("local")}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Local Events
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
              Events on {selectedDate?.toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
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
                  There are no {calendarView === "local" ? "local" : "worldwide"} events scheduled for this date.
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
