export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  passwordHash: string;
  createdAt: Date;
}

export interface RsvpResponse {
  id: string;
  name: string;
  side: 'groom' | 'bride';
  attending: boolean;
  meal: boolean;
  createdAt: Date;
}

export interface WeddingInfo {
  groomName: string;
  groomBirthDate: string;
  groomParents: { father: string; mother: string };
  brideName: string;
  brideBirthDate: string;
  brideParents: { father: string; mother: string };
  weddingDate: Date;
  venueName: string;
  venueAddress: string;
  venueCoords: { lat: number; lng: number };
}
