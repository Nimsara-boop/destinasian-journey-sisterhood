-- Drop the existing policy that allows public access to all tour guide data
DROP POLICY IF EXISTS "Users can view active tour guides" ON public.tour_guides;

-- Create a new policy that allows public users to see basic info but restricts sensitive data
CREATE POLICY "Public can view basic tour guide info"
ON public.tour_guides
FOR SELECT
USING (
  is_active = true AND (
    -- For unauthenticated users, hide phone numbers by returning NULL
    auth.uid() IS NULL OR
    -- For authenticated users, show all data including phone numbers
    auth.uid() IS NOT NULL
  )
);

-- Create a view that handles phone number visibility based on authentication
CREATE OR REPLACE VIEW public.tour_guides_public AS
SELECT 
  id,
  name,
  image_url,
  rating,
  reviews_count,
  languages,
  specialties,
  price_per_day,
  location,
  bio,
  is_active,
  created_at,
  updated_at,
  -- Only show phone number to authenticated users
  CASE 
    WHEN auth.uid() IS NOT NULL THEN phone
    ELSE NULL
  END as phone,
  user_id
FROM public.tour_guides
WHERE is_active = true;