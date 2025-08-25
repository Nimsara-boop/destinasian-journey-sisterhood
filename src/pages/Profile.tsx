
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
import { MapPin, Globe, Camera, Award, Grid, Heart, MessageCircle, Plus, UserPlus, UserMinus, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { PostUploadModal } from "@/components/PostUploadModal";
import { useProfileStats } from "@/hooks/useProfileStats";
import { useUserPosts } from "@/hooks/useUserPosts";
import { useFollowStatus } from "@/hooks/useFollowStatus";
import { supabase } from "@/integrations/supabase/client";
import LocationSettingsModal from "@/components/LocationSettingsModal";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isPublic, setIsPublic] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(true);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const { toast } = useToast();
  
  const { stats, loading: statsLoading, refetch: refetchStats } = useProfileStats(currentUser?.id);
  const { posts, loading: postsLoading, refetch: refetchPosts } = useUserPosts(currentUser?.id);
  // Removed useFollowStatus since we need target user ID which we don't have in this context
  
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser(user);
        // Fetch profile data
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (profileData) {
          setProfile(profileData);
          setIsPublic(!profileData.is_private);
        }
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };
  
  const handlePrivacyToggle = async (isPrivate: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_private: isPrivate })
        .eq('user_id', currentUser?.id);

      if (error) throw error;
      setIsPublic(!isPrivate);
      toast({
        title: isPrivate ? "Account is now private" : "Account is now public",
        description: isPrivate 
          ? "Only your followers can see your posts" 
          : "Everyone can see your posts",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handlePostUploaded = () => {
    refetchPosts();
    refetchStats();
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-4xl mx-auto pt-24 px-4 pb-12">
        {/* Profile Header */}
        <div className="bg-card rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <Avatar className="w-32 h-32 md:w-40 md:h-40">
                <AvatarImage src={profile?.avatar_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330"} />
                <AvatarFallback className="text-xl">
                  {profile?.display_name?.charAt(0) || currentUser?.email?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {isOwnProfile && (
                <Button variant="outline" size="sm" className="mt-3">
                  <Camera className="w-4 h-4 mr-2" />
                  Change Photo
                </Button>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <h1 className="text-2xl font-bold">
                  {profile?.display_name || profile?.username || 'User'}
                </h1>
                
                {isOwnProfile ? (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit Profile
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setUploadModalOpen(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      New Post
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSettingsModalOpen(true)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                 ) : (
                   <div className="text-muted-foreground">
                     {/* Follow button would go here when viewing other profiles */}
                   </div>
                 )}
              </div>

              {/* Stats */}
              <div className="flex justify-center md:justify-start gap-8 mb-4">
                <div className="text-center">
                  <div className="font-bold text-lg">{statsLoading ? '...' : stats.posts}</div>
                  <div className="text-sm text-muted-foreground">posts</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg">{statsLoading ? '...' : stats.followers}</div>
                  <div className="text-sm text-muted-foreground">followers</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg">{statsLoading ? '...' : stats.following}</div>
                  <div className="text-sm text-muted-foreground">following</div>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                {profile?.bio && (
                  <p className="text-sm">{profile.bio}</p>
                )}
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Traveler</span>
                </div>
                {!isPublic && (
                  <Badge variant="secondary" className="text-xs">
                    Private Account
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="bg-card rounded-lg shadow-sm">
          <div className="border-b border-border">
            <div className="flex items-center justify-center p-4">
              <Grid className="w-5 h-5 mr-2" />
              <span className="font-medium">Posts</span>
            </div>
          </div>
          
          <div className="p-6">
            {postsLoading ? (
              <div className="grid grid-cols-3 gap-1">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-square bg-muted animate-pulse rounded" />
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12">
                <Grid className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-medium mb-2">No posts yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {isOwnProfile ? "Share your first travel memory!" : "This user hasn't shared any posts yet."}
                </p>
                {isOwnProfile && (
                  <Button onClick={() => setUploadModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Share your first post
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-1">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="aspect-square relative group cursor-pointer overflow-hidden rounded"
                  >
                    <img
                      src={post.image_url}
                      alt="Post"
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <div className="flex items-center gap-4 text-white">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {post.likes_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {post.comments_count}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Settings for own profile */}
        {isOwnProfile && (
          <div className="bg-card rounded-lg shadow-sm p-6 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Privacy Settings</h2>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <Label htmlFor="public-profile">Public Profile</Label>
                <Switch
                  id="public-profile"
                  checked={isPublic}
                  onCheckedChange={handlePrivacyToggle}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {isPublic 
                ? "Everyone can see your posts and profile" 
                : "Only your followers can see your posts"}
            </p>
          </div>
        )}

        {/* Post Upload Modal */}
        <PostUploadModal
          isOpen={uploadModalOpen}
          onClose={() => setUploadModalOpen(false)}
          onPostUploaded={handlePostUploaded}
        />

        {/* Location Settings Modal */}
        <LocationSettingsModal
          open={settingsModalOpen}
          onOpenChange={setSettingsModalOpen}
        />
      </div>
    </div>
  );
};

export default Profile;
