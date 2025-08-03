
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
import Tours from "./pages/Tours";
import Community from "./pages/Community";
import Login from "./pages/Login";
import ExperienceProvider from "./components/ExperienceProvider";
import PackageDetail from "./pages/PackageDetail";

const queryClient = new QueryClient();

const App = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ExperienceProvider>
                <Index />
              </ExperienceProvider>
            } />
            <Route path="/profile" element={
              <ExperienceProvider>
                <Profile />
              </ExperienceProvider>
            } />
            <Route path="/events" element={
              <ExperienceProvider>
                <Events />
              </ExperienceProvider>
            } />
            <Route path="/events/:id" element={
              <ExperienceProvider>
                <EventDetail />
              </ExperienceProvider>
            } />
            <Route path="/tours" element={
              <ExperienceProvider>
                <Tours />
              </ExperienceProvider>
            } />
            <Route path="/community" element={
              <ExperienceProvider>
                <Community />
              </ExperienceProvider>
            } />
            <Route path="/package/:id" element={<PackageDetail />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
