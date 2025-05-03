
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export interface DestinationType {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

interface FeaturedPackagesProps {
  featuredDestinations: DestinationType[];
}

const FeaturedPackages = ({ featuredDestinations }: FeaturedPackagesProps) => {
  const navigate = useNavigate();

  const handlePackageClick = (id: string) => {
    navigate(`/packages/${id}`);
  };

  return (
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
            <Card 
              key={index} 
              className="overflow-hidden interactive-slide cursor-pointer"
              onClick={() => handlePackageClick(destination.id)}
            >
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
            onClick={() => navigate('/packages')}
          >
            View All Packages
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
