export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
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
}

export type Category = 'All items' | 'Smartphones' | 'Kitchen' | 'Game Console' | 'TV & Video' | 'Home Comfort';
