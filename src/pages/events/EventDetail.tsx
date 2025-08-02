
import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import InteractiveMap from "@/components/map/InteractiveMap";
import { Location } from "@/components/map/types";
import { EventType } from "./types";
import { useEvents } from "./hooks/useEvents";
import BudgetPlanner from "./components/BudgetPlanner";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  MessageSquare, 
  Send,
  ArrowLeft,
  Share2,
  Heart,
  ImageIcon,
  Phone,
  Video,
  X,
  Calculator
} from "lucide-react";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { events, toggleAttendance } = useEvents();
  const [activeTab, setActiveTab] = useState<"details" | "chat" | "budget">("details");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: "Sarah", text: "Is anyone else going to this event?", time: "10:25 AM", isSelf: false },
    { id: 2, sender: "Maya", text: "I'll be there! Looking forward to it.", time: "10:28 AM", isSelf: false },
    { id: 3, sender: "You", text: "Me too! Should we meet somewhere before?", time: "10:30 AM", isSelf: true }
  ]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  
  const event = events.find(e => e.id === parseInt(id || "0"));
  
  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeTab]);
  
  // Convert event location to map location format
  const mapLocations: Location[] = event ? [
    {
      id: event.id.toString(),
      name: event.title,
      coordinates: event.coordinates,
      lastSeen: "Event location",
      avatar: event.imageUrl
    }
  ] : [];
  
  const handleBack = () => {
    navigate("/events");
  };
  
  const handleToggleAttendance = () => {
    if (event) {
      toggleAttendance(event.id);
      
      toast({
        title: event.attending ? "Left event" : "Joined event",
        description: event.attending 
          ? "You are no longer attending this event" 
          : "You are now attending this event"
      });
    }
  };
  
  const handleShare = () => {
    // In a real app, use the Web Share API
    navigator.clipboard.writeText(window.location.href);
    
    toast({
      title: "Link copied",
      description: "Event link copied to clipboard"
    });
  };
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: "You",
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: true,
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
  };
  
  const handleStartCall = (type: 'audio' | 'video') => {
    toast({
      title: `${type === 'audio' ? 'Audio' : 'Video'} Call`,
      description: `Starting a ${type} call with the event group...`,
    });
  };
  
  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto pt-24 px-4 pb-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Event not found</h1>
            <Button onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto pt-24 px-4 pb-12">
        <Button 
          variant="ghost" 
          className="mb-4" 
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-6">
              <img 
                src={event.imageUrl} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <Badge 
                className="absolute top-4 right-4 capitalize"
                variant={event.attending ? "default" : "secondary"}
              >
                {event.attending ? "Attending" : event.category}
              </Badge>
            </div>
            
            <Tabs 
              defaultValue="details" 
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as "details" | "chat" | "budget")}
              className="mb-6"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details" className="flex gap-2">
                  <Calendar className="h-4 w-4" />
                  Event Details
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Event Chat
                </TabsTrigger>
                <TabsTrigger value="budget" className="flex gap-2">
                  <Calculator className="h-4 w-4" />
                  Budget Planner
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                    <p className="text-muted-foreground">{event.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="font-semibold text-lg mb-4">Event Details</h3>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-primary" />
                            <div>
                              <p className="font-medium">Date</p>
                              <p className="text-muted-foreground">{event.date}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-primary" />
                            <div>
                              <p className="font-medium">Time</p>
                              <p className="text-muted-foreground">{event.time}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-primary" />
                            <div>
                              <p className="font-medium">Location</p>
                              <p className="text-muted-foreground">{event.location}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-primary" />
                            <div>
                              <p className="font-medium">Attendees</p>
                              <p className="text-muted-foreground">{event.attendees} people attending</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="font-semibold text-lg mb-4">Organized by</h3>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>{event.organizer[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{event.organizer}</p>
                            <p className="text-sm text-muted-foreground">Event Host</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold text-lg mb-4">Event Location</h3>
                      <InteractiveMap locations={mapLocations} />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="chat" className="mt-6">
                <Card>
                  <CardContent className="p-0">
                    <div className="border-b px-4 py-3 flex justify-between items-center bg-primary/5">
                      <div className="flex items-center gap-3">
                        <div>
                          <h3 className="font-semibold">Event Chat</h3>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Users className="w-3 h-3" />
                            <span>{event.attendees} members</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleStartCall('audio')}>
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleStartCall('video')}>
                          <Video className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 h-[400px] overflow-y-auto bg-gray-50">
                      {messages.map((msg) => (
                        <div key={msg.id} className={`mb-4 ${msg.isSelf ? 'text-right' : 'text-left'}`}>
                          <div className="inline-block">
                            {!msg.isSelf && (
                              <span className="text-xs font-medium mb-1 block">{msg.sender}</span>
                            )}
                            <div className={`chat-bubble ${msg.isSelf ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg px-3 py-2 inline-block`}>
                              {msg.text}
                            </div>
                            <span className="text-xs text-gray-500 block mt-1">{msg.time}</span>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                    
                    <div className="px-4 py-3 border-t flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <ImageIcon className="w-4 h-4" />
                      </Button>
                      
                      <Input 
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button 
                        variant="default"
                        size="icon"
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="budget" className="mt-6">
                <BudgetPlanner event={event} />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div>
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Button 
                    className="w-full" 
                    size="lg"
                    variant={event.attending ? "outline" : "default"}
                    onClick={handleToggleAttendance}
                  >
                    {event.attending ? (
                      <>
                        <X className="mr-2 h-4 w-4" />
                        Cancel Attendance
                      </>
                    ) : (
                      <>
                        <Heart className="mr-2 h-4 w-4" />
                        Attend Event
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleShare}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Event
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-4">Who's Going</h3>
                <div className="flex flex-wrap mb-3">
                  {Array.from({ length: Math.min(8, event.attendees) }).map((_, i) => (
                    <Avatar key={i} className="h-8 w-8 border-2 border-background -ml-2 first:ml-0">
                      <AvatarFallback>{["S", "A", "M", "J", "L", "R", "P", "D"][i % 8]}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {event.attendees} people are attending this event
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
