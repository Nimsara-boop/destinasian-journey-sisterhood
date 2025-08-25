import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Clock, MapPin, Crown } from "lucide-react";
import { useGroups, useDirectMessages, Group, Message } from "@/hooks/useGroups";

interface GroupsMessagesTabProps {
  onGroupClick?: (group: Group) => void;
  onMessageClick?: (message: Message) => void;
}

const GroupsMessagesTab = ({ onGroupClick, onMessageClick }: GroupsMessagesTabProps) => {
  const [activeSection, setActiveSection] = useState<'groups' | 'messages'>('groups');
  
  const { groups, loading: groupsLoading } = useGroups();
  const { messages, loading: messagesLoading } = useDirectMessages();

  if (groupsLoading || messagesLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

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
          {groups.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No groups found. Join some groups to get started!</p>
            </div>
          ) : (
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
                        {group.unreadCount && group.unreadCount > 0 && (
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
          )}
        </div>
      )}

      {/* Messages Section */}
      {activeSection === 'messages' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Direct Messages</h3>
          {messages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No messages yet. Start a conversation with someone!</p>
            </div>
          ) : (
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
          )}
        </div>
      )}
    </div>
  );
};

export default GroupsMessagesTab;