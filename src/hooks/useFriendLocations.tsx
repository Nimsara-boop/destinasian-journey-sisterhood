import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Location } from "@/components/map/types";

export function useFriendLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchFriendLocations();
  }, []);

  const fetchFriendLocations = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get the latest location for each user that the current user can see
      const { data, error } = await supabase
        .from('user_locations')
        .select(`
          user_id,
          latitude,
          longitude,
          created_at,
          profiles!inner(
            display_name,
            username,
            avatar_url
          )
        `)
        .neq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group by user_id and get the most recent location for each user
      const locationMap = new Map();
      data?.forEach((location: any) => {
        if (!locationMap.has(location.user_id)) {
          locationMap.set(location.user_id, {
            id: location.user_id,
            name: location.profiles.display_name || location.profiles.username,
            coordinates: [location.latitude, location.longitude] as [number, number],
            lastSeen: formatLastSeen(location.created_at),
            avatar: location.profiles.avatar_url
          });
        }
      });

      setLocations(Array.from(locationMap.values()));
    } catch (error: any) {
      console.error('Error fetching friend locations:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatLastSeen = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return "Over a week ago";
  };

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    locations: filteredLocations,
    loading,
    searchQuery,
    setSearchQuery,
    refetch: fetchFriendLocations
  };
}