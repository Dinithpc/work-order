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
    title: 'Resources',
    path: paths.dashboard.index,
    items: [
      {
        title: 'Resources',
        path: paths.resources.index,
        icon: (
          <img src="/assets/resources/people-sidenav.svg" />

        ),
      },
      {
        title: 'Client',
        path: paths.dashboard.customers.details.index, 
        icon: (
          <img src="/assets/resources/clients-sidenav.svg" />

        ),
      },
    ]
  },
  ];
