
import { useEffect, useState } from "react";
import { Challenge } from "@/types/challenge";
import { challenges } from "@/data/challenges";
import { ChallengeCard } from "./ChallengeCard";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  Award,
  ChevronRight as ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChallengesSectionProps {
  isFemaleExperience?: boolean;
}

export function ChallengesSection({ isFemaleExperience = false }: ChallengesSectionProps) {
  const [featuredChallenges, setFeaturedChallenges] = useState<Challenge[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const itemsPerPage = 3;
  
  useEffect(() => {
    // Filter challenges that should be featured on homepage
    const featured = challenges
      .filter(challenge => challenge.featuredOnHomepage)
      .map(challenge => ({
        ...challenge,
        // Randomly set some challenges as in progress or completed for demo
        inProgress: Math.random() > 0.7,
        completed: Math.random() > 0.85
      }));
      
    setFeaturedChallenges(featured);
  }, []);
  
  const handlePrev = () => {
    setCurrentIndex(prev => 
      prev === 0 ? Math.max(0, Math.ceil(featuredChallenges.length / itemsPerPage) - 1) : prev - 1
    );
  };
  
  const handleNext = () => {
    setCurrentIndex(prev => 
      prev === Math.max(0, Math.ceil(featuredChallenges.length / itemsPerPage) - 1) ? 0 : prev + 1
    );
  };
  
  const currentChallenges = featuredChallenges.slice(
    currentIndex * itemsPerPage, 
    currentIndex * itemsPerPage + itemsPerPage
  );
  
  return (
    <section className={`py-16 px-4 ${isFemaleExperience ? 'bg-secondary-feminine/20' : 'bg-muted'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className={`text-3xl ${isFemaleExperience ? 'font-serif' : 'font-semibold'} mb-2`}>
              Travel Challenges
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Complete challenges, earn points, and unlock achievements as you explore Asia. Perfect for solo travelers looking to add excitement to their journey.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hidden md:flex"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hidden md:flex"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentChallenges.map(challenge => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
        
        <div className="mt-6 flex items-center justify-center md:justify-between">
          <div className="hidden md:block">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Your points: 750</span>
            </div>
          </div>
          
          <div className="flex md:hidden gap-2 mb-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <Button 
            onClick={() => navigate('/challenges')}
            className={isFemaleExperience ? 'bg-primary-feminine hover:bg-primary-feminine/90' : ''}
          >
            View All Challenges
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
