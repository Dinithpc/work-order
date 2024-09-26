import { subDays, subMinutes } from 'date-fns';
import type { Invoice } from '../../types/invoice';

const now = new Date();

export const invoices: Invoice[] = [
  {
    id: '675dc494f99d71803424ebd0',
    currency: '$',
    dueDate: subDays(now, 2).getTime(),
    issueDate: subDays(now, 9).getTime(),
    paymentMethod: 'Credit Card',
    ref: 'DEV5437',
    status: 'ongoing',
    totalAmount: 192.5
  },
  {
    id: 'dbfeb842ecd50c659282da65',
    currency: '$',
    dueDate: subDays(now, 1).getTime(),
    issueDate: subDays(now, 12).getTime(),
    paymentMethod: 'Credit Card',
    ref: 'DEV5436',
    status: 'ongoing',
    totalAmount: 192
  },
  {
    id: 'ba6a292cf3b0fdb15dc801e5',
    currency: '$',
    dueDate: subDays(now, 4).getTime(),
    issueDate: subDays(now, 14).getTime(),
    paymentMethod: 'PayPal',
    ref: 'DEV5570',
    status: 'ongoing',
    totalAmount: 60
  },
  {
    id: '9736abc401fbc4a26087b3a8',
    currency: '$',
    dueDate: subDays(now, 12).getTime(),
    issueDate: subDays(now, 22).getTime(),
    paymentMethod: 'Credit Card',
    ref: 'DEV5434',
    status: 'draft',
    totalAmount: 631
  },
  {
    id: '0ef5dc186c487735f3442bc0',
    currency: '$',
    dueDate: subDays(now, 19).getTime(),
    issueDate: subDays(now, 32).getTime(),
    paymentMethod: 'PayPal',
    ref: 'DEV5433',
    status: 'paid',
    totalAmount: 1200
  },
  {
    id: 'b1a3f55d2b7dc1a617f69b80',
    currency: '$',
    dueDate: subDays(now, 5).getTime(),
    issueDate: subDays(now, 12).getTime(),
    paymentMethod: 'PayPal',
    ref: 'DEV5432',
    status: 'overdue',
    totalAmount: 631
  }
];

export const invoice: Invoice = {
  id: '675dc494f99d71803424ebd0',
  currency: '$',
  customer: {
    name: 'Natalie Rusell'
  },
  dueDate: subDays(subMinutes(now, 29), 2).getTime(),
  issueDate: subDays(subMinutes(now, 45), 9).getTime(),
  lineItems: [
    {
      currency: '$',
      discount: 0,
      image: '/assets/products/product-1.png',
      isTaxable: true,
      name: 'Watch with Leather Strap',
      quantity: 1,
      sku: 'BBAK01-A',
      subtotalAmount: 160,
      taxAmount: 32.5,
      totalAmount: 192.5,
      unitAmount: 160
    }
  ],
  note: 'Please confirm once paid.',
  paidAt: subDays(subMinutes(now, 11), 5).getTime(),
  paymentMethod: 'Credit Card',
  paymentStatus: 'Failed',
  ref: 'DEV5437',
  status: 'ongoing',
  subtotalAmount: 160,
  taxAmount: 32.5,
  totalAmount: 192.5,
  transactionFees: 0,
  transactionId: 'dc11b9843c8786f4d5ca589c'
};
