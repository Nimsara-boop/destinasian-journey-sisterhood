
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Send, Phone, Video, MoreVertical, Check } from "lucide-react";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [isFemaleExperience, setIsFemaleExperience] = useState(false);
  
  // Sample data
  const [contacts] = useState([
    { 
      id: 1, 
      name: "Sophie Chen", 
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330", 
      lastMessage: "Are you coming to the beach event tomorrow?", 
      time: "12:45 PM",
      unread: 2,
      isOnline: true,
      isFemale: true,
      isVerified: true
    },
    { 
      id: 2, 
      name: "Alex Johnson", 
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e", 
      lastMessage: "I found a great restaurant near our hotel", 
      time: "Yesterday",
      unread: 0,
      isOnline: false,
      isFemale: false,
      isVerified: false
    },
    { 
      id: 3, 
      name: "Mei Lin", 
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80", 
      lastMessage: "Thanks for the travel tips!", 
      time: "Monday",
      unread: 0,
      isOnline: true,
      isFemale: true,
      isVerified: true
    },
    { 
      id: 4, 
      name: "Travel Group: Sri Lanka Explorers", 
      avatar: "", 
      lastMessage: "Samantha: Is anyone visiting Sigiriya?", 
      time: "Tuesday",
      unread: 5,
      isOnline: true,
      isFemale: false,
      isVerified: false,
      isGroup: true
    },
  ]);

  const [chats] = useState({
    1: [
      { id: 1, sender: 1, text: "Hey! How's your trip going?", time: "12:30 PM" },
      { id: 2, sender: "me", text: "It's amazing! The beaches are beautiful", time: "12:35 PM" },
      { id: 3, sender: 1, text: "Are you coming to the beach event tomorrow?", time: "12:45 PM" },
    ],
    2: [
      { id: 1, sender: 2, text: "Have you tried any local restaurants yet?", time: "Yesterday" },
      { id: 2, sender: "me", text: "Yes, I tried some amazing curry last night", time: "Yesterday" },
      { id: 3, sender: 2, text: "I found a great restaurant near our hotel", time: "Yesterday" },
    ],
    3: [
      { id: 1, sender: "me", text: "Hi Mei, do you have any tips for visiting Kandy?", time: "Monday" },
      { id: 2, sender: 3, text: "Yes! Make sure to visit the Temple of the Tooth", time: "Monday" },
      { id: 3, sender: 3, text: "And the botanical gardens are beautiful", time: "Monday" },
      { id: 4, sender: "me", text: "Thank you so much!", time: "Monday" },
      { id: 5, sender: 3, text: "Thanks for the travel tips!", time: "Monday" },
    ],
    4: [
      { id: 1, sender: "Raj", text: "Hello everyone! I'm planning to visit Sigiriya next week", time: "Tuesday" },
      { id: 2, sender: "Samantha", text: "Is anyone visiting Sigiriya?", time: "Tuesday" },
      { id: 3, sender: "me", text: "I'm going on Thursday!", time: "Tuesday" },
      { id: 4, sender: "Tasha", text: "I've been there, it's amazing!", time: "Tuesday" },
      { id: 5, sender: "Samantha", text: "Should we coordinate and go together?", time: "Tuesday" },
    ]
  });
  
  useEffect(() => {
    // Check if female experience is enabled
    const femaleExp = localStorage.getItem("femaleExperience") === "true";
    setIsFemaleExperience(femaleExp);
    
    // Set first chat as selected by default
    if (contacts.length > 0 && !selectedChat) {
      setSelectedChat(contacts[0].id);
    }
  }, [contacts, selectedChat]);
  
  const handleSendMessage = () => {
    if (!message.trim() || !selectedChat) return;
    
    // In a real app, this would send the message to the backend
    // For demo purposes, we're just clearing the input
    setMessage("");
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto pt-24 px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-200px)]">
          {/* Contacts List */}
          <div className="md:col-span-1 border rounded-lg bg-white shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search conversations..." 
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {contacts.map((contact) => (
                <div 
                  key={contact.id}
                  onClick={() => setSelectedChat(contact.id)}
                  className={`flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b relative ${selectedChat === contact.id ? 'bg-gray-50' : ''}`}
                >
                  <div className="relative">
                    {contact.isGroup ? (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                        GR
                      </div>
                    ) : (
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={contact.avatar} />
                        <AvatarFallback>{contact.name.substr(0, 2)}</AvatarFallback>
                      </Avatar>
                    )}
                    
                    {contact.isOnline && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-1">
                        <h3 className="font-medium text-sm truncate">{contact.name}</h3>
                        {isFemaleExperience && contact.isFemale && contact.isVerified && (
                          <Badge className="ml-1 h-4 px-1 bg-pink-500 text-white text-[10px]">
                            <Check className="w-2 h-2 mr-0.5" />
                            <span>Verified</span>
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{contact.time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500 truncate">{contact.lastMessage}</p>
                      {contact.unread > 0 && (
                        <Badge className="bg-primary rounded-full h-5 w-5 flex items-center justify-center p-0 text-[10px]">
                          {contact.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat Window */}
          <div className="md:col-span-2 border rounded-lg bg-white shadow-sm overflow-hidden flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    {contacts.find(c => c.id === selectedChat)?.isGroup ? (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                        GR
                      </div>
                    ) : (
                      <Avatar>
                        <AvatarImage src={contacts.find(c => c.id === selectedChat)?.avatar} />
                        <AvatarFallback>
                          {contacts.find(c => c.id === selectedChat)?.name.substr(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div>
                      <div className="flex items-center gap-1">
                        <h2 className="font-semibold">{contacts.find(c => c.id === selectedChat)?.name}</h2>
                        {isFemaleExperience && contacts.find(c => c.id === selectedChat)?.isFemale && contacts.find(c => c.id === selectedChat)?.isVerified && (
                          <Badge className="ml-1 h-5 px-1 bg-pink-500 text-white text-[10px]">
                            <Check className="w-2 h-2 mr-0.5" />
                            <span>Verified</span>
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        {contacts.find(c => c.id === selectedChat)?.isOnline ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {selectedChat && chats[selectedChat as keyof typeof chats]?.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[70%] px-4 py-2 rounded-lg ${
                          msg.sender === 'me' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-white border'
                        }`}
                      >
                        {contacts.find(c => c.id === selectedChat)?.isGroup && msg.sender !== 'me' && (
                          <p className="text-xs font-semibold mb-1">
                            {typeof msg.sender === 'string' ? msg.sender : contacts.find(c => c.id === msg.sender)?.name}
                          </p>
                        )}
                        <p className="text-sm">{msg.text}</p>
                        <p className="text-xs mt-1 opacity-70 text-right">{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex items-center gap-2">
                    <Input 
                      placeholder="Type a message..." 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      size="icon"
                      className={isFemaleExperience ? 'bg-primary-feminine hover:bg-primary-feminine/90' : ''}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
