import { subDays, subHours, subMinutes } from 'date-fns';
import type { Customer, CustomerLogs, CustomerNote, CustomerOrder } from '../../types/customer';

const now = new Date();

export const customers: Customer[] = [
  {
    id: 'a105ac46530704806ca58ede',
    street: '4 Scoville Street',
    avatar: '/assets/avatars/avatar-fabiano-jorioz.jpg',
    createdAt: subDays(subHours(subMinutes(now, 41), 11), 1).getTime(),
    dateOfBirth: '09/21/1998',
    email: 'fjoriozi@devias.io',
    isFavorite: false,
    isReturning: false,
    lastOrderDate: subDays(subHours(subMinutes(now, 12), 22), 1).getTime(),
    name: 'WO_000145',
    orderedRecently: false,
    phone: 'ATM Theft Detection',
    status: 'active',
    workOrder : 'W0_000145',
    primaryIncident : 'ATM Theft Detection',
    serviceAmount: 'Commercial Bank',
    SystemStatus: false,
    Priority : 'No Priority'
  },
  {
    id: '126ed71fc9cbfabc601c56c5',
    street: '1008 Morningstar Circle',
    avatar: '/assets/avatars/avatar-meggie-heinonen.jpg',
    createdAt: subDays(subHours(subMinutes(now, 7), 3), 2).getTime(),
    dateOfBirth: '09/21/1998',
    email: 'mheinonen2@devias.io',
    isFavorite: false,
    isReturning: false,
    lastOrderDate: subDays(subHours(subMinutes(now, 5), 8), 1).getTime(),
    name: 'Meggie Heinonen',
    orderedRecently: false,
    phone: '(706) 923-5237',
    status: 'inactive',
    workOrder : 'W0_000145',
    primaryIncident : 'ATM Theft Detection',
    serviceAmount: 'Commercial Bank',
    SystemStatus: true,
    Priority : 'No Priority'

  },
  {
    id: 'aafaeb0545357922aff32a7b',
    street: '51926 Lighthouse Bay Parkway',
    avatar: '/assets/avatars/avatar-sean-picott.jpg',
    createdAt: subDays(subHours(subMinutes(now, 11), 2), 3).getTime(),
    dateOfBirth: '09/21/1998',
    email: 'spicott8@devias.io',
    isFavorite: false,
    isReturning: true,
    lastOrderDate: subDays(subHours(subMinutes(now, 52), 6), 2).getTime(),
    name: 'Sean Picott',
    orderedRecently: true,
    status: 'active',
    workOrder : 'W0_000145',
    primaryIncident : 'ATM Theft Detection',
    serviceAmount: 'Commercial Bank',
    SystemStatus: true,
    Priority : 'No Priority'
  },
  {
    id: '16b526d9e0fefe53f7eba66b',
    street: '007 Boyd Avenue',
    avatar: '/assets/avatars/avatar-bell-covely.jpg',
    createdAt: subDays(subHours(subMinutes(now, 18), 9), 5).getTime(),
    dateOfBirth: '09/21/1998',
    email: 'bcovely1@devias.io',
    isFavorite: false,
    isReturning: false,
    lastOrderDate: subDays(subHours(subMinutes(now, 41), 16), 1).getTime(),
    name: 'Bell Covely',
    orderedRecently: false,
    phone: '(603) 472-3015',
    status: 'active',
    workOrder : 'W0_000145',
    primaryIncident : 'ATM Theft Detection',
    serviceAmount: 'Commercial Bank',
    SystemStatus: false,
    Priority : 'Priority'
  }
];

export const customer: Customer = {
  id: 'a105ac46530704806ca58ede',
  street: '4 Scoville Street',
  avatar: '/assets/avatars/avatar-fabiano-jorioz.jpg',
  city: 'Berlin',
  country: 'Germany',
  createdAt: subDays(subHours(subMinutes(now, 39), 19), 15).getTime(),
  dateOfBirth: '09/21/1998',
  email: 'fjoriozi@devias.io',
  isTaxExempt: false,
  lastContactChannel: 'Organic',
  lastContactDate: subDays(subHours(subMinutes(now, 32), 5), 13).getTime(),
  lastOrderDate: subDays(subHours(subMinutes(now, 44), 23), 9).getTime(),
  name: 'Fabiano Jorioz',
  orderValue: 12200,
  ordersPlaced: 17,
  phone: '(322) 167-3824',
  status: 'active',
  storeCredit: 0
};


export const customerOrders: CustomerOrder[] = [

];

export const customerNotes: CustomerNote[] = [
  {
    id: '204add94eb454ac9b59c839f',
    authorId: '6208b869bbc127ed39b87e31',
    authorAvatar: '/assets/avatars/avatar-laurie-tardy.jpg',
    authorName: 'Laurie T.',
    content: 'I really enjoyed working with this client! She is a ray of sunshine every time I call her. She has a cat called Sticks which she loves very much',
    createdAt: subMinutes(now, 12).getTime()
  },
  {
    id: '5e86809283e28b96d2d38537',
    authorId: '5e86809283e28b96d2d38537',
    authorAvatar: '/assets/avatars/avatar-chen-simmons.jpg',
    authorName: 'Chen Simmons',
    content: 'Don’t call the client before 5 PM, trust me I know what I’m saying',
    createdAt: subMinutes(now, 78).getTime()
  }
];

export const customerLogs: CustomerLogs[] = [
  {
    id: '5ed013d09883e4149bc55c2e',
    createdAt: subMinutes(now, 12).getTime(),
    message: 'updated customer',
    subjectId: '5e86809283e28b96d2d38537',
    subjectAvatar: '/assets/avatars/avatar-chen-simmons.jpg',
    subjectName: 'Chen Simmons',
    type: 'updatedCustomer'
  },
  {
    id: '6b900fdedd2e2af1623439ce',
    createdAt: subMinutes(now, 50).getTime(),
    message: 'updated customer',
    subjectId: '5e86809283e28b96d2d38537',
    subjectAvatar: '/assets/avatars/avatar-chen-simmons.jpg',
    subjectName: 'Chen Simmons',
    type: 'updatedCustomer'
  },
  {
    id: '8d66063fc907c67db3966c97',
    createdAt: subDays(subMinutes(now, 17), 15).getTime(),
    message: 'triggered the action “Generate Invoice” on the customer',
    subjectId: '924d48e800babe1a0d174478',
    subjectAvatar: '/assets/avatars/avatar-horia-tepar.jpg',
    subjectName: 'Horia Tepar',
    type: 'generateInvoice'
  },
  {
    id: 'bd7dd269d6ff1db1764da986',
    createdAt: subDays(subMinutes(now, 54), 16).getTime(),
    message: 'triggered the action “Generate Invoice” on the customer',
    subjectId: '924d48e800babe1a0d174478',
    subjectAvatar: '/assets/avatars/avatar-horia-tepar.jpg',
    subjectName: 'Horia Tepar',
    type: 'generateInvoice'
  }
];
