export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
