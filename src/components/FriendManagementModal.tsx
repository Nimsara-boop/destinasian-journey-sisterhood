import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Users, Settings, UserPlus, UserMinus, MapPin } from "lucide-react";
import { useProfiles } from "@/hooks/useProfiles";
import { useFollowStatus } from "@/hooks/useFollowStatus";
import { useLocationSharingPreferences } from "@/hooks/useLocationSharingPreferences";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface FriendManagementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FriendManagementModal({ open, onOpenChange }: FriendManagementModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("browse");
  const { profiles, loading: profilesLoading } = useProfiles();
  const { followedProfiles, followers, followUser, unfollowUser, loading: followLoading } = useFollowStatus();
  const { 
    locationSharingEnabled, 
    locationVisibleToFollowers, 
    updateLocationSettings,
    sharedWithUsers,
    addLocationShare,
    removeLocationShare
  } = useLocationSharingPreferences();
  const { toast } = useToast();

  const filteredProfiles = profiles.filter(profile =>
    profile.display_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFollow = async (userId: string) => {
    try {
      await followUser(userId);
      toast({
        title: "Success",
        description: "Started following user",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to follow user",
        variant: "destructive",
      });
    }
  };

  const handleUnfollow = async (userId: string) => {
    try {
      await unfollowUser(userId);
      toast({
        title: "Success", 
        description: "Unfollowed user",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to unfollow user",
        variant: "destructive",
      });
    }
  };

  const handleLocationShareToggle = async (userId: string, enabled: boolean) => {
    try {
      if (enabled) {
        await addLocationShare(userId);
        toast({
          title: "Success",
          description: "Location sharing enabled for this user",
        });
      } else {
        await removeLocationShare(userId);
        toast({
          title: "Success",
          description: "Location sharing disabled for this user",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update location sharing",
        variant: "destructive",
      });
    }
  };

  const isFollowing = (userId: string) => followedProfiles.some(p => p.user_id === userId);
  const isLocationSharedWith = (userId: string) => sharedWithUsers.includes(userId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Manage Travel Connections
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="browse">Browse Travelers</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
            <TabsTrigger value="settings">Privacy Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search travelers by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="max-h-96 overflow-y-auto space-y-3">
              {profilesLoading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loading travelers...</p>
                </div>
              ) : filteredProfiles.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No travelers found</p>
                </div>
              ) : (
                filteredProfiles.map((profile) => (
                  <div key={profile.user_id} className="flex items-center justify-between p-3 border rounded-lg bg-card">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={profile.avatar_url || ""} />
                        <AvatarFallback>
                          {(profile.display_name || profile.username).charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{profile.display_name || profile.username}</p>
                        <p className="text-sm text-muted-foreground">@{profile.username}</p>
                      </div>
                      {profile.is_private && (
                        <Badge variant="secondary" className="text-xs">Private</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {isFollowing(profile.user_id) ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUnfollow(profile.user_id)}
                            disabled={followLoading}
                          >
                            <UserMinus className="w-4 h-4 mr-1" />
                            Unfollow
                          </Button>
                          <Button
                            variant={isLocationSharedWith(profile.user_id) ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleLocationShareToggle(
                              profile.user_id, 
                              !isLocationSharedWith(profile.user_id)
                            )}
                          >
                            <MapPin className="w-4 h-4 mr-1" />
                            {isLocationSharedWith(profile.user_id) ? "Hide Location" : "Show Location"}
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleFollow(profile.user_id)}
                          disabled={followLoading}
                        >
                          <UserPlus className="w-4 h-4 mr-1" />
                          Follow
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="following" className="space-y-4">
            <div className="max-h-96 overflow-y-auto space-y-3">
              {followedProfiles.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Not following anyone yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Go to Browse Travelers to find people to follow
                  </p>
                </div>
              ) : (
                followedProfiles.map((profile) => (
                  <div key={profile.user_id} className="flex items-center justify-between p-3 border rounded-lg bg-card">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={profile.avatar_url || ""} />
                        <AvatarFallback>
                          {(profile.display_name || profile.username).charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{profile.display_name || profile.username}</p>
                        <p className="text-sm text-muted-foreground">@{profile.username}</p>
                      </div>
                      {isLocationSharedWith(profile.user_id) && (
                        <Badge variant="default" className="text-xs">
                          <MapPin className="w-3 h-3 mr-1" />
                          Location Visible
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUnfollow(profile.user_id)}
                        disabled={followLoading}
                      >
                        <UserMinus className="w-4 h-4 mr-1" />
                        Unfollow
                      </Button>
                      <Button
                        variant={isLocationSharedWith(profile.user_id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleLocationShareToggle(
                          profile.user_id, 
                          !isLocationSharedWith(profile.user_id)
                        )}
                      >
                        <MapPin className="w-4 h-4 mr-1" />
                        {isLocationSharedWith(profile.user_id) ? "Hide" : "Show"}
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
                <div className="space-y-1">
                  <h3 className="font-medium">Enable Location Sharing</h3>
                  <p className="text-sm text-muted-foreground">
                    Allow others to see your location based on your preferences
                  </p>
                </div>
                <Switch
                  checked={locationSharingEnabled}
                  onCheckedChange={(checked) => updateLocationSettings({ locationSharingEnabled: checked })}
                />
              </div>

              {locationSharingEnabled && (
                <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
                  <div className="space-y-1">
                    <h3 className="font-medium">Limit to Followers Only</h3>
                    <p className="text-sm text-muted-foreground">
                      When enabled, only people you follow back can see your location
                    </p>
                  </div>
                  <Switch
                    checked={locationVisibleToFollowers}
                    onCheckedChange={(checked) => updateLocationSettings({ locationVisibleToFollowers: checked })}
                  />
                </div>
              )}

              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="w-4 h-4" />
                  <h3 className="font-medium">Privacy Information</h3>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Your exact location is never shared publicly</p>
                  <p>• You control who can see your location on the map</p>
                  <p>• You can revoke location access at any time</p>
                  <p>• Location data is only used for the friend map feature</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}