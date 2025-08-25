-- Create post_likes table
CREATE TABLE IF NOT EXISTS public.post_likes (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID NOT NULL,
    user_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(post_id, user_id)
);

ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;

-- Create post_comments table
CREATE TABLE IF NOT EXISTS public.post_comments (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID NOT NULL,
    user_id UUID NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;

-- Create tour_packages table
CREATE TABLE IF NOT EXISTS public.tour_packages (
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

ALTER TABLE public.tour_packages ENABLE ROW LEVEL SECURITY;

-- Create tour_bookings table
CREATE TABLE IF NOT EXISTS public.tour_bookings (
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

ALTER TABLE public.tour_bookings ENABLE ROW LEVEL SECURITY;

-- Add missing columns to posts table if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'likes_count') THEN
        ALTER TABLE public.posts ADD COLUMN likes_count INTEGER NOT NULL DEFAULT 0;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'comments_count') THEN
        ALTER TABLE public.posts ADD COLUMN comments_count INTEGER NOT NULL DEFAULT 0;
    END IF;
END $$;