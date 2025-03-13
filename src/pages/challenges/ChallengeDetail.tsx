
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { challenges } from "@/data/challenges";
import { Challenge } from "@/types/challenge";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Camera, Award, ArrowLeft, Upload, Edit3, Check } from "lucide-react";

const ChallengeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      const foundChallenge = challenges.find(c => c.id === id);
      setChallenge(foundChallenge || null);
      setLoading(false);
    }, 500);
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto py-12 px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!challenge) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto py-12 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Challenge Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The challenge you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/challenges')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Challenges
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto py-12 px-4">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{challenge.title}</CardTitle>
                  <CardDescription>{challenge.description}</CardDescription>
                </div>
                <Badge className="text-lg px-3 py-1 bg-primary/10 text-primary border-none">
                  {challenge.points} points
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge>{challenge.category}</Badge>
                <Badge variant="outline">
                  Difficulty: {challenge.difficulty}
                </Badge>
                {challenge.location && (
                  <Badge variant="outline">
                    Location: {challenge.location}
                  </Badge>
                )}
              </div>
              
              <Separator className="my-6" />
              
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-4">How to complete this challenge:</h3>
                
                <div className="space-y-4">
                  {challenge.requiredProof === 'photo' || challenge.requiredProof === 'both' ? (
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Camera className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Take photos as proof</h4>
                        <p className="text-sm text-muted-foreground">
                          Upload photos that show you've completed the challenge requirements.
                        </p>
                      </div>
                    </div>
                  ) : null}
                  
                  {challenge.quizQuestions && challenge.quizQuestions.length > 0 ? (
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Edit3 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Answer quiz questions</h4>
                        <p className="text-sm text-muted-foreground">
                          Complete a short quiz related to this challenge to earn full points.
                        </p>
                      </div>
                    </div>
                  ) : null}
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Earn {challenge.points} points</h4>
                      <p className="text-sm text-muted-foreground">
                        Successfully completing this challenge will earn you {challenge.points} points toward your traveler level.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Start Challenge
              </Button>
            </CardFooter>
          </Card>
          
          {challenge.quizQuestions && challenge.quizQuestions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Challenge Quiz</CardTitle>
                <CardDescription>
                  Test your knowledge to earn extra points
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  {challenge.quizQuestions.map((q, idx) => (
                    <div key={idx} className="space-y-4">
                      <h3 className="font-medium">{q.question}</h3>
                      <div className="space-y-2">
                        {q.options.map((option, optionIdx) => (
                          <div 
                            key={optionIdx}
                            className="flex items-center gap-2 p-3 border rounded-md cursor-pointer hover:bg-muted transition-colors"
                          >
                            <div className="w-6 h-6 rounded-full border flex items-center justify-center">
                              {optionIdx === q.correctAnswer && <Check className="h-4 w-4 text-primary" />}
                            </div>
                            <span>{option}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChallengeDetail;
