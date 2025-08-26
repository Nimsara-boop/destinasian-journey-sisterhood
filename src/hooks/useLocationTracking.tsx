import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useLocationTracking() {
  const [isTracking, setIsTracking] = useState(false);
  const [lastLocation, setLastLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const { toast } = useToast();

  const startTracking = async () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Your browser doesn't support location tracking.",
        variant: "destructive",
      });
      return;
    }

    const success = async (position: GeolocationPosition) => {
      const { latitude, longitude, accuracy } = position.coords;
      
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase
          .from('user_locations')
          .insert({
            user_id: user.id,
            latitude,
            longitude,
            accuracy
          });

        if (error) throw error;
        
        setLastLocation({ latitude, longitude });
        setIsTracking(true);
      } catch (error: any) {
        console.error('Error saving location:', error);
        toast({
          title: "Location save failed",
          description: error.message,
          variant: "destructive",
        });
      }
    };

    const error = (err: GeolocationPositionError) => {
      toast({
        title: "Location access denied",
        description: "Please allow location access to share your location with friends.",
        variant: "destructive",
      });
    };

    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  };

  const stopTracking = () => {
    setIsTracking(false);
  };

  return {
    isTracking,
    lastLocation,
    startTracking,
    stopTracking
  };
}