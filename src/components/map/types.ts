
export type Location = {
  id: string;
  name: string;
  coordinates: [number, number]; // [latitude, longitude]
  lastSeen: string;
  avatar?: string;
};
