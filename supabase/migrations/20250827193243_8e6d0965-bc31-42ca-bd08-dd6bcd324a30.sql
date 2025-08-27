-- Add foreign key constraint from events.created_by to profiles.user_id
ALTER TABLE public.events 
ADD CONSTRAINT events_created_by_fkey 
FOREIGN KEY (created_by) 
REFERENCES public.profiles(user_id) 
ON DELETE CASCADE;