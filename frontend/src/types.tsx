export type OrderItem = {
  trackingNumber: string;
  status: string;
  imageUrl?: string;
  statusHistory?: { status: string; changedAt: string }[];
};

export type UserType = {
  phoneNumber: string;
  createdAt: string;
  truckCodeItem: {
    item: OrderItem | null;
    status: string;
  }[];
  date?: string;
  address?: string;
  status?: string;
};
export interface Term {
  _id: string;
  condition: string | Record<string, string>;
  registration: string | Record<string, string>;
  price: string | Record<string, string>;
  payment: string | Record<string, string>;
  shipping: string | Record<string, string>;
  deliver: string | Record<string, string>;
  deliverPrice: string | Record<string, string>;
  forbidden: string | Record<string, string>;
  responsibility: string | Record<string, string>;
  loss: string | Record<string, string>;
  isVerified: boolean;
}
