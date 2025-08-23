import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Clock, MapPin, Crown } from "lucide-react";

interface Group {
  id: number;
  name: string;
  location: string;
  members: number;
  lastActive: string;
  image: string;
  isOwner?: boolean;
  unreadCount?: number;
}

interface Message {
  id: number;
  sender: {
    name: string;
    avatar: string;
  };
  preview: string;
  timestamp: string;
  unreadCount: number;
  online: boolean;
}

interface GroupsMessagesTabProps {
  onGroupClick?: (group: Group) => void;
  onMessageClick?: (message: Message) => void;
}

const GroupsMessagesTab = ({ onGroupClick, onMessageClick }: GroupsMessagesTabProps) => {
  const [activeSection, setActiveSection] = useState<'groups' | 'messages'>('groups');

  const groups: Group[] = [
    {
      id: 1,
      name: "Colombo Explorers",
      location: "Colombo, Sri Lanka",
      members: 156,
      lastActive: "2 mins ago",
      image: "https://images.unsplash.com/photo-1589308155743-4ad772863eae",
      isOwner: true,
      unreadCount: 3
    },
    {
      id: 2,
      name: "Galle Beach Lovers",
      location: "Galle, Sri Lanka",
      members: 89,
      lastActive: "5 mins ago",
      image: "https://images.unsplash.com/photo-1580394693539-2111f706eaad",
      unreadCount: 0
    },
    {
      id: 3,
      name: "Solo Female Travelers",
      location: "Worldwide",
      members: 324,
      lastActive: "15 mins ago",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
      unreadCount: 7
    }
  ];

  const messages: Message[] = [
    {
      id: 1,
      sender: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
      },
      preview: "Hey! Are you still in Colombo? Would love to meet up for coffee ☕",
      timestamp: "5 mins ago",
      unreadCount: 2,
      online: true
    },
    {
      id: 2,
      sender: {
        name: "Maya Patel",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
      },
      preview: "Thanks for the yoga session recommendation! It was amazing 🧘‍♀️",
      timestamp: "1 hour ago",
      unreadCount: 0,
      online: false
    },
    {
      id: 3,
      sender: {
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
      },
      preview: "I found the perfect diving spot! Check out these photos 📸",
      timestamp: "3 hours ago",
      unreadCount: 1,
      online: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Section Toggle */}
      <div className="flex gap-2">
        <Button
          variant={activeSection === 'groups' ? 'default' : 'outline'}
          onClick={() => setActiveSection('groups')}
          className="flex items-center gap-2"
        >
          <Users className="w-4 h-4" />
          My Groups ({groups.length})
        </Button>
        <Button
          variant={activeSection === 'messages' ? 'default' : 'outline'}
          onClick={() => setActiveSection('messages')}
          className="flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          Direct Messages ({messages.filter(m => m.unreadCount > 0).length})
        </Button>
      </div>

      {/* Groups Section */}
      {activeSection === 'groups' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">My Groups</h3>
          <div className="grid gap-3">
            {groups.map((group) => (
              <Card 
                key={group.id} 
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onGroupClick?.(group)}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={group.image}
                      alt={group.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    {group.isOwner && (
                      <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
                        <Crown className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold truncate">{group.name}</h4>
                      {group.unreadCount > 0 && (
                        <Badge variant="destructive" className="text-xs px-2 py-0">
                          {group.unreadCount}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{group.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{group.members}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {group.lastActive}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Messages Section */}
      {activeSection === 'messages' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Direct Messages</h3>
          <div className="grid gap-3">
            {messages.map((message) => (
              <Card 
                key={message.id} 
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onMessageClick?.(message)}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={message.sender.avatar} />
                      <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                    </Avatar>
                    {message.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{message.sender.name}</h4>
                      {message.unreadCount > 0 && (
                        <Badge variant="destructive" className="text-xs px-2 py-0">
                          {message.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {message.preview}
                    </p>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    {message.timestamp}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupsMessagesTab;