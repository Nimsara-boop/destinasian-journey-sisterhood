import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useLocationSettings() {
  const [locationSharingEnabled, setLocationSharingEnabled] = useState(false);
  const [locationVisibleToFollowers, setLocationVisibleToFollowers] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('location_sharing_enabled, location_visible_to_followers')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      setLocationSharingEnabled(data.location_sharing_enabled || false);
      setLocationVisibleToFollowers(data.location_visible_to_followers || false);
    } catch (error: any) {
      console.error('Error fetching location settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateLocationSharing = async (enabled: boolean) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({ location_sharing_enabled: enabled })
        .eq('user_id', user.id);

      if (error) throw error;

      setLocationSharingEnabled(enabled);
      toast({
        title: enabled ? "Location sharing enabled" : "Location sharing disabled",
        description: enabled 
          ? "Your location can now be shared with chosen followers"
          : "Your location is no longer shared",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateFollowerVisibility = async (visible: boolean) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({ location_visible_to_followers: visible })
        .eq('user_id', user.id);

      if (error) throw error;

      setLocationVisibleToFollowers(visible);
      toast({
        title: visible ? "Location visible to all followers" : "Location visible to chosen followers only",
        description: visible 
          ? "All your followers can see your location"
          : "Only specifically chosen followers can see your location",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return {
    locationSharingEnabled,
    locationVisibleToFollowers,
    loading,
    updateLocationSharing,
    updateFollowerVisibility
  };
}