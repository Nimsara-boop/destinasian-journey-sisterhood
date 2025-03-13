
import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";

interface ExperienceProviderProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const ExperienceProvider = ({ children, requireAuth = false }: ExperienceProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCustomExperience, setIsCustomExperience] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check login status and preferences
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const customExperience = localStorage.getItem("customExperience") === "true";
    
    setIsLoggedIn(loggedIn);
    setIsCustomExperience(customExperience);
    setLoading(false);

    // Apply custom theme if custom experience is enabled
    if (customExperience) {
      document.documentElement.classList.add('custom-theme');
    } else {
      document.documentElement.classList.remove('custom-theme');
    }

    return () => {
      document.documentElement.classList.remove('custom-theme');
    };
  }, []);

  // This function can be called by child components to request user login
  const promptLogin = () => {
    setShowLoginPrompt(true);
    
    toast({
      title: "Login Required",
      description: "Please log in to access this feature",
    });
  };

  const handleLoginRedirect = () => {
    // Store the current location to redirect back after login
    localStorage.setItem("redirectAfterLogin", location.pathname);
    setShowLoginPrompt(false);
  };

  if (loading) {
    return <div className="h-screen w-screen flex items-center justify-center">Loading...</div>;
  }

  // Only redirect to login if auth is required and user is not logged in
  if (requireAuth && !isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={isCustomExperience ? "custom-experience-mode" : ""}>
      {/* Pass promptLogin function to children via context in a real app */}
      {React.cloneElement(children as React.ReactElement, { promptLogin })}
      
      {/* Login prompt that appears when a restricted feature is accessed */}
      {showLoginPrompt && !isLoggedIn && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 z-50 flex items-center gap-3 border border-primary/20 max-w-md w-full mx-4">
          <div className="flex-1">
            <p className="font-medium">Login Required</p>
            <p className="text-sm text-muted-foreground">Please log in to access this feature</p>
          </div>
          <Button onClick={handleLoginRedirect} size="sm" asChild>
            <a href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Log In
            </a>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExperienceProvider;
