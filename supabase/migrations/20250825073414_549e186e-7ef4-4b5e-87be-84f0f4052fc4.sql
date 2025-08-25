-- Create posts table for community posts
CREATE TABLE public.posts (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    content TEXT,
    image_url TEXT,
    location TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    likes_count INTEGER NOT NULL DEFAULT 0,
    comments_count INTEGER NOT NULL DEFAULT 0
);

-- Enable RLS on posts
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for posts
CREATE POLICY "Users can view all posts" 
ON public.posts 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own posts" 
ON public.posts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts" 
ON public.posts 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts" 
ON public.posts 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create post_likes table
CREATE TABLE public.post_likes (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID NOT NULL,
    user_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(post_id, user_id)
);

-- Enable RLS on post_likes
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for post_likes
CREATE POLICY "Users can view all post likes" 
ON public.post_likes 
FOR SELECT 
USING (true);

CREATE POLICY "Users can like posts" 
ON public.post_likes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike their own likes" 
ON public.post_likes 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create post_comments table
CREATE TABLE public.post_comments (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID NOT NULL,
    user_id UUID NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on post_comments
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for post_comments
CREATE POLICY "Users can view all comments" 
ON public.post_comments 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create comments" 
ON public.post_comments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" 
ON public.post_comments 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments" 
ON public.post_comments 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create tour_packages table
CREATE TABLE public.tour_packages (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    price NUMERIC,
    duration_days INTEGER,
    max_participants INTEGER,
    image_url TEXT,
    location TEXT NOT NULL,
    highlights TEXT[],
    included_services TEXT[],
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    is_active BOOLEAN NOT NULL DEFAULT true
);

-- Enable RLS on tour_packages
ALTER TABLE public.tour_packages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for tour_packages
CREATE POLICY "Users can view active tour packages" 
ON public.tour_packages 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Users can create tour packages" 
ON public.tour_packages 
FOR INSERT 
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own tour packages" 
ON public.tour_packages 
FOR UPDATE 
USING (auth.uid() = created_by);

-- Create tour_bookings table
CREATE TABLE public.tour_bookings (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    tour_id UUID NOT NULL,
    user_id UUID NOT NULL,
    participants INTEGER NOT NULL DEFAULT 1,
    total_amount NUMERIC,
    booking_date DATE NOT NULL,
    special_requests TEXT,
    booking_status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on tour_bookings
ALTER TABLE public.tour_bookings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for tour_bookings
CREATE POLICY "Users can view their own tour bookings" 
ON public.tour_bookings 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own tour bookings" 
ON public.tour_bookings 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tour bookings" 
ON public.tour_bookings 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create triggers for updated_at columns
CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON public.posts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_post_comments_updated_at
    BEFORE UPDATE ON public.post_comments
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tour_packages_updated_at
    BEFORE UPDATE ON public.tour_packages
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tour_bookings_updated_at
    BEFORE UPDATE ON public.tour_bookings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Function to update post likes count
CREATE OR REPLACE FUNCTION update_post_likes_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.posts 
        SET likes_count = likes_count + 1 
        WHERE id = NEW.post_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.posts 
        SET likes_count = likes_count - 1 
        WHERE id = OLD.post_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to update post comments count
CREATE OR REPLACE FUNCTION update_post_comments_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.posts 
        SET comments_count = comments_count + 1 
        WHERE id = NEW.post_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.posts 
        SET comments_count = comments_count - 1 
        WHERE id = OLD.post_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic count updates
CREATE TRIGGER post_likes_count_trigger
    AFTER INSERT OR DELETE ON public.post_likes
    FOR EACH ROW
    EXECUTE FUNCTION update_post_likes_count();

CREATE TRIGGER post_comments_count_trigger
    AFTER INSERT OR DELETE ON public.post_comments
    FOR EACH ROW
    EXECUTE FUNCTION update_post_comments_count();