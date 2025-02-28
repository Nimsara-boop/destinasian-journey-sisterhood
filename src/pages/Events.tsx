
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MapPin, Search, Calendar, Users, Plus, Filter, ChevronDown, 
  Calendar as CalendarIcon, Clock, Info
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

type EventType = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  coordinates: [number, number]; // [latitude, longitude]
  organizer: string;
  attendees: number;
  category: string;
  imageUrl: string;
  attending: boolean;
};

const EventCreationForm = ({ onClose }: { onClose: () => void }) => {
  const { toast } = useToast();
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const handleCreateEvent = () => {
    if (!eventTitle || !eventDate || !eventTime || !eventLocation) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Event Created",
      description: "Your event has been successfully created!",
    });

    onClose();
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="event-title">Event Title *</Label>
        <Input
          id="event-title"
          placeholder="Enter event title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="event-date">Date *</Label>
          <Input
            id="event-date"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="event-time">Time *</Label>
          <Input
            id="event-time"
            type="time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="event-location">Location in Sri Lanka *</Label>
        <Input
          id="event-location"
          placeholder="Enter location"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="event-description">Description</Label>
        <Textarea
          id="event-description"
          placeholder="Describe your event..."
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleCreateEvent}>
          Create Event
        </Button>
      </DialogFooter>
    </div>
  );
};

