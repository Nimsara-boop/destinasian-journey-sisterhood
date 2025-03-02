
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Newsletter from "@/components/Newsletter";
import EmergencyContact from "@/components/EmergencyContact";
import MapModal from "@/components/MapModal";
import HeroSection from "./components/HeroSection";
import FeaturedPackages from "./components/FeaturedPackages";
import PodcastSection from "./components/PodcastSection";
import SafetySection from "./components/SafetySection";
import CommunitySection from "./components/CommunitySection";
import FeatureSection from "./components/FeatureSection";
import AboutSection from "./components/AboutSection";
import MapButton from "./components/MapButton";
import { DestinationType } from "./components/FeaturedPackages";

const Index = () => {
  const navigate = useNavigate();
  const [isFemaleExperience, setIsFemaleExperience] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  useEffect(() => {
    const femaleExperience = localStorage.getItem("femaleExperience") === "true";
    setIsFemaleExperience(femaleExperience);

    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex(prev => {
        return (prev + 1) % (femaleExperience ? femaleQuotes.length : generalQuotes.length);
      });
    }, 10000);

    return () => clearInterval(quoteInterval);
  }, []);

  const handlePlayPodcast = (index: number) => {
    if (currentAudio === index && isPlaying) {
      setIsPlaying(false);
      setCurrentAudio(null);
    } else {
      setCurrentAudio(index);
      setIsPlaying(true);
    }
  };

  const featuredDestinations: DestinationType[] = [
    {
      id: '1',
      title: "Women's Retreat in Ella",
      description: "A peaceful mountain hideaway with yoga and wellness activities",
      image: "https://images.unsplash.com/photo-1580674684029-9947ef442203",
      tags: ["Wellness", "Mountain", "Yoga"]
    },
    {
      id: '2',
      title: "Beach Getaway in Mirissa",
      description: "Enjoy the pristine beaches with women-only guided tours",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      tags: ["Beach", "Tours", "Relaxation"]
    },
    {
      id: '3',
      title: "Cultural Immersion in Kandy",
      description: "Connect with local female artisans and learn traditional crafts",
      image: "https://images.unsplash.com/photo-1546708770-599a3abdf230",
      tags: ["Culture", "Workshops", "Heritage"]
    },
  ];

  const podcasts = [
    {
      title: "Safety Tips for Solo Female Travelers",
      host: "Sarah Chen",
      duration: "24 mins",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18"
    },
    {
      title: "Discovering Hidden Gems in Sri Lanka",
      host: "Maya Patel",
      duration: "18 mins",
      image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963"
    },
    {
      title: "Connecting with Local Women While Traveling",
      host: "Leah Johnson",
      duration: "22 mins",
      image: "https://images.unsplash.com/photo-1520222984843-df35ebc0f24d"
    },
  ];

  const safetyTips = [
    "Always share your itinerary with a trusted friend or family member",
    "Research local customs and dress codes before visiting new places",
    "Consider booking women-only accommodations for added comfort",
    "Trust your intuition and don't hesitate to remove yourself from uncomfortable situations",
    "Connect with other female travelers through our community forums"
  ];

  // These quotes are needed for the useEffect dependency
  const femaleQuotes = [
    {
      text: "A woman who follows the crowd will usually go no further than the crowd. The woman who walks alone is likely to find herself in places no one has ever been before.",
      author: "Albert Einstein"
    },
    {
      text: "The woman who travels alone is both protagonist and author of her own life story.",
      author: "Unknown"
    },
    {
      text: "Travel isn't always pretty. It isn't always comfortable. Sometimes it hurts, it even breaks your heart. But that's okay. The journey changes you; it should change you.",
      author: "Anthony Bourdain"
    },
    {
      text: "She believed she could, so she did. And saw the world along the way.",
      author: "R.S. Grey"
    }
  ];

  const generalQuotes = [
    {
      text: "Adventure is worthwhile in itself.",
      author: "Amelia Earhart"
    },
    {
      text: "Travel makes one modest. You see what a tiny place you occupy in the world.",
      author: "Gustave Flaubert"
    },
    {
      text: "The world is a book and those who do not travel read only one page.",
      author: "Saint Augustine"
    },
    {
      text: "Life begins at the end of your comfort zone.",
      author: "Neale Donald Walsch"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <EmergencyContact />
      
      <MapButton 
        isFemaleExperience={isFemaleExperience} 
        onClick={() => setIsMapModalOpen(true)} 
      />
      
      <MapModal open={isMapModalOpen} onOpenChange={setIsMapModalOpen} />
      
      <HeroSection 
        isFemaleExperience={isFemaleExperience}
        currentQuoteIndex={currentQuoteIndex}
      />

      {isFemaleExperience ? (
        <>
          <FeaturedPackages featuredDestinations={featuredDestinations} />
          
          <PodcastSection 
            podcasts={podcasts}
            currentAudio={currentAudio}
            isPlaying={isPlaying}
            onPlayPodcast={handlePlayPodcast}
          />
          
          <SafetySection safetyTips={safetyTips} />
          
          <CommunitySection />
        </>
      ) : (
        <>
          <FeatureSection />

          <Newsletter />

          <AboutSection />
        </>
      )}
    </div>
  );
};

export default Index;
