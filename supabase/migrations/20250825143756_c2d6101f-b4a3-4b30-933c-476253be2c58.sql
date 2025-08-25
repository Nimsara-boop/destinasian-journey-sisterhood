-- Create tour_guides table
CREATE TABLE public.tour_guides (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  bio text,
  rating numeric DEFAULT 0,
  reviews_count integer DEFAULT 0,
  languages text[],
  specialties text[],
  price_per_day numeric,
  phone text,
  location text,
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create groups table
CREATE TABLE public.groups (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  location text,
  image_url text,
  created_by uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  is_private boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create group_members table
CREATE TABLE public.group_members (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id uuid REFERENCES public.groups(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  joined_at timestamp with time zone DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- Create direct_messages table
CREATE TABLE public.direct_messages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  read_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

-- Create group_messages table
CREATE TABLE public.group_messages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id uuid REFERENCES public.groups(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.tour_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.direct_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_messages ENABLE ROW LEVEL SECURITY;

-- Tour guides policies
CREATE POLICY "Users can view active tour guides" ON public.tour_guides
  FOR SELECT USING (is_active = true);
  
CREATE POLICY "Users can create their own tour guide profile" ON public.tour_guides
  FOR INSERT WITH CHECK (auth.uid() = user_id);
  
CREATE POLICY "Users can update their own tour guide profile" ON public.tour_guides
  FOR UPDATE USING (auth.uid() = user_id);

-- Groups policies
CREATE POLICY "Users can view public groups and their own groups" ON public.groups
  FOR SELECT USING (
    is_private = false OR 
    created_by = auth.uid() OR 
    EXISTS (SELECT 1 FROM public.group_members WHERE group_id = groups.id AND user_id = auth.uid())
  );
  
CREATE POLICY "Users can create groups" ON public.groups
  FOR INSERT WITH CHECK (auth.uid() = created_by);
  
CREATE POLICY "Group creators can update their groups" ON public.groups
  FOR UPDATE USING (auth.uid() = created_by);

-- Group members policies
CREATE POLICY "Users can view group members of accessible groups" ON public.group_members
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.groups WHERE id = group_id AND (
      is_private = false OR 
      created_by = auth.uid() OR 
      EXISTS (SELECT 1 FROM public.group_members gm WHERE gm.group_id = groups.id AND gm.user_id = auth.uid())
    ))
  );
  
CREATE POLICY "Users can join groups" ON public.group_members
  FOR INSERT WITH CHECK (auth.uid() = user_id);
  
CREATE POLICY "Users can leave groups or group owners can manage members" ON public.group_members
  FOR DELETE USING (
    auth.uid() = user_id OR 
    EXISTS (SELECT 1 FROM public.groups WHERE id = group_id AND created_by = auth.uid())
  );

-- Direct messages policies
CREATE POLICY "Users can view their own messages" ON public.direct_messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);
  
CREATE POLICY "Users can send messages" ON public.direct_messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);
  
CREATE POLICY "Users can update their own messages" ON public.direct_messages
  FOR UPDATE USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

-- Group messages policies
CREATE POLICY "Group members can view group messages" ON public.group_messages
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.group_members WHERE group_id = group_messages.group_id AND user_id = auth.uid())
  );
  
CREATE POLICY "Group members can send messages" ON public.group_messages
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (SELECT 1 FROM public.group_members WHERE group_id = group_messages.group_id AND user_id = auth.uid())
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_tour_guides_updated_at
  BEFORE UPDATE ON public.tour_guides
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
  
CREATE TRIGGER update_groups_updated_at
  BEFORE UPDATE ON public.groups
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();