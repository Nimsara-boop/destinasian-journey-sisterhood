
import { Challenge } from "@/types/challenge";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Book, Award, BarChart2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChallengeCardProps {
  challenge: Challenge;
  compact?: boolean;
}

export function ChallengeCard({ challenge, compact = false }: ChallengeCardProps) {
  const navigate = useNavigate();
  
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      cultural: "bg-orange-100 text-orange-800",
      nature: "bg-green-100 text-green-800",
      social: "bg-blue-100 text-blue-800",
      seasonal: "bg-purple-100 text-purple-800",
      creative: "bg-pink-100 text-pink-800",
      tech: "bg-indigo-100 text-indigo-800",
      team: "bg-yellow-100 text-yellow-800",
      sustainability: "bg-emerald-100 text-emerald-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };
  
  const getDifficultyIcon = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return <span className="text-green-500">●</span>;
      case 'medium': return <span className="text-yellow-500">●●</span>;
      case 'hard': return <span className="text-red-500">●●●</span>;
      default: return null;
    }
  };
  
  const handleStartChallenge = () => {
    navigate(`/challenges/${challenge.id}`);
  };
  
  return (
    <Card className={`overflow-hidden ${challenge.completed ? 'opacity-75' : ''} hover:shadow-md transition-all duration-200`}>
      <div className="relative overflow-hidden">
        <div className={`absolute top-2 right-2 z-10 flex gap-1.5`}>
          <Badge className={getCategoryColor(challenge.category)}>
            {challenge.category.charAt(0).toUpperCase() + challenge.category.slice(1)}
          </Badge>
          {!compact && (
            <Badge variant="outline" className="bg-white">
              {getDifficultyIcon(challenge.difficulty)}
            </Badge>
          )}
        </div>
        
        <div className="h-32 bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
          {challenge.category === 'cultural' && <Book className="h-16 w-16 text-primary/40" />}
          {challenge.category === 'nature' && <Camera className="h-16 w-16 text-primary/40" />}
          {challenge.category === 'social' && <BarChart2 className="h-16 w-16 text-primary/40" />}
          {challenge.category === 'sustainability' && <Award className="h-16 w-16 text-primary/40" />}
        </div>
      </div>
      
      <CardContent className={`p-4 ${compact ? 'pb-2' : 'pb-4'}`}>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className={`${compact ? 'text-base' : 'text-lg'}`}>{challenge.title}</CardTitle>
          {!compact && (
            <div className="text-sm font-medium text-primary">{challenge.points} pts</div>
          )}
        </div>
        <CardDescription className={`${compact ? 'text-xs line-clamp-2' : 'text-sm'}`}>
          {challenge.description}
        </CardDescription>
      </CardContent>
      
      {!compact && (
        <CardFooter className="px-4 pb-4 pt-0">
          <Button 
            className="w-full" 
            variant={challenge.completed ? "outline" : "default"}
            onClick={handleStartChallenge}
          >
            {challenge.completed ? "View Completed" : challenge.inProgress ? "Continue" : "Start Challenge"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
