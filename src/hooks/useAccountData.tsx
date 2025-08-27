import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useAccountData() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const exportAccountData = async (userId: string) => {
    if (!userId) return;

    try {
      setLoading(true);
      
      // Fetch all user data
      const [
        profileResult,
        postsResult,
        likesResult,
        commentsResult,
        groupMessagesResult,
        directMessagesResult,
        eventBookingsResult,
        tourBookingsResult,
        friendshipsResult,
        followersResult,
        followingResult,
        userPhotosResult,
        locationSharingResult
      ] = await Promise.all([
        supabase.from('profiles').select('*').eq('user_id', userId).single(),
        supabase.from('posts').select('*').eq('user_id', userId),
        supabase.from('post_likes').select('*').eq('user_id', userId),
        supabase.from('post_comments').select('*').eq('user_id', userId),
        supabase.from('group_messages').select('*').eq('sender_id', userId),
        supabase.from('direct_messages').select('*').eq('sender_id', userId),
        supabase.from('event_bookings').select('*').eq('user_id', userId),
        supabase.from('tour_bookings').select('*').eq('user_id', userId),
        supabase.from('friendships').select('*').or(`requester_id.eq.${userId},addressee_id.eq.${userId}`),
        supabase.from('profile_followers').select('*').eq('following_id', userId),
        supabase.from('profile_followers').select('*').eq('follower_id', userId),
        supabase.from('user_photos').select('*').eq('user_id', userId),
        supabase.from('location_sharing_preferences').select('*').eq('user_id', userId)
      ]);

      const accountData = {
        profile: profileResult.data,
        posts: postsResult.data || [],
        likes: likesResult.data || [],
        comments: commentsResult.data || [],
        groupMessages: groupMessagesResult.data || [],
        directMessages: directMessagesResult.data || [],
        eventBookings: eventBookingsResult.data || [],
        tourBookings: tourBookingsResult.data || [],
        friendships: friendshipsResult.data || [],
        followers: followersResult.data || [],
        following: followingResult.data || [],
        photos: userPhotosResult.data || [],
        locationSharing: locationSharingResult.data || [],
        exportedAt: new Date().toISOString(),
        userId: userId
      };

      // Create and download JSON file
      const dataStr = JSON.stringify(accountData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `account-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Account data exported",
        description: "Your account data has been downloaded as a JSON file.",
      });
    } catch (error: any) {
      console.error('Error exporting account data:', error);
      toast({
        title: "Export failed",
        description: "Failed to export account data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async (userId: string) => {
    if (!userId) return false;

    try {
      setLoading(true);
      
      // Call the edge function to delete the account
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      const { data, error } = await supabase.functions.invoke('delete-account', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        throw error;
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to delete account');
      }

      // Sign out the user
      await supabase.auth.signOut();
      
      toast({
        title: "Account deleted",
        description: "Your account and all associated data have been permanently deleted.",
      });

      return true;
    } catch (error: any) {
      console.error('Error deleting account:', error);
      toast({
        title: "Deletion failed",
        description: error.message || "Failed to delete account. Please try again or contact support.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { exportAccountData, deleteAccount, loading };
}