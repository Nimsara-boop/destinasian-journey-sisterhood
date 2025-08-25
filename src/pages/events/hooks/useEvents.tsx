
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { EventType } from "../types";

export function useEvents() {
  const { toast } = useToast();
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          profiles:created_by(display_name),
          event_bookings(id, user_id)
        `);

      if (error) throw error;

      const formattedEvents = data?.map((event: any) => ({
        id: event.id,
        title: event.title,
        description: event.description || '',
        date: new Date(event.start_date).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        time: new Date(event.start_date).toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
        location: event.location,
        coordinates: (event.latitude && event.longitude ? [event.latitude, event.longitude] : [7.2906, 80.6337]) as [number, number],
        organizer: event.profiles?.display_name || 'Unknown',
        attendees: event.event_bookings?.length || 0,
        category: "cultural", // Default category, could be added to events table
        imageUrl: event.image_url || "https://images.unsplash.com/photo-1546708770-599a3abdf230",
        attending: event.event_bookings?.some((booking: any) => booking.user_id === user?.id) || false
      })) || [];

      setEvents(formattedEvents);
    } catch (error: any) {
      setError(error.message);
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const toggleAttendance = async (eventId: number | string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const event = events.find(e => e.id === eventId);
      if (!event) return;

      if (event.attending) {
        // Remove booking
        const { error } = await supabase
          .from('event_bookings')
          .delete()
          .eq('event_id', eventId)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Add booking
        const { error } = await supabase
          .from('event_bookings')
          .insert({
            event_id: eventId,
            user_id: user.id,
            participants: 1
          });

        if (error) throw error;
      }

      // Update local state
      setEvents(events.map(e => 
        e.id === eventId 
          ? { ...e, attending: !e.attending, attendees: e.attending ? e.attendees - 1 : e.attendees + 1 } 
          : e
      ));

      toast({
        title: event.attending ? "Removed from Calendar" : "Added to Calendar",
        description: event.attending 
          ? `You are no longer attending ${event.title}` 
          : `You are now attending ${event.title}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };
  
  return { events, toggleAttendance, loading, error };
}
