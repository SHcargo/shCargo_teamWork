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
