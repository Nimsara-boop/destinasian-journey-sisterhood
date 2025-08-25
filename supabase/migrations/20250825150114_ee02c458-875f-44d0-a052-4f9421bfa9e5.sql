-- Add privacy settings to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_private boolean NOT NULL DEFAULT false;

-- Add missing columns to posts table for better Instagram-like functionality
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false;

-- Create profile followers table (using post_likes as a way to track "followers")
-- This will track users who have liked posts from a specific profile
CREATE TABLE IF NOT EXISTS public.profile_followers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  follower_id uuid NOT NULL,
  following_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(follower_id, following_id)
);

-- Enable RLS on profile_followers
ALTER TABLE public.profile_followers ENABLE ROW LEVEL SECURITY;

-- Create policies for profile_followers
CREATE POLICY "Users can follow other profiles" 
ON public.profile_followers 
FOR INSERT 
WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can unfollow profiles" 
ON public.profile_followers 
FOR DELETE 
USING (auth.uid() = follower_id);

CREATE POLICY "Users can view their followers and following" 
ON public.profile_followers 
FOR SELECT 
USING (auth.uid() = follower_id OR auth.uid() = following_id);

-- Update posts RLS policy for private accounts
-- Users can view public posts and their own posts and posts from accounts they follow
DROP POLICY IF EXISTS "Users can view all posts" ON public.posts;

CREATE POLICY "Users can view accessible posts" 
ON public.posts 
FOR SELECT 
USING (
  -- Own posts
  auth.uid() = user_id 
  OR 
  -- Public posts from public accounts
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = posts.user_id 
    AND profiles.is_private = false
  )
  OR 
  -- Posts from private accounts they follow
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = posts.user_id 
    AND profiles.is_private = true
    AND EXISTS (
      SELECT 1 FROM public.profile_followers
      WHERE profile_followers.following_id = posts.user_id
      AND profile_followers.follower_id = auth.uid()
    )
  )
);