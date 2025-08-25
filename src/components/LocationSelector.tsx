import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Loader2, Crosshair } from "lucide-react";
import { useLocationSearch, LocationResult } from "@/hooks/useLocationSearch";

interface LocationSelectorProps {
  selectedLocation?: LocationResult | null;
  onLocationSelect: (location: LocationResult | null) => void;
  placeholder?: string;
}

const LocationSelector = ({ 
  selectedLocation, 
  onLocationSelect, 
  placeholder = "Search for a location..." 
}: LocationSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentLocationLoading, setCurrentLocationLoading] = useState(false);
  const { locations, loading, searchLocations, getCurrentLocation } = useLocationSearch();

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery.length >= 2) {
        searchLocations(searchQuery);
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  const handleLocationSelect = (location: LocationResult) => {
    onLocationSelect(location);
    setSearchQuery(location.place_name_short);
    setShowDropdown(false);
  };

  const handleCurrentLocation = async () => {
    setCurrentLocationLoading(true);
    const location = await getCurrentLocation();
    if (location) {
      handleLocationSelect(location);
    }
    setCurrentLocationLoading(false);
  };

  const clearLocation = () => {
    onLocationSelect(null);
    setSearchQuery("");
    setShowDropdown(false);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="location">Location</Label>
      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              id="location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={placeholder}
              className="pr-8"
            />
            <MapPin className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleCurrentLocation}
            disabled={currentLocationLoading}
            title="Use current location"
          >
            {currentLocationLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Crosshair className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Search Results Dropdown */}
        {showDropdown && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border rounded-md shadow-lg">
            <ScrollArea className="max-h-48">
              {loading ? (
                <div className="p-3 text-center text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin mx-auto mb-2" />
                  Searching locations...
                </div>
              ) : locations.length > 0 ? (
                <div className="p-1">
                  {locations.map((location) => (
                    <div
                      key={location.id}
                      className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer"
                      onClick={() => handleLocationSelect(location)}
                    >
                      <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">
                          {location.place_name_short}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {location.place_name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : searchQuery.length >= 2 ? (
                <div className="p-3 text-center text-sm text-muted-foreground">
                  No locations found
                </div>
              ) : null}
            </ScrollArea>
          </div>
        )}
      </div>

      {/* Selected Location Display */}
      {selectedLocation && (
        <div className="flex items-center gap-2 p-2 bg-muted rounded text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="flex-1 truncate">{selectedLocation.place_name}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearLocation}
            className="h-6 px-2 text-xs"
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;