
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Newsletter from "@/components/Newsletter";
import EmergencyContact from "@/components/EmergencyContact";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { ArrowRight, MapPin, Headphones, Play, Pause, Globe, Heart, Shield } from "lucide-react";

const Index = () => {
  const [isFemaleExperience, setIsFemaleExperience] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Female empowering quotes
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

  // Adventurous general quotes
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

  useEffect(() => {
    const femaleExperience = localStorage.getItem("femaleExperience") === "true";
    setIsFemaleExperience(femaleExperience);

    // Rotate quotes every 10 seconds
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex(prev => {
        const quotes = femaleExperience ? femaleQuotes : generalQuotes;
        return (prev + 1) % quotes.length;
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

  // Female-specific content
  const featuredDestinations = [
    {
      title: "Women's Retreat in Ella",
      description: "A peaceful mountain hideaway with yoga and wellness activities",
      image: "https://images.unsplash.com/photo-1580674684029-9947ef442203",
      tags: ["Wellness", "Mountain", "Yoga"]
    },
    {
      title: "Beach Getaway in Mirissa",
      description: "Enjoy the pristine beaches with women-only guided tours",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      tags: ["Beach", "Tours", "Relaxation"]
    },
    {
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

  // Choose which quote to display based on the experience
  const quotes = isFemaleExperience ? femaleQuotes : generalQuotes;
  const currentQuote = quotes[currentQuoteIndex];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <EmergencyContact />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ 
          backgroundImage: isFemaleExperience 
            ? "url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb')" 
            : "url('https://images.unsplash.com/photo-1469041797191-50ace28483c3')"
        }}>
          <div className={`absolute inset-0 ${isFemaleExperience ? 'bg-primary/30' : 'bg-black/30'}`} />
        </div>
        <div className="relative z-10 text-center text-white px-4 animate-fade-in max-w-4xl mx-auto">
          <h1 className={`text-4xl md:text-6xl ${isFemaleExperience ? 'font-serif' : 'font-semibold'} mb-6`}>
            {isFemaleExperience 
              ? "Travel Confidently Across Asia" 
              : "Connect with Fellow Travelers in Asia"}
          </h1>
          <p className="text-xl md:text-2xl mb-8 italic">
            "{currentQuote.text}"
          </p>
          <p className="text-lg mb-8">
            — {currentQuote.author}
          </p>
          <Button
            size="lg"
            className={`${isFemaleExperience ? 'bg-primary-feminine hover:bg-primary-feminine/90' : 'bg-primary hover:bg-primary/90'} text-white`}
          >
            Start Exploring
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Featured Content - Different for female experience */}
      {isFemaleExperience ? (
        <>
          {/* Sri Lanka Travel Packages */}
          <section className="py-20 px-4 bg-secondary-feminine/30">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif mb-4">Curated Sri Lankan Experiences</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Exclusive travel packages designed for women travelers exploring the beauty and culture of Sri Lanka
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredDestinations.map((destination, index) => (
                  <Card key={index} className="overflow-hidden interactive-slide">
                    <div className="relative h-64 w-full">
                      <div 
                        className="absolute inset-0 bg-cover bg-center" 
                        style={{ backgroundImage: `url(${destination.image})` }}
                      />
                    </div>
                    <CardContent className="p-6">
                      <CardTitle className="font-serif mb-2">{destination.title}</CardTitle>
                      <CardDescription className="mb-4">{destination.description}</CardDescription>
                      <div className="flex flex-wrap gap-2">
                        {destination.tags.map((tag, i) => (
                          <span key={i} className="px-3 py-1 bg-secondary-feminine rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-10">
                <Button 
                  variant="outline" 
                  className="border-primary-feminine text-primary-feminine hover:bg-primary-feminine hover:text-white"
                >
                  View All Packages
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>
          
          {/* Podcasts */}
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif mb-4">Travel Podcasts</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Listen to stories and advice from experienced women travelers
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {podcasts.map((podcast, index) => (
                  <div key={index} className="podcast-player">
                    <div className="flex gap-4 items-center mb-4">
                      <div 
                        className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0" 
                        style={{ backgroundImage: `url(${podcast.image})` }}
                      />
                      <div>
                        <h3 className="font-semibold">{podcast.title}</h3>
                        <p className="text-sm text-gray-500">By {podcast.host}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{podcast.duration}</span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="rounded-full w-10 h-10 p-0"
                        onClick={() => handlePlayPodcast(index)}
                      >
                        {currentAudio === index && isPlaying ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Location-based Advice */}
          <section className="py-20 px-4 bg-muted-feminine">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif mb-4">Travel Safety & Advice</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Essential tips for women travelers exploring Asia
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="location-advice">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-8 h-8 text-primary-feminine" />
                    <h3 className="text-xl font-serif">Safety Tips</h3>
                  </div>
                  <ul className="space-y-4">
                    {safetyTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary-feminine text-lg">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="location-advice">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-8 h-8 text-primary-feminine" />
                    <h3 className="text-xl font-serif">Interactive Destination Guide</h3>
                  </div>
                  <p className="mb-4">Explore our interactive map with location-specific advice for women travelers.</p>
                  <div className="aspect-video bg-white rounded-lg flex items-center justify-center">
                    <Globe className="w-16 h-16 text-gray-300 animate-soft-bounce" />
                    <span className="ml-4 text-gray-500">Interactive map loading...</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Community Highlights */}
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif mb-4">Women Travelers Community</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Connect with like-minded women travelers and share your experiences
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Button 
                  size="lg" 
                  className="bg-primary-feminine hover:bg-primary-feminine/90 text-white mb-4"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Join Our Community
                </Button>
                <p className="text-gray-500">
                  Already over 5,000 women travelers sharing their journeys
                </p>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Standard Content - From the original page */}
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-semibold mb-4">What We Offer</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Everything you need to make meaningful connections and discover authentic experiences across Asia
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group cursor-pointer animate-fade-in">
                  <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517457373958-b7bdd4587205')] bg-cover bg-center group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Local Events & Meetups</h3>
                  <p className="text-gray-600">
                    Stay updated with cultural events and connect with travelers in your area
                  </p>
                </div>
                <div className="group cursor-pointer animate-fade-in">
                  <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511632765486-a01980e01a18')] bg-cover bg-center group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Community Chat Rooms</h3>
                  <p className="text-gray-600">
                    Join location-based chat rooms to meet and network with other travelers
                  </p>
                </div>
                <div className="group cursor-pointer animate-fade-in">
                  <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800')] bg-cover bg-center group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Travel Profiles</h3>
                  <p className="text-gray-600">
                    Create your travel profile and share your experiences with the community
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter Section */}
          <Newsletter />

          {/* About Section */}
          <section id="about" className="py-20 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative h-[500px] rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501555088652-021faa106b9b')] bg-cover bg-center" />
                </div>
                <div className="animate-slide-up">
                  <h2 className="text-3xl md:text-4xl font-semibold mb-6">About DestinAsian</h2>
                  <p className="text-gray-600 mb-6">
                    DestinAsian is a platform designed for solo travelers exploring Asia. We connect you with fellow adventurers, keep you informed about local events, and help you create meaningful connections wherever you go.
                  </p>
                  <p className="text-gray-600 mb-8">
                    Whether you're looking to join local festivities, find travel companions, or share your experiences, our community is here to make your journey more enriching.
                  </p>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Index;
