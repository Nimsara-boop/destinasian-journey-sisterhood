
export type EventType = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  coordinates: [number, number]; // [latitude, longitude]
  organizer: string;
  attendees: number;
  category: string;
  imageUrl: string;
  attending: boolean;
  isPromotion?: boolean;
  promotionType?: 'restaurant' | 'hotel' | 'cafe';
  rating?: number;
  price?: string;
  distance?: string;
};
