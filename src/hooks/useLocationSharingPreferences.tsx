import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useLocationSharingPreferences() {
  const [locationSharingEnabled, setLocationSharingEnabled] = useState(false);
  const [locationVisibleToFollowers, setLocationVisibleToFollowers] = useState(false);
  const [sharedWithUsers, setSharedWithUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocationSettings();
  }, []);

  const fetchLocationSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch profile settings
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('location_sharing_enabled, location_visible_to_followers')
        .eq('user_id', user.id)
        .single();

      if (profileError) throw profileError;

      if (profileData) {
        setLocationSharingEnabled(profileData.location_sharing_enabled || false);
        setLocationVisibleToFollowers(profileData.location_visible_to_followers || false);
      }

      // Fetch specific sharing preferences
      const { data: sharingData, error: sharingError } = await supabase
        .from('location_sharing_preferences')
        .select('shared_with_user_id')
        .eq('user_id', user.id);

      if (sharingError) throw sharingError;

      setSharedWithUsers(sharingData?.map(item => item.shared_with_user_id) || []);
    } catch (error: any) {
      console.error('Error fetching location settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateLocationSettings = async (settings: {
    locationSharingEnabled?: boolean;
    locationVisibleToFollowers?: boolean;
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const updateData: any = {};
      if (settings.locationSharingEnabled !== undefined) {
        updateData.location_sharing_enabled = settings.locationSharingEnabled;
        setLocationSharingEnabled(settings.locationSharingEnabled);
      }
      if (settings.locationVisibleToFollowers !== undefined) {
        updateData.location_visible_to_followers = settings.locationVisibleToFollowers;
        setLocationVisibleToFollowers(settings.locationVisibleToFollowers);
      }

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('user_id', user.id);

      if (error) throw error;
    } catch (error: any) {
      console.error('Error updating location settings:', error);
      throw error;
    }
  };

  const addLocationShare = async (sharedWithUserId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('location_sharing_preferences')
        .insert({
          user_id: user.id,
          shared_with_user_id: sharedWithUserId
        });

      if (error) throw error;

      setSharedWithUsers(prev => [...prev, sharedWithUserId]);
    } catch (error: any) {
      console.error('Error adding location share:', error);
      throw error;
    }
  };

  const removeLocationShare = async (sharedWithUserId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('location_sharing_preferences')
        .delete()
        .eq('user_id', user.id)
        .eq('shared_with_user_id', sharedWithUserId);

      if (error) throw error;

      setSharedWithUsers(prev => prev.filter(id => id !== sharedWithUserId));
    } catch (error: any) {
      console.error('Error removing location share:', error);
      throw error;
    }
  };

  return {
    locationSharingEnabled,
    locationVisibleToFollowers,
    sharedWithUsers,
    loading,
    updateLocationSettings,
    addLocationShare,
    removeLocationShare,
    refetch: fetchLocationSettings
  };
}