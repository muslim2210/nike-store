// ==========================
// 📦 Collection
// ==========================
export type CollectionType = {
  id: string;
  name: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  products_count?: number;
  products?: ProductType[]; // relasi: optional untuk efisiensi
};

// ==========================
// 👤 Customer
// ==========================
export type CustomerType = {
  id: string;
  name: string;
  email: string;
  password: string;
  address?: string;
  phone?: string;
};

// ==========================
// 🛍️ Product
// ==========================
export interface ProductType {
  id: string;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  sizes: string[];
  colors: string[];
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  collection_id: string;
  collection?: CollectionType; // optional untuk include() Prisma
  orderItems?: OrderItemType[];
};

// ==========================
// 🧾 Order
// ==========================
export type OrderType = {
  id: string;
  userId: string;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
  user?: UserModel;
  items?: OrderItemType[];
};

// ==========================
// 📦 Order Item
// ==========================
export type OrderItemType = {
  id: string;
  orderId: string;
  productId: string;
  title: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  order?: OrderType;
  product?: ProductType;
};


export type UserAuth = {
  name: string;
  email: string;
  token: string;
  role: "ADMIN" | "CUSTOMER";
}

export type UserModel = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "CUSTOMER";
  address?: string;
  phone?: string;
  whistlist?: ProductType[];
  orders?: OrderType[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  customer: CustomerType | null;
  token: string | null;
  loading: boolean;
  init: () => void;

  login: (email: string, password: string) => Promise<boolean>;
  register: (data: {
    name: string;
    email: string;
    phone: string;
    address: string;
    password: string;
  }) => Promise<boolean>;
  logout: () => void;
}


export interface WishlistState {
  wishlist: number[]; // only product IDs
  loading: boolean;

  fetchWishlist: () => Promise<void>;
  toggleWishlist: (productId: number) => Promise<void>;
  isWishlisted: (productId: number) => boolean;
}