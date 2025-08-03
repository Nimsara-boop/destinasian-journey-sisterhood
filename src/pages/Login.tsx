
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { User, Lock, LogIn, AlertCircle, Eye, EyeOff, Mail, Camera, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verificationImage, setVerificationImage] = useState<File | null>(null);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name.trim() || !email.trim() || !username.trim() || !password.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
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
    
    if (!verificationImage) {
      toast({
        title: "Error",
        description: "Please upload your verification photo",
        variant: "destructive",
      });
      return;
    }
    
    handleCompleteLogin();
  };

  const handleCompleteLogin = () => {
    // Save user preferences in localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);
    localStorage.setItem("femaleExperience", "true");
    
    toast({
      title: "Welcome!",
      description: `You are now logged in as ${username}`,
    });
    
    // Navigate to home page
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVerificationImage(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create Your Account</h1>
          <p className="text-muted-foreground mt-2">Join our community of confident female travelers</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                id="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                id="email" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
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

          <div className="space-y-2">
            <Label htmlFor="verification">Gender Identity Verification</Label>
            <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
              <Camera className="mx-auto w-8 h-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-4">
                Please upload a selfie holding your NIC with Latin characters for gender identity verification
              </p>
              <div className="space-y-2">
                <input
                  type="file"
                  id="verification"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('verification')?.click()}
                  className="w-full"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {verificationImage ? "Change Photo" : "Upload Verification Photo"}
                </Button>
                {verificationImage && (
                  <p className="text-sm text-green-600">
                    ✓ Photo uploaded: {verificationImage.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Button type="submit" variant="signup" className="w-full">
            <LogIn className="w-4 h-4 mr-2" />
            Create Account
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
