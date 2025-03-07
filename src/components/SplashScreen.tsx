
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Globe, Users } from "lucide-react";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  
  useEffect(() => {
    // Check if splash screen was already dismissed
    const hasSeenSplash = localStorage.getItem("hasSeenSplash") === "true";
    if (hasSeenSplash) {
      setDismissed(true);
    }
    
    // Auto-advance slides
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev < 2 ? prev + 1 : prev));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleDismiss = () => {
    localStorage.setItem("hasSeenSplash", "true");
    setDismissed(true);
  };
  
  const handleExplore = () => {
    localStorage.setItem("hasSeenSplash", "true");
    navigate("/");
    setDismissed(true);
  };
  
  if (dismissed) {
    return null;
  }
  
  const slides = [
    {
      title: "Welcome to DestinAsian",
      description: "Your ultimate companion for exploring Asia's most beautiful destinations",
      icon: <Globe className="w-16 h-16 text-primary mb-6" />
    },
    {
      title: "Discover Local Experiences",
      description: "Find events, meet fellow travelers, and create unforgettable memories",
      icon: <MapPin className="w-16 h-16 text-accent mb-6" />
    },
    {
      title: "Join Our Community",
      description: "Connect with travelers, share stories, and get personalized recommendations",
      icon: <Users className="w-16 h-16 text-primary mb-6" />
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-secondary to-background flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4 border border-secondary">
        <div className="text-center">
          {slides[currentSlide].icon}
          <h1 className="text-2xl font-bold mb-2 text-primary">{slides[currentSlide].title}</h1>
          <p className="text-muted-foreground mb-8">{slides[currentSlide].description}</p>
          
          <div className="flex justify-center gap-2 mb-8">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? "bg-accent" : "bg-gray-200"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
          
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1 border-primary text-primary" onClick={handleDismiss}>
              Skip
            </Button>
            <Button className="flex-1 bg-accent hover:bg-accent/90 text-white" onClick={handleExplore}>
              Start Exploring
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
