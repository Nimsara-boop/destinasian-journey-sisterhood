
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { User, Lock, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type GenderType = "male" | "female" | "non-binary" | "prefer-not-to-say" | null;
type Step = "credentials" | "gender" | "preference";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState<GenderType>(null);
  const [femaleExperience, setFemaleExperience] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>("credentials");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === "credentials") {
      // In a real app, you would validate credentials here
      if (username.trim() === "" || password.trim() === "") {
        toast({
          title: "Error",
          description: "Please enter both username and password",
          variant: "destructive",
        });
        return;
      }
      
      setCurrentStep("gender");
    } else if (currentStep === "gender") {
      if (!gender) {
        toast({
          title: "Error",
          description: "Please select your gender",
          variant: "destructive",
        });
        return;
      }
      
      if (gender === "female") {
        setCurrentStep("preference");
      } else {
        // For non-female users, go straight to the main site
        handleCompleteLogin(false);
      }
    }
  };

  const handleCompleteLogin = (femaleExperienceOnly: boolean) => {
    // Save user preferences in localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);
    localStorage.setItem("gender", gender || "");
    localStorage.setItem("femaleExperience", femaleExperienceOnly.toString());
    
    toast({
      title: "Welcome!",
      description: `You are now logged in as ${username}`,
    });
    
    // Navigate to home page
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            {currentStep === "credentials" && "Sign In"}
            {currentStep === "gender" && "Tell Us About Yourself"}
            {currentStep === "preference" && "Customize Your Experience"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {currentStep === "credentials" && "Enter your account details to continue"}
            {currentStep === "gender" && "This helps us personalize your experience"}
            {currentStep === "preference" && "Choose your preferred experience"}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {currentStep === "credentials" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    id="username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    placeholder="Enter your username"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    id="password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
            </>
          )}

          {currentStep === "gender" && (
            <div className="space-y-4">
              <Label>Gender</Label>
              <RadioGroup value={gender || ""} onValueChange={(value) => setGender(value as GenderType)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non-binary" id="non-binary" />
                  <Label htmlFor="non-binary">Non-binary</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                  <Label htmlFor="prefer-not-to-say">Prefer not to say</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {currentStep === "preference" && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Would you like an exclusively female experience?</h3>
                <p className="text-sm text-muted-foreground">
                  Our female-focused experience offers tailored travel packages and recommendations specifically designed for women travelers.
                </p>
              </div>
              
              <div className="flex flex-col space-y-4">
                <Button 
                  type="button" 
                  onClick={() => handleCompleteLogin(true)}
                  className="w-full"
                >
                  Yes, enable female-focused experience
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => handleCompleteLogin(false)}
                  className="w-full"
                >
                  No, use standard experience
                </Button>
              </div>
            </div>
          )}

          {(currentStep === "credentials" || currentStep === "gender") && (
            <Button type="submit" className="w-full">
              <LogIn className="w-4 h-4 mr-2" />
              {currentStep === "credentials" ? "Sign In" : "Continue"}
            </Button>
          )}
        </form>
      </Card>
    </div>
  );
};

export default Login;
