
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const FemaleExperienceToggle = () => {
  const [isFemale, setIsFemale] = useState(false);
  const [showFemaleExperience, setShowFemaleExperience] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if the user is female and not already using the female experience
    const gender = localStorage.getItem("gender");
    const femaleExperience = localStorage.getItem("femaleExperience") === "true";
    
    if (gender === "female" && !femaleExperience) {
      setIsFemale(true);
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  const handleToggle = (checked: boolean) => {
    setShowFemaleExperience(checked);
    localStorage.setItem("femaleExperience", checked.toString());
    
    toast({
      title: checked ? "Female Experience Enabled" : "Standard Experience Enabled",
      description: checked 
        ? "You'll now see content tailored for women travelers" 
        : "You've switched back to the standard experience",
    });

    // In a real app, this would trigger a re-render or state change in the parent component
    // For now, we'll just reload the page to simulate the experience change
    window.location.reload();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg p-4 border border-primary/20">
      <div className="flex items-center space-x-2">
        <Switch 
          id="female-mode" 
          checked={showFemaleExperience}
          onCheckedChange={handleToggle}
        />
        <Label htmlFor="female-mode" className="text-sm font-medium">
          Female Experience
        </Label>
      </div>
    </div>
  );
};

export default FemaleExperienceToggle;
