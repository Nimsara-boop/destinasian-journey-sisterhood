import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useLocationTracking } from "@/hooks/useLocationTracking";
import { useLocationSearch } from "@/hooks/useLocationSearch";

interface LocationPhotosGalleryProps {
  onBack: () => void;
}

export function LocationPhotosGallery({ onBack }: LocationPhotosGalleryProps) {
  const { lastLocation } = useLocationTracking();
  const { getCurrentLocation } = useLocationSearch();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentLocationName, setCurrentLocationName] = useState<string>("your area");

  useEffect(() => {
    initializeLocation();
  }, []);

  const initializeLocation = async () => {
    try {
      // First try to get current location from browser
      const locationResult = await getCurrentLocation();
      if (locationResult) {
        setCurrentLocationName(locationResult.place_name_short);
        await fetchLocationPosts(locationResult.place_name);
      } else if (lastLocation) {
        // Fall back to tracked location
        setCurrentLocationName("your current area");
        await fetchNearbyPosts();
      } else {
        // Show all location-tagged posts
        await fetchAllLocationPosts();
      }
    } catch (error) {
      console.error('Error initializing location:', error);
      await fetchAllLocationPosts();
    } finally {
      setLoading(false);
    }
  };

  const fetchLocationPosts = async (locationName: string) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles!posts_user_id_fkey(display_name, avatar_url, is_private, user_id)
        `)
        .ilike('location', `%${locationName}%`)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      const formattedPosts = data?.map((post: any) => ({
        id: post.id,
        image: post.image_url || "https://images.unsplash.com/photo-1589308155743-4ad772863eae",
        author: {
          name: post.profiles?.display_name || 'Unknown User',
          avatar: post.profiles?.avatar_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
        },
        likes: post.likes_count || 0,
        comments: post.comments_count || 0,
        views: 0,
        caption: post.content || '',
        location: post.location || 'Unknown Location',
        timestamp: new Date(post.created_at).toLocaleDateString()
      })) || [];

      setPosts(formattedPosts);
    } catch (error: any) {
      console.error('Error fetching location posts:', error);
      setPosts([]);
    }
  };

  const fetchNearbyPosts = async () => {
    // For now, show all posts since we don't have exact location matching
    // In a future update, you could implement geospatial queries
    await fetchAllLocationPosts();
  };

  const fetchAllLocationPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles!posts_user_id_fkey(display_name, avatar_url, is_private, user_id)
        `)
        .not('location', 'is', null)
        .neq('location', '')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      const formattedPosts = data?.map((post: any) => ({
        id: post.id,
        image: post.image_url || "https://images.unsplash.com/photo-1589308155743-4ad772863eae",
        author: {
          name: post.profiles?.display_name || 'Unknown User',
          avatar: post.profiles?.avatar_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
        },
        likes: post.likes_count || 0,
        comments: post.comments_count || 0,
        views: 0,
        caption: post.content || '',
        location: post.location || 'Unknown Location',
        timestamp: new Date(post.created_at).toLocaleDateString()
      })) || [];

      setPosts(formattedPosts.slice(0, 8)); // Show first 8 posts
    } catch (error: any) {
      console.error('Error fetching all location posts:', error);
      setPosts([]);
    }
  };

  if (loading) {
    return (
      <div className="location-advice">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <MapPin className="w-8 h-8 text-primary-feminine" />
          <h3 className="text-xl font-serif">Local Travel Photos</h3>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-feminine mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading photos from your area...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="location-advice">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <MapPin className="w-8 h-8 text-primary-feminine" />
        <h3 className="text-xl font-serif">Local Travel Photos</h3>
      </div>
      
      <p className="mb-4 text-muted-foreground">
        Discover photos from travelers in {currentLocationName}
      </p>

      {posts.length === 0 ? (
        <div className="text-center py-8 bg-muted/50 rounded-lg">
          <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No photos found for your location yet.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Be the first to share photos from {currentLocationName}!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
          {posts.map((post) => (
            <div key={post.id} className="relative group">
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 rounded-lg">
                <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-xs font-medium truncate">{post.author.name}</p>
                  <p className="text-xs truncate">{post.location}</p>
                </div>
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1 bg-black/50 rounded px-1 py-0.5">
                    <Heart className="w-3 h-3" />
                    <span className="text-xs">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-black/50 rounded px-1 py-0.5">
                    <MessageCircle className="w-3 h-3" />
                    <span className="text-xs">{post.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}