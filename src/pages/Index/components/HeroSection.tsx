
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface QuoteType {
  text: string;
  author: string;
}

interface HeroSectionProps {
  isFemaleExperience: boolean;
  currentQuoteIndex: number;
}

const HeroSection = ({ isFemaleExperience, currentQuoteIndex }: HeroSectionProps) => {
  const femaleQuotes = [
    {
      text: "A woman who follows the crowd will usually go no further than the crowd. The woman who walks alone is likely to find herself in places no one has ever been before.",
      author: "Albert Einstein"
    },
    {
      text: "The woman who travels alone is both protagonist and author of her own life story.",
      author: "Unknown"
    },
    {
      text: "Travel isn't always pretty. It isn't always comfortable. Sometimes it hurts, it even breaks your heart. But that's okay. The journey changes you; it should change you.",
      author: "Anthony Bourdain"
    },
    {
      text: "She believed she could, so she did. And saw the world along the way.",
      author: "R.S. Grey"
    }
  ];

  const generalQuotes = [
    {
      text: "Adventure is worthwhile in itself.",
      author: "Amelia Earhart"
    },
    {
      text: "Travel makes one modest. You see what a tiny place you occupy in the world.",
      author: "Gustave Flaubert"
    },
    {
      text: "The world is a book and those who do not travel read only one page.",
      author: "Saint Augustine"
    },
    {
      text: "Life begins at the end of your comfort zone.",
      author: "Neale Donald Walsch"
    }
  ];

  const quotes = isFemaleExperience ? femaleQuotes : generalQuotes;
  const currentQuote = quotes[currentQuoteIndex];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ 
        backgroundImage: isFemaleExperience 
          ? "url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb')" 
          : "url('https://images.unsplash.com/photo-1469041797191-50ace28483c3')"
      }}>
        <div className={`absolute inset-0 ${isFemaleExperience ? 'bg-primary/30' : 'bg-black/30'}`} />
      </div>
      <div className="relative z-10 text-center text-white px-4 animate-fade-in max-w-4xl mx-auto">
        <h1 className={`text-4xl md:text-6xl ${isFemaleExperience ? 'font-serif' : 'font-semibold'} mb-6`}>
          
             "Women Like To Travel" 
           
        </h1>
        <p className="text-xl md:text-2xl mb-8 italic">
          "{currentQuote.text}"
        </p>
        <p className="text-lg mb-8">
          — {currentQuote.author}
        </p>
        <Button
          size="lg"
          className={`${isFemaleExperience ? 'bg-primary-feminine hover:bg-primary-feminine/90' : 'bg-primary hover:bg-primary/90'} text-white`}
        >
          Start Exploring
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
