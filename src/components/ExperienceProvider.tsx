
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface ExperienceProviderProps {
  children: React.ReactNode;
}

const ExperienceProvider = ({ children }: ExperienceProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check login status
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    setIsLoggedIn(loggedIn);
    setLoading(false);

    // Always apply feminine theme
    document.documentElement.classList.add('female-theme');

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
    <div className="female-experience-mode">
      {children}
    </div>
  );
};

export default ExperienceProvider;
