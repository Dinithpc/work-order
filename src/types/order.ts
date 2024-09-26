export type OrderStatus = 'complete' | 'created' | 'delivered' | 'placed' | 'processed';

export type OrderPaymentMethod = 'creditCard' | 'debit' | 'paypal' | 'stripe';

export type OrderPaymentStatus = 'paid' | 'pending';

export interface OrderAddress {
  street?: string;
  city?: string;
  country?: string;
}

export interface OrderCustomer {
  avatar?: string;
  email?: string;
  name: string;
  phone?: string;
}

export interface OrderLineItem {
  currency: string;
  discount?: number;
  image?: string;
  name: string;
  quantity: number;
  sku?: string;
  subtotalAmount: number;
  taxAmount: number;
  totalAmount: number;
  unitAmount: number;
}

export interface Order {
  id: string;
  address?: OrderAddress;
  completedAt?: number;
  courier?: string;
  createdAt: number;
  currency: string;
  customer?: OrderCustomer,
  deliveredAt?: number;
  discount?: number,
  lineItems?: OrderLineItem[],
  paymentId?: string;
  paymentMethod?: OrderPaymentMethod;
  paymentStatus?: OrderPaymentStatus;
  processedAt?: number;
  status: OrderStatus;
  subtotalAmount?: number;
  taxAmount?: number;
  totalAmount: number;
  trackingCode?: string;
  updatedAt?: number;
}
