import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Users, Shield, Settings } from "lucide-react";
import { useLocationSettings } from "@/hooks/useLocationSettings";
import { useLocationTracking } from "@/hooks/useLocationTracking";
import FollowerSelector from "./FollowerSelector";

interface LocationSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LocationSettingsModal = ({ open, onOpenChange }: LocationSettingsModalProps) => {
  const {
    locationSharingEnabled,
    locationVisibleToFollowers,
    loading,
    updateLocationSharing,
    updateFollowerVisibility
  } = useLocationSettings();

  const { isTracking, startTracking, stopTracking } = useLocationTracking();

  const handleLocationSharingToggle = async (enabled: boolean) => {
    await updateLocationSharing(enabled);
    if (enabled && !isTracking) {
      await startTracking();
    } else if (!enabled && isTracking) {
      stopTracking();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Location & Privacy Settings
          </DialogTitle>
          <DialogDescription>
            Manage how your location is shared with other users
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Location Tracking */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Location Tracking</h3>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="location-sharing">Enable Location Sharing</Label>
                <p className="text-sm text-muted-foreground">
                  Allow your location to be visible to selected followers
                </p>
              </div>
              <Switch
                id="location-sharing"
                checked={locationSharingEnabled}
                onCheckedChange={handleLocationSharingToggle}
                disabled={loading}
              />
            </div>
          </div>

          <Separator />

          {/* Visibility Settings */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Visibility Settings</h3>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="follower-visibility">Visible to All Followers</Label>
                <p className="text-sm text-muted-foreground">
                  {locationVisibleToFollowers 
                    ? "All followers can see your location" 
                    : "Only specifically chosen followers can see your location"
                  }
                </p>
              </div>
              <Switch
                id="follower-visibility"
                checked={locationVisibleToFollowers}
                onCheckedChange={updateFollowerVisibility}
                disabled={loading || !locationSharingEnabled}
              />
            </div>
            
            {/* Follower Selection - only show when not visible to all followers */}
            {locationSharingEnabled && !locationVisibleToFollowers && (
              <div className="mt-4">
                <FollowerSelector disabled={loading} />
              </div>
            )}
          </div>

          <Separator />

          {/* Privacy Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Privacy Information</h3>
            </div>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>• Your location is only shared when you have the app open</p>
              <p>• You can choose exactly which followers can see your location</p>
              <p>• Location data is encrypted and never shared with third parties</p>
              <p>• You can disable location sharing at any time</p>
            </div>
          </div>

          {/* Status Display */}
          {locationSharingEnabled && (
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${isTracking ? 'bg-green-500' : 'bg-yellow-500'}`} />
                <span>
                  Status: {isTracking ? 'Location tracking active' : 'Location tracking paused'}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
            {locationSharingEnabled && !isTracking && (
              <Button onClick={startTracking}>
                Start Location Tracking
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationSettingsModal;