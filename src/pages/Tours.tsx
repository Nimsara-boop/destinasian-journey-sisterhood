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

export interface TourPackage {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  price: number;
  duration: string;
  location: string;
}

export interface TourGuide {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  languages: string[];
  specialties: string[];
  price: number;
  phone: string;
  location: string;
  bio: string;
}

const Tours = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const tourPackages: TourPackage[] = [
    {
      id: '1',
      title: "Women's Retreat in Ella",
      description: "A peaceful mountain hideaway with yoga and wellness activities designed exclusively for female travelers",
      image: "https://images.unsplash.com/photo-1580674684029-9947ef442203",
      tags: ["Wellness", "Mountain", "Yoga"],
      price: 250,
      duration: "3 days",
      location: "Ella"
    },
    {
      id: '2',
      title: "Beach Getaway in Mirissa",
      description: "Enjoy the pristine beaches with women-only guided tours and water activities",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      tags: ["Beach", "Tours", "Relaxation"],
      price: 180,
      duration: "2 days",
      location: "Mirissa"
    },
    {
      id: '3',
      title: "Cultural Immersion in Kandy",
      description: "Connect with local female artisans and learn traditional crafts in a safe environment",
      image: "https://images.unsplash.com/photo-1546708770-599a3abdf230",
      tags: ["Culture", "Workshops", "Heritage"],
      price: 320,
      duration: "4 days",
      location: "Kandy"
    },
    {
      id: '4',
      title: "Safari Adventure in Yala",
      description: "Female-guided wildlife safari with comfortable accommodations and safety measures",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
      tags: ["Wildlife", "Safari", "Adventure"],
      price: 420,
      duration: "3 days",
      location: "Yala"
    },
    {
      id: '5',
      title: "Tea Plantation Experience",
      description: "Explore Sri Lanka's famous tea gardens with female tea masters and local women workers",
      image: "https://images.unsplash.com/photo-1563522811-c93b3b0ed9eb",
      tags: ["Tea", "Plantation", "Local Experience"],
      price: 200,
      duration: "2 days",
      location: "Nuwara Eliya"
    },
    {
      id: '6',
      title: "Colombo City Explorer",
      description: "Urban adventure focusing on women's markets, galleries, and safe entertainment districts",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
      tags: ["City", "Shopping", "Urban"],
      price: 150,
      duration: "1 day",
      location: "Colombo"
    }
  ];

  const tourGuides: TourGuide[] = [
    {
      id: '1',
      name: "Amara Perera",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b789",
      rating: 4.9,
      reviews: 127,
      languages: ["English", "Sinhala", "Tamil"],
      specialties: ["Cultural Tours", "Wildlife", "Wellness"],
      price: 50,
      phone: "+94 77 123 4567",
      location: "Kandy",
      bio: "Certified female tour guide with 8 years of experience specializing in women's safety and cultural immersion experiences."
    },
    {
      id: '2',
      name: "Sanduni Fernando",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      rating: 4.8,
      reviews: 98,
      languages: ["English", "Sinhala"],
      specialties: ["Beach Tours", "Water Sports", "Photography"],
      price: 45,
      phone: "+94 76 987 6543",
      location: "Mirissa",
      bio: "Marine biology graduate turned tour guide, passionate about coastal ecosystems and women's adventure travel."
    },
    {
      id: '3',
      name: "Dilani Silva",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      rating: 4.7,
      reviews: 156,
      languages: ["English", "Sinhala", "German"],
      specialties: ["Tea Plantations", "Mountain Treks", "Wellness"],
      price: 55,
      phone: "+94 75 456 7890",
      location: "Ella",
      bio: "Former tea plantation manager with extensive knowledge of hill country traditions and women's wellness practices."
    },
    {
      id: '4',
      name: "Nethmi Rajapaksa",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      rating: 4.9,
      reviews: 203,
      languages: ["English", "Sinhala", "French"],
      specialties: ["Wildlife Safari", "Photography", "Conservation"],
      price: 60,
      phone: "+94 71 234 5678",
      location: "Yala",
      bio: "Wildlife conservationist and photographer offering safe safari experiences with focus on female traveler comfort."
    },
    {
      id: '5',
      name: "Ishara Wickramasinghe",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      rating: 4.6,
      reviews: 89,
      languages: ["English", "Sinhala"],
      specialties: ["City Tours", "Shopping", "Food Tours"],
      price: 40,
      phone: "+94 78 345 6789",
      location: "Colombo",
      bio: "Urban explorer specializing in women-friendly city experiences, local markets, and culinary adventures."
    }
  ];

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
            </TabsContent>

            {/* Tour Guides Tab */}
            <TabsContent value="guides">
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Tours;