import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import PeopleTab from "./PeopleTab";
import GroupsMessagesTab from "./GroupsMessagesTab";
import ChatInterface from "./ChatInterface";

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

interface MessagesPageProps {
  onBack: () => void;
}

const MessagesPage = ({ onBack }: MessagesPageProps) => {
  const [activeTab, setActiveTab] = useState("people");
  const [currentView, setCurrentView] = useState<'tabs' | 'chat'>('tabs');
  const [selectedChat, setSelectedChat] = useState<{
    type: 'group' | 'dm';
    data: Group | Message;
  } | null>(null);

  const handleGroupClick = (group: Group) => {
    setSelectedChat({
      type: 'group',
      data: group
    });
    setCurrentView('chat');
  };

  const handleMessageClick = (message: Message) => {
    setSelectedChat({
      type: 'dm',
      data: {
        ...message,
        name: message.sender.name,
        avatar: message.sender.avatar
      } as any
    });
    setCurrentView('chat');
  };

  const handleBackToTabs = () => {
    setCurrentView('tabs');
    setSelectedChat(null);
  };

  if (currentView === 'chat' && selectedChat) {
    return (
      <ChatInterface
        onBack={handleBackToTabs}
        chatType={selectedChat.type}
        chatData={selectedChat.data as any}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Community
            </Button>
            <h1 className="text-xl font-semibold">Messages</h1>
            <div></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="people" className="text-sm">
              People
            </TabsTrigger>
            <TabsTrigger value="groups" className="text-sm">
              Groups & Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="people" className="mt-0">
            <PeopleTab />
          </TabsContent>

          <TabsContent value="groups" className="mt-0">
            <GroupsMessagesTab 
              onGroupClick={handleGroupClick}
              onMessageClick={handleMessageClick}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MessagesPage;