import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface UserPost {
  id: string;
  image_url: string;
  content: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  location?: string;
}

export function useUserPosts(userId?: string) {
  const [posts, setPosts] = useState<UserPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    fetchUserPosts();
  }, [userId]);

  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedPosts = data?.map((post: any) => ({
        id: post.id,
        image_url: post.image_url || "https://images.unsplash.com/photo-1589308155743-4ad772863eae",
        content: post.content || '',
        likes_count: post.likes_count || 0,
        comments_count: post.comments_count || 0,
        created_at: post.created_at,
        location: post.location
      })) || [];

      setPosts(formattedPosts);
    } catch (error: any) {
      setError(error.message);
      console.error('Error fetching user posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return { posts, loading, error, refetch: fetchUserPosts };
}