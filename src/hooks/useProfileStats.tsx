import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ProfileStats {
  posts: number;
  followers: number;
  following: number;
}

export function useProfileStats(userId?: string) {
  const [stats, setStats] = useState<ProfileStats>({ posts: 0, followers: 0, following: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    
    fetchStats();
  }, [userId]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Get posts count
      const { count: postsCount } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      // Get followers count (people following this user)
      const { count: followersCount } = await supabase
        .from('profile_followers')
        .select('*', { count: 'exact', head: true })
        .eq('following_id', userId);

      // Get following count (people this user is following)
      const { count: followingCount } = await supabase
        .from('profile_followers')
        .select('*', { count: 'exact', head: true })
        .eq('follower_id', userId);

      setStats({
        posts: postsCount || 0,
        followers: followersCount || 0,
        following: followingCount || 0,
      });
    } catch (error: any) {
      setError(error.message);
      console.error('Error fetching profile stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, error, refetch: fetchStats };
}