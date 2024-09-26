import { subHours, subMinutes } from 'date-fns';
import type { Order } from '../../types/order';

const now = new Date();

export const orders: Order[] = [
  {
    id: '5273',
    address: {
      city: 'New York',
      country: 'USA'
    },
    courier: 'DHL',
    createdAt: subMinutes(now, 21).getTime(),
    currency: '$',
    customer: {
      name: 'Devon Lane'
    },
    discount: 0,
    lineItems: [
      {
        currency: '$',
        discount: 0,
        image: '/assets/products/product-1.png',
        name: 'Watch with Leather Strap',
        quantity: 1,
        sku: 'BBAK01-A',
        subtotalAmount: 160,
        taxAmount: 32.5,
        totalAmount: 192.5,
        unitAmount: 160
      }
    ],
    paymentId: 'ORIL8823',
    paymentMethod: 'debit',
    paymentStatus: 'paid',
    status: 'delivered',
    trackingCode: 'KDO020021',
    totalAmount: 192.5,
    updatedAt: subMinutes(now, 7).getTime()
  },
  {
    id: '9265',
    address: {
      city: 'Berlin',
      country: 'Germany'
    },
    courier: 'DHL',
    createdAt: subMinutes(now, 56).getTime(),
    currency: '$',
    customer: {
      name: 'Livia Louthe'
    },
    discount: 0,
    lineItems: [
      {
        currency: '$',
        discount: 0,
        image: '/assets/products/product-1.png',
        name: 'Watch with Leather Strap',
        quantity: 1,
        sku: 'BBAK01-A',
        subtotalAmount: 160,
        taxAmount: 32.5,
        totalAmount: 192.5,
        unitAmount: 160
      }
    ],
    paymentId: 'L993DDLS',
    paymentMethod: 'paypal',
    paymentStatus: 'paid',
    status: 'complete',
    totalAmount: 631,
    updatedAt: subMinutes(now, 54).getTime()
  },
  {
    id: '9266',
    address: {
      city: 'Hamburg',
      country: 'Germany'
    },
    courier: 'UPS',
    createdAt: subHours(subMinutes(now, 31), 2).getTime(),
    currency: '$',
    customer: {
      name: 'Peri Ottawell'
    },
    discount: 0,
    lineItems: [
      {
        currency: '$',
        discount: 0,
        image: '/assets/products/product-1.png',
        name: 'Watch with Leather Strap',
        quantity: 1,
        sku: 'BBAK01-A',
        subtotalAmount: 160,
        taxAmount: 32.5,
        totalAmount: 192.5,
        unitAmount: 160
      }
    ],
    paymentId: 'OPP482L',
    paymentMethod: 'creditCard',
    paymentStatus: 'paid',
    status: 'placed',
    totalAmount: 631,
    updatedAt: subHours(subMinutes(now, 43), 1).getTime()
  },
  {
    id: '1090',
    address: {
      city: 'Madrid',
      country: 'Spain'
    },
    courier: 'UPS',
    createdAt: subHours(subMinutes(now, 51), 2).getTime(),
    currency: '$',
    customer: {
      name: 'Thadeus Jacketts'
    },
    discount: 0,
    lineItems: [
      {
        currency: '$',
        discount: 0,
        image: '/assets/products/product-1.png',
        name: 'Watch with Leather Strap',
        quantity: 1,
        sku: 'BBAK01-A',
        subtotalAmount: 160,
        taxAmount: 32.5,
        totalAmount: 192.5,
        unitAmount: 160
      }
    ],
    paymentId: 'DZS194LD',
    paymentMethod: 'stripe',
    paymentStatus: 'paid',
    status: 'processed',
    trackingCode: undefined,
    totalAmount: 100,
    updatedAt: subHours(subMinutes(now, 13), 2).getTime()
  },
  {
    id: '1111',
    address: {
      city: 'Barcelona',
      country: 'Spain'
    },
    courier: 'Purolator',
    createdAt: subHours(subMinutes(now, 6), 3).getTime(),
    currency: '$',
    customer: {
      name: 'Rad Jose'
    },
    discount: 0,
    lineItems: [
      {
        currency: '$',
        discount: 0,
        image: '/assets/products/product-1.png',
        name: 'Watch with Leather Strap',
        quantity: 1,
        sku: 'BBAK01-A',
        subtotalAmount: 160,
        taxAmount: 32.5,
        totalAmount: 192.5,
        unitAmount: 160
      }
    ],
    paymentId: 'OTIK283L',
    paymentMethod: 'debit',
    paymentStatus: 'paid',
    status: 'processed',
    trackingCode: undefined,
    totalAmount: 60,
    updatedAt: subHours(subMinutes(now, 54), 2).getTime()
  },
  {
    id: '2475',
    address: {
      city: 'Chicago',
      country: 'USA'
    },
    courier: 'Purolator',
    createdAt: subHours(subMinutes(now, 17), 4).getTime(),
    currency: '$',
    customer: {
      name: 'Eydie Hopkyns'
    },
    discount: 0,
    lineItems: [
      {
        currency: '$',
        discount: 0,
        image: '/assets/products/product-1.png',
        name: 'Watch with Leather Strap',
        quantity: 1,
        sku: 'BBAK01-A',
        subtotalAmount: 160,
        taxAmount: 32.5,
        totalAmount: 192.5,
        unitAmount: 160
      }
    ],
    paymentId: 'RKKD832L',
    paymentMethod: 'paypal',
    paymentStatus: 'paid',
    status: 'complete',
    trackingCode: undefined,
    totalAmount: 1200,
    updatedAt: subHours(subMinutes(now, 1), 2).getTime()
  }
];

export const order: Order = {
  id: '5273',
  address: {
    street: '8502 Preston Rd. Inglewood, Maine 98380',
    city: 'Berlin',
    country: 'Germany'
  },
  courier: 'DHL',
  createdAt: subHours(subMinutes(now, 10), 5).getTime(),
  currency: '$',
  customer: {
    avatar: '/assets/avatars/avatar-jenilee-felderer.jpg',
    email: 'julie.reynaud@devias.io',
    name: 'Julie Reynaud',
    phone: '(249) 894-7992'
  },
  deliveredAt: subHours(subMinutes(now, 10), 1).getTime(),
  discount: 0,
  lineItems: [
    {
      currency: '$',
      discount: 0,
      image: '/assets/products/product-1.png',
      name: 'Watch with Leather Strap',
      quantity: 1,
      sku: 'BBAK01-A',
      subtotalAmount: 160,
      taxAmount: 32.5,
      totalAmount: 192.5,
      unitAmount: 160
    }
  ],
  paymentId: 'ch_3MXSn22eZvKYlo2C0EUin0Cb',
  paymentMethod: 'debit',
  paymentStatus: 'paid',
  processedAt: subHours(subMinutes(now, 32), 4).getTime(),
  status: 'delivered',
  trackingCode: 'KDO020021',
  subtotalAmount: 160,
  taxAmount: 32.5,
  totalAmount: 192.5,
  updatedAt: subMinutes(now, 7).getTime()
};
