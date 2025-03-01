<lov-code>
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MapPin, Search, Calendar, Users, Plus, Filter, ChevronDown, 
  Calendar as CalendarIcon, Clock, Info, Star, Menu, ArrowRight,
  Utensils, Hotel, Coffee, Music, Book
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

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
  isPromotion?: boolean;
  promotionType?: 'restaurant' | 'hotel' | 'cafe';
  rating?: number;
  price?: string;
  distance?: string;
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
  const [activeTab, setActiveTab] = useState("events");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
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
    },
    {
      id: 6,
      title: "New Year's Eve Special Dinner",
      description: "5-course gourmet dinner with live music and champagne toast at midnight.",
      date: "December 31, 2024",
      time: "8:00 PM",
      location: "Kaema Sutra Restaurant, Colombo",
      coordinates: [6.9218, 79.8562],
      organizer: "Kaema Sutra",
      attendees: 45,
      category: "food",
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      attending: false,
      isPromotion: true,
      promotionType: "restaurant",
      rating: 4.8,
      price: "$$$",
      distance: "1.2 km"
    },
    {
      id: 7,
      title: "Weekend Poolside Brunch",
      description: "All-you-can-eat international brunch buffet with free-flowing cocktails by the infinity pool.",
      date: "Every Saturday & Sunday",
      time: "11:00 AM - 3:00 PM",
      location: "Shangri-La Hotel, Colombo",
      coordinates: [6.9277, 79.8475],
      organizer: "Shangri-La Hotel",
      attendees: 32,
      category: "food",
      imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      attending: false,
      isPromotion: true,
      promotionType: "hotel",
      rating: 4.7,
      price: "$$$$",
      distance: "2.5 km"
    },
    {
      id: 8,
      title: "Live Jazz Night",
      description: "Enjoy the smooth sounds of jazz with our resident trio while sipping on craft cocktails.",
      date: "Every Friday",
      time: "7:00 PM - 10:00 PM",
      location: "Cafe Kumbuk, Colombo",
      coordinates: [6.9013, 79.8587],
      organizer: "Cafe Kumbuk",
      attendees: 18,
      category: "entertainment",
      imageUrl: "https://images.unsplash.com/photo-1559336197-ded8aaa244bc",
      attending: false,
      isPromotion: true,
      promotionType: "cafe",
      rating: 4.5,
      price: "$$",
      distance: "3.1 km"
    },
    {
      id: 9,
      title: "Ayurvedic Spa Day",
      description: "Traditional Sri Lankan spa treatments including herbal baths, massages, and wellness consultations.",
      date: "Daily",
      time: "10:00 AM - 8:00 PM",
      location: "Jetwing Beach Hotel, Negombo",
      coordinates: [7.2183, 79.8358],
      organizer: "Jetwing Beach",
      attendees: 24,
      category: "wellness",
      imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef",
      attending: false,
      isPromotion: true,
      promotionType: "hotel",
      rating: 4.9,
      price: "$$$",
      distance: "35 km"
    },
    {
      id: 10,
      title: "Sunset Seafood Dinner",
      description: "Fresh seafood caught daily, served with ocean views on our beachfront restaurant.",
      date: "Daily",
      time: "6:00 PM - 10:00 PM",
      location: "The Tuna & The Crab, Galle",
      coordinates: [6.0328, 80.2178],
      organizer: "Ministry of Crab",
      attendees: 38,
      category: "food",
      imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      attending: false,
      isPromotion: true,
      promotionType: "restaurant",
      rating: 4.6,
      price: "$$$",
      distance: "126 km"
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
    
    // Filter by tab (events or promotions)
    const tabMatch = 
      (activeTab === "events" && !event.isPromotion) || 
      (activeTab === "promotions" && event.isPromotion) ||
      activeTab === "all";
    
    return categoryMatch && searchMatch && tabMatch;
  });

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "cultural", label: "Cultural" },
    { value: "food", label: "Food & Drink" },
    { value: "outdoor", label: "Outdoor" },
    { value: "wellness", label: "Wellness" },
    { value: "community", label: "Community" },
    { value: "entertainment", label: "Entertainment" }
  ];
  
  const promotionTypes = [
    { value: "all", label: "All Venues" },
    { value: "restaurant", label: "Restaurants", icon: Utensils },
    { value: "hotel", label: "Hotels", icon: Hotel },
    { value: "cafe", label: "Cafés", icon: Coffee }
  ];

  // Helper function to render rating stars
  const renderRating = (rating: number = 0) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
        <span className="text-sm font-medium ml-1">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const getPromotionIcon = (type?: string) => {
    switch (type) {
      case 'restaurant':
        return <Utensils className="w-4 h-4 text-orange-500" />;
      case 'hotel':
        return <Hotel className="w-4 h-4 text-blue-500" />;
      case 'cafe':
        return <Coffee className="w-4 h-4 text-brown-500" />;
      default:
        return <MapPin className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container max-w-7xl mx-auto pt-24 px-4 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Discover Sri Lanka</h1>
            <p className="text-muted-foreground">
              Find events, restaurants, hotels and more
            </p>
          </div>
          <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
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

        {/* Main Tabs for Events vs Promotions */}
        <Tabs 
          defaultValue="events" 
          value={activeTab} 
          onValueChange={setActiveTab}
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
                onClick={() => setViewMode("grid")}
              >
                <Menu className="w-4 h-4" />
              </Button>
              <Button 
                variant={viewMode === "map" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setViewMode("map")}
              >
                <MapPin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search events, restaurants, hotels..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                {activeTab === "events" || activeTab === "all" ? (
                  <div className="relative">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Categories
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                    <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-2 z-10 hidden group-focus:block hover:block">
                      <div className="grid grid-cols-2 gap-1">
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
                ) : null}
                
                {activeTab === "promotions" || activeTab === "all" ? (
                  <div className="relative">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Utensils className="w-4 h-4" />
                      Venue Type
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <TabsContent value="events" className="mt-0">
            {/* Events Grid View */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <div className="col-span-full text-center py-12">
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
            ) : (
              // Map View - same as before
              <div className="h-[600px] bg-white rounded-lg shadow-sm p-4">
                <div className="relative h-full rounded-md overflow-hidden">
                  <img 
                    src="https://maps.googleapis.com/maps/api/staticmap?center=Sri+Lanka&zoom=7&size=800x600&maptype=roadmap&key=YOUR_API_KEY" 
                    alt="Map of Sri Lanka"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Event markers */}
                  {filteredEvents.map(event => (
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
            )}
          </TabsContent>

          <TabsContent value="promotions" className="mt-0">
            {/* Promotions Grid View */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((promotion) => (
                    <Card key={promotion.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative h-48">
                        <img 
                          src={promotion.imageUrl}
                          alt={promotion.title}
                          className="w-full h-full object-cover"
                        />
                        <Badge 
                          className="absolute top-2 right-2 capitalize"
                          variant="secondary"
                        >
                          {promotion.promotionType}
                        </Badge>
                        
                        {promotion.price && (
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                            {promotion.price}
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{promotion.title}</h3>
                          {promotion.rating && renderRating(promotion.rating)}
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-start gap-2 text-sm">
                            <div className="mt-1">
                              {getPromotionIcon(promotion.promotionType)}
                            </div>
                            <div>
                              <span className="font-medium">{promotion.organizer}</span>
                              {promotion.distance && (
                                <span className="text-xs text-muted-foreground ml-2">
                                  {promotion.distance}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>{promotion.date}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span>{promotion.time}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span>{promotion.location}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {promotion.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                            {promotion.attendees} people interested
                          </div>
                          <Button
                            variant={promotion.attending ? "outline" : "default"}
                            size="sm"
                            onClick={() => toggleAttendance(promotion.id)}
                            className="gap-1"
                          >
                            {promotion.attending ? "Saved" : "I'm Interested"}
                            <ArrowRight className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Utensils className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No promotions found</h3>
                    <p className="text-muted-foreground mb-4">
                      No restaurant or hotel promotions match your current search criteria.
                    </p>
                    <Button onClick={() => { setFilter("all"); setSearchQuery(""); }}>
                      View All Promotions
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              // Map View for Promotions (similar to events map)
              <div className="h-[600px] bg-white rounded-lg shadow-sm p-4">
                <div className="relative h-full rounded-md overflow-hidden">
                  <img 
                    src="https://maps.googleapis.com/maps/api/staticmap?center=Sri+Lanka&zoom=7&size=800x600&maptype=roadmap&key=YOUR_API_KEY" 
                    alt="Map of Sri Lanka"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Promotion markers with custom icons */}
                  {filteredEvents.map(promotion => (
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
            )}
          </TabsContent>
          
          <TabsContent value="all" className="mt-0">
            {/* Combined View showing both */}
            {viewMode === "grid" ? (
              <div className="space-y-8">
                {/* Featured Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Featured Promotions</h2>
                    <Button variant="link" className="text-primary">
                      See all <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid
