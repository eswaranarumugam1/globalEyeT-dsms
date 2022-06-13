import { lazy } from 'react'

const DashboardRoutes = [
  // Dashboards
  {
    path: '/dashboard/superadmin',
    component: lazy(() => import('../../views/dashboard/superadmin'))
  },
  {
    path: '/admin/dashboard',
    component: lazy(() => import('../../views/dashboard/ecommerce')),
    exact: true
  },
  {
    path: '/dashboard/schooldashboard',
    component: lazy(() => import('../../views/dashboard/schoolDashboard')),
    exact: true
  },
  {
    path: '/dashboard/studentDash',
    component: lazy(() => import('../../views/dashboard/studentDash')),
    exact: true
  },
  {
    path: '/dashboard/organization',
    component: lazy(() => import('../../views/dashboard/schoolDashboard')),
    exact: true
  }
]

export default DashboardRoutes
