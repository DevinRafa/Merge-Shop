export type Store = {
  id: string;
  slug: string;
  name: string;
  category: string;
  history: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  operationalHours: {
    mon: string;
    tue: string;
    wed: string;
    thu: string;
    fri: string;
    sat: string;
    sun: string;
  };
  isOnline: boolean;
  paymentMethods: string[];
  deliveryRadiusKm: number;
  rating: number;
  photoUrl: string;
  reviewCount?: number;
  tags?: string[];
};

export type MenuItem = {
  id: string;
  storeId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  photoUrl: string;
  isAvailable: boolean;
  isBestSeller?: boolean;
};

export type EventType = 'bazaar' | 'festival' | 'konser' | 'pasar-malam' | 'car-free-day';

export type Event = {
  id: string;
  slug: string;
  name: string;
  description: string;
  location: string;
  lat: number;
  lng: number;
  startDate: string;
  endDate: string;
  photoUrl: string;
  stores: string[];
  type: EventType;
  sellerCount: number;
  isActive: boolean;
};

export type UserReview = {
  id: string;
  storeId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
};

export type ChatMessage = {
  role: 'user' | 'bot';
  content: string;
  timestamp?: Date;
};

export type CartItem = {
  menuItem: MenuItem;
  quantity: number;
  storeId: string;
  storeName: string;
};
