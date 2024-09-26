export type InvoiceStatus = 'draft' | 'ongoing' | 'overdue' | 'paid';

export interface OrderCustomer {
  name?: string;
}

export interface InvoiceLineItem {
  currency: string;
  discount: number;
  image: string;
  isTaxable: boolean;
  name: string;
  quantity: number;
  sku: string;
  subtotalAmount: number;
  taxAmount: number;
  totalAmount: number;
  unitAmount: number;
}

export interface Invoice {
  id: string;
  currency: string;
  customer?: OrderCustomer;
  dueDate: number;
  issueDate: number;
  lineItems?: InvoiceLineItem[],
  note?: string;
  paidAt?: number;
  paymentMethod?: string;
  paymentStatus?: string;
  ref: string;
  status: InvoiceStatus;
  subtotalAmount?: number;
  taxAmount?: number;
  totalAmount: number;
  transactionFees?: number;
  transactionId?: string;
}
