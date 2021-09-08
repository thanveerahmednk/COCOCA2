import react from 'react';

export const sidebarItem = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'uil-home-alt',
  },
  {
    path: '/user',
    title: 'user',
    icon: 'uil-user',

    subNav: [
      {
        path: '/user',
        title: 'Add/manage user',
      },
    ],
  },
  {
    path: '#',
    title: 'security',
    icon: 'uil-lock',

    subNav: [
      // {
      //   path: '/community',
      //   title: 'Manage Security',
      // },
    ],
  },
];
