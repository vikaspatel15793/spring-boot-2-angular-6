import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    name: 'Focus Area',
    url: '/focus-area',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'View',
        url: '/focus-area',
        icon: 'icon-view'
      },
      {
        name: 'Add',
        url: '/focus-area/new',
        icon: 'icon-add'
      }
    ]
  }
];
