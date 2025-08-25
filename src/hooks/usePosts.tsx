import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Post {
  id: string;
  image: string;
  author: {
    name: string;
    avatar: string;
    verified?: boolean;
  };
  likes: number;
  comments: number;
  views?: number;
  caption: string;
  location: string;
  timestamp?: string;
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles!posts_user_id_fkey(display_name, avatar_url, is_private, user_id)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedPosts = data?.map((post: any) => ({
        id: post.id,
        image: post.image_url || "https://images.unsplash.com/photo-1589308155743-4ad772863eae",
        author: {
          name: post.profiles?.display_name || 'Unknown User',
          avatar: post.profiles?.avatar_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
          verified: true
        },
        likes: post.likes_count || 0,
        comments: post.comments_count || 0,
        views: 0, // Could be added to posts table
        caption: post.content || '',
        location: post.location || 'Sri Lanka',
        timestamp: new Date(post.created_at).toLocaleDateString()
      })) || [];

      setPosts(formattedPosts);
    } catch (error: any) {
      setError(error.message);
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return { posts, loading, error };
}