
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Calculator, PiggyBank } from "lucide-react";
import { EventType } from "../types";
import { useToast } from "@/hooks/use-toast";

interface BudgetPlannerProps {
  event?: EventType;
}

const budgetFormSchema = z.object({
  budget: z.string().min(1, { message: "Budget is required" }),
  travelMode: z.string().min(1, { message: "Travel mode is required" }),
  comfortLevel: z.string().min(1, { message: "Comfort level is required" }),
  days: z.string().min(1, { message: "Duration is required" }),
  travelers: z.string().min(1, { message: "Number of travelers is required" }),
});

type BudgetFormValues = z.infer<typeof budgetFormSchema>;

const BudgetPlanner = ({ event }: BudgetPlannerProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [budgetPlan, setBudgetPlan] = useState<string | null>(null);
  const { toast } = useToast();
  
  const defaultValues: Partial<BudgetFormValues> = {
    budget: "",
    travelMode: "public",
    comfortLevel: "standard",
    days: "1",
    travelers: "1",
  };
  
  const form = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetFormSchema),
    defaultValues,
  });
  
  async function onSubmit(data: BudgetFormValues) {
    setIsGenerating(true);
    
    try {
      // In a real app, this would be an API call to a backend service
      // that would generate the budget plan using AI
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AI-generated plan
      const destinationName = event ? event.location.split(',')[0].trim() : "your destination";
      const budgetNum = parseFloat(data.budget);
      const travelersNum = parseInt(data.travelers);
      const daysNum = parseInt(data.days);
      
      const perPersonPerDay = budgetNum / travelersNum / daysNum;
      const accommodation = data.comfortLevel === "budget" ? 0.3 : data.comfortLevel === "standard" ? 0.4 : 0.5;
      const food = data.comfortLevel === "budget" ? 0.2 : data.comfortLevel === "standard" ? 0.25 : 0.3;
      const transport = data.travelMode === "public" ? 0.15 : data.travelMode === "rental" ? 0.25 : 0.35;
      const activities = 1 - accommodation - food - transport;
      
      const plan = `# ${event ? event.title : "Travel"} Budget Plan

## Overview
- Total Budget: $${budgetNum.toFixed(2)}
- Travelers: ${travelersNum}
- Duration: ${daysNum} day${daysNum > 1 ? 's' : ''}
- Travel Mode: ${data.travelMode.charAt(0).toUpperCase() + data.travelMode.slice(1)}
- Comfort Level: ${data.comfortLevel.charAt(0).toUpperCase() + data.comfortLevel.slice(1)}

## Budget Breakdown
- Accommodation: $${(budgetNum * accommodation).toFixed(2)} (${(accommodation * 100).toFixed(0)}%)
- Food & Drinks: $${(budgetNum * food).toFixed(2)} (${(food * 100).toFixed(0)}%)
- Transportation: $${(budgetNum * transport).toFixed(2)} (${(transport * 100).toFixed(0)}%)
- Activities & Sightseeing: $${(budgetNum * activities).toFixed(2)} (${(activities * 100).toFixed(0)}%)

## Daily Budget
- Per person: $${perPersonPerDay.toFixed(2)}/day

## Recommendations for ${destinationName}

### Accommodation
${data.comfortLevel === "budget" 
  ? "- Look for hostels, guesthouses, or budget hotels\n- Consider shared accommodations to reduce costs" 
  : data.comfortLevel === "standard" 
  ? "- Mid-range hotels or private Airbnb accommodations\n- Look for deals on booking platforms" 
  : "- Luxury hotels or resorts\n- Consider premium options with included amenities"}

### Transportation
${data.travelMode === "public" 
  ? "- Utilize local buses, trains, and public transportation\n- Consider day passes for public transit" 
  : data.travelMode === "rental" 
  ? "- Budget for car/scooter rental and fuel costs\n- Research parking availability and costs" 
  : "- Arrange for private drivers or taxis\n- Consider hiring a driver for the duration of your stay"}

### Food
${data.comfortLevel === "budget" 
  ? "- Try local street food and markets\n- Cook some meals if accommodation has kitchen facilities" 
  : data.comfortLevel === "standard" 
  ? "- Mix of local restaurants and some nicer dining experiences\n- Budget for occasional special meals" 
  : "- Fine dining experiences\n- Include premium restaurant reservations"}

### Activities
- ${event ? `Attending ${event.title}` : "Local attractions and cultural experiences"}
- Sightseeing around ${destinationName}
- ${data.comfortLevel === "luxury" ? "Premium guided tours and exclusive experiences" : "Mix of free and paid attractions"}

## Money-Saving Tips
- Book accommodation in advance
- Research free activities and attractions
- ${data.travelMode !== "public" ? "Consider using public transport occasionally to save money" : "Walk when distances are short"}
- Look for combo tickets for attractions
`;

      setBudgetPlan(plan);
      toast({
        title: "Budget Plan Generated",
        description: "Your travel budget plan is ready to download",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate budget plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  }
  
  const handleDownload = () => {
    if (!budgetPlan) return;
    
    const element = document.createElement("a");
    const file = new Blob([budgetPlan], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `budget-plan-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Downloaded",
      description: "Budget plan has been downloaded successfully",
    });
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calculator className="w-5 h-5 mr-2" />
          AI Budget Planner
        </CardTitle>
        <CardDescription>
          Generate a personalized travel budget for {event ? event.title : "your trip"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="form">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="form">Create Plan</TabsTrigger>
            <TabsTrigger value="result" disabled={!budgetPlan}>View Plan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="form" className="mt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Budget ($)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 1000" type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your total budget for the entire trip
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="travelers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Travelers</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 2" type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="days"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration (days)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 7" type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="travelMode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Travel Mode</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select travel mode" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="public">Public Transportation</SelectItem>
                          <SelectItem value="rental">Car/Scooter Rental</SelectItem>
                          <SelectItem value="private">Private Transport</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="comfortLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comfort Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select comfort level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="budget">Budget</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="luxury">Luxury</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={isGenerating}>
                  {isGenerating ? (
                    <>Generating Plan...</>
                  ) : (
                    <>
                      <PiggyBank className="mr-2 h-4 w-4" />
                      Generate Budget Plan
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="result" className="mt-4">
            {budgetPlan ? (
              <div className="space-y-4">
                <div className="bg-muted rounded-md p-4 text-sm whitespace-pre-wrap font-mono h-[400px] overflow-y-auto">
                  {budgetPlan}
                </div>
                <Button onClick={handleDownload} className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Budget Plan
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <p>Generate a budget plan first</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BudgetPlanner;
