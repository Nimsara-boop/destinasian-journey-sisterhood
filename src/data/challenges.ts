
import { Challenge } from "@/types/challenge";

export const challenges: Challenge[] = [
  {
    id: "local-cuisine-quest",
    title: "Local Cuisine Quest",
    description: "Try 3 traditional dishes from the region you're visiting. Share photos or describe the flavors to earn points.",
    points: 150,
    category: "cultural",
    difficulty: "medium",
    requiredProof: "photo",
    quizQuestions: [
      {
        question: "Which of these is NOT a traditional Sri Lankan dish?",
        options: ["Hoppers", "Kottu Roti", "Pad Thai", "Lamprais"],
        correctAnswer: 2
      }
    ],
    featuredOnHomepage: true
  },
  {
    id: "landmark-scavenger",
    title: "Landmark Scavenger Hunt",
    description: "Find and take a selfie with at least 3 lesser-known landmarks or statues in the city.",
    points: 200,
    category: "cultural",
    difficulty: "medium",
    requiredProof: "photo",
    featuredOnHomepage: true
  },
  {
    id: "sunrise-chaser",
    title: "Sunrise or Sunset Chaser",
    description: "Watch a sunrise or sunset from a specific scenic spot. Share a photo and describe the experience.",
    points: 100,
    category: "nature",
    difficulty: "easy",
    requiredProof: "both",
    featuredOnHomepage: true,
    quizQuestions: [
      {
        question: "Which of these locations is NOT famous for its sunset views?",
        options: ["Santorini, Greece", "Uluru, Australia", "Mount Everest Base Camp", "Venice, Italy"],
        correctAnswer: 2
      }
    ]
  },
  {
    id: "local-language",
    title: "Local Language Learner",
    description: "Learn and use 5 phrases in the local language. Record yourself using the phrases with a local.",
    points: 250,
    category: "social",
    difficulty: "hard",
    requiredProof: "both",
    featuredOnHomepage: true
  },
  {
    id: "green-traveler",
    title: "Green Traveler",
    description: "Take eco-friendly actions during your trip like using public transport or refilling a water bottle.",
    points: 150,
    category: "sustainability",
    difficulty: "easy",
    requiredProof: "photo",
    featuredOnHomepage: true
  }
];
