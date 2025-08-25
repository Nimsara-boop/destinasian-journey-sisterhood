import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, X, MapPin, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProfiles, Profile } from "@/hooks/useProfiles";

const PeopleTab = () => {
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProfiles, setLikedProfiles] = useState<Set<string>>(new Set());
  
  const { profiles: travelers, loading } = useProfiles();

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading profiles...</p>
      </div>
    );
  }

  if (travelers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No travelers found</p>
      </div>
    );
  }

  const currentTraveler = travelers[currentIndex];

  const handleLike = () => {
    setLikedProfiles(prev => new Set([...prev, currentTraveler.user_id]));
    toast({
      title: "Profile Liked! 💕",
      description: `You liked ${currentTraveler.display_name || currentTraveler.username}'s profile`,
    });
    
    // Move to next profile
    if (currentIndex < travelers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePass = () => {
    // Move to next profile without liking
    if (currentIndex < travelers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const resetToFirst = () => {
    setCurrentIndex(0);
  };

  if (!currentTraveler) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No more profiles to show</p>
        <Button onClick={resetToFirst} className="mt-4">
          Start Over
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto">
      <Card className="overflow-hidden relative bg-card">
        {/* Photo Section */}
        <div className="aspect-[3/4] relative overflow-hidden">
          <img
            src={currentTraveler.avatar_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330"}
            alt={currentTraveler.display_name || currentTraveler.username}
            className="w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Profile Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="text-2xl font-bold mb-1">
              {currentTraveler.display_name || currentTraveler.username}
            </h2>
            
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Sri Lanka</span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-none">
                <span className="mr-1">✓</span>
                Verified
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-none">
                <span className="mr-1">🌏</span>
                Explorer
              </Badge>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="p-4">
          <p className="text-sm text-muted-foreground mb-4">
            {currentTraveler.bio || "Travel enthusiast exploring the world."}
          </p>
          
          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 border-red-200 hover:bg-red-50 hover:border-red-300"
              onClick={handlePass}
            >
              <X className="w-5 h-5 text-red-500" />
            </Button>
            <Button
              size="lg"
              className="flex-1 bg-pink-500 hover:bg-pink-600"
              onClick={handleLike}
            >
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Profile Counter */}
      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground">
          {currentIndex + 1} of {travelers.length} profiles
        </p>
      </div>
    </div>
  );
};

export default PeopleTab;