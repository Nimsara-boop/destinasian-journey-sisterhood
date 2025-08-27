import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);

  // Check for password reset tokens in URL
  useEffect(() => {
    const validateAndSetSession = async () => {
      // Check both hash params and search params for tokens
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const searchParams = new URLSearchParams(window.location.search);
      
      const accessToken = hashParams.get('access_token') || searchParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token') || searchParams.get('refresh_token');
      const type = hashParams.get('type') || searchParams.get('type');

      // Also check for older token formats
      const token = hashParams.get('token') || searchParams.get('token');
      const tokenHash = hashParams.get('token_hash') || searchParams.get('token_hash');

      if ((accessToken && refreshToken && type === 'recovery') || (token && type === 'recovery')) {
        try {
          let sessionResult;
          
          if (accessToken && refreshToken) {
            // Modern token format
            sessionResult = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
          } else if (token) {
            // Legacy token format - verify the token
            sessionResult = await supabase.auth.verifyOtp({
              token_hash: tokenHash || token,
              type: 'recovery',
            });
          }

          const { data, error } = sessionResult || {};

          if (error) {
            throw error;
          }

          if (data.session) {
            setIsValidToken(true);
          } else {
            throw new Error('No session established');
          }
        } catch (error) {
          console.error('Token validation error:', error);
          toast({
            title: "Expired Reset Link",
            description: "This password reset link has expired. Please request a new one.",
            variant: "destructive",
          });
          navigate("/auth");
        }
      } else {
        // No valid reset token, redirect to auth page
        toast({
          title: "Invalid Reset Link",
          description: "This password reset link is invalid or has expired. Please request a new one.",
          variant: "destructive",
        });
        navigate("/auth");
      }
    };

    validateAndSetSession();
  }, [navigate, toast]);

  const validatePassword = (password: string) => {
    const errors = [];
    
    if (password.length < 8) {
      errors.push("Password must be at least eight characters long");
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push("Password must have a lowercase letter");
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must have an uppercase letter");
    }
    
    if (!/[.!@#$%^&*()\+\-=,]/.test(password)) {
      errors.push("Password must have a special character like \".!@#$%^&*()+-=,\"");
    }
    
    return errors;
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      toast({
        title: "Password Requirements Not Met",
        description: passwordErrors.join(". "),
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Password Updated Successfully",
          description: "Your password has been reset. You can now sign in with your new password.",
        });
        // Redirect to login page
        navigate("/auth");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  if (!isValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md p-6 space-y-6 text-center">
          <div>
            <h1 className="text-2xl font-bold text-destructive">Invalid Reset Link</h1>
            <p className="text-muted-foreground mt-2">
              This password reset link is invalid or has expired.
            </p>
          </div>
          <Button variant="pink" onClick={() => navigate("/auth")} className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create New Password</h1>
          <p className="text-muted-foreground mt-2">
            Enter your new password below
          </p>
        </div>

        <form onSubmit={handlePasswordReset} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                placeholder="Enter your new password"
                required
                minLength={8}
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
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                id="confirmPassword" 
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 pr-10"
                placeholder="Confirm your new password"
                required
                minLength={8}
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
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p className="font-medium">Password Requirements:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>At least eight characters long</li>
              <li>Must have a lowercase letter</li>
              <li>Must have an uppercase letter</li>
              <li>Must have a special character like ".!@#$%^&*()+-=,"</li>
            </ul>
          </div>

          <Button type="submit" variant="pink" className="w-full" disabled={loading}>
            {loading ? (
              "Updating Password..."
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Update Password
              </>
            )}
          </Button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={() => navigate("/auth")}
            className="text-sm text-muted-foreground hover:text-primary hover:underline"
          >
            <ArrowLeft className="w-3 h-3 inline mr-1" />
            Back to login
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ResetPassword;