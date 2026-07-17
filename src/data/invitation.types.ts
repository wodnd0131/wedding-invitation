export interface Person {
  name: string;
  birthDate: string;
  father: string;
  mother: string;
  mbti?: string;
  interests?: string;
}

export interface AccountEntry {
  name: string;
  bankName: string;
  accountNumber: string;
}

export interface ContactEntry {
  role: string;
  name: string;
  phone?: string;
}

export interface TransitItem {
  label: string;
  lines: string[];
}

export interface ImageSlots {
  hero?: string;
  groomProfile?: string;
  brideProfile?: string;
  ending?: string;
  og?: string;
  gallery: (string | undefined)[];
}

export interface InvitationData {
  groom: Person;
  bride: Person;
  weddingDate: Date;
  venue: {
    name: string;
    address: string;
    transit: TransitItem[];
  };
  accounts: {
    groom: AccountEntry[];
    bride: AccountEntry[];
  };
  contacts: {
    groom: ContactEntry[];
    bride: ContactEntry[];
  };
  images: ImageSlots;
}
