import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Star, Phone, MapPin, Filter, Search } from "lucide-react";
import { useTourPackages, useTourGuides, TourPackage, TourGuide } from "@/hooks/useTours";

const Tours = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const { packages: tourPackages, loading: packagesLoading, error: packagesError } = useTourPackages();
  const { guides: tourGuides, loading: guidesLoading, error: guidesError } = useTourGuides();

  const handlePackageClick = (id: string) => {
    navigate(`/package/${id}`);
  };

  const handleContactGuide = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const sortByPrice = (items: any[], ascending: boolean = true) => {
    return [...items].sort((a, b) => ascending ? a.price - b.price : b.price - a.price);
  };

  const filterItems = (items: any[]) => {
    return items.filter(item => {
      const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.location?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLocation = locationFilter === "all" || item.location === locationFilter;
      
      return matchesSearch && matchesLocation;
    });
  };

  const getSortedPackages = () => {
    let filtered = filterItems(tourPackages);
    if (priceFilter === "low-to-high") {
      filtered = sortByPrice(filtered, true);
    } else if (priceFilter === "high-to-low") {
      filtered = sortByPrice(filtered, false);
    }
    return filtered;
  };

  const getSortedGuides = () => {
    let filtered = filterItems(tourGuides);
    if (priceFilter === "low-to-high") {
      filtered = sortByPrice(filtered, true);
    } else if (priceFilter === "high-to-low") {
      filtered = sortByPrice(filtered, false);
    }
    return filtered;
  };

  const locations = [...new Set([...tourPackages.map(p => p.location), ...tourGuides.map(g => g.location)])];

  if (packagesLoading || guidesLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-20 px-4 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg">Loading tours...</p>
          </div>
        </div>
      </div>
    );
  }

  if (packagesError || guidesError) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-20 px-4 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-red-600">Error loading tours</p>
            <p className="text-sm text-gray-500">{packagesError || guidesError}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Tours & Guides</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover curated travel packages and connect with verified female tour guides for safe and enriching experiences across Sri Lanka
            </p>
          </div>

          {/* Filters */}
          <div className="bg-secondary-feminine/20 p-6 rounded-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tours, guides, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="low-to-high">Price: Low to High</SelectItem>
                  <SelectItem value="high-to-low">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <MapPin className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="packages" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="packages">Tour Packages</TabsTrigger>
              <TabsTrigger value="guides">Tour Guides</TabsTrigger>
            </TabsList>

            {/* Tour Packages Tab */}
            <TabsContent value="packages">
              {getSortedPackages().length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No tour packages found.</p>
                  <p className="text-sm text-muted-foreground mt-2">Check back later for new packages!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {getSortedPackages().map((pkg) => (
                    <Card 
                      key={pkg.id} 
                      className="overflow-hidden interactive-slide cursor-pointer"
                      onClick={() => handlePackageClick(pkg.id)}
                    >
                      <div className="relative h-64 w-full">
                        <div 
                          className="absolute inset-0 bg-cover bg-center" 
                          style={{ backgroundImage: `url(${pkg.image})` }}
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-primary-feminine text-white">
                            ${pkg.price}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-500">{pkg.location}</span>
                          <span className="text-sm text-gray-500">• {pkg.duration}</span>
                        </div>
                        <CardTitle className="font-serif mb-2">{pkg.title}</CardTitle>
                        <CardDescription className="mb-4">{pkg.description}</CardDescription>
                        <div className="flex flex-wrap gap-2">
                          {pkg.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-secondary-feminine rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Tour Guides Tab */}
            <TabsContent value="guides">
              {getSortedGuides().length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No tour guides found.</p>
                  <p className="text-sm text-muted-foreground mt-2">Check back later for new guides!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {getSortedGuides().map((guide) => (
                    <Card key={guide.id} className="overflow-hidden">
                      <div className="relative h-64 w-full">
                        <div 
                          className="absolute inset-0 bg-cover bg-center" 
                          style={{ backgroundImage: `url(${guide.image})` }}
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-primary-feminine text-white">
                            ${guide.price}/day
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <CardTitle className="font-serif">{guide.name}</CardTitle>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{guide.rating}</span>
                            <span className="text-sm text-gray-500">({guide.reviews})</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-500">{guide.location}</span>
                        </div>

                        <p className="text-sm text-gray-600 mb-4">{guide.bio}</p>

                        <div className="mb-4">
                          <p className="text-xs font-medium text-gray-700 mb-1">Languages:</p>
                          <div className="flex flex-wrap gap-1">
                            {guide.languages.map((lang, i) => (
                              <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs">
                                {lang}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-xs font-medium text-gray-700 mb-1">Specialties:</p>
                          <div className="flex flex-wrap gap-1">
                            {guide.specialties.map((specialty, i) => (
                              <span key={i} className="px-2 py-1 bg-secondary-feminine rounded text-xs">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>

                        <Button 
                          onClick={() => handleContactGuide(guide.phone)}
                          className="w-full bg-primary-feminine hover:bg-primary-feminine/90"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Contact Guide
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Tours;