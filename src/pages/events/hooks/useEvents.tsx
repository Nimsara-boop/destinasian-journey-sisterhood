
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { EventType } from "../types";

export function useEvents() {
  const { toast } = useToast();
  
  const [events, setEvents] = useState<EventType[]>([
    {
      id: 1,
      title: "Kandy Cultural Festival",
      description: "Experience the rich cultural heritage of Kandy with traditional dancing and music.",
      date: "June 15, 2024",
      time: "4:00 PM",
      location: "Temple of the Sacred Tooth Relic, Kandy, Sri Lanka",
      coordinates: [7.2906, 80.6337],
      organizer: "Sarah Chen",
      attendees: 12,
      category: "cultural",
      imageUrl: "https://images.unsplash.com/photo-1546708770-599a3abdf230",
      attending: true
    },
    {
      id: 2,
      title: "Cherry Blossom Festival",
      description: "Celebrate the blooming of cherry blossoms with traditional tea ceremonies and cultural performances.",
      date: "April 8, 2024",
      time: "10:00 AM",
      location: "Ueno Park, Tokyo, Japan",
      coordinates: [35.7148, 139.7741],
      organizer: "Tokyo Cultural Society",
      attendees: 45,
      category: "cultural",
      imageUrl: "https://images.unsplash.com/photo-1522383225653-ed111181a951",
      attending: false
    },
    {
      id: 3,
      title: "Bangkok Street Food Tour",
      description: "Explore the vibrant street food scene of Bangkok with local culinary experts.",
      date: "March 22, 2024",
      time: "6:00 PM",
      location: "Chatuchak Weekend Market, Bangkok, Thailand",
      coordinates: [13.8008, 100.5504],
      organizer: "Bangkok Food Adventures",
      attendees: 18,
      category: "food",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
      attending: true
    },
    {
      id: 4,
      title: "Bali Yoga & Wellness Retreat",
      description: "7-day yoga and meditation retreat in the serene landscapes of Ubud.",
      date: "May 12, 2024",
      time: "8:00 AM",
      location: "Ubud, Bali, Indonesia",
      coordinates: [-8.5069, 115.2625],
      organizer: "Bali Wellness Center",
      attendees: 25,
      category: "wellness",
      imageUrl: "https://images.unsplash.com/photo-1545389336-cf090694435e",
      attending: false
    },
    {
      id: 5,
      title: "Great Wall Hiking Adventure",
      description: "Guided hike along the historic Great Wall with breathtaking mountain views.",
      date: "September 15, 2024",
      time: "7:00 AM",
      location: "Mutianyu Section, Beijing, China",
      coordinates: [40.4319, 116.5704],
      organizer: "China Adventure Tours",
      attendees: 32,
      category: "outdoor",
      imageUrl: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d",
      attending: false
    },
    {
      id: 6,
      title: "Korean Traditional Music Concert",
      description: "Experience the beauty of traditional Korean music and dance performances.",
      date: "July 20, 2024",
      time: "7:30 PM",
      location: "Seoul Arts Center, Seoul, South Korea",
      coordinates: [37.4785, 127.0129],
      organizer: "Korean Cultural Foundation",
      attendees: 120,
      category: "cultural",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
      attending: true
    },
    {
      id: 7,
      title: "Singapore Night Market",
      description: "Explore Singapore's vibrant night market scene with local delicacies and crafts.",
      date: "August 5, 2024",
      time: "7:00 PM",
      location: "Maxwell Food Centre, Singapore",
      coordinates: [1.2804, 103.8434],
      organizer: "Singapore Tourism Board",
      attendees: 65,
      category: "food",
      imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b",
      attending: false
    },
    {
      id: 6,
      title: "New Year's Eve Special Dinner",
      description: "5-course gourmet dinner with live music and champagne toast at midnight.",
      date: "December 31, 2024",
      time: "8:00 PM",
      location: "Kaema Sutra Restaurant, Colombo",
      coordinates: [6.9218, 79.8562],
      organizer: "Kaema Sutra",
      attendees: 45,
      category: "food",
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      attending: false,
      isPromotion: true,
      promotionType: 'restaurant',
      rating: 4.8,
      price: "$$$",
      distance: "1.2 km"
    },
    {
      id: 7,
      title: "Weekend Poolside Brunch",
      description: "All-you-can-eat international brunch buffet with free-flowing cocktails by the infinity pool.",
      date: "Every Saturday & Sunday",
      time: "11:00 AM - 3:00 PM",
      location: "Shangri-La Hotel, Colombo",
      coordinates: [6.9277, 79.8475],
      organizer: "Shangri-La Hotel",
      attendees: 32,
      category: "food",
      imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      attending: false,
      isPromotion: true,
      promotionType: 'hotel',
      rating: 4.7,
      price: "$$$$",
      distance: "2.5 km"
    },
    {
      id: 8,
      title: "Live Jazz Night",
      description: "Enjoy the smooth sounds of jazz with our resident trio while sipping on craft cocktails.",
      date: "Every Friday",
      time: "7:00 PM - 10:00 PM",
      location: "Cafe Kumbuk, Colombo",
      coordinates: [6.9013, 79.8587],
      organizer: "Cafe Kumbuk",
      attendees: 18,
      category: "entertainment",
      imageUrl: "https://images.unsplash.com/photo-1559336197-ded8aaa244bc",
      attending: false,
      isPromotion: true,
      promotionType: 'cafe',
      rating: 4.5,
      price: "$$",
      distance: "3.1 km"
    },
    {
      id: 9,
      title: "Ayurvedic Spa Day",
      description: "Traditional Sri Lankan spa treatments including herbal baths, massages, and wellness consultations.",
      date: "Daily",
      time: "10:00 AM - 8:00 PM",
      location: "Jetwing Beach Hotel, Negombo",
      coordinates: [7.2183, 79.8358],
      organizer: "Jetwing Beach",
      attendees: 24,
      category: "wellness",
      imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef",
      attending: false,
      isPromotion: true,
      promotionType: 'hotel',
      rating: 4.9,
      price: "$$$",
      distance: "35 km"
    },
    {
      id: 10,
      title: "Sunset Seafood Dinner",
      description: "Fresh seafood caught daily, served with ocean views on our beachfront restaurant.",
      date: "Daily",
      time: "6:00 PM - 10:00 PM",
      location: "The Tuna & The Crab, Galle",
      coordinates: [6.0328, 80.2178],
      organizer: "Ministry of Crab",
      attendees: 38,
      category: "food",
      imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      attending: false,
      isPromotion: true,
      promotionType: 'restaurant',
      rating: 4.6,
      price: "$$$",
      distance: "126 km"
    }
  ]);
  
  const toggleAttendance = (eventId: number) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, attending: !event.attending, attendees: event.attending ? event.attendees - 1 : event.attendees + 1 } 
        : event
    ));
    
    const event = events.find(e => e.id === eventId);
    if (event) {
      toast({
        title: event.attending ? "Removed from Calendar" : "Added to Calendar",
        description: event.attending 
          ? `You are no longer attending ${event.title}` 
          : `You are now attending ${event.title}`,
      });
    }
  };
  
  return { events, toggleAttendance };
}
