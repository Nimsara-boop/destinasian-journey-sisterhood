import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import * as motion from "motion/react-client";
import { useEventHighlights } from "@/hooks/useEventHighlights";

const RecentEventHighlights = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  const { highlights: recentEventHighlights, loading: highlightsLoading } = useEventHighlights();

  const ViewMoreButton = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1
      }}
      whileHover={{
        y: [0, -8, 0],
        transition: { 
          duration: 0.6, 
          ease: "easeInOut" 
        }
      }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 }
      }}
    >
      <Button
        variant="pink"
        onClick={() => navigate('/events')}
        className="px-8 py-3"
      >
        View All Events
      </Button>
    </motion.div>
  );

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

  // Show loading state
  if (isLoading || highlightsLoading) {
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

  // Don't render if no events - show empty state instead
  const showEmptyState = recentEventHighlights.length === 0;

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
            {showEmptyState ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No recent events yet.</p>
                <p className="text-sm text-muted-foreground mt-2">Check back soon for exciting events from our community!</p>
              </div>
            ) : (
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
            )}
          </CardContent>
        </Card>
        <div className="mt-6 text-center">
          <ViewMoreButton />
        </div>
      </div>
    </section>
  );
};

export default RecentEventHighlights;