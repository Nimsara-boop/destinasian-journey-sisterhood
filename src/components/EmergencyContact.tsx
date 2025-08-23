
import { useState, useEffect } from "react";
import { PhoneCall, AlertCircle, X, ChevronUp, Building2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EmergencyContact {
  name: string;
  number: string;
  icon: React.ElementType;
}

interface Location {
  country: string;
  city?: string;
  region?: string;
}

// Emergency contacts by country
const emergencyContactsByCountry: Record<string, EmergencyContact[]> = {
  "Sri Lanka": [
    { name: "Police Emergency", number: "119", icon: Shield },
    { name: "Ambulance Service", number: "1990", icon: Building2 },
    { name: "Tourist Police", number: "1912", icon: Shield },
    { name: "Disaster Management", number: "117", icon: AlertCircle },
  ],
  "India": [
    { name: "Police Emergency", number: "100", icon: Shield },
    { name: "Ambulance", number: "108", icon: Building2 },
    { name: "Women's Helpline", number: "1091", icon: AlertCircle },
    { name: "Tourist Helpline", number: "1363", icon: AlertCircle },
  ],
  "Thailand": [
    { name: "Tourist Police", number: "1155", icon: Shield },
    { name: "Emergency Medical", number: "1669", icon: Building2 },
    { name: "Police", number: "191", icon: Shield },
  ],
  "default": [
    { name: "International Emergency", number: "112", icon: AlertCircle },
    { name: "Local Police", number: "Check local information", icon: Shield },
    { name: "Medical Emergency", number: "Check local information", icon: Building2 },
  ]
};

const EmergencyContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState<Location>({ country: "default" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate getting user's location
    // In a real app, you would use the Geolocation API and a reverse geocoding service
    const getUserLocation = async () => {
      try {
        setIsLoading(true);
        
        // For demo purposes, we'll just set Sri Lanka as the location
        // In a real app, you'd use APIs like:
        // 1. navigator.geolocation.getCurrentPosition()
        // 2. A reverse geocoding service like Google Maps or Mapbox
        
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setLocation({
          country: "Sri Lanka",
          city: "Colombo"
        });
      } catch (error) {
        console.error("Error getting location:", error);
        // Fallback to default emergency numbers
        setLocation({ country: "default" });
      } finally {
        setIsLoading(false);
      }
    };

    getUserLocation();
  }, []);

  const emergencyContacts = location.country && emergencyContactsByCountry[location.country] 
    ? emergencyContactsByCountry[location.country] 
    : emergencyContactsByCountry.default;

  return (
    <div className="fixed left-4 bottom-4 z-40">
      {isOpen ? (
        <Card className="w-64 shadow-lg animate-slide-up bg-white/90 backdrop-blur-sm">
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg flex items-center">
                <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                Emergency Contacts
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0" 
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : (
              <>
                <div className="text-sm mb-3 text-gray-600">
                  {location.country !== "default" ? (
                    <>Current location: <span className="font-medium">{location.city || location.country}</span></>
                  ) : (
                    <>Location unknown - showing general contacts</>
                  )}
                </div>
                
                <div className="space-y-2">
                  {emergencyContacts.map((contact, index) => {
                    const Icon = contact.icon;
                    return (
                      <div key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
                        <div className="flex items-center">
                          <Icon className="h-4 w-4 mr-2 text-primary" />
                          <span className="text-sm font-medium">{contact.name}</span>
                        </div>
                        <a 
                          href={`tel:${contact.number}`} 
                          className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-md hover:bg-primary/20 transition-colors"
                        >
                          {contact.number}
                        </a>
                      </div>
                    );
                  })}
                </div>
                
                <div className="text-xs text-gray-500 mt-3 italic">
                  In case of emergency, contact local authorities immediately
                </div>
              </>
            )}
          </div>
        </Card>
      ) : (
        <Button 
          onClick={() => setIsOpen(true)}
          size="sm" 
          className="rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg flex items-center gap-2"
        >
          <PhoneCall className="h-4 w-4" />
          Emergency Contacts
        </Button>
      )}
    </div>
  );
};

export default EmergencyContact;
