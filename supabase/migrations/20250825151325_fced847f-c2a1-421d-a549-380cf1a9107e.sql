-- Add location sharing settings to profiles
ALTER TABLE public.profiles 
ADD COLUMN location_sharing_enabled boolean DEFAULT false,
ADD COLUMN location_visible_to_followers boolean DEFAULT false;

-- Create location sharing preferences table for granular control
CREATE TABLE public.location_sharing_preferences (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  shared_with_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, shared_with_user_id)
);

-- Enable RLS on location sharing preferences
ALTER TABLE public.location_sharing_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies for location sharing preferences
CREATE POLICY "Users can manage their own location sharing preferences" 
ON public.location_sharing_preferences 
FOR ALL 
USING (auth.uid() = user_id);

CREATE POLICY "Users can view location sharing preferences where they are involved" 
ON public.location_sharing_preferences 
FOR SELECT 
USING (auth.uid() = user_id OR auth.uid() = shared_with_user_id);

-- Update user_locations RLS policy to include location sharing preferences
DROP POLICY IF EXISTS "Users can view friends' locations" ON public.user_locations;

CREATE POLICY "Users can view allowed locations" 
ON public.user_locations 
FOR SELECT 
USING (
  auth.uid() = user_id OR 
  (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.user_id = user_locations.user_id 
      AND profiles.location_sharing_enabled = true
      AND (
        profiles.location_visible_to_followers = false OR
        (profiles.location_visible_to_followers = true AND EXISTS (
          SELECT 1 FROM public.profile_followers 
          WHERE profile_followers.following_id = user_locations.user_id 
          AND profile_followers.follower_id = auth.uid()
        ))
      )
    ) OR
    EXISTS (
      SELECT 1 FROM public.location_sharing_preferences 
      WHERE location_sharing_preferences.user_id = user_locations.user_id 
      AND location_sharing_preferences.shared_with_user_id = auth.uid()
    )
  )
);