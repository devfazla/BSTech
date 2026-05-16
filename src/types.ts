export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

export interface Specification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  badge?: string;
  description: string;
  features: string[];
  colors: string[];
  specifications: Specification[];
  userReviews: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 'All items' | 'Smartphones' | 'Kitchen' | 'Game Console' | 'TV & Video' | 'Home Comfort' | 'Favorites' | 'Sale';
