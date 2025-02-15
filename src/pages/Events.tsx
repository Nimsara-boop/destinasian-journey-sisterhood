
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { MapPin, Calendar as CalendarIcon, Clock, ArrowRight } from "lucide-react";
import { useState } from "react";

const Events = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const events = [
    {
      id: 1,
      title: "Cherry Blossom Festival",
      location: "Ueno Park, Tokyo",
      date: "April 1-7, 2024",
      time: "All Day",
      image: "https://images.unsplash.com/photo-1522383225653-ed111181a951",
    },
    {
      id: 2,
      title: "Lantern Festival",
      location: "Pingxi District, Taiwan",
      date: "February 24, 2024",
      time: "17:00 - 22:00",
      image: "https://images.unsplash.com/photo-1470004914212-05527a49cd99",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto pt-24 px-4">
        <div className="grid md:grid-cols-[300px,1fr] gap-8">
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
              />
            </div>
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Upcoming Events</h3>
              <p className="text-sm text-muted-foreground">
                Select a date to see events happening on that day
              </p>
            </Card>
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-semibold">Cultural Events in Asia</h1>
            <div className="grid gap-6">
              {events.map((event) => (
                <Card key={event.id} className="p-6">
                  <div className="grid md:grid-cols-[250px,1fr] gap-6">
                    <div
                      className="h-48 rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${event.image})` }}
                    />
                    <div className="space-y-4">
                      <h2 className="text-2xl font-semibold">{event.title}</h2>
                      <div className="space-y-2 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                      <Button className="mt-4">
                        View Details
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
