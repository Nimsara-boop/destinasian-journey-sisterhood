
export type ChallengeDifficulty = 'easy' | 'medium' | 'hard';
export type ChallengeCategory = 
  | 'cultural' 
  | 'nature' 
  | 'social' 
  | 'seasonal' 
  | 'creative' 
  | 'tech' 
  | 'team' 
  | 'sustainability';

export type Challenge = {
  id: string;
  title: string;
  description: string;
  points: number;
  category: ChallengeCategory;
  difficulty: ChallengeDifficulty;
  location?: string;
  requiredProof: 'photo' | 'text' | 'quiz' | 'both';
  quizQuestions?: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
  completed?: boolean;
  inProgress?: boolean;
  featuredOnHomepage?: boolean;
};
