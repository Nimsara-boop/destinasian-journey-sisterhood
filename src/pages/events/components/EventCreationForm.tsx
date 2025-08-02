
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { DialogFooter } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface EventCreationFormProps {
  onClose: () => void;
}

const EventCreationForm = ({ onClose }: EventCreationFormProps) => {
  const { toast } = useToast();
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventPrivacy, setEventPrivacy] = useState("public");
  const [eventLink, setEventLink] = useState("");

  const handleCreateEvent = () => {
    if (!eventTitle || !eventDate || !eventTime || !eventLocation) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Event Created",
      description: "Your event has been successfully created!",
    });

    onClose();
  };

  const copyLinkToClipboard = () => {
    // Generate a random link if none exists
    if (!eventLink) {
      const randomId = Math.random().toString(36).substring(2, 8);
      const newLink = `https://srilanka-travel.com/events/invite/${randomId}`;
      setEventLink(newLink);
      navigator.clipboard.writeText(newLink);
    } else {
      navigator.clipboard.writeText(eventLink);
    }
    
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
        <div>
          <Label>Invitation Link</Label>
          <div className="flex mt-1">
            <Input 
              value={eventLink} 
              readOnly 
              placeholder="Create event to generate link" 
              className="rounded-r-none"
            />
            <Button 
              type="button" 
              onClick={copyLinkToClipboard}
              className="rounded-l-none"
            >
              Copy
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
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
