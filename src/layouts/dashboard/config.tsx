import type { ReactNode } from 'react';
import { paths } from '../../paths';


export interface Item {
  external?: boolean;
  icon?: ReactNode;
  items?: Item[];
  path?: string;
  title: string;
}

export const items: Item[] = [
  {
    title: 'Services',
    path: paths.dashboard.index,
    items: [
      {
        title: 'Work Orders',
        path: paths.dashboard.index,
        icon: (
          <img src="/assets/workOrder.svg" />

        ),
      },
      {
        title: 'Schedule Board',
        path: paths.dashboard.customers.details.index, 
        icon: (
          <img src="/assets/ScheduleBoard.svg" />

        ),
      },
      {
        title: 'Bookings',
        path: paths.booking.index,
        icon: (
          <img src="/assets/Booking.svg" />

        ),
      },
    ]
  },
  {
    title: 'Customers',
    path: paths.dashboard.orders.index,
    items: [
      {
        title: 'Accounts',
        path: paths.dashboard.orders.index,
        icon: (
          <img src="/assets/Profile.svg" />

        ),
      },
    ]
  },
  {
    title: 'Assets',
    path: paths.dashboard.products.index,
    items: [
      {
        title: 'Assets',
        path: paths.dashboard.products.index,
        icon: (
          <img src="/assets/Assets.svg" />

        ),
      },
      {
        title: 'Functional Locations',
        path: paths.dashboard.products.details.index,
        icon: (
          <img src="/assets/FunctionalLocation.svg" />

        ),
      },
    ]
  },
  {
    title: 'Analytics & Insights',
    path: paths.dashboard.invoices.index,
    items: [
      {
        title: 'Field Service History',
        path: paths.field_service.index,
        icon: (
          <img src="/assets/History.svg" />
        ),        
      },
    ]
  },
  ];
