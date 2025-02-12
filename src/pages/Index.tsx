
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
            Discover Asia Through Her Eyes
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Journey with us as we explore the beauty, culture, and stories of Asia through a female perspective
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

      {/* Featured Stories */}
      <section id="stories" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Featured Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Immerse yourself in tales of adventure, culture, and personal growth from across Asia
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group cursor-pointer animate-fade-in">
                <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1649972904349-6e44c42644a7')] bg-cover bg-center group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-2">The Hidden Temples of Bali</h3>
                <p className="text-gray-600">
                  Discovering ancient spirituality and modern mindfulness in Indonesia's cultural heart
                </p>
              </div>
            ))}
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
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d')] bg-cover bg-center" />
            </div>
            <div className="animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6">
                DestinAsian was born from a passion to share the authentic stories of Asia through the unique perspective of its women. We believe that travel is not just about places, but about the stories, experiences, and connections we make along the way.
              </p>
              <p className="text-gray-600 mb-8">
                Through our platform, we aim to inspire, empower, and connect women travelers while showcasing the rich cultural tapestry of Asia through a feminine lens.
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
