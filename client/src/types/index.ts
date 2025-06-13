export interface Rating {
  id: string;
  taste_rating: number;
  portion_rating: number;
  presentation_rating: number;
  notes?: string;
  created_at: string;
  user?: {
    username: string;
  };
  dish?: {
    id: string;
    name: string;
    location: Location;
  };
}

export interface Location {
  id: string;
  name: string;
  address: string;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  portion_size: string;
  location: Location;
  ratings: Rating[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  ratings: Rating[];
}
