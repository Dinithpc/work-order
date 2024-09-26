export interface Customer {
  id: string;
  avatar?: string;
  city?: string;
  country?: string;
  createdAt: number;
  dateOfBirth?: string;
  email: string;
  isFavorite?: boolean;
  isReturning?: boolean;
  isTaxExempt?: boolean;
  lastContactChannel?: string;
  lastContactDate?: number;
  lastOrderDate?: number;
  name: string;
  orderValue?: number;
  orderedRecently?: boolean;
  ordersPlaced?: number;
  phone?: string;
  status: string;
  storeCredit?: number;
  street?: string;
  workOrder?: string;
  primaryIncident?: string;
  serviceAmount?: string;
  SystemStatus?: boolean;
  Priority ?: string;
}

export type CustomerOrderStatus = 'complete' | 'created' | 'delivered' | 'placed' | 'processed';

export interface CustomerOrderAddress {
  street?: string;
  city?: string;
  country?: string;
}

export interface CustomerOrderLineItem {
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

export interface CustomerOrder {
  id: string;
  address?: CustomerOrderAddress;
  courier?: string;
  createdAt: number;
  currency: string;
  discount?: number,
  lineItems: CustomerOrderLineItem[],
  paymentId?: string;
  paymentMethod: string;
  paymentStatus?: string;
  status: CustomerOrderStatus;
  subtotalAmount?: number;
  taxAmount?: number;
  totalAmount: number;
  trackingCode?: string;
  updatedAt?: number
}

export interface CustomerNote {
  id: string;
  authorId: string;
  authorAvatar?: string;
  authorName?: string;
  content: string;
  createdAt: number;
}

export interface CustomerLogs {
  id: string;
  createdAt: number;
  message: string;
  subjectId: string;
  subjectAvatar?: string;
  subjectName?: string;
  type: string;
}

export interface CustomerBookings {
  id: string;
  firstName : string;
  lastName : string;
  position : string;
  phone: number;
  date: string;
  time: string;
  travelTime  :string;

}

export interface ProductService {
  id: string;
  name?: string;
  estimationDuration?: string;
  duration: number;
  estimatedTotalPrice: string;
  totalPrice?: number,
  priority: string,
}