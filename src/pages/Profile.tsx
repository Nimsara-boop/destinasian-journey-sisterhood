
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapPin, Globe, Camera, Award, Grid, Image as ImageIcon, Check, Video, Upload, LinkIcon, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const [usingFemaleExperience, setUsingFemaleExperience] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is female and whether they're verified
    const gender = localStorage.getItem("gender");
    const femaleExperience = localStorage.getItem("femaleExperience") === "true";
    const verified = localStorage.getItem("verifiedFemale") === "true";
    
    setIsFemale(gender === "female");
    setUsingFemaleExperience(femaleExperience);
    setIsVerified(verified);
    
    // Show verification section if user is female but not verified and not using female experience
    setShowVerification(gender === "female" && !verified && !femaleExperience);
  }, []);
  
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

  const handleVerificationMethod = (method: string) => {
    toast({
      title: "Verification Started",
      description: `${method} verification process has been initiated. Our team will contact you shortly.`,
    });
    
    // In a real app, this would trigger the appropriate verification flow
    // For demo purposes, we'll simulate verification after a delay
    setTimeout(() => {
      localStorage.setItem("verifiedFemale", "true");
      setIsVerified(true);
      toast({
        title: "Verification Complete",
        description: "You've been verified! You can now access the female experience.",
      });
    }, 3000);
  };

  const handleEnableFemaleExperience = () => {
    if (!isVerified) {
      toast({
        title: "Verification Required",
        description: "Please complete verification before enabling the female experience.",
        variant: "destructive",
      });
      return;
    }
    
    localStorage.setItem("femaleExperience", "true");
    toast({
      title: "Female Experience Enabled",
      description: "You'll now see content tailored for women travelers",
    });
    
    // In a real app, this would trigger a re-render or state change in the parent component
    // For now, we'll just reload the page to simulate the experience change
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-4xl mx-auto pt-24 px-4 pb-12">
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
            
            {/* Verification Badge - Only shown if the user is a verified female */}
            {isFemale && isVerified && (
              <Badge className="mt-2 bg-primary-feminine/80 text-white">
                <Check className="w-3 h-3 mr-1" /> Verified Female Traveler
              </Badge>
            )}
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-3">
              <TabsTrigger value="profile">Profile Settings</TabsTrigger>
              <TabsTrigger value="photos">Travel Photos</TabsTrigger>
              {isFemale && <TabsTrigger value="verification">Verification</TabsTrigger>}
            </TabsList>
            
            <TabsContent value="profile" className="space-y-6">
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

              <div className="flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="photos" className="space-y-6">
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
            </TabsContent>
            
            {/* Verification Tab - Only shown for female users */}
            {isFemale && (
              <TabsContent value="verification" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    Female Traveler Verification
                  </h2>
                  
                  {isVerified && (
                    <Badge className="bg-green-500 text-white">Verified</Badge>
                  )}
                </div>
                
                <p className="text-muted-foreground">
                  To access our exclusive female experience, we require verification to ensure the safety and comfort of all women in our community.
                </p>
                
                {isVerified ? (
                  <div className="space-y-4">
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <Check className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">Verification Complete</h3>
                            <p className="text-sm text-muted-foreground">You're a verified female traveler</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {!usingFemaleExperience && (
                      <Button 
                        className="w-full bg-primary-feminine hover:bg-primary-feminine/90 text-white"
                        onClick={handleEnableFemaleExperience}
                      >
                        Enable Female Experience
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h3 className="font-semibold">Select a verification method:</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="cursor-pointer hover:border-primary-feminine transition-colors">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Video className="w-5 h-5 text-primary-feminine" />
                            Video Verification
                          </CardTitle>
                          <CardDescription>
                            Schedule a brief video call with our team to verify your identity
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button 
                            variant="outline" 
                            className="w-full border-primary-feminine text-primary-feminine hover:bg-primary-feminine hover:text-white"
                            onClick={() => handleVerificationMethod("Video call")}
                          >
                            Schedule Video Call
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="cursor-pointer hover:border-primary-feminine transition-colors">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Upload className="w-5 h-5 text-primary-feminine" />
                            ID Verification
                          </CardTitle>
                          <CardDescription>
                            Upload a government-issued ID with your photo and gender marker
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button 
                            variant="outline" 
                            className="w-full border-primary-feminine text-primary-feminine hover:bg-primary-feminine hover:text-white"
                            onClick={() => handleVerificationMethod("ID")}
                          >
                            Upload ID
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="cursor-pointer hover:border-primary-feminine transition-colors">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <LinkIcon className="w-5 h-5 text-primary-feminine" />
                            Social Media Verification
                          </CardTitle>
                          <CardDescription>
                            Provide links to your social media profiles for cross-checking
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button 
                            variant="outline" 
                            className="w-full border-primary-feminine text-primary-feminine hover:bg-primary-feminine hover:text-white"
                            onClick={() => handleVerificationMethod("Social media")}
                          >
                            Connect Profiles
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="cursor-pointer hover:border-primary-feminine transition-colors">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-primary-feminine" />
                            Referral Verification
                          </CardTitle>
                          <CardDescription>
                            Get verified through a referral from an existing female member
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button 
                            variant="outline" 
                            className="w-full border-primary-feminine text-primary-feminine hover:bg-primary-feminine hover:text-white"
                            onClick={() => handleVerificationMethod("Referral")}
                          >
                            Enter Referral Code
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">Your Privacy Matters</h4>
                      <p className="text-sm text-muted-foreground">
                        We take your privacy seriously. All verification data is encrypted, stored securely, and deleted after verification is complete. We never share your personal information with third parties.
                      </p>
                    </div>
                  </div>
                )}
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
