
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import FemaleExperienceToggle from "./FemaleExperienceToggle";

interface ExperienceProviderProps {
  children: React.ReactNode;
}

const ExperienceProvider = ({ children }: ExperienceProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFemaleExperience, setIsFemaleExperience] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check login status and preferences
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const femaleExperience = localStorage.getItem("femaleExperience") === "true";
    
    setIsLoggedIn(loggedIn);
    setIsFemaleExperience(femaleExperience);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="h-screen w-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // If the user has selected the female experience, we would show different content here
  // For now, we're just adding a className to the wrapper for demonstration
  return (
    <div className={isFemaleExperience ? "female-experience-mode" : ""}>
      {children}
      <FemaleExperienceToggle />
    </div>
  );
};

export default ExperienceProvider;
