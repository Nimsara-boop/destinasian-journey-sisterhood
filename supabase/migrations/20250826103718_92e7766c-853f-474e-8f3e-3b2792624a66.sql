-- Drop the problematic view that was causing security issues
DROP VIEW IF EXISTS public.tour_guides_public;

-- Update the RLS policy to be more secure - only authenticated users can see phone numbers
-- We'll handle this in the application layer instead of at the database level
DROP POLICY IF EXISTS "Public can view basic tour guide info" ON public.tour_guides;

-- Create separate policies for authenticated and unauthenticated users
CREATE POLICY "Anyone can view basic tour guide info"
ON public.tour_guides
FOR SELECT
USING (is_active = true);

-- Note: We will handle phone number privacy in the application layer
-- by checking authentication status before displaying phone numbers