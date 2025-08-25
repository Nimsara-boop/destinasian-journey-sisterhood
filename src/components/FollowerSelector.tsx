import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users } from "lucide-react";
import { useLocationSharingPreferences, Follower } from "@/hooks/useLocationSharingPreferences";

interface FollowerSelectorProps {
  disabled?: boolean;
}

const FollowerSelector = ({ disabled = false }: FollowerSelectorProps) => {
  const { followers, loading, toggleFollowerSharing } = useLocationSharingPreferences();

  if (loading) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-muted-foreground">Loading followers...</p>
      </div>
    );
  }

  if (followers.length === 0) {
    return (
      <div className="text-center py-6">
        <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">No followers found</p>
        <p className="text-xs text-muted-foreground mt-1">
          When people follow you, they'll appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-muted-foreground" />
        <h4 className="font-medium">Select Followers</h4>
      </div>
      <p className="text-sm text-muted-foreground">
        Choose which followers can see your location
      </p>
      
      <ScrollArea className="h-48 border rounded-md">
        <div className="p-3 space-y-3">
          {followers.map((follower: Follower) => (
            <div key={follower.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={follower.avatar_url} />
                  <AvatarFallback>
                    {follower.display_name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Label className="text-sm font-medium cursor-pointer">
                    {follower.display_name}
                  </Label>
                  <p className="text-xs text-muted-foreground">@{follower.username}</p>
                </div>
              </div>
              <Switch
                checked={follower.is_sharing_enabled}
                onCheckedChange={(checked) => toggleFollowerSharing(follower.id, checked)}
                disabled={disabled}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FollowerSelector;