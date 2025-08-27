-- Drop the existing foreign key constraint that points to auth.users
ALTER TABLE public.events 
DROP CONSTRAINT events_created_by_fkey;

-- Add the correct foreign key constraint pointing to profiles.user_id
ALTER TABLE public.events 
ADD CONSTRAINT events_created_by_fkey 
FOREIGN KEY (created_by) 
REFERENCES public.profiles(user_id) 
ON DELETE CASCADE;