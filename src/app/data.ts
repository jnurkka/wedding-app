export interface Registration {
  staying_sat: boolean;
  staying_fr: boolean;
  people_sat: number;
  people_fr: number;
  name: string;
  diet: string;
  comment: string;
  created_at?: string;
  // Individual menu selections for each participant
  menu_selections?: {
    [participantIndex: number]: {
      name?: string;
      appetizer?: string;
      main?: string;
    };
  };
}
