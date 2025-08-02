
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

    // Apply feminine theme if female experience is enabled
    if (femaleExperience) {
      document.documentElement.classList.add('female-theme');
    } else {
      document.documentElement.classList.remove('female-theme');
    }

    return () => {
      document.documentElement.classList.remove('female-theme');
    };
  }, []);

  if (loading) {
    return <div className="h-screen w-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={isFemaleExperience ? "female-experience-mode" : ""}>
      {children}
      <FemaleExperienceToggle />
    </div>
  );
};

export default ExperienceProvider;
