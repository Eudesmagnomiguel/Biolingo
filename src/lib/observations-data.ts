export type Observation = {
  id?: string;
  userId: string;
  commonName: string;
  scientificName: string;
  observationDate: string;
  location: string;
  latitude?: number;
  longitude?: number;
  notes?: string;
  photoUrl?: string;
  audioUrl?: string;
};
