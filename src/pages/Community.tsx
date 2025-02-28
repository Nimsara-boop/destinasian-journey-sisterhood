
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Search, MessageSquare, Users, Calendar, Plus, Send, Phone, Video, Check, Image as ImageIcon, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Community = () => {
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState<'chat' | 'events'>('chat');
  const [activeChatRoom, setActiveChatRoom] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: "Sarah", text: "Hi everyone! I just arrived in Tokyo. Anyone want to meet up?", time: "10:25 AM", isSelf: false },
    { id: 2, sender: "Maya", text: "I'll be there next week! Let's plan something", time: "10:28 AM", isSelf: false },
    { id: 3, sender: "You", text: "I know a great sushi place in Shibuya we could try", time: "10:30 AM", isSelf: true },
    { id: 4, sender: "Sarah", text: "That sounds perfect! I'm staying near Shibuya station", time: "10:32 AM", isSelf: false },
    { id: 5, sender: "Maya", text: "Could you share the location?", time: "10:35 AM", isSelf: false },
  ]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [showLocationShare, setShowLocationShare] = useState(false);
  const [locationShared, setLocationShared] = useState(false);

  const chatRooms = [
    {
      id: 1,
      name: "Tokyo Explorers",
      location: "Tokyo, Japan",
      members: 156,
      lastActive: "2 mins ago",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
    },
    {
      id: 2,
      name: "Bangkok Food Lovers",
      location: "Bangkok, Thailand",
      members: 89,
      lastActive: "5 mins ago",
      image: "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b",
    },
  ];

  const events = [
    {
      id: 1,
      title: "Cherry Blossom Viewing",
      location: "Ueno Park, Tokyo",
      date: "April 1, 2024",
      attendees: 15,
      image: "https://images.unsplash.com/photo-1522383225653-ed111181a951",
    },
    {
      id: 2,
      title: "Street Food Tour",
      location: "Chinatown, Bangkok",
      date: "March 15, 2024",
      attendees: 8,
      image: "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b",
    },
  ];

  const travelers = [
    {
      id: 1,
      name: "Sarah Chen",
      location: "Seoul, South Korea",
      interests: ["Photography", "Street Food", "Architecture"],
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      bio: "Adventurous soul exploring Asia one city at a time. Photographer and food enthusiast.",
      verified: false,
      photos: [
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
        "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800"
      ],
      badges: [
        { name: "Explorer", icon: "🌏" },
        { name: "Foodie", icon: "🍜" }
      ]
    },
    {
      id: 2,
      name: "Maya Patel",
      location: "Bali, Indonesia",
      interests: ["Surfing", "Yoga", "Local Markets"],
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      bio: "Yoga instructor and digital nomad. Currently based in Bali but always on the move.",
      verified: true,
      photos: [
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        "https://images.unsplash.com/photo-1522383225653-ed111181a951",
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963"
      ],
      badges: [
        { name: "Verified Female", icon: "✓" },
        { name: "Yoga Master", icon: "🧘‍♀️" },
        { name: "Beach Lover", icon: "🏖️" }
      ]
    },
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeChatRoom]);

  const handleCreateEvent = () => {
    window.location.href = "/events";
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
    
    // Simulate response
    setTimeout(() => {
      const responseMessage = {
        id: messages.length + 2,
        sender: "Sarah",
        text: "That's great! Looking forward to meeting everyone.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: false,
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 2000);
  };

  const handleShareLocation = () => {
    setLocationShared(true);
    setShowLocationShare(false);
    
    // Simulate sending location
    setTimeout(() => {
      const locationMessage = {
        id: messages.length + 1,
        sender: "You",
        text: "📍 Location: Sushi Dai, 5-2-1 Tsukiji, Chuo City, Tokyo",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: true,
      };
      setMessages(prev => [...prev, locationMessage]);
      
      toast({
        title: "Location Shared",
        description: "Your location has been shared with the group",
      });
    }, 500);
  };

  const handleStartCall = (type: 'audio' | 'video') => {
    toast({
      title: `${type === 'audio' ? 'Audio' : 'Video'} Call`,
      description: `Starting a ${type} call with the group...`,
    });
  };

  // Join a specific chat room
  const joinChatRoom = (roomId: number) => {
    setActiveChatRoom(roomId);
    
    toast({
      title: "Joined Chat Room",
      description: `You've joined ${chatRooms.find(room => room.id === roomId)?.name}`,
    });
  };

  // Exit active chat room
  const exitChatRoom = () => {
    setActiveChatRoom(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto pt-24 px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          {activeChatRoom ? (
            // Active Chat Room View
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Chat Header */}
              <div className="border-b px-4 py-3 flex justify-between items-center bg-primary/5">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" onClick={exitChatRoom}>
                    <X className="w-4 h-4 mr-1" />
                    Back
                  </Button>
                  <div 
                    className="w-10 h-10 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${chatRooms.find(room => room.id === activeChatRoom)?.image})` }}
                  />
                  <div>
                    <h3 className="font-semibold">{chatRooms.find(room => room.id === activeChatRoom)?.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span>{chatRooms.find(room => room.id === activeChatRoom)?.members} members</span>
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
              
              {/* Messages */}
              <div className="p-4 h-[60vh] overflow-y-auto bg-gray-50">
                {messages.map((msg) => (
                  <div key={msg.id} className={`mb-4 ${msg.isSelf ? 'text-right' : 'text-left'}`}>
                    <div className="inline-block">
                      {!msg.isSelf && (
                        <span className="text-xs font-medium mb-1 block">{msg.sender}</span>
                      )}
                      <div className={`chat-bubble ${msg.isSelf ? 'sent' : 'received'}`}>
                        {msg.text}
                      </div>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Input Area */}
              <div className="px-4 py-3 border-t flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowLocationShare(!showLocationShare)}
                >
                  <MapPin className="w-4 h-4" />
                </Button>
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
              
              {/* Location Share Panel */}
              {showLocationShare && (
                <div className="p-4 border-t bg-white">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Share Location</h4>
                    <Button variant="ghost" size="sm" onClick={() => setShowLocationShare(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="aspect-video relative rounded-md overflow-hidden bg-gray-100 mb-3">
                    <img 
                      src="https://maps.googleapis.com/maps/api/staticmap?center=Shibuya,Tokyo,Japan&zoom=14&size=600x300&maptype=roadmap&markers=color:red%7CShibuya,Tokyo,Japan&key=YOUR_API_KEY" 
                      alt="Map" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleShareLocation}>
                      Share My Location
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Community Main View
            <>
              <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search chat rooms, events, or travelers..."
                    className="pl-9"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setActiveTab('chat')}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chat Rooms
                  </Button>
                  <Button 
                    variant={activeTab === 'events' ? 'default' : 'outline'} 
                    onClick={() => setActiveTab('events')}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Events
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {activeTab === 'chat' ? (
                  <>
                    <div>
                      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        Active Chat Rooms
                      </h2>
                      <div className="space-y-4">
                        {chatRooms.map((room) => (
                          <Card key={room.id} className="p-4 hover:shadow-lg transition-shadow">
                            <div className="flex gap-4">
                              <div
                                className="w-16 h-16 rounded-lg bg-cover bg-center"
                                style={{ backgroundImage: `url(${room.image})` }}
                              />
                              <div className="flex-1">
                                <h3 className="font-semibold">{room.name}</h3>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <MapPin className="w-3 h-3" />
                                  <span>{room.location}</span>
                                </div>
                                <div className="flex items-center gap-4 mt-2 text-sm">
                                  <span className="flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    {room.members} members
                                  </span>
                                  <span className="text-muted-foreground">
                                    Active {room.lastActive}
                                  </span>
                                </div>
                              </div>
                              <Button variant="outline" size="sm" onClick={() => joinChatRoom(room.id)}>
                                Join
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Travelers Nearby
                      </h2>
                      <div className="space-y-4">
                        {travelers.map((traveler) => (
                          <Card key={traveler.id} className="p-4 hover:shadow-lg transition-shadow">
                            <div className="flex gap-4">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Avatar className="w-16 h-16 cursor-pointer">
                                    <AvatarImage src={traveler.avatar} />
                                    <AvatarFallback>{traveler.name[0]}</AvatarFallback>
                                  </Avatar>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px] overflow-y-auto max-h-[90vh]">
                                  <DialogHeader>
                                    <DialogTitle>Traveler Profile</DialogTitle>
                                    <DialogDescription>Discover more about {traveler.name}</DialogDescription>
                                  </DialogHeader>
                                  
                                  <div className="py-4">
                                    <div className="flex flex-col items-center mb-6">
                                      <Avatar className="w-24 h-24 mb-4">
                                        <AvatarImage src={traveler.avatar} />
                                        <AvatarFallback>{traveler.name[0]}</AvatarFallback>
                                      </Avatar>
                                      <h2 className="text-xl font-semibold">{traveler.name}</h2>
                                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                                        <MapPin className="w-3 h-3" />
                                        <span>{traveler.location}</span>
                                      </div>
                                      
                                      <div className="flex flex-wrap gap-2 mb-4">
                                        {traveler.badges.map((badge, idx) => (
                                          <Badge key={idx} className={`${badge.name === "Verified Female" ? "bg-pink-500" : "bg-blue-500"} text-white`}>
                                            {badge.icon} {badge.name}
                                          </Badge>
                                        ))}
                                      </div>
                                      
                                      <p className="text-center text-gray-600">{traveler.bio}</p>
                                    </div>
                                    
                                    <Tabs defaultValue="photos">
                                      <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="photos">Photos</TabsTrigger>
                                        <TabsTrigger value="interests">Interests</TabsTrigger>
                                      </TabsList>
                                      
                                      <TabsContent value="photos" className="p-2">
                                        <div className="grid grid-cols-3 gap-2">
                                          {traveler.photos.map((photo, idx) => (
                                            <div key={idx} className="aspect-square rounded-md overflow-hidden">
                                              <img src={photo} alt={`${traveler.name}'s photo`} className="w-full h-full object-cover" />
                                            </div>
                                          ))}
                                        </div>
                                      </TabsContent>
                                      
                                      <TabsContent value="interests">
                                        <div className="flex flex-wrap gap-2 p-2">
                                          {traveler.interests.map((interest, idx) => (
                                            <Badge key={idx} variant="outline" className="px-3 py-1">
                                              {interest}
                                            </Badge>
                                          ))}
                                        </div>
                                      </TabsContent>
                                    </Tabs>
                                    
                                    <div className="mt-6 flex justify-end gap-3">
                                      <DialogClose asChild>
                                        <Button variant="outline">Close</Button>
                                      </DialogClose>
                                      <Button>Connect</Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <div className="flex-1">
                                <h3 className="font-semibold">{traveler.name}</h3>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <MapPin className="w-3 h-3" />
                                  <span>{traveler.location}</span>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {traveler.interests.map((interest) => (
                                    <span
                                      key={interest}
                                      className="text-xs bg-muted px-2 py-1 rounded-full"
                                    >
                                      {interest}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                Connect
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="md:col-span-2">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                          <Calendar className="w-5 h-5" />
                          Upcoming Events
                        </h2>
                        <Button onClick={handleCreateEvent}>
                          <Plus className="w-4 h-4 mr-2" />
                          Create Event
                        </Button>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        {events.map((event) => (
                          <Card key={event.id} className="p-4 hover:shadow-lg transition-shadow">
                            <div className="flex gap-4">
                              <div
                                className="w-24 h-24 rounded-lg bg-cover bg-center"
                                style={{ backgroundImage: `url(${event.image})` }}
                              />
                              <div className="flex-1">
                                <h3 className="font-semibold">{event.title}</h3>
                                <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    <span>{event.location}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>{event.date}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    <span>{event.attendees} attending</span>
                                  </div>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                Join Event
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
