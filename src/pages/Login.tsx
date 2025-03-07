import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { User, Lock, LogIn, AlertCircle, Eye, EyeOff, Mountain, Building, Palmtree, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type DestinationType = "mountain" | "beach" | "city" | "village" | null;
type Step = "credentials" | "visited" | "wishlist";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visitedDestinations, setVisitedDestinations] = useState<DestinationType[]>([]);
  const [wishlistDestinations, setWishlistDestinations] = useState<DestinationType[]>([]);
  const [currentStep, setCurrentStep] = useState<Step>("credentials");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const destinationOptions = [
    { 
      type: "mountain" as DestinationType, 
      label: "Mountains", 
      icon: <Mountain className="w-5 h-5" />,
      image: "https://images.unsplash.com/photo-1483728642387-6c3bdd4587e5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
    },
    { 
      type: "beach" as DestinationType, 
      label: "Beaches", 
      icon: <Palmtree className="w-5 h-5" />,
      image: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
    },
    { 
      type: "city" as DestinationType, 
      label: "Cities", 
      icon: <Building className="w-5 h-5" />,
      image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
    },
    { 
      type: "village" as DestinationType, 
      label: "Villages", 
      icon: <MapPin className="w-5 h-5" />,
      image: "https://images.unsplash.com/photo-1518439179742-732ccb09ce6b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
    }
  ];

  useEffect(() => {
    // Check if there's a redirect path stored
    const redirectPath = localStorage.getItem("redirectAfterLogin");
    // We'll use this in handleCompleteLogin
  }, []);

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
      
      if (password !== confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
        });
        return;
      }
      
      setCurrentStep("visited");
    } else if (currentStep === "visited") {
      if (visitedDestinations.length === 0) {
        toast({
          title: "Error",
          description: "Please select at least one destination you've visited",
          variant: "destructive",
        });
        return;
      }
      
      setCurrentStep("wishlist");
    } else if (currentStep === "wishlist") {
      if (wishlistDestinations.length === 0) {
        toast({
          title: "Error",
          description: "Please select at least one destination you'd like to visit",
          variant: "destructive",
        });
        return;
      }
      
      handleCompleteLogin();
    }
  };

  const handleCompleteLogin = () => {
    // Save user preferences in localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);
    localStorage.setItem("visitedDestinations", JSON.stringify(visitedDestinations));
    localStorage.setItem("wishlistDestinations", JSON.stringify(wishlistDestinations));
    
    toast({
      title: "Welcome!",
      description: `You are now logged in as ${username}`,
    });
    
    // Check if there's a redirect path stored
    const redirectPath = localStorage.getItem("redirectAfterLogin");
    if (redirectPath) {
      localStorage.removeItem("redirectAfterLogin");
      navigate(redirectPath);
    } else {
      // Default redirect to home page
      navigate("/");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const toggleDestination = (destination: DestinationType, isVisited: boolean) => {
    if (isVisited) {
      if (visitedDestinations.includes(destination)) {
        setVisitedDestinations(visitedDestinations.filter(d => d !== destination));
      } else {
        setVisitedDestinations([...visitedDestinations, destination]);
      }
    } else {
      if (wishlistDestinations.includes(destination)) {
        setWishlistDestinations(wishlistDestinations.filter(d => d !== destination));
      } else {
        setWishlistDestinations([...wishlistDestinations, destination]);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            {currentStep === "credentials" && "Sign In"}
            {currentStep === "visited" && "Where Have You Been?"}
            {currentStep === "wishlist" && "Where Would You Like to Go?"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {currentStep === "credentials" && "Enter your account details to continue"}
            {currentStep === "visited" && "Select destinations you've already visited"}
            {currentStep === "wishlist" && "Select destinations you'd like to visit in the future"}
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
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    placeholder="Enter your password"
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    id="confirmPassword" 
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10"
                    placeholder="Confirm your password"
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={toggleConfirmPasswordVisibility}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {password !== confirmPassword && confirmPassword !== "" && (
                  <div className="text-destructive text-sm flex items-center mt-1">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Passwords do not match
                  </div>
                )}
              </div>
            </>
          )}

          {currentStep === "visited" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destinationOptions.map((destination) => (
                  <div 
                    key={destination.type} 
                    className={`relative overflow-hidden rounded-lg cursor-pointer transition-all duration-200 ${
                      visitedDestinations.includes(destination.type) 
                        ? "ring-2 ring-primary ring-offset-2" 
                        : "hover:shadow-md"
                    }`}
                    onClick={() => toggleDestination(destination.type, true)}
                  >
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={destination.image} 
                        alt={destination.label}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500";
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
                      <div className="flex items-center text-white">
                        {destination.icon}
                        <span className="ml-2 font-medium">{destination.label}</span>
                      </div>
                    </div>
                    {visitedDestinations.includes(destination.type) && (
                      <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === "wishlist" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destinationOptions.map((destination) => (
                  <div 
                    key={destination.type} 
                    className={`relative overflow-hidden rounded-lg cursor-pointer transition-all duration-200 ${
                      wishlistDestinations.includes(destination.type) 
                        ? "ring-2 ring-primary ring-offset-2" 
                        : "hover:shadow-md"
                    }`}
                    onClick={() => toggleDestination(destination.type, false)}
                  >
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={destination.image} 
                        alt={destination.label}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500";
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
                      <div className="flex items-center text-white">
                        {destination.icon}
                        <span className="ml-2 font-medium">{destination.label}</span>
                      </div>
                    </div>
                    {wishlistDestinations.includes(destination.type) && (
                      <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button type="submit" className="w-full">
            <LogIn className="w-4 h-4 mr-2" />
            {currentStep === "credentials" && "Sign In"}
            {currentStep === "visited" && "Continue"}
            {currentStep === "wishlist" && "Complete Sign In"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
