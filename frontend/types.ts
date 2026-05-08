export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  category: string;
  rating?: number;
  nutrition?: string;
  calories?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  color: string;
  borderColor: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string; // ISO String for easy filtering
  displayDate: string; // Formatted date e.g. Nov 19, 2025
  status: 'Pending' | 'Packed' | 'Delivered' | 'Cancelled';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'order' | 'promo' | 'system';
}
