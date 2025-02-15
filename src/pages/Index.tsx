
import Navbar from "@/components/Navbar";
import Newsletter from "@/components/Newsletter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 text-center text-white px-4 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-semibold mb-6">
            Connect with Fellow Travelers in Asia
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join a community of solo travelers exploring Asia's vibrant cultures, events, and destinations
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Start Exploring
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Featured Sections */}
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
    </div>
  );
};

export default Index;
