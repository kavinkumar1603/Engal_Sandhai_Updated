import { Product, Category, Order, Notification } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Fresh Fruits & Vegetable', image: 'https://picsum.photos/id/102/200/200', color: 'bg-green-50', borderColor: 'border-green-200' },
  { id: '2', name: 'Cooking Oil & Ghee', image: 'https://picsum.photos/id/225/200/200', color: 'bg-orange-50', borderColor: 'border-orange-200' },
  { id: '3', name: 'Meat & Fish', image: 'https://picsum.photos/id/292/200/200', color: 'bg-red-50', borderColor: 'border-red-200' },
  { id: '4', name: 'Bakery & Snacks', image: 'https://picsum.photos/id/431/200/200', color: 'bg-purple-50', borderColor: 'border-purple-200' },
  { id: '5', name: 'Dairy & Eggs', image: 'https://picsum.photos/id/493/200/200', color: 'bg-yellow-50', borderColor: 'border-yellow-200' },
  { id: '6', name: 'Beverages', image: 'https://picsum.photos/id/447/200/200', color: 'bg-blue-50', borderColor: 'border-blue-200' },
];

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Organic Bananas', description: 'Organic Bananas are grown without chemicals.', price: 4.99, unit: '7pcs, Priceg', image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=400&q=80', category: 'Fresh Fruits & Vegetable', rating: 4, nutrition: '100gr', calories: '89 cal' },
  { id: 'p2', name: 'Red Apple', description: 'Fresh Red Apples from local orchards.', price: 4.99, unit: '1kg, Priceg', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=400&q=80', category: 'Fresh Fruits & Vegetable', rating: 5, nutrition: '100gr', calories: '52 cal' },
  { id: 'p3', name: 'Bell Pepper Red', description: 'Crunchy red bell peppers.', price: 4.99, unit: '1kg, Priceg', image: 'https://images.unsplash.com/photo-1563565375-f3fdf5dd2434?auto=format&fit=crop&w=400&q=80', category: 'Fresh Fruits & Vegetable', rating: 4, nutrition: '100gr', calories: '31 cal' },
  { id: 'p4', name: 'Ginger', description: 'Fresh ginger root.', price: 4.99, unit: '250gm, Priceg', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80', category: 'Fresh Fruits & Vegetable', rating: 3, nutrition: '100gr', calories: '80 cal' },
  { id: 'p5', name: 'Diet Coke', description: 'Refreshing cola drink with no sugar.', price: 1.99, unit: '355ml, Price', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80', category: 'Beverages', rating: 4 },
  { id: 'p6', name: 'Sprite Can', description: 'Lemon-lime soda.', price: 1.50, unit: '325ml, Price', image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=400&q=80', category: 'Beverages', rating: 4 },
  { id: 'p7', name: 'Apple & Grape Juice', description: '100% natural juice blend.', price: 15.50, unit: '2L, Price', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80', category: 'Beverages', rating: 5 },
  { id: 'p8', name: 'Coca Cola Can', description: 'Classic Coke taste.', price: 4.99, unit: '325ml, Price', image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=400&q=80', category: 'Beverages', rating: 5 },
  { id: 'p9', name: 'Pepsi Can', description: 'Bold refreshing taste.', price: 4.99, unit: '330ml, Price', image: 'https://images.unsplash.com/photo-1538186178857-79754f9d4586?auto=format&fit=crop&w=400&q=80', category: 'Beverages', rating: 4 },
  { id: 'p10', name: 'Egg Chicken Red', description: 'Farm fresh red eggs.', price: 1.99, unit: '4pcs, Price', image: 'https://images.unsplash.com/photo-1587486913049-53fc88980fa1?auto=format&fit=crop&w=400&q=80', category: 'Dairy & Eggs', rating: 5 },
  { id: 'p11', name: 'Egg Chicken White', description: 'Farm fresh white eggs.', price: 1.50, unit: '180g, Price', image: 'https://images.unsplash.com/photo-1598965402089-897ce52e8355?auto=format&fit=crop&w=400&q=80', category: 'Dairy & Eggs', rating: 4 },
  { id: 'p12', name: 'Egg Pasta', description: 'Rich egg pasta.', price: 15.99, unit: '30gm, Price', image: 'https://images.unsplash.com/photo-1612966808163-9524d77bb484?auto=format&fit=crop&w=400&q=80', category: 'Dairy & Eggs', rating: 3 },
  { id: 'p13', name: 'Beef Bone', description: 'High quality beef bone for soup.', price: 4.99, unit: '1kg, Priceg', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=400&q=80', category: 'Meat & Fish', rating: 5 },
  { id: 'p14', name: 'Broiler Chicken', description: 'Tender broiler chicken.', price: 4.99, unit: '1kg, Priceg', image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=400&q=80', category: 'Meat & Fish', rating: 4 },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ES19112025-045',
    date: '2025-11-19',
    displayDate: 'Nov 19, 2025',
    status: 'Packed',
    total: 345.50,
    items: [
      { ...PRODUCTS[0], quantity: 2 },
      { ...PRODUCTS[1], quantity: 1 }
    ]
  },
  {
    id: 'ES18112025-022',
    date: '2025-11-18',
    displayDate: 'Nov 18, 2025',
    status: 'Delivered',
    total: 120.00,
    items: [
      { ...PRODUCTS[4], quantity: 6 }
    ]
  },
  {
    id: 'ES15112025-101',
    date: '2025-11-15',
    displayDate: 'Nov 15, 2025',
    status: 'Cancelled',
    total: 890.00,
    items: [
      { ...PRODUCTS[12], quantity: 2 },
      { ...PRODUCTS[13], quantity: 2 }
    ]
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'Order Packed',
    message: 'Your order ES19112025-045 has been packed and is ready for delivery.',
    date: '2025-11-19T10:30:00',
    read: false,
    type: 'order'
  },
  {
    id: 'n2',
    title: 'Order Delivered',
    message: 'Your order ES18112025-022 has been delivered successfully.',
    date: '2025-11-18T14:20:00',
    read: true,
    type: 'order'
  }
];
