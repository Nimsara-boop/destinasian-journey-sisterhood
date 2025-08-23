import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageSquare, MapPin, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Traveler {
  id: number;
  name: string;
  age: number;
  job: string;
  location: string;
  interests: string[];
  avatar: string;
  bio: string;
  verified: boolean;
  badges: { name: string; icon: string }[];
}

interface ProfileCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: { name: string } | null;
}

// Mock data for profiles based on names
const getProfileByName = (name: string): Traveler => {
  const profiles: Record<string, Traveler> = {
    "Sarah Chen": {
      id: 1,
      name: "Sarah Chen",
      age: 28,
      job: "Photographer",
      location: "Colombo, Sri Lanka",
      interests: ["Photography", "Street Food", "Architecture"],
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      bio: "Adventurous soul exploring Sri Lanka one city at a time. Photographer and food enthusiast looking to connect with fellow travelers.",
      verified: true,
      badges: [
        { name: "Explorer", icon: "🌏" },
        { name: "Foodie", icon: "🍜" }
      ]
    },
    "Maya Patel": {
      id: 2,
      name: "Maya Patel",
      age: 32,
      job: "Yoga Instructor",
      location: "Galle, Sri Lanka",
      interests: ["Surfing", "Yoga", "Local Markets"],
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      bio: "Yoga instructor and digital nomad. Currently based in Galle but always on the move. Love connecting with mindful travelers.",
      verified: true,
      badges: [
        { name: "Verified", icon: "✓" },
        { name: "Yoga Master", icon: "🧘‍♀️" },
        { name: "Beach Lover", icon: "🏖️" }
      ]
    },
    "Emma Wilson": {
      id: 3,
      name: "Emma Wilson",
      age: 26,
      job: "Marine Biologist",
      location: "Batticaloa, Sri Lanka",
      interests: ["Diving", "Marine Conservation", "Beach Cleanup"],
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      bio: "Marine biologist studying coral reefs in Sri Lanka. Looking for fellow ocean lovers and conservation enthusiasts!",
      verified: false,
      badges: [
        { name: "Ocean Lover", icon: "🌊" },
        { name: "Environmentalist", icon: "♻️" }
      ]
    }
  };

  return profiles[name] || {
    id: Math.random(),
    name,
    age: 25,
    job: "Traveler",
    location: "Unknown",
    interests: ["Travel", "Adventure"],
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    bio: "Fellow traveler exploring the world!",
    verified: false,
    badges: [{ name: "Traveler", icon: "✈️" }]
  };
};

const ProfileCardModal = ({ isOpen, onClose, profile }: ProfileCardModalProps) => {
  const { toast } = useToast();

  if (!profile) return null;

  const traveler = getProfileByName(profile.name);

  const handleLike = () => {
    toast({
      title: "Profile Liked! 💕",
      description: `You liked ${traveler.name}'s profile`,
    });
  };

  const handleMessage = () => {
    toast({
      title: "Message Sent!",
      description: `Starting conversation with ${traveler.name}`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-0 overflow-hidden">
        <div className="relative bg-card">
          {/* Photo */}
          <div className="aspect-[3/4] relative overflow-hidden">
            <img
              src={traveler.avatar}
              alt={traveler.name}
              className="w-full h-full object-cover"
            />
            
            {/* Verification Badge */}
            {traveler.verified && (
              <div className="absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                ✓ Verified
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Profile Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h2 className="text-2xl font-bold mb-1">
                {traveler.name}, {traveler.age}
              </h2>
              
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-4 h-4" />
                <span className="text-sm">{traveler.job}</span>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{traveler.location}</span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                {traveler.badges.map((badge, index) => (
                  <Badge key={index} variant="secondary" className="bg-white/20 text-white border-none">
                    <span className="mr-1">{badge.icon}</span>
                    {badge.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="p-4">
            <p className="text-sm text-muted-foreground mb-4">{traveler.bio}</p>
            
            {/* Interests */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {traveler.interests.map((interest, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 pt-0">
            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
                onClick={handleLike}
              >
                <Heart className="w-5 h-5 mr-2" />
                Like
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="flex-1"
                onClick={handleMessage}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Message
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileCardModal;