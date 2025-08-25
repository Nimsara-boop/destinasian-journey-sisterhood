
import { useState, useEffect } from "react";
import { PhoneCall, AlertCircle, X, ChevronUp, Building2, Shield, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocationTracking } from "@/hooks/useLocationTracking";
import { useToast } from "@/hooks/use-toast";

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
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [showPermissionNotice, setShowPermissionNotice] = useState(false);
  const { startTracking, lastLocation } = useLocationTracking();
  const { toast } = useToast();

  const getCountryFromCoordinates = async (lat: number, lng: number): Promise<string> => {
    try {
      // Simple coordinate-based country detection
      // Sri Lanka: 5.9-9.8 lat, 79.5-82 lng
      if (lat >= 5.9 && lat <= 9.8 && lng >= 79.5 && lng <= 82) {
        return "Sri Lanka";
      }
      // India: 8-37 lat, 68-97 lng
      if (lat >= 8 && lat <= 37 && lng >= 68 && lng <= 97) {
        return "India";
      }
      // Thailand: 5.6-20.4 lat, 97.3-105.6 lng
      if (lat >= 5.6 && lat <= 20.4 && lng >= 97.3 && lng <= 105.6) {
        return "Thailand";
      }
      return "default";
    } catch (error) {
      console.error("Error determining country:", error);
      return "default";
    }
  };

  const requestLocationPermission = async () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Your browser doesn't support location tracking.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setShowPermissionNotice(false);

    const success = async (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      
      try {
        const country = await getCountryFromCoordinates(latitude, longitude);
        setLocation({ 
          country,
          city: country === "Sri Lanka" ? "Colombo" : undefined 
        });
        setHasLocationPermission(true);
        
        // Start location tracking to save to database
        await startTracking();
        
        toast({
          title: "Location access granted",
          description: "Emergency contacts updated for your location",
        });
      } catch (error) {
        console.error('Error processing location:', error);
        setLocation({ country: "default" });
      } finally {
        setIsLoading(false);
      }
    };

    const error = (err: GeolocationPositionError) => {
      setIsLoading(false);
      setLocation({ country: "default" });
      toast({
        title: "Location access denied",
        description: "Using default emergency contacts. Grant permission for location-specific contacts.",
        variant: "destructive",
      });
    };

    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5 minutes
    });
  };

  useEffect(() => {
    if (!hasLocationPermission) {
      setShowPermissionNotice(true);
      setIsLoading(false);
    }
  }, [hasLocationPermission]);

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
            
            {showPermissionNotice ? (
              <div className="space-y-3">
                <div className="flex items-center text-sm text-amber-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="font-medium">Location Access Needed</span>
                </div>
                <p className="text-xs text-gray-600">
                  We need your location to show relevant emergency contacts and share your location with chosen friends on the map.
                </p>
                <div className="flex flex-col gap-2">
                  <Button 
                    onClick={requestLocationPermission}
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <MapPin className="h-3 w-3 mr-1" />
                    Allow Location Access
                  </Button>
                  <Button 
                    onClick={() => {
                      setShowPermissionNotice(false);
                      setLocation({ country: "default" });
                    }}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    Use Default Contacts
                  </Button>
                </div>
              </div>
            ) : isLoading ? (
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
