import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FemaleExperienceToggle = () => {
  const [showToggle, setShowToggle] = useState(false);
  const [customExperience, setCustomExperience] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const isCustom = localStorage.getItem("femaleExperience") === "true";
    setCustomExperience(isCustom);
    setShowToggle(true);
  }, []);

  const handleToggle = (checked: boolean) => {
    setCustomExperience(checked);
    localStorage.setItem("femaleExperience", checked.toString());
    
    toast({
      title: checked ? "Female Experience Enabled" : "Standard Experience Enabled",
      description: checked 
        ? "Content now tailored for female travelers" 
        : "Showing general travel content",
    });
    
    // Reload the page to apply the change
    window.location.reload();
  };

  if (!showToggle) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-white/95 backdrop-blur-sm border rounded-lg p-4 shadow-lg">
      <div className="flex items-center space-x-3">
        <Palette className="h-4 w-4 text-pink-500" />
        <Label htmlFor="female-experience" className="text-sm font-medium">
          Feminine Experience
        </Label>
        <Switch
          id="female-experience"
          checked={customExperience}
          onCheckedChange={handleToggle}
          className="data-[state=checked]:bg-pink-500"
        />
      </div>
    </div>
  );
};

export default FemaleExperienceToggle;