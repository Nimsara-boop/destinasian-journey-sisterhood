import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Group {
  id: string;
  name: string;
  location: string;
  members: number;
  lastActive: string;
  image: string;
  isOwner?: boolean;
  unreadCount?: number;
}

export interface Message {
  id: string;
  sender: {
    name: string;
    avatar: string;
  };
  preview: string;
  timestamp: string;
  unreadCount: number;
  online: boolean;
}

export function useGroups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('groups')
        .select(`
          *,
          group_members!inner(role),
          group_members_count:group_members(count)
        `)
        .eq('group_members.user_id', user.id);

      if (error) throw error;

      const formattedGroups = data?.map((group: any) => ({
        id: group.id,
        name: group.name,
        location: group.location || "Sri Lanka",
        members: group.group_members_count?.[0]?.count || 0,
        lastActive: "2 mins ago", // Could calculate from group_messages
        image: group.image_url || "https://images.unsplash.com/photo-1589308155743-4ad772863eae",
        isOwner: group.group_members?.[0]?.role === 'owner',
        unreadCount: 0 // Could calculate from unread messages
      })) || [];

      setGroups(formattedGroups);
    } catch (error: any) {
      setError(error.message);
      console.error('Error fetching groups:', error);
    } finally {
      setLoading(false);
    }
  };

  return { groups, loading, error };
}

export function useDirectMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get unique conversations with latest message
      const { data, error } = await supabase
        .from('direct_messages')
        .select(`
          *,
          sender_profile:profiles!direct_messages_sender_id_fkey(display_name, avatar_url),
          recipient_profile:profiles!direct_messages_recipient_id_fkey(display_name, avatar_url)
        `)
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group by conversation and get latest message
      const conversations = new Map();
      
      data?.forEach((msg: any) => {
        const otherUserId = msg.sender_id === user.id ? msg.recipient_id : msg.sender_id;
        const otherProfile = msg.sender_id === user.id ? msg.recipient_profile : msg.sender_profile;
        
        if (!conversations.has(otherUserId)) {
          conversations.set(otherUserId, {
            id: msg.id,
            sender: {
              name: otherProfile?.display_name || 'Unknown',
              avatar: otherProfile?.avatar_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
            },
            preview: msg.content,
            timestamp: new Date(msg.created_at).toLocaleDateString(),
            unreadCount: msg.read_at ? 0 : 1,
            online: false // Could be determined from presence
          });
        }
      });

      setMessages(Array.from(conversations.values()));
    } catch (error: any) {
      setError(error.message);
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, error };
}