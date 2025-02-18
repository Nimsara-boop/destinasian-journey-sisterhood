
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { MapPin, Globe, Camera, Award, Grid, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [isPublic, setIsPublic] = useState(true);
  const { toast } = useToast();
  
  // Mock data for photos and rewards
  const [photos] = useState([
    "https://images.unsplash.com/photo-1501555088652-021faa106b9b",
    "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
  ]);

  const [rewards] = useState([
    { id: 1, title: "Adventure Seeker", description: "Visited 5 different cities", icon: "🌟" },
    { id: 2, title: "Culture Explorer", description: "Attended 3 cultural events", icon: "🏛️" },
    { id: 3, title: "Social Butterfly", description: "Connected with 10 travelers", icon: "🦋" },
  ]);

  const handlePhotoUpload = () => {
    toast({
      title: "Photo Upload",
      description: "This feature will be implemented soon!",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-4xl mx-auto pt-24 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="flex flex-col items-center mb-8">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" className="mb-4" onClick={handlePhotoUpload}>
              <Camera className="w-4 h-4 mr-2" />
              Change Photo
            </Button>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Currently in Tokyo, Japan</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Profile Settings</h1>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <Label htmlFor="public-profile">Public Profile</Label>
                <Switch
                  id="public-profile"
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                />
              </div>
            </div>

            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Jane Doe" />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself and your travel experiences..."
                  className="h-32"
                />
              </div>

              <div>
                <Label htmlFor="interests">Travel Interests</Label>
                <Input id="interests" placeholder="Culture, Food, Adventure..." />
              </div>

              <div>
                <Label htmlFor="languages">Languages Spoken</Label>
                <Input id="languages" placeholder="English, Japanese..." />
              </div>
            </div>

            {/* Rewards Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Travel Rewards
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {rewards.map((reward) => (
                  <div key={reward.id} className="p-4 border rounded-lg text-center">
                    <div className="text-2xl mb-2">{reward.icon}</div>
                    <h3 className="font-semibold">{reward.title}</h3>
                    <p className="text-sm text-muted-foreground">{reward.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo Gallery */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Grid className="w-5 h-5" />
                  Travel Photos
                </h2>
                <Button variant="outline" size="sm" onClick={handlePhotoUpload}>
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Add Photos
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden"
                  >
                    <img
                      src={photo}
                      alt={`Travel photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
