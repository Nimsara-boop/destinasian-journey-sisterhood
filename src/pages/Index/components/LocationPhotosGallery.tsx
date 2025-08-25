import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePosts } from "@/hooks/usePosts";
import { useLocationTracking } from "@/hooks/useLocationTracking";

interface LocationPhotosGalleryProps {
  onBack: () => void;
}

export function LocationPhotosGallery({ onBack }: LocationPhotosGalleryProps) {
  const { posts, loading } = usePosts();
  const { lastLocation } = useLocationTracking();
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [currentLocationName, setCurrentLocationName] = useState<string>("your area");

  useEffect(() => {
    // For now, we'll use a simple location detection based on coordinates
    // In a real app, you'd use reverse geocoding to get the actual location name
    if (lastLocation) {
      setCurrentLocationName("your current area");
    }
  }, [lastLocation]);

  useEffect(() => {
    if (posts && lastLocation) {
      // For now, show all posts since we don't have exact location matching
      // In a real app, you'd implement proper geospatial filtering
      setFilteredPosts(posts.slice(0, 8)); // Show first 8 posts as sample
    } else if (posts) {
      // If no location, show posts with location tags
      const locationPosts = posts.filter(post => post.location);
      setFilteredPosts(locationPosts.slice(0, 8));
    }
  }, [posts, lastLocation]);

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

      {filteredPosts.length === 0 ? (
        <div className="text-center py-8 bg-muted/50 rounded-lg">
          <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No photos found for your location yet.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Be the first to share photos from {currentLocationName}!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
          {filteredPosts.map((post) => (
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