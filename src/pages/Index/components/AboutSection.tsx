
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const AboutSection = () => {
  return (
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
  );
};

export default AboutSection;
