
import { useNavigate } from "react-router-dom";

const FeatureSection = () => {
  return (
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
  );
};

export default FeatureSection;
