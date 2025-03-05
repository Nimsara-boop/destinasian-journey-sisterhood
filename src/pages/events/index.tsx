import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Search, Filter, ChevronDown, Menu, MapPin, Calendar, Users, Plus, Utensils, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EventTabs from "./components/EventTabs";
import EventGrid from "./components/EventGrid";
import MapView from "./components/MapView";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import EventCreationForm from "./components/EventCreationForm";
import { useEvents } from "./hooks/useEvents";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import EventCalendar from "./components/EventCalendar";
import BudgetPlanner from "./components/BudgetPlanner";

export default function Events() {
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [activeTab, setActiveTab] = useState("events");
  const [displayView, setDisplayView] = useState<"list" | "calendar" | "planner">("list");
  const navigate = useNavigate();
  
  const { events, toggleAttendance } = useEvents();
  
  const filteredEvents = events.filter(event => {
    const categoryMatch = filter === "all" || event.category === filter;
    const searchMatch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const tabMatch = 
      (activeTab === "events" && !event.isPromotion) || 
      (activeTab === "promotions" && event.isPromotion) ||
      activeTab === "all";
    
    return categoryMatch && searchMatch && tabMatch;
  });

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "cultural", label: "Cultural" },
    { value: "food", label: "Food & Drink" },
    { value: "outdoor", label: "Outdoor" },
    { value: "wellness", label: "Wellness" },
    { value: "community", label: "Community" },
    { value: "entertainment", label: "Entertainment" }
  ];
  
  const handleEventSelect = (eventId: number) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container max-w-7xl mx-auto pt-24 px-4 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Discover Sri Lanka</h1>
            <p className="text-muted-foreground">
              Find events, restaurants, hotels and more
            </p>
          </div>
          <div className="flex gap-2">
            <Tabs value={displayView} onValueChange={(value) => setDisplayView(value as "list" | "calendar" | "planner")}>
              <TabsList className="mb-6">
                <TabsTrigger value="planner" className="flex items-center">
                  <Calculator className="w-4 h-4 mr-2" />
                  Budget Planner
                </TabsTrigger>
                <TabsTrigger value="list">
                  <Menu className="w-4 h-4 mr-2" />
                  List View
                </TabsTrigger>
                <TabsTrigger value="calendar">
                  <Calendar className="w-4 h-4 mr-2" />
                  Calendar
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="planner" className="mt-6">
                <div className="max-w-4xl mx-auto">
                  <BudgetPlanner />
                </div>
              </TabsContent>
            </Tabs>
            
            <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a New Event</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to create your event
                  </DialogDescription>
                </DialogHeader>
                <EventCreationForm onClose={() => setIsCreateEventOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {displayView === "list" && (
          <>
            <EventTabs 
              activeTab={activeTab} 
              onTabChange={setActiveTab}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />

            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search events, restaurants, hotels..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  {activeTab === "events" || activeTab === "all" ? (
                    <div className="relative">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        Categories
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                      <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-2 z-10 hidden group-focus:block hover:block">
                        <div className="grid grid-cols-2 gap-1">
                          {categories.map((category) => (
                            <Button
                              key={category.value}
                              variant={filter === category.value ? "default" : "outline"}
                              size="sm"
                              className="justify-start"
                              onClick={() => setFilter(category.value)}
                            >
                              {category.label}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}
                  
                  {activeTab === "promotions" || activeTab === "all" ? (
                    <div className="relative">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Utensils className="w-4 h-4" />
                        Venue Type
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <Tabs value={activeTab} className="mt-0">
              {viewMode === "grid" ? (
                <EventGrid 
                  events={filteredEvents} 
                  activeTab={activeTab}
                  toggleAttendance={toggleAttendance}
                />
              ) : (
                <MapView 
                  events={filteredEvents} 
                  activeTab={activeTab}
                />
              )}
            </Tabs>
          </>
        )}
        
        {displayView === "calendar" && (
          <div className="mt-6">
            <EventCalendar 
              events={events} 
              location="Sri Lanka" 
              onEventSelect={handleEventSelect}
            />
          </div>
        )}
      </div>
    </div>
  );
}
