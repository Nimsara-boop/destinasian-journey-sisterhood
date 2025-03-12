
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
      location: "Temple of the Sacred Tooth Relic, Kandy",
      coordinates: [7.2906, 80.6337],
      organizer: "Sarah Chen",
      attendees: 12,
      category: "cultural",
      imageUrl: "https://images.unsplash.com/photo-1546708770-599a3abdf230?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      attending: true
    },
    {
      id: 2,
      title: "Beach Cleanup Initiative",
      description: "Join us in cleaning up Mirissa Beach and preserving its natural beauty.",
      date: "July 3, 2024",
      time: "9:00 AM",
      location: "Mirissa Beach, Southern Province",
      coordinates: [5.9482, 80.4525],
      organizer: "Maya Patel",
      attendees: 8,
      category: "community",
      imageUrl: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      attending: false
    },
    {
      id: 3,
      title: "Ella Hiking Adventure",
      description: "Group hike to Little Adam's Peak followed by a picnic with stunning views.",
      date: "August 10, 2024",
      time: "7:30 AM",
      location: "Little Adam's Peak, Ella",
      coordinates: [6.8667, 81.0466],
      organizer: "Leah Johnson",
      attendees: 15,
      category: "outdoor",
      imageUrl: "https://images.unsplash.com/photo-1580674684029-9947ef442203?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      attending: false
    },
    {
      id: 4,
      title: "Colombo Food Tour",
      description: "Sample the best street food Colombo has to offer with local guides.",
      date: "September 5, 2024",
      time: "6:00 PM",
      location: "Galle Face Green, Colombo",
      coordinates: [6.9271, 79.8612],
      organizer: "David Lee",
      attendees: 10,
      category: "food",
      imageUrl: "https://images.unsplash.com/photo-1567529854900-8afc0aca3ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      attending: true
    },
    {
      id: 5,
      title: "Yoga Retreat in Sigiriya",
      description: "Two-day yoga and meditation retreat near the ancient rock fortress.",
      date: "October 15, 2024",
      time: "10:00 AM",
      location: "Sigiriya, Central Province",
      coordinates: [7.9570, 80.7603],
      organizer: "Emma Wilson",
      attendees: 6,
      category: "wellness",
      imageUrl: "https://images.unsplash.com/photo-1586041828039-b8d193d6d1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
      imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
      imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
      imageUrl: "https://images.unsplash.com/photo-1559336197-ded8aaa244bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
      imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
      imageUrl: "https://images.unsplash.com/photo-1607478900766-efe13248b125?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
  
  const addEvent = (newEvent: EventType) => {
    setEvents(prevEvents => [newEvent, ...prevEvents]);
    
    toast({
      title: "Event Published",
      description: `Your event "${newEvent.title}" is now visible to the community!`,
    });
  };
  
  return { events, toggleAttendance, addEvent };
}
