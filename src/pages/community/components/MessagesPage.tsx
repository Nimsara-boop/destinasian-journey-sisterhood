import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PeopleTab from "./PeopleTab";
import GroupsMessagesTab from "./GroupsMessagesTab";
import ChatInterface from "./ChatInterface";
import { Group, Message } from "@/hooks/useGroups";

interface MessagesPageProps {
  onBack: () => void;
}

const MessagesPage = ({ onBack }: MessagesPageProps) => {
  const [activeTab, setActiveTab] = useState<'people' | 'groups'>('people');
  const [currentView, setCurrentView] = useState<'tabs' | 'chat'>('tabs');
  const [selectedChat, setSelectedChat] = useState<{
    type: 'group' | 'dm';
    data: any;
  } | null>(null);

  const handleGroupClick = (group: Group) => {
    setSelectedChat({ 
      type: 'group', 
      data: {
        id: parseInt(group.id) || 1,
        name: group.name,
        image: group.image,
        members: group.members,
        online: true
      }
    });
    setCurrentView('chat');
  };

  const handleMessageClick = (message: Message) => {
    setSelectedChat({ 
      type: 'dm', 
      data: {
        id: parseInt(message.id) || 1,
        name: message.sender.name,
        avatar: message.sender.avatar,
        online: message.online
      }
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
        chatData={selectedChat.data}
      />
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Back Button */}
      <div className="flex items-center gap-4 p-4 border-b">
        <Button variant="ghost" onClick={onBack}>
          ← Back
        </Button>
        <h2 className="text-xl font-semibold">Messages</h2>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'people' | 'groups')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="people">People</TabsTrigger>
            <TabsTrigger value="groups">Groups & Messages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="people" className="mt-6">
            <PeopleTab />
          </TabsContent>
          
          <TabsContent value="groups" className="mt-6">
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