
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, MapPin, Users, Clock, Tag, Heart } from "lucide-react";
import EmergencyContact from "@/components/EmergencyContact";

// Mock data for tour packages
const tourPackages = [
  {
    id: '1',
    title: "Women's Retreat in Ella",
    description: "A peaceful mountain hideaway with yoga and wellness activities",
    image: "https://images.unsplash.com/photo-1580674684029-9947ef442203",
    price: "$599",
    duration: "5 days / 4 nights",
    location: "Ella, Sri Lanka",
    tags: ["Wellness", "Mountain", "Yoga"],
    groupSize: "8-12 women",
    highlights: [
      "Daily yoga and meditation sessions with female instructors",
      "Hike to Ella Rock with stunning views",
      "Cooking class featuring local Sri Lankan cuisine",
      "Tea plantation tour with female tea pickers",
      "Spa treatments using traditional herbal remedies"
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival & Welcome", description: "Airport pickup, transfer to retreat center, welcome dinner" },
      { day: "Day 2", title: "Mountain Yoga", description: "Morning yoga, hike to Ella Rock, evening meditation" },
      { day: "Day 3", title: "Tea & Traditions", description: "Tea plantation visit, traditional cooking class" },
      { day: "Day 4", title: "Wellness Day", description: "Spa treatments, relaxation, cultural performance" },
      { day: "Day 5", title: "Farewell", description: "Morning yoga, farewell brunch, departure" }
    ]
  },
  {
    id: '2',
    title: "Beach Getaway in Mirissa",
    description: "Enjoy the pristine beaches with women-only guided tours",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    price: "$649",
    duration: "6 days / 5 nights",
    location: "Mirissa, Sri Lanka",
    tags: ["Beach", "Tours", "Relaxation"],
    groupSize: "6-10 women",
    highlights: [
      "Sunrise beach yoga sessions",
      "Whale watching expedition with female marine biologist",
      "Women-only surf lessons with professional instructors",
      "Beachside cooking demonstration of Sri Lankan seafood dishes",
      "Island hopping tour to hidden beaches"
    ],
    itinerary: [
      { day: "Day 1", title: "Beach Welcome", description: "Airport transfer, beach hotel check-in, sunset welcome dinner" },
      { day: "Day 2", title: "Ocean Exploration", description: "Whale watching, beach relaxation, evening bonfire" },
      { day: "Day 3", title: "Surf & Sun", description: "Surf lessons, beach yoga, free time for relaxation" },
      { day: "Day 4", title: "Island Adventure", description: "Island hopping tour, snorkeling, picnic lunch" },
      { day: "Day 5", title: "Coastal Culture", description: "Visit to fishing village, cooking class, farewell dinner" },
      { day: "Day 6", title: "Departure", description: "Morning beach meditation, checkout, airport transfer" }
    ]
  },
  {
    id: '3',
    title: "Cultural Immersion in Kandy",
    description: "Connect with local female artisans and learn traditional crafts",
    image: "https://images.unsplash.com/photo-1546708770-599a3abdf230",
    price: "$529",
    duration: "4 days / 3 nights",
    location: "Kandy, Sri Lanka",
    tags: ["Culture", "Workshops", "Heritage"],
    groupSize: "6-8 women",
    highlights: [
      "Private tour of Temple of the Tooth with female guide",
      "Batik workshop with local female artisans",
      "Traditional dance performance and backstage meeting with dancers",
      "Visit to women's cooperative for handicraft demonstrations",
      "Botanical garden tour focusing on medicinal plants used by local women"
    ],
    itinerary: [
      { day: "Day 1", title: "Kandy Welcome", description: "Train journey to Kandy, hotel check-in, temple visit, welcome dinner" },
      { day: "Day 2", title: "Artisan Day", description: "Batik workshop, handicraft cooperative visit, lunch with artisans" },
      { day: "Day 3", title: "Heritage Experience", description: "Botanical gardens, traditional dance show, special dinner" },
      { day: "Day 4", title: "Farewell", description: "Morning at local market, departure" }
    ]
  }
];

const PackageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Find the package that matches the ID
  const packageData = tourPackages.find(pkg => pkg.id === id);
  
  // If package not found, redirect to home
  useEffect(() => {
    if (!packageData) {
      navigate('/');
    }
  }, [packageData, navigate]);
  
  if (!packageData) {
    return <div>Loading...</div>;
  }

  // Additional images for the gallery (mocked)
  const additionalImages = [
    packageData.image,
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
    "https://images.unsplash.com/photo-1530521954074-e64f6810b32d",
    "https://images.unsplash.com/photo-1504567961542-e24d9439a724"
  ];
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <EmergencyContact />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 pl-0" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Packages
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: Images and details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main image */}
            <div className="relative rounded-lg overflow-hidden aspect-[16/9]">
              <img 
                src={additionalImages[selectedImageIndex]} 
                alt={packageData.title} 
                className="w-full h-full object-cover"
              />
              <Button 
                size="icon"
                className="absolute top-4 right-4 bg-white/80 hover:bg-white text-primary-feminine rounded-full"
                onClick={() => setIsFavorite(prev => !prev)}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-primary-feminine text-primary-feminine' : ''}`} />
              </Button>
            </div>
            
            {/* Thumbnail gallery */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {additionalImages.map((img, i) => (
                <div 
                  key={i}
                  className={`cursor-pointer rounded-md overflow-hidden w-20 h-20 flex-shrink-0 border-2 ${selectedImageIndex === i ? 'border-primary-feminine' : 'border-transparent'}`}
                  onClick={() => setSelectedImageIndex(i)}
                >
                  <img src={img} alt={`View ${i+1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            
            {/* Package description */}
            <div>
              <h2 className="text-2xl font-serif mb-4">Description</h2>
              <p className="text-gray-600 mb-6">{packageData.description}</p>
              
              <h3 className="text-xl font-serif mb-3">Highlights</h3>
              <ul className="list-disc pl-5 mb-6 space-y-1">
                {packageData.highlights.map((highlight, index) => (
                  <li key={index} className="text-gray-600">{highlight}</li>
                ))}
              </ul>
            </div>
            
            {/* Itinerary */}
            <div>
              <h2 className="text-2xl font-serif mb-4">Itinerary</h2>
              <div className="space-y-4">
                {packageData.itinerary.map((day, index) => (
                  <Card key={index} className="border-l-4 border-l-primary-feminine/40">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <CardTitle className="text-lg font-medium">{day.day}</CardTitle>
                        <span className="text-primary-feminine font-medium">{day.title}</span>
                      </div>
                      <CardDescription>{day.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right column: Booking info */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h1 className="text-2xl font-serif mb-2">{packageData.title}</h1>
                
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-2xl font-semibold text-primary-feminine">{packageData.price}</span>
                  <span className="text-gray-500">per person</span>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <span>{packageData.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span>{packageData.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-gray-400" />
                    <span>{packageData.groupSize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span>Available Year-round</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {packageData.tags.map((tag, i) => (
                    <div key={i} className="flex items-center gap-1 px-3 py-1 bg-secondary-feminine/30 rounded-full text-xs">
                      <Tag className="w-3 h-3" />
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full bg-primary-feminine hover:bg-primary-feminine/90 mb-3">
                  Book Now
                </Button>
                
                <Button variant="outline" className="w-full border-primary-feminine text-primary-feminine hover:bg-primary-feminine/10">
                  Inquire About This Tour
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
