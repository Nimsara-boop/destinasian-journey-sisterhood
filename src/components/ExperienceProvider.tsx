
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import FemaleExperienceToggle from "./FemaleExperienceToggle";

interface ExperienceProviderProps {
  children: React.ReactNode;
}

const ExperienceProvider = ({ children }: ExperienceProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCustomExperience, setIsCustomExperience] = useState(false);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="h-screen w-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={isCustomExperience ? "custom-experience-mode" : ""}>
      {children}
      <FemaleExperienceToggle />
    </div>
  );
};

export default ExperienceProvider;
