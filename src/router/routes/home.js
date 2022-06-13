import { lazy } from 'react'

const HomeRoutes = [
 
  {
    path: '/dashboard/home',
    component: lazy(() => import('../../views/dashboard/home')),
    exact: true
  }
]

export default HomeRoutes