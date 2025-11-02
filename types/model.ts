// ==========================
// 📦 Collection
// ==========================
export type CollectionType = {
  id: string;
  title: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  products?: ProductType[]; // relasi: optional untuk efisiensi
};

// ==========================
// 🛍️ Product
// ==========================
export interface ProductType {
  id: string;
  title: string;
  description: string;
  media: string[];
  tags: string[];
  sizes: string[];
  colors: string[];
  price: number;
  expense: number;
  createdAt: Date;
  updatedAt: Date;
  collectionId: string;
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