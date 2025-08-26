import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface TourPackage {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  price: number;
  duration: string;
  location: string;
}

export interface TourGuide {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  languages: string[];
  specialties: string[];
  price: number;
  phone: string;
  location: string;
  bio: string;
}

export function useTourPackages() {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tour_packages')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;

      const formattedPackages = data?.map((pkg: any) => ({
        id: pkg.id,
        title: pkg.title,
        description: pkg.description || '',
        image: pkg.image_url || "https://images.unsplash.com/photo-1580674684029-9947ef442203",
        tags: pkg.highlights || [],
        price: pkg.price || 0,
        duration: `${pkg.duration_days || 1} days`,
        location: pkg.location
      })) || [];

      setPackages(formattedPackages);
    } catch (error: any) {
      setError(error.message);
      console.error('Error fetching tour packages:', error);
    } finally {
      setLoading(false);
    }
  };

  return { packages, loading, error };
}

export function useTourGuides() {
  const [guides, setGuides] = useState<TourGuide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthAndFetchGuides();
  }, []);

  const checkAuthAndFetchGuides = async () => {
    try {
      setLoading(true);
      
      // Check authentication status
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);

      const { data, error } = await supabase
        .from('tour_guides')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;

      const formattedGuides = data?.map((guide: any) => ({
        id: guide.id,
        name: guide.name,
        image: guide.image_url || "https://images.unsplash.com/photo-1494790108755-2616b612b789",
        rating: parseFloat(guide.rating) || 4.5,
        reviews: guide.reviews_count || 0,
        languages: guide.languages || [],
        specialties: guide.specialties || [],
        price: guide.price_per_day || 50,
        // Only include phone number if user is authenticated
        phone: session ? (guide.phone || "") : "",
        location: guide.location || "",
        bio: guide.bio || ""
      })) || [];

      setGuides(formattedGuides);
    } catch (error: any) {
      setError(error.message);
      console.error('Error fetching tour guides:', error);
    } finally {
      setLoading(false);
    }
  };

  return { guides, loading, error, isAuthenticated };
}