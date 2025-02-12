
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <div className="w-full bg-muted py-16">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h3 className="text-2xl md:text-3xl font-semibold mb-4">
          Join Our Journey
        </h3>
        <p className="text-gray-600 mb-8">
          Subscribe to our newsletter and receive curated stories from Asia's most inspiring women.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
            required
          />
          <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
