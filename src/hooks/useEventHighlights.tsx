import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface EventHighlight {
  id: string;
  image: string;
  title: string;
  attendees: number;
  location: string;
}

export function useEventHighlights() {
  const [highlights, setHighlights] = useState<EventHighlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEventHighlights();
  }, []);

  const fetchEventHighlights = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          event_bookings(id)
        `)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;

      const formattedHighlights = data?.map((event: any) => ({
        id: event.id,
        image: event.image_url || "/lovable-uploads/47ee11ca-db78-4616-baed-fafacf5986a8.png",
        title: event.title,
        attendees: event.event_bookings?.length || 0,
        location: event.location
      })) || [];

      setHighlights(formattedHighlights);
    } catch (error: any) {
      setError(error.message);
      console.error('Error fetching event highlights:', error);
    } finally {
      setLoading(false);
    }
  };

  return { highlights, loading, error };
}