import { Home, Activity, ShoppingCart } from 'react-feather'

export default [
  {
    id: 'dashboards',
    title: 'Dashboards',
    icon: <Home />,
    children: [
      {
        id: 'analyticsDash',
        title: 'Superadmin',
        icon: <Activity />,
        navLink: '/dashboard/superadmin'
      },
      {
        id: 'eCommerceDash',
        title: 'eCommerce',
        icon: <ShoppingCart />,
        navLink: '/admin/dashboard'
      },
      {
        id: 'adminDash',
        title: 'AdminDash',
        icon: <ShoppingCart />,
        navLink: '/dashboard/studentDash'
      },
      {
        id: 'studentDash',
        title: 'StdentDash',
        icon: <ShoppingCart />,
        navLink: '/dashboard/studentDash'
      }
    ]
  }
]
