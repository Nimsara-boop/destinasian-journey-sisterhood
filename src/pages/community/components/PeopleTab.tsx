import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, X, MapPin, Briefcase } from "lucide-react";
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
  photos: string[];
  badges: { name: string; icon: string }[];
}

const PeopleTab = () => {
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProfiles, setLikedProfiles] = useState<Set<number>>(new Set());

  const travelers: Traveler[] = [
    {
      id: 1,
      name: "Sarah Chen",
      age: 28,
      job: "Photographer",
      location: "Colombo, Sri Lanka",
      interests: ["Photography", "Street Food", "Architecture"],
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      bio: "Adventurous soul exploring Sri Lanka one city at a time. Photographer and food enthusiast looking to connect with fellow travelers.",
      verified: true,
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
      bio: "Yoga instructor and digital nomad. Currently based in Galle but always on the move. Love connecting with mindful travelers.",
      verified: true,
      photos: [
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        "https://images.unsplash.com/photo-1580394693539-2111f706eaad",
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963"
      ],
      badges: [
        { name: "Verified", icon: "✓" },
        { name: "Yoga Master", icon: "🧘‍♀️" },
        { name: "Beach Lover", icon: "🏖️" }
      ]
    },
    {
      id: 3,
      name: "Emma Wilson",
      age: 26,
      job: "Marine Biologist",
      location: "Batticaloa, Sri Lanka",
      interests: ["Diving", "Marine Conservation", "Beach Cleanup"],
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      bio: "Marine biologist studying coral reefs in Sri Lanka. Looking for fellow ocean lovers and conservation enthusiasts!",
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
    }
  ];

  const currentTraveler = travelers[currentIndex];

  const handleLike = () => {
    setLikedProfiles(prev => new Set([...prev, currentTraveler.id]));
    toast({
      title: "Profile Liked! 💕",
      description: `You liked ${currentTraveler.name}'s profile`,
    });
    nextProfile();
  };

  const handlePass = () => {
    toast({
      title: "Profile Passed",
      description: "Moving to the next profile",
    });
    nextProfile();
  };

  const nextProfile = () => {
    if (currentIndex < travelers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to start
    }
  };

  if (!currentTraveler) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No more profiles to show</p>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto">
      <Card className="overflow-hidden relative bg-card">
        {/* Photo Carousel */}
        <div className="aspect-[3/4] relative overflow-hidden">
          <img
            src={currentTraveler.avatar}
            alt={currentTraveler.name}
            className="w-full h-full object-cover"
          />
          
          {/* Verification Badge */}
          {currentTraveler.verified && (
            <div className="absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              ✓ Verified
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Profile Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="text-2xl font-bold mb-1">
              {currentTraveler.name}, {currentTraveler.age}
            </h2>
            
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm">{currentTraveler.job}</span>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{currentTraveler.location}</span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              {currentTraveler.badges.map((badge, index) => (
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
          <p className="text-sm text-muted-foreground mb-4">{currentTraveler.bio}</p>
          
          {/* Interests */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">Interests</h4>
            <div className="flex flex-wrap gap-2">
              {currentTraveler.interests.map((interest, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 pt-0">
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={handlePass}
            >
              <X className="w-5 h-5 mr-2" />
              Pass
            </Button>
            
            <Button
              size="lg"
              className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
              onClick={handleLike}
            >
              <Heart className="w-5 h-5 mr-2" />
              Like
            </Button>
          </div>
        </div>
      </Card>

      {/* Progress Indicator */}
      <div className="mt-4 text-center text-sm text-muted-foreground">
        {currentIndex + 1} of {travelers.length} profiles
      </div>
    </div>
  );
};

export default PeopleTab;