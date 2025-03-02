
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const CommunitySection = () => {
  return (
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
  );
};

export default CommunitySection;
