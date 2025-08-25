import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Follower {
  id: string;
  user_id: string;
  display_name: string;
  username: string;
  avatar_url?: string;
  is_sharing_enabled: boolean;
}

export function useLocationSharingPreferences() {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchFollowersWithPreferences();
  }, []);

  const fetchFollowersWithPreferences = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get all followers with their profile info and current sharing preferences
      const { data: followersData, error } = await supabase
        .from('profile_followers')
        .select(`
          follower_id,
          profiles!profile_followers_follower_id_fkey (
            user_id,
            display_name,
            username,
            avatar_url
          )
        `)
        .eq('following_id', user.id);

      if (error) throw error;

      // Get current location sharing preferences
      const { data: preferencesData, error: preferencesError } = await supabase
        .from('location_sharing_preferences')
        .select('shared_with_user_id')
        .eq('user_id', user.id);

      if (preferencesError) throw preferencesError;

      const sharedWithUserIds = new Set(preferencesData?.map(p => p.shared_with_user_id) || []);

      const formattedFollowers = followersData?.map((follower: any) => ({
        id: follower.profiles.user_id,
        user_id: follower.profiles.user_id,
        display_name: follower.profiles.display_name || follower.profiles.username,
        username: follower.profiles.username,
        avatar_url: follower.profiles.avatar_url,
        is_sharing_enabled: sharedWithUserIds.has(follower.profiles.user_id)
      })) || [];

      setFollowers(formattedFollowers);
    } catch (error: any) {
      console.error('Error fetching followers with preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFollowerSharing = async (followerId: string, enabled: boolean) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      if (enabled) {
        // Add sharing preference
        const { error } = await supabase
          .from('location_sharing_preferences')
          .insert({
            user_id: user.id,
            shared_with_user_id: followerId
          });

        if (error) throw error;
      } else {
        // Remove sharing preference
        const { error } = await supabase
          .from('location_sharing_preferences')
          .delete()
          .eq('user_id', user.id)
          .eq('shared_with_user_id', followerId);

        if (error) throw error;
      }

      // Update local state
      setFollowers(prev => prev.map(follower => 
        follower.id === followerId 
          ? { ...follower, is_sharing_enabled: enabled }
          : follower
      ));

      const followerName = followers.find(f => f.id === followerId)?.display_name;
      toast({
        title: enabled ? "Location sharing enabled" : "Location sharing disabled",
        description: `${followerName} can ${enabled ? 'now' : 'no longer'} see your location`,
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
    followers,
    loading,
    toggleFollowerSharing,
    refetch: fetchFollowersWithPreferences
  };
}