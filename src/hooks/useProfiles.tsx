import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Traveler {
  id: string;
  name: string;
  age?: number;
  job?: string;
  location: string;
  interests: string[];
  avatar: string;
  bio: string;
  verified: boolean;
  photos: string[];
  badges: { name: string; icon: string }[];
}

export function useProfiles() {
  const [profiles, setProfiles] = useState<Traveler[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          user_photos(photo_url)
        `)
        .neq('user_id', user?.id); // Exclude current user

      if (error) throw error;

      const formattedProfiles = data?.map((profile: any) => ({
        id: profile.id,
        name: profile.display_name || profile.username,
        age: null, // Could be added to profiles table
        job: null, // Could be added to profiles table
        location: "Sri Lanka", // Default location
        interests: [], // Could be added to profiles table
        avatar: profile.avatar_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        bio: profile.bio || "Travel enthusiast exploring the world.",
        verified: true, // Could be added to profiles table
        photos: profile.user_photos?.map((photo: any) => photo.photo_url) || [],
        badges: [
          { name: "Explorer", icon: "🌏" },
          { name: "Verified", icon: "✓" }
        ]
      })) || [];

      setProfiles(formattedProfiles);
    } catch (error: any) {
      setError(error.message);
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  return { profiles, loading, error };
}