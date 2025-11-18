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
  id: number;
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
  id: number;
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
  id: number;
  userId: number;
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
  id: number;
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
  name: number;
  email: string;
  token: string;
  role: "ADMIN" | "CUSTOMER";
}

export type UserModel = {
  id: number;
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
  hydrated: boolean;
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
  hydrated: boolean;
  hydrateWishlist: (products: ProductType[]) => void;
  fetchWishlist: () => Promise<void>;
  toggleWishlist: (productId: number) => Promise<void>;
  isWishlisted: (productId: number) => boolean;
  clearWishlist: () => void;
}

export interface CartItem {
  item: ProductType;
  quantity: number;
  color?: string | null; // ? means optional
  size?: string | null; // ? means optional
}

export interface CartStore {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (idToRemove: number) => void;
  increaseQuantity: (idToIncrease: number) => void;
  decreaseQuantity: (idToDecrease: number) => void;
  clearCart: () => void;
  hydrated: boolean;
}