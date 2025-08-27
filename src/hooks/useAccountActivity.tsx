import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface AccountActivity {
  posts: {
    id: string;
    content: string;
    image_url: string;
    location: string;
    created_at: string;
    likes_count: number;
    comments_count: number;
  }[];
  likes: {
    id: string;
    post_id: string;
    created_at: string;
    post_content?: string;
  }[];
  comments: {
    id: string;
    post_id: string;
    content: string;
    created_at: string;
    post_content?: string;
  }[];
  groupMessages: {
    id: string;
    group_id: string;
    content: string;
    created_at: string;
    group_name?: string;
  }[];
  directMessages: {
    id: string;
    recipient_id: string;
    content: string;
    created_at: string;
  }[];
  eventBookings: {
    id: string;
    event_id: string;
    participants: number;
    total_amount: number;
    booked_at: string;
    event_title?: string;
  }[];
  tourBookings: {
    id: string;
    tour_id: string;
    participants: number;
    total_amount: number;
    booking_date: string;
    tour_title?: string;
  }[];
}

export function useAccountActivity(userId?: string) {
  const [activity, setActivity] = useState<AccountActivity>({
    posts: [],
    likes: [],
    comments: [],
    groupMessages: [],
    directMessages: [],
    eventBookings: [],
    tourBookings: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    fetchActivity();
  }, [userId]);

  const fetchActivity = async () => {
    try {
      setLoading(true);
      
      // Fetch all user activity in parallel
      const [
        postsResult,
        likesResult,
        commentsResult,
        groupMessagesResult,
        directMessagesResult,
        eventBookingsResult,
        tourBookingsResult
      ] = await Promise.all([
        // Posts
        supabase
          .from('posts')
          .select('id, content, image_url, location, created_at, likes_count, comments_count')
          .eq('user_id', userId)
          .order('created_at', { ascending: false }),
        
        // Likes with post info
        supabase
          .from('post_likes')
          .select(`
            id, post_id, created_at,
            posts(content)
          `)
          .eq('user_id', userId)
          .order('created_at', { ascending: false }),
        
        // Comments with post info
        supabase
          .from('post_comments')
          .select(`
            id, post_id, content, created_at,
            posts(content)
          `)
          .eq('user_id', userId)
          .order('created_at', { ascending: false }),
        
        // Group messages with group info
        supabase
          .from('group_messages')
          .select(`
            id, group_id, content, created_at,
            groups(name)
          `)
          .eq('sender_id', userId)
          .order('created_at', { ascending: false }),
        
        // Direct messages
        supabase
          .from('direct_messages')
          .select('id, recipient_id, content, created_at')
          .eq('sender_id', userId)
          .order('created_at', { ascending: false }),
        
        // Event bookings with event info
        supabase
          .from('event_bookings')
          .select(`
            id, event_id, participants, total_amount, booked_at,
            events(title)
          `)
          .eq('user_id', userId)
          .order('booked_at', { ascending: false }),
        
        // Tour bookings with tour info
        supabase
          .from('tour_bookings')
          .select(`
            id, tour_id, participants, total_amount, booking_date,
            tour_packages(title)
          `)
          .eq('user_id', userId)
          .order('booking_date', { ascending: false })
      ]);

      // Check for errors
      const results = [postsResult, likesResult, commentsResult, groupMessagesResult, directMessagesResult, eventBookingsResult, tourBookingsResult];
      const errors = results.filter(result => result.error);
      
      if (errors.length > 0) {
        console.error('Account activity fetch errors:', errors);
        throw new Error('Failed to fetch some account activity data');
      }

      setActivity({
        posts: postsResult.data || [],
        likes: (likesResult.data || []).map((like: any) => ({
          ...like,
          post_content: like.posts?.content
        })),
        comments: (commentsResult.data || []).map((comment: any) => ({
          ...comment,
          post_content: comment.posts?.content
        })),
        groupMessages: (groupMessagesResult.data || []).map((msg: any) => ({
          ...msg,
          group_name: msg.groups?.name
        })),
        directMessages: directMessagesResult.data || [],
        eventBookings: (eventBookingsResult.data || []).map((booking: any) => ({
          ...booking,
          event_title: booking.events?.title
        })),
        tourBookings: (tourBookingsResult.data || []).map((booking: any) => ({
          ...booking,
          tour_title: booking.tour_packages?.title
        }))
      });
    } catch (error: any) {
      setError(error.message);
      console.error('Error fetching account activity:', error);
    } finally {
      setLoading(false);
    }
  };

  return { activity, loading, error, refetch: fetchActivity };
}