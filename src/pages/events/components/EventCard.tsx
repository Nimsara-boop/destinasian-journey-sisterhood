
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import {
  Calendar, Clock, MapPin, Users, ArrowRight, Star, 
  Utensils, Hotel, Coffee 
} from "lucide-react";
import { EventType } from "../types";

interface EventCardProps {
  event: EventType;
  toggleAttendance: (eventId: number) => void;
  isLoggedIn: boolean;
}

const EventCard = ({ event, toggleAttendance, isLoggedIn }: EventCardProps) => {
  const navigate = useNavigate();
  // Helper function to render rating stars
  const renderRating = (rating: number = 0) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
        <span className="text-sm font-medium ml-1">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const getPromotionIcon = (type?: string) => {
    switch (type) {
      case 'restaurant':
        return <Utensils className="w-4 h-4 text-orange-500" />;
      case 'hotel':
        return <Hotel className="w-4 h-4 text-blue-500" />;
      case 'cafe':
        return <Coffee className="w-4 h-4 text-brown-500" />;
      default:
        return <MapPin className="w-4 h-4 text-muted-foreground" />;
    }
  };

  // Display differently based on whether it's a promotion or regular event
  if (event.isPromotion) {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-shadow" isClickable>
        <Link to={`/events/${event.id}`} className="block">
          <div className="relative h-48">
            <img 
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <Badge 
              className="absolute top-2 right-2 capitalize"
              variant="secondary"
            >
              {event.promotionType}
            </Badge>
            
            {event.price && (
              <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                {event.price}
              </div>
            )}
          </div>
        </Link>
        <CardContent className="p-4">
          <Link to={`/events/${event.id}`} className="block">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg">{event.title}</h3>
              {event.rating && renderRating(event.rating)}
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2 text-sm">
                <div className="mt-1">
                  {getPromotionIcon(event.promotionType)}
                </div>
                <div>
                  <span className="font-medium">{event.organizer}</span>
                  {event.distance && (
                    <span className="text-xs text-muted-foreground ml-2">
                      {event.distance}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>{event.date}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{event.time}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{event.location}</span>
              </div>
            </div>
          </Link>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {event.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
              {event.attendees} people interested
            </div>
            <Button
              variant={event.attending ? "outline" : "default"}
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!isLoggedIn) {
                  navigate('/login');
                  return;
                }
                toggleAttendance(event.id);
              }}
              className="gap-1"
            >
              {event.attending ? "Saved" : "I'm Interested"}
              <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-shadow" isClickable>
        <Link to={`/events/${event.id}`} className="block">
          <div className="relative h-48">
            <img 
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <Badge 
              className="absolute top-2 right-2 capitalize"
              variant={event.attending ? "default" : "secondary"}
            >
              {event.attending ? "Attending" : event.category}
            </Badge>
          </div>
        </Link>
        <CardContent className="p-4">
          <Link to={`/events/${event.id}`} className="block">
            <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span>{event.attendees} attending</span>
              </div>
            </div>
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback>{event.organizer[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{event.organizer}</span>
            </div>
            <Button
              variant={event.attending ? "outline" : "default"}
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!isLoggedIn) {
                  navigate('/login');
                  return;
                }
                toggleAttendance(event.id);
              }}
            >
              {event.attending ? "Leave" : "Join"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
};

export default EventCard;
