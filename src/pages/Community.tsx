
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Search, MessageSquare, Users } from "lucide-react";

const Community = () => {
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

  const travelers = [
    {
      id: 1,
      name: "Sarah Chen",
      location: "Seoul, South Korea",
      interests: ["Photography", "Street Food", "Architecture"],
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
    {
      id: 2,
      name: "Maya Patel",
      location: "Bali, Indonesia",
      interests: ["Surfing", "Yoga", "Local Markets"],
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto pt-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search chat rooms or travelers..."
                className="pl-9"
              />
            </div>
            <Button>
              <MessageSquare className="w-4 h-4 mr-2" />
              Create Chat Room
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
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
                      <Button variant="outline" size="sm">
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
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={traveler.avatar} />
                        <AvatarFallback>{traveler.name[0]}</AvatarFallback>
                      </Avatar>
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
        </div>
      </div>
    </div>
  );
};

export default Community;
