import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";

const RecentEventHighlights = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Mock data for recent event highlights
  const recentEventHighlights = [
    {
      id: 1,
      image: "/lovable-uploads/47ee11ca-db78-4616-baed-fafacf5986a8.png",
      title: "Tokyo Tech Meetup",
      attendees: 150,
      location: "Tokyo, Japan"
    },
    {
      id: 2,
      image: "/lovable-uploads/ab6e39c4-5a77-4f4c-a047-6d81cbc3aaeb.png",
      title: "Singapore Startup Weekend",
      attendees: 200,
      location: "Singapore"
    },
    {
      id: 3,
      image: "/lovable-uploads/47ee11ca-db78-4616-baed-fafacf5986a8.png",
      title: "Bangkok Digital Nomads",
      attendees: 120,
      location: "Bangkok, Thailand"
    },
    {
      id: 4,
      image: "/lovable-uploads/ab6e39c4-5a77-4f4c-a047-6d81cbc3aaeb.png",
      title: "Seoul Innovation Summit",
      attendees: 300,
      location: "Seoul, South Korea"
    }
  ];

  useEffect(() => {
    // Check current auth session
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setIsLoading(false);
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const ViewMoreButton = {
  <Button
    onClick={() => navigate('/community')}
    variant="outline"
    className="px-8"
  >
    View More
  </Button>
    
  }

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-bold">Recent Event Highlights</CardTitle>
            <p className="text-muted-foreground">
              See what our community members have been up to at recent events across Asia
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 3000,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {recentEventHighlights.map((highlight) => (
                  <CarouselItem key={highlight.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="relative group cursor-pointer m-4">
                      <div className="aspect-video overflow-hidden rounded-lg">
                        <img
                          src={highlight.image}
                          alt={highlight.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="font-semibold text-lg mb-1">{highlight.title}</h3>
                        <p className="text-sm text-white/80">{highlight.location}</p>
                        <p className="text-xs text-white/70 mt-1">{highlight.attendees} attendees</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </CardContent>
        </Card>
        <div className="mt-6 text-center">
                  <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            style={ViewMoreButton}
        />
    )
}


        </div>
      </div>
    </section>
  );
};

export default RecentEventHighlights;