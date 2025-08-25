import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  user_id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  is_private: boolean;
}

export function useFollowStatus() {
  const [followedProfiles, setFollowedProfiles] = useState<Profile[]>([]);
  const [followers, setFollowers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchFollowData();
  }, []);

  const fetchFollowData = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get profiles the current user is following
      const { data: followingData, error: followingError } = await supabase
        .from('profile_followers')
        .select(`
          following_id,
          profiles!profile_followers_following_id_fkey(
            user_id,
            username,
            display_name,
            avatar_url,
            is_private
          )
        `)
        .eq('follower_id', user.id);

      if (followingError) throw followingError;

      // Get profiles that follow the current user
      const { data: followersData, error: followersError } = await supabase
        .from('profile_followers')
        .select(`
          follower_id,
          profiles!profile_followers_follower_id_fkey(
            user_id,
            username,
            display_name,
            avatar_url,
            is_private
          )
        `)
        .eq('following_id', user.id);

      if (followersError) throw followersError;

      const followingProfiles = followingData?.map(item => item.profiles).filter(Boolean) || [];
      const followerProfiles = followersData?.map(item => item.profiles).filter(Boolean) || [];
      
      setFollowedProfiles(followingProfiles as any);
      setFollowers(followerProfiles as any);
    } catch (error: any) {
      console.error('Error fetching follow data:', error);
      toast({
        title: "Error",
        description: "Failed to load follow data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const followUser = async (userId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('profile_followers')
        .insert({
          follower_id: user.id,
          following_id: userId
        });

      if (error) throw error;

      await fetchFollowData(); // Refresh the data
    } catch (error: any) {
      console.error('Error following user:', error);
      throw error;
    }
  };

  const unfollowUser = async (userId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('profile_followers')
        .delete()
        .eq('follower_id', user.id)
        .eq('following_id', userId);

      if (error) throw error;

      await fetchFollowData(); // Refresh the data
    } catch (error: any) {
      console.error('Error unfollowing user:', error);
      throw error;
    }
  };

  return {
    followedProfiles,
    followers,
    loading,
    followUser,
    unfollowUser,
    refetch: fetchFollowData
  };
}