const Events = () => {
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const { toast } = useToast();
  
  const [events, setEvents] = useState<EventType[]>([
    {
      id: 1,
      title: "Kandy Cultural Festival",
      description: "Experience the rich cultural heritage of Kandy with traditional dancing and music.",
      date: "June 15, 2024",
      time: "4:00 PM",
      location: "Temple of the Sacred Tooth Relic, Kandy",
      coordinates: [7.2906, 80.6337],
      organizer: "Sarah Chen",
      attendees: 12,
      category: "cultural",
      imageUrl: "https://images.unsplash.com/photo-1546708770-599a3abdf230",
      attending: true
    },
    {
      id: 2,
      title: "Beach Cleanup Initiative",
      description: "Join us in cleaning up Mirissa Beach and preserving its natural beauty.",
      date: "July 3, 2024",
      time: "9:00 AM",
      location: "Mirissa Beach, Southern Province",
      coordinates: [5.9482, 80.4525],
      organizer: "Maya Patel",
      attendees: 8,
      category: "community",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      attending: false
    },
    {
      id: 3,
      title: "Ella Hiking Adventure",
      description: "Group hike to Little Adam's Peak followed by a picnic with stunning views.",
      date: "August 10, 2024",
      time: "7:30 AM",
      location: "Little Adam's Peak, Ella",
      coordinates: [6.8667, 81.0466],
      organizer: "Leah Johnson",
      attendees: 15,
      category: "outdoor",
      imageUrl: "https://images.unsplash.com/photo-1580674684029-9947ef442203",
      attending: false
    },
    {
      id: 4,
      title: "Colombo Food Tour",
      description: "Sample the best street food Colombo has to offer with local guides.",
      date: "September 5, 2024",
      time: "6:00 PM",
      location: "Galle Face Green, Colombo",
      coordinates: [6.9271, 79.8612],
      organizer: "David Lee",
      attendees: 10,
      category: "food",
      imageUrl: "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b",
      attending: true
    },
    {
      id: 5,
      title: "Yoga Retreat in Sigiriya",
      description: "Two-day yoga and meditation retreat near the ancient rock fortress.",
      date: "October 15, 2024",
      time: "10:00 AM",
      location: "Sigiriya, Central Province",
      coordinates: [7.9570, 80.7603],
      organizer: "Emma Wilson",
      attendees: 6,
      category: "wellness",
      imageUrl: "https://images.unsplash.com/photo-1545389336-cf090694435e",
      attending: false
    }
  ]);
  
  const toggleAttendance = (eventId: number) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, attending: !event.attending, attendees: event.attending ? event.attendees - 1 : event.attendees + 1 } 
        : event
    ));
    
    const event = events.find(e => e.id === eventId);
    if (event) {
      toast({
        title: event.attending ? "Removed from Calendar" : "Added to Calendar",
        description: event.attending 
          ? `You are no longer attending ${event.title}` 
          : `You are now attending ${event.title}`,
      });
    }
  };
  
  const filteredEvents = events.filter(event => {
    // Filter by category
    const categoryMatch = filter === "all" || event.category === filter;
    
    // Filter by search query
    const searchMatch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  const categories = [
    { value: "all", label: "All Events" },
    { value: "cultural", label: "Cultural" },
    { value: "food", label: "Food & Drink" },
    { value: "outdoor", label: "Outdoor" },
    { value: "wellness", label: "Wellness" },
    { value: "community", label: "Community" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-7xl mx-auto pt-24 px-4 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Events in Sri Lanka</h1>
            <p className="text-muted-foreground">
              Discover and join events across Sri Lanka
            </p>
          </div>
          <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a New Event</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create your event
                </DialogDescription>
              </DialogHeader>
              <EventCreationForm onClose={() => setIsCreateEventOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search events..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <Label className="mb-2 block">Filter by Category</Label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.value}
                      variant={filter === category.value ? "default" : "outline"}
                      size="sm"
                      className="justify-start"
                      onClick={() => setFilter(category.value)}
                    >
                      {category.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold mb-3 flex items-center">
                <Info className="w-4 h-4 mr-2" />
                Your Events
              </h3>
              {events.filter(event => event.attending).length > 0 ? (
                <div className="space-y-3">
                  {events.filter(event => event.attending).map(event => (
                    <div key={event.id} className="flex items-center gap-3 p-2 rounded-md bg-primary/5">
                      <Calendar className="w-4 h-4 text-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{event.title}</p>
                        <p className="text-xs text-muted-foreground">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">You haven't joined any events yet.</p>
              )}
            </div>

            {/* Map of Sri Lanka with event locations */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold mb-3">Event Locations</h3>
              <div className="relative h-[400px] rounded-md overflow-hidden">
                <img 
                  src="https://maps.googleapis.com/maps/api/staticmap?center=Sri+Lanka&zoom=7&size=400x400&maptype=roadmap&key=YOUR_API_KEY" 
                  alt="Map of Sri Lanka"
                  className="w-full h-full object-cover"
                />
                
                {/* Event markers */}
                {events.map(event => (
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
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-48">
                      <img 
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge 
                        className="absolute top-2 right-2 capitalize"
                        variant={event.attending ? "default" : "secondary"}
                      >
                        {event.attending ? "Attending" : event.category}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{event.attendees} attending</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>{event.organizer[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{event.organizer}</span>
                        </div>
                        <Button
                          variant={event.attending ? "outline" : "default"}
                          size="sm"
                          onClick={() => toggleAttendance(event.id)}
                        >
                          {event.attending ? "Leave" : "Join"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-2 text-center py-12">
                  <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No events found</h3>
                  <p className="text-muted-foreground mb-4">
                    No events match your current filters or search criteria.
                  </p>
                  <Button onClick={() => { setFilter("all"); setSearchQuery(""); }}>
                    View All Events
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Event Details Dialog */}
      {selectedEvent && (
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedEvent.title}</DialogTitle>
              <DialogDescription>
                Event details and information
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="relative h-[200px] rounded-md overflow-hidden">
                <img 
                  src={selectedEvent.imageUrl}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Date</Label>
                  <p>{selectedEvent.date}</p>
                </div>
                
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Time</Label>
                  <p>{selectedEvent.time}</p>
                </div>
                
                <div className="space-y-1 col-span-2">
                  <Label className="text-xs text-muted-foreground">Location</Label>
                  <p>{selectedEvent.location}</p>
                </div>
                
                <div className="space-y-1 col-span-2">
                  <Label className="text-xs text-muted-foreground">Description</Label>
                  <p>{selectedEvent.description}</p>
                </div>
                
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Organizer</Label>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback>{selectedEvent.organizer[0]}</AvatarFallback>
                    </Avatar>
                    <span>{selectedEvent.organizer}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Attendees</Label>
                  <p>{selectedEvent.attendees} people</p>
                </div>
              </div>
              
              <DialogFooter>
                <Button
                  variant={selectedEvent.attending ? "outline" : "default"}
                  onClick={() => {
                    toggleAttendance(selectedEvent.id);
                    setSelectedEvent(null);
                  }}
                >
                  {selectedEvent.attending ? "Leave Event" : "Join Event"}
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Events;
