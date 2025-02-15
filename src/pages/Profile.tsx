
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { MapPin, Globe, Camera } from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const [isPublic, setIsPublic] = useState(true);

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
            <Button variant="outline" size="sm" className="mb-4">
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
