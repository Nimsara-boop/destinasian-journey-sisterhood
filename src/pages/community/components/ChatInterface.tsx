import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Send, Phone, Video, MoreVertical } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ChatMessage {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  message: string;
  timestamp: string;
  isOwn: boolean;
}

interface ChatInterfaceProps {
  onBack: () => void;
  chatType: 'group' | 'dm';
  chatData: {
    id: number;
    name: string;
    avatar?: string;
    image?: string;
    members?: number;
    online?: boolean;
  };
}

const ChatInterface = ({ onBack, chatType, chatData }: ChatInterfaceProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: {
        id: "other",
        name: chatData.name,
        avatar: chatData.avatar || chatData.image || ""
      },
      message: chatType === 'group' ? "Welcome to the group!" : "Hey! How are you doing?",
      timestamp: "10:30 AM",
      isOwn: false
    },
    {
      id: "2",
      sender: {
        id: "me",
        name: "You",
        avatar: ""
      },
      message: chatType === 'group' ? "Thanks for having me!" : "I'm great! How about you?",
      timestamp: "10:32 AM",
      isOwn: true
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: {
        id: "me",
        name: "You",
        avatar: ""
      },
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={chatData.avatar || chatData.image} />
                    <AvatarFallback>{chatData.name[0]}</AvatarFallback>
                  </Avatar>
                  {chatType === 'dm' && chatData.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>
                
                <div>
                  <h3 className="font-semibold">{chatData.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {chatType === 'group' 
                      ? `${chatData.members} members`
                      : chatData.online ? 'Online' : 'Last seen recently'
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="max-w-4xl mx-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              {!msg.isOwn && (
                <Avatar className="w-8 h-8 mt-1">
                  <AvatarImage src={msg.sender.avatar} />
                  <AvatarFallback>{msg.sender.name[0]}</AvatarFallback>
                </Avatar>
              )}
              
              <div className={`max-w-xs lg:max-w-md ${msg.isOwn ? 'text-right' : 'text-left'}`}>
                {!msg.isOwn && chatType === 'group' && (
                  <p className="text-xs text-muted-foreground mb-1">{msg.sender.name}</p>
                )}
                
                <Card className={`p-3 ${
                  msg.isOwn 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}>
                  <p className="text-sm">{msg.message}</p>
                </Card>
                
                <p className="text-xs text-muted-foreground mt-1">{msg.timestamp}</p>
              </div>
              
              {msg.isOwn && (
                <Avatar className="w-8 h-8 mt-1">
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${chatData.name}...`}
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={!message.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;