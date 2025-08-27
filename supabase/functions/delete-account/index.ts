import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Verify the user's token and get user info
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);

    if (userError || !user) {
      console.error('Auth error:', userError);
      throw new Error('Unauthorized');
    }

    const userId = user.id;
    console.log(`Deleting account for user: ${userId}`);

    // Delete user data in correct order (respecting foreign key constraints)
    const deleteOperations = [
      // Delete dependent records first
      supabaseClient.from('post_likes').delete().eq('user_id', userId),
      supabaseClient.from('post_comments').delete().eq('user_id', userId),
      supabaseClient.from('group_messages').delete().eq('sender_id', userId),
      supabaseClient.from('direct_messages').delete().eq('sender_id', userId),
      supabaseClient.from('direct_messages').delete().eq('recipient_id', userId),
      supabaseClient.from('event_bookings').delete().eq('user_id', userId),
      supabaseClient.from('tour_bookings').delete().eq('user_id', userId),
      supabaseClient.from('profile_followers').delete().eq('follower_id', userId),
      supabaseClient.from('profile_followers').delete().eq('following_id', userId),
      supabaseClient.from('friendships').delete().or(`requester_id.eq.${userId},addressee_id.eq.${userId}`),
      supabaseClient.from('group_members').delete().eq('user_id', userId),
      supabaseClient.from('location_sharing_preferences').delete().eq('user_id', userId),
      supabaseClient.from('location_sharing_preferences').delete().eq('shared_with_user_id', userId),
      supabaseClient.from('user_locations').delete().eq('user_id', userId),
      supabaseClient.from('user_photos').delete().eq('user_id', userId),
      supabaseClient.from('event_visits').delete().eq('user_id', userId),
    ];

    const results = await Promise.allSettled(deleteOperations);
    
    // Log any failures but continue
    const failures = results.filter((result, index) => 
      result.status === 'rejected'
    );

    if (failures.length > 0) {
      console.warn('Some delete operations failed:', failures);
    }

    // Delete main records
    const mainDeleteOperations = [
      supabaseClient.from('posts').delete().eq('user_id', userId),
      supabaseClient.from('profiles').delete().eq('user_id', userId),
    ];

    await Promise.allSettled(mainDeleteOperations);

    // Finally, delete the auth user
    const { error: authDeleteError } = await supabaseClient.auth.admin.deleteUser(userId);
    
    if (authDeleteError) {
      console.error('Failed to delete auth user:', authDeleteError);
      throw new Error('Failed to delete user account');
    }

    console.log(`Successfully deleted account for user: ${userId}`);

    return new Response(
      JSON.stringify({ success: true, message: 'Account deleted successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error('Error deleting account:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: error.message === 'Unauthorized' ? 401 : 500,
      }
    );
  }
});