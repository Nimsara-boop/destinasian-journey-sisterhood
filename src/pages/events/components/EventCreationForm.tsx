
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { DialogFooter } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link2, Copy } from "lucide-react";
import { EventType } from "../types";
import { useEvents } from "../hooks/useEvents";

interface EventCreationFormProps {
  onClose: () => void;
}

const EventCreationForm = ({ onClose }: EventCreationFormProps) => {
  const { toast } = useToast();
  const { addEvent } = useEvents();
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventPrivacy, setEventPrivacy] = useState("public");
  const [eventLink, setEventLink] = useState("");
  const [isLinkGenerated, setIsLinkGenerated] = useState(false);

  const handleCreateEvent = () => {
    if (!eventTitle || !eventDate || !eventTime || !eventLocation) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Generate random ID for the event
    const randomId = Math.random().toString(36).substring(2, 8);
    let newLink = "";
    
    // Generate an invitation link for private events
    if (eventPrivacy === "private") {
      newLink = `https://srilanka-travel.com/events/invite/${randomId}`;
      setEventLink(newLink);
      setIsLinkGenerated(true);
    }
    
    // Create the new event
    const newEvent: EventType = {
      id: Date.now(),
      title: eventTitle,
      description: eventDescription || "No description provided",
      date: eventDate,
      time: eventTime,
      location: eventLocation,
      coordinates: [7.8731, 80.7718], // Default coordinates for Sri Lanka
      organizer: "Current User",
      attendees: 1,
      category: "cultural", // Default category
      imageUrl: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Default image
      attending: true,
      isPrivate: eventPrivacy === "private",
      inviteLink: newLink
    };
    
    // Add the event to the events list
    if (eventPrivacy === "public") {
      addEvent(newEvent);
    }
    
    toast({
      title: "Event Created",
      description: "Your event has been successfully created!",
    });
    
    // Close the dialog
    onClose();
  };

  const copyLinkToClipboard = () => {
    if (!isLinkGenerated && eventPrivacy === "private") {
      const randomId = Math.random().toString(36).substring(2, 8);
      const newLink = `https://srilanka-travel.com/events/invite/${randomId}`;
      setEventLink(newLink);
      setIsLinkGenerated(true);
    }
    
    navigator.clipboard.writeText(eventLink);
    toast({
      title: "Link Copied",
      description: "Event invitation link copied to clipboard!"
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="event-title">Event Title *</Label>
        <Input
          id="event-title"
          placeholder="Enter event title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="event-date">Date *</Label>
          <Input
            id="event-date"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="event-time">Time *</Label>
          <Input
            id="event-time"
            type="time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="event-location">Location in Sri Lanka *</Label>
        <Input
          id="event-location"
          placeholder="Enter location"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="event-description">Description</Label>
        <Textarea
          id="event-description"
          placeholder="Describe your event..."
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <div>
        <Label>Event Privacy</Label>
        <RadioGroup 
          value={eventPrivacy} 
          onValueChange={setEventPrivacy}
          className="flex space-x-4 mt-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="public" id="public" />
            <Label htmlFor="public" className="cursor-pointer">Public</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="private" id="private" />
            <Label htmlFor="private" className="cursor-pointer">Private</Label>
          </div>
        </RadioGroup>
      </div>
      
      {eventPrivacy === "private" && (
        <div className="border rounded-lg p-4 bg-muted/30">
          <div className="flex items-center gap-2 mb-2">
            <Link2 className="h-4 w-4 text-muted-foreground" />
            <Label>Invitation Link</Label>
          </div>
          <div className="flex mt-1">
            <Input 
              value={eventLink} 
              readOnly 
              placeholder={isLinkGenerated ? undefined : "Create event to generate link"}
              className="rounded-r-none"
            />
            <Button 
              type="button" 
              onClick={copyLinkToClipboard}
              className="rounded-l-none gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Share this link to invite people to your private event
          </p>
        </div>
      )}

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleCreateEvent}>
          Create Event
        </Button>
      </DialogFooter>
    </div>
  );
};

export default EventCreationForm;
