
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Search, MessageSquare, Users, Send, Phone, Video, Check, Image as ImageIcon, X, Heart, User } from "lucide-react";
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
import { cn } from "@/lib/utils";

const Community = () => {
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState<'chat' | 'swipe'>('chat');
  const [activeChatRoom, setActiveChatRoom] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: "Sarah", text: "Hi everyone! I just arrived in Colombo. Anyone want to meet up?", time: "10:25 AM", isSelf: false },
    { id: 2, sender: "Maya", text: "I'll be there next week! Let's plan something", time: "10:28 AM", isSelf: false },
    { id: 3, sender: "You", text: "I know a great place in Colombo Fort we could try", time: "10:30 AM", isSelf: true },
    { id: 4, sender: "Sarah", text: "That sounds perfect! I'm staying near Galle Face Green", time: "10:32 AM", isSelf: false },
    { id: 5, sender: "Maya", text: "Could you share the location?", time: "10:35 AM", isSelf: false },
  ]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [showLocationShare, setShowLocationShare] = useState(false);
  const [locationShared, setLocationShared] = useState(false);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  // Current location of the user (normally would come from geolocation)
  const [userLocation, setUserLocation] = useState("Sri Lanka");

  // Chat rooms organized by country and city/region
  const chatRoomsByLocation = {
    "Sri Lanka": [
      {
        id: 1,
        name: "Colombo Chats",
        location: "Colombo, Sri Lanka",
        members: 156,
        lastActive: "2 mins ago",
        image: "https://images.unsplash.com/photo-1589308155743-4ad772863eae",
      },
      {
        id: 2,
        name: "Galle Group",
        location: "Galle, Sri Lanka",
        members: 89,
        lastActive: "5 mins ago",
        image: "https://images.unsplash.com/photo-1580394693539-2111f706eaad",
      },
      {
        id: 3,
        name: "Trincomalee Talks",
        location: "Trincomalee, Sri Lanka",
        members: 64,
        lastActive: "15 mins ago",
        image: "https://images.unsplash.com/photo-1546556874-8964792e36fa",
      },
      {
        id: 4,
        name: "Jaffna Jabber",
        location: "Jaffna, Sri Lanka",
        members: 42,
        lastActive: "1 hour ago",
        image: "https://images.unsplash.com/photo-1627894006066-b45bd95ef5a5",
      },
      {
        id: 5,
        name: "Anuradhapura Assembly",
        location: "Anuradhapura, Sri Lanka",
        members: 57,
        lastActive: "30 mins ago",
        image: "https://images.unsplash.com/photo-1507904304964-4f19273e80d1",
      },
      {
        id: 6,
        name: "Batticaloa Banter",
        location: "Batticaloa, Sri Lanka",
        members: 37,
        lastActive: "2 hours ago",
        image: "https://images.unsplash.com/photo-1584552539816-caf637eff5a3",
      },
      {
        id: 7,
        name: "Matara Meetups",
        location: "Matara, Sri Lanka",
        members: 48,
        lastActive: "45 mins ago",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a",
      },
    ],
    "Thailand": [
      {
        id: 8,
        name: "Bangkok Food Lovers",
        location: "Bangkok, Thailand",
        members: 203,
        lastActive: "5 mins ago",
        image: "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b",
      },
      {
        id: 9,
        name: "Chiang Mai Collective",
        location: "Chiang Mai, Thailand",
        members: 118,
        lastActive: "10 mins ago",
        image: "https://images.unsplash.com/photo-1599880659893-628cd44f40db",
      },
    ],
    "Japan": [
      {
        id: 10,
        name: "Tokyo Explorers",
        location: "Tokyo, Japan",
        members: 178,
        lastActive: "2 mins ago",
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
      }
    ]
  };

  // Get chat rooms for the current user location
  const chatRooms = chatRoomsByLocation[userLocation as keyof typeof chatRoomsByLocation] || [];

  const travelers = [
    {
      id: 1,
      name: "Sarah Chen",
      age: 28,
      job: "Photographer",
      location: "Colombo, Sri Lanka",
      interests: ["Photography", "Street Food", "Architecture"],
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      bio: "Adventurous soul exploring Sri Lanka one city at a time. Photographer and food enthusiast.",
      verified: false,
      photos: [
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
        "https://images.unsplash.com/photo-1589308155743-4ad772863eae",
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
      age: 32,
      job: "Yoga Instructor",
      location: "Galle, Sri Lanka",
      interests: ["Surfing", "Yoga", "Local Markets"],
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      bio: "Yoga instructor and digital nomad. Currently based in Galle but always on the move.",
      verified: true,
      photos: [
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        "https://images.unsplash.com/photo-1580394693539-2111f706eaad",
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963"
      ],
      badges: [
        { name: "Verified Female", icon: "✓" },
        { name: "Yoga Master", icon: "🧘‍♀️" },
        { name: "Beach Lover", icon: "🏖️" }
      ]
    },
    {
      id: 3,
      name: "Alex Johnson",
      age: 30,
      job: "Travel Writer",
      location: "Trincomalee, Sri Lanka",
      interests: ["Writing", "Hiking", "Cultural Experiences"],
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      bio: "Travel writer seeking authentic experiences and unique stories across Sri Lanka.",
      verified: true,
      photos: [
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8",
        "https://images.unsplash.com/photo-1546556874-8964792e36fa",
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4"
      ],
      badges: [
        { name: "Storyteller", icon: "📝" },
        { name: "Adventure Seeker", icon: "🧗‍♂️" }
      ]
    },
    {
      id: 4,
      name: "Emma Wilson",
      age: 26,
      job: "Marine Biologist",
      location: "Batticaloa, Sri Lanka",
      interests: ["Diving", "Marine Conservation", "Beach Cleanup"],
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      bio: "Marine biologist studying coral reefs in Sri Lanka. Looking for fellow ocean lovers!",
      verified: false,
      photos: [
        "https://images.unsplash.com/photo-1414609245224-afa02bfb3fda",
        "https://images.unsplash.com/photo-1584552539816-caf637eff5a3",
        "https://images.unsplash.com/photo-1582979512210-99b6a53386f9"
      ],
      badges: [
        { name: "Ocean Lover", icon: "🌊" },
        { name: "Environmentalist", icon: "♻️" }
      ]
    },
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeChatRoom]);

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

  const joinChatRoom = (roomId: number) => {
    setActiveChatRoom(roomId);
    
    toast({
      title: "Joined Chat Room",
      description: `You've joined ${chatRooms.find(room => room.id === roomId)?.name}`,
    });
  };

  const exitChatRoom = () => {
    setActiveChatRoom(null);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
    setSwipeDirection(null);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setStartX(e.clientX);
    setSwipeDirection(null);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (startX === 0) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setOffsetX(diff);
    
    if (diff > 50) {
      setSwipeDirection('right');
    } else if (diff < -50) {
      setSwipeDirection('left');
    } else {
      setSwipeDirection(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (startX === 0) return;
    const currentX = e.clientX;
    const diff = currentX - startX;
    setOffsetX(diff);
    
    if (diff > 50) {
      setSwipeDirection('right');
    } else if (diff < -50) {
      setSwipeDirection('left');
    } else {
      setSwipeDirection(null);
    }
  };

  const handleTouchEnd = () => {
    if (swipeDirection === 'right') {
      handleLike();
    } else if (swipeDirection === 'left') {
      handleDislike();
    }
    
    setStartX(0);
    setOffsetX(0);
  };

  const handleMouseUp = () => {
    if (swipeDirection === 'right') {
      handleLike();
    } else if (swipeDirection === 'left') {
      handleDislike();
    }
    
    setStartX(0);
    setOffsetX(0);
  };

  const handleLike = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSwipeDirection('right');
    
    setTimeout(() => {
      if (currentProfileIndex < travelers.length - 1) {
        setCurrentProfileIndex(currentProfileIndex + 1);
      } else {
        setCurrentProfileIndex(0); // Loop back to the first profile
      }
      setSwipeDirection(null);
      setIsAnimating(false);
      
      toast({
        title: "Liked Profile",
        description: `You liked ${travelers[currentProfileIndex].name}'s profile`,
      });
    }, 300);
  };

  const handleDislike = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSwipeDirection('left');
    
    setTimeout(() => {
      if (currentProfileIndex < travelers.length - 1) {
        setCurrentProfileIndex(currentProfileIndex + 1);
      } else {
        setCurrentProfileIndex(0); // Loop back to the first profile
      }
      setSwipeDirection(null);
      setIsAnimating(false);
    }, 300);
  };

  const currentTraveler = travelers[currentProfileIndex];
  
  // Function to change user's current location (demo)
  const changeLocation = (location: string) => {
    setUserLocation(location);
    toast({
      title: "Location Changed",
      description: `Showing chat rooms in ${location}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto pt-24 px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          {activeChatRoom ? (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
                      src="https://maps.googleapis.com/maps/api/staticmap?center=Colombo,Sri Lanka&zoom=14&size=600x300&maptype=roadmap&markers=color:red%7CColombo,Sri Lanka&key=YOUR_API_KEY" 
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
            <>
              <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search chat rooms or travelers..."
                    className="pl-9"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant={activeTab === 'chat' ? 'default' : 'outline'} 
                    onClick={() => setActiveTab('chat')}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chat Rooms
                  </Button>
                  <Button 
                    variant={activeTab === 'swipe' ? 'default' : 'outline'} 
                    onClick={() => setActiveTab('swipe')}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Meet Travelers
                  </Button>
                </div>
              </div>

              {/* Location Selector */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Your Location</h3>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={userLocation === "Sri Lanka" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => changeLocation("Sri Lanka")}
                  >
                    <MapPin className="w-3 h-3 mr-1" /> Sri Lanka
                  </Button>
                  <Button 
                    variant={userLocation === "Thailand" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => changeLocation("Thailand")}
                  >
                    <MapPin className="w-3 h-3 mr-1" /> Thailand
                  </Button>
                  <Button 
                    variant={userLocation === "Japan" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => changeLocation("Japan")}
                  >
                    <MapPin className="w-3 h-3 mr-1" /> Japan
                  </Button>
                </div>
              </div>

              {activeTab === 'chat' ? (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Chat Rooms in {userLocation}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
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
                      Travelers in {userLocation}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {travelers.slice(0, 4).map((traveler) => (
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
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Meet Fellow Travelers in {userLocation}
                  </h2>
                  
                  <div className="w-full max-w-md mb-8">
                    <div 
                      className="relative h-[500px] mx-auto"
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                    >
                      <Card 
                        className={cn(
                          "absolute top-0 left-0 right-0 overflow-hidden h-full transition-all duration-300",
                          swipeDirection === 'left' && "transform -rotate-6 translate-x-[-150%] opacity-0",
                          swipeDirection === 'right' && "transform rotate-6 translate-x-[150%] opacity-0"
                        )}
                        style={{ 
                          transform: offsetX ? `translateX(${offsetX}px) rotate(${offsetX * 0.05}deg)` : 'none',
                        }}
                      >
                        <div 
                          className="w-full h-[70%] bg-cover bg-center"
                          style={{ 
                            backgroundImage: `url(${currentTraveler.avatar})`,
                            backgroundSize: 'cover'
                          }}
                        />
                        <div className="p-4">
                          <div className="flex items-baseline gap-2 mb-1">
                            <h3 className="text-xl font-semibold">{currentTraveler.name}</h3>
                            <span className="text-lg">{currentTraveler.age}</span>
                            {currentTraveler.verified && (
                              <Check className="w-4 h-4 text-primary" />
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground mb-1">{currentTraveler.job}</div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                            <MapPin className="w-3 h-3" />
                            <span>{currentTraveler.location}</span>
                          </div>
                          <p className="text-sm line-clamp-2">{currentTraveler.bio}</p>
                        </div>
                        
                        {swipeDirection === 'left' && (
                          <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full transform rotate-12 border-2 border-white">
                            NOPE
                          </div>
                        )}
                        
                        {swipeDirection === 'right' && (
                          <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full transform -rotate-12 border-2 border-white">
                            LIKE
                          </div>
                        )}
                      </Card>
                    </div>
                    
                    <div className="flex justify-center gap-4">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-full h-12 w-12 shadow-md" 
                        onClick={handleDislike}
                      >
                        <X className="w-6 h-6 text-red-500" />
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-full h-12 w-12 shadow-md" 
                        onClick={handleLike}
                      >
                        <Heart className="w-6 h-6 text-green-500" />
                      </Button>
                    </div>
                    
                    <div className="text-center mt-4 text-sm text-muted-foreground">
                      Swipe right to connect, or left to pass
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
