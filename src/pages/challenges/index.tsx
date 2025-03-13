
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { ChallengeCard } from "@/components/challenges/ChallengeCard";
import { challenges } from "@/data/challenges";
import { Challenge, ChallengeCategory } from "@/types/challenge";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Award, 
  Star, 
  Filter,
  Search 
} from "lucide-react";

const ChallengesPage = () => {
  const [allChallenges, setAllChallenges] = useState<Challenge[]>([]);
  const [activeFilter, setActiveFilter] = useState<ChallengeCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    // Simulate API call - in a real app, this would fetch from backend
    setTimeout(() => {
      // Add random completed or in-progress status to some challenges
      const processedChallenges = challenges.map(challenge => ({
        ...challenge,
        completed: Math.random() > 0.8,
        inProgress: !challenge.completed && Math.random() > 0.7
      }));
      
      setAllChallenges(processedChallenges);
    }, 300);
  }, []);
  
  const filteredChallenges = allChallenges.filter(challenge => {
    const matchesFilter = activeFilter === "all" || challenge.category === activeFilter;
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  const completedChallenges = filteredChallenges.filter(challenge => challenge.completed);
  const inProgressChallenges = filteredChallenges.filter(challenge => challenge.inProgress && !challenge.completed);
  const availableChallenges = filteredChallenges.filter(challenge => !challenge.completed && !challenge.inProgress);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Travel Challenges</h1>
            <p className="text-muted-foreground">
              Complete challenges, earn points, and unlock achievements as you explore
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search challenges..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="relative w-full sm:w-auto">
              <select
                className="w-full appearance-none bg-white border rounded-md pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value as ChallengeCategory | "all")}
              >
                <option value="all">All Categories</option>
                <option value="cultural">Cultural</option>
                <option value="nature">Nature</option>
                <option value="social">Social</option>
                <option value="creative">Creative</option>
                <option value="sustainability">Sustainability</option>
                <option value="tech">Tech</option>
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Trophy className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Total Points</div>
                      <div className="font-bold text-xl">750</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Completed</div>
                      <div className="font-bold text-xl">{completedChallenges.length}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Level</div>
                      <div className="font-bold text-xl">Explorer</div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Next Level: Adventurer</span>
                      <span>750/1000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-3">
            <Tabs defaultValue="available" className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-6">
                <TabsTrigger value="available">
                  Available
                  <Badge className="ml-2 bg-primary/10 text-primary border-none">
                    {availableChallenges.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="in-progress">
                  In Progress
                  <Badge className="ml-2 bg-primary/10 text-primary border-none">
                    {inProgressChallenges.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed
                  <Badge className="ml-2 bg-primary/10 text-primary border-none">
                    {completedChallenges.length}
                  </Badge>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="available" className="mt-0">
                {availableChallenges.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No available challenges match your filters</p>
                    {activeFilter !== "all" && (
                      <Button 
                        variant="link" 
                        onClick={() => setActiveFilter("all")}
                      >
                        Clear filters
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {availableChallenges.map(challenge => (
                      <ChallengeCard key={challenge.id} challenge={challenge} />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="in-progress" className="mt-0">
                {inProgressChallenges.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">You don't have any challenges in progress</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {inProgressChallenges.map(challenge => (
                      <ChallengeCard key={challenge.id} challenge={challenge} />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="completed" className="mt-0">
                {completedChallenges.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">You haven't completed any challenges yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {completedChallenges.map(challenge => (
                      <ChallengeCard key={challenge.id} challenge={challenge} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChallengesPage;
