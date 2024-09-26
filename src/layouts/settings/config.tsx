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
    title: 'General',
    path: paths.settings.index,
    items: [
      {
        title: 'Users',
        path: paths.settings.index,
        icon: (
          <img src="/assets/resources/people-sidenav.svg" />

        ),
      },
      {
        title: 'Territories',
        path: paths.settings.territories, 
        icon: (
          <img src="/assets/settings/side-nav/map.png" />

        ),
      },
      {
        title: 'Org Units',
        path: paths.settings.org, 
        icon: (
          <img src="/assets/settings/side-nav/org.png" />

        ),
      },      {
        title: 'Assets Categories',
        path: paths.dashboard.customers.details.index, 
        icon: (
          <img src="/assets/settings/side-nav/office.png" />

        ),
      },      {
        title: 'Templates',
        path: paths.settings.template, 
        icon: (
          <img src="/assets/settings/side-nav/templates.png" />

        ),
      },
      {
        title: 'Order Type',
        path: paths.settings.order, 
        icon: (
          <img src="/assets/settings/side-nav/order.png" />

        ),
      },
    ]
  },
  ];
