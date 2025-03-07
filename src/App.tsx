
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Events from "./pages/events";
import EventDetail from "./pages/events/EventDetail";
import Community from "./pages/Community";
import Login from "./pages/Login";
import ExperienceProvider from "./components/ExperienceProvider";
import PackageDetail from "./pages/PackageDetail";
import SplashScreen from "./components/SplashScreen";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  
  useEffect(() => {
    // Check if user is coming from a redirect after login
    const redirectPath = localStorage.getItem("redirectAfterLogin");
    if (redirectPath) {
      // Clear the redirect path
      localStorage.removeItem("redirectAfterLogin");
      // Handle redirect if needed
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {showSplash && <SplashScreen />}
          
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Public routes (no auth required) */}
            <Route path="/" element={
              <ExperienceProvider requireAuth={false}>
                <Index />
              </ExperienceProvider>
            } />
            <Route path="/events" element={
              <ExperienceProvider requireAuth={false}>
                <Events />
              </ExperienceProvider>
            } />
            <Route path="/events/:id" element={
              <ExperienceProvider requireAuth={false}>
                <EventDetail />
              </ExperienceProvider>
            } />
            <Route path="/community" element={
              <ExperienceProvider requireAuth={false}>
                <Community />
              </ExperienceProvider>
            } />
            <Route path="/package/:id" element={
              <ExperienceProvider requireAuth={false}>
                <PackageDetail />
              </ExperienceProvider>
            } />
            
            {/* Private routes (auth required) */}
            <Route path="/profile" element={
              <ExperienceProvider requireAuth={true}>
                <Profile />
              </ExperienceProvider>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
