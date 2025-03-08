
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Palette } from "lucide-react";

const FemaleExperienceToggle = () => {
  const [showToggle, setShowToggle] = useState(false);
  const [customExperience, setCustomExperience] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if the user has selected custom experience preferences
    const hasCustomExperience = localStorage.getItem("customExperience") === "true";
    setCustomExperience(hasCustomExperience);
    
    // Always show the toggle - we're no longer checking for gender
    setShowToggle(true);
  }, []);

  const handleToggle = (checked: boolean) => {
    setCustomExperience(checked);
    localStorage.setItem("customExperience", checked.toString());
    
    toast({
      title: checked ? "Feminine Experience Enabled" : "Standard Experience Enabled",
      description: checked 
        ? "You'll now see content with our elegant feminine styling" 
        : "You've switched back to the standard experience",
    });

    // In a real app, this would trigger a re-render or state change in the parent component
    // For now, we'll just reload the page to simulate the experience change
    window.location.reload();
  };

  if (!showToggle) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 glass rounded-lg shadow-lg p-4 backdrop-blur-md border border-pink-200/50">
      <div className="flex items-center space-x-2">
        <Switch 
          id="custom-mode" 
          checked={customExperience}
          onCheckedChange={handleToggle}
          className="data-[state=checked]:bg-pink-400"
        />
        <Label htmlFor="custom-mode" className="text-sm font-medium flex items-center gap-1 text-foreground">
          <Palette className="h-4 w-4 text-pink-400" />
          Feminine Experience
        </Label>
      </div>
    </div>
  );
};

export default FemaleExperienceToggle;
