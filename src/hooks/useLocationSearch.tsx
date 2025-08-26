import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface LocationResult {
  id: string;
  place_name: string;
  place_name_short: string;
  center: [number, number]; // [longitude, latitude]
  context?: Array<{
    id: string;
    text: string;
  }>;
}

export function useLocationSearch() {
  const [locations, setLocations] = useState<LocationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const searchLocations = async (query: string) => {
    if (!query || query.length < 2) {
      setLocations([]);
      return;
    }

    try {
      setLoading(true);
      
      // Call Supabase Edge Function to search locations
      const response = await fetch(`https://mocvlvjlhtvnxtjhctin.supabase.co/functions/v1/search-locations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vY3ZsdmpsaHR2bnh0amhjdGluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MjgzMTYsImV4cCI6MjA2OTEwNDMxNn0.p-T4rY2NtjK_ZJy4VHYxSlTAZto_hSbTQg3pZs_R8uc`
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('Failed to search locations');
      }

      const data = await response.json();
      
      const formattedLocations: LocationResult[] = data.features?.map((feature: any) => ({
        id: feature.id,
        place_name: feature.place_name,
        place_name_short: feature.text,
        center: feature.center,
        context: feature.context
      })) || [];

      setLocations(formattedLocations);
    } catch (error: any) {
      console.error('Error searching locations:', error);
      toast({
        title: "Location search failed",
        description: "Unable to search for locations. Please try again.",
        variant: "destructive",
      });
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = (): Promise<LocationResult | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        toast({
          title: "Geolocation not supported",
          description: "Your browser doesn't support geolocation.",
          variant: "destructive",
        });
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Reverse geocode the coordinates
            const response = await fetch(`https://mocvlvjlhtvnxtjhctin.supabase.co/functions/v1/reverse-geocode`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vY3ZsdmpsaHR2bnh0amhjdGluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MjgzMTYsImV4cCI6MjA2OTEwNDMxNn0.p-T4rY2NtjK_ZJy4VHYxSlTAZto_hSbTQg3pZs_R8uc`
              },
              body: JSON.stringify({ latitude, longitude }),
            });

            if (!response.ok) {
              throw new Error('Failed to reverse geocode');
            }

            const data = await response.json();
            
            if (data.features && data.features.length > 0) {
              const feature = data.features[0];
              resolve({
                id: feature.id,
                place_name: feature.place_name,
                place_name_short: feature.text,
                center: [longitude, latitude],
                context: feature.context
              });
            } else {
              resolve(null);
            }
          } catch (error) {
            console.error('Error reverse geocoding:', error);
            resolve(null);
          }
        },
        (error) => {
          console.error('Error getting current location:', error);
          toast({
            title: "Location access denied",
            description: "Please allow location access to use current location.",
            variant: "destructive",
          });
          resolve(null);
        }
      );
    });
  };

  return {
    locations,
    loading,
    searchLocations,
    getCurrentLocation
  };
}