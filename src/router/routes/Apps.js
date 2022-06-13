import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const AppRoutes = [
  {
    path: '/apps/email',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/email'))
  },
  {
    path: '/apps/email/:folder',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/email')),
    meta: {
      navLink: '/apps/email'
    }
  },
  {
    path: '/apps/email/label/:label',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/email')),
    meta: {
      navLink: '/apps/email'
    }
  },
  {
    path: '/apps/email/:filter',
    component: lazy(() => import('../../views/apps/email')),
    meta: {
      navLink: '/apps/email'
    }
  },
  {
    path: '/apps/chat',
    appLayout: true,
    className: 'chat-application',
    component: lazy(() => import('../../views/apps/chat'))
  },
  {
    path: '/apps/todo',
    exact: true,
    appLayout: true,
    className: 'todo-application',
    component: lazy(() => import('../../views/apps/todo'))
  },
  {
    path: '/apps/todo/:filter',
    appLayout: true,
    exact: true,
    className: 'todo-application',
    component: lazy(() => import('../../views/apps/todo')),
    meta: {
      navLink: '/apps/todo'
    }
  },
  {
    path: '/apps/todo/tag/:tag',
    appLayout: true,
    className: 'todo-application',
    component: lazy(() => import('../../views/apps/todo')),
    meta: {
      navLink: '/apps/todo'
    }
  },
  {
    path: '/apps/calendar',
    component: lazy(() => import('../../views/apps/calendar'))
  },
  {
    path: '/apps/invoice/list',
    component: lazy(() => import('../../views/apps/invoice/list'))
  },
  {
    path: '/apps/invoice/preview/:id',
    component: lazy(() => import('../../views/apps/invoice/preview')),
    meta: {
      navLink: '/apps/invoice/preview'
    }
  },
  {
    path: '/apps/invoice/preview',
    exact: true,
    component: () => <Redirect to='/apps/invoice/preview/4987' />
  },
  {
    path: '/apps/invoice/edit/:id',
    component: lazy(() => import('../../views/apps/invoice/edit')),
    meta: {
      navLink: '/apps/invoice/edit'
    }
  },
  {
    path: '/apps/invoice/edit',
    exact: true,
    component: () => <Redirect to='/apps/invoice/edit/4987' />
  },
  {
    path: '/apps/invoice/add',
    component: lazy(() => import('../../views/apps/invoice/add'))
  },
  {
    path: '/apps/invoice/print',
    layout: 'BlankLayout',
    component: lazy(() => import('../../views/apps/invoice/print'))
  },
  {
    path: '/apps/ecommerce/shop',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/shop'))
  },
  {
    path: '/apps/ecommerce/wishlist',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/wishlist'))
  },
  {
    path: '/apps/ecommerce/product-detail',
    exact: true,
    className: 'ecommerce-application',
    component: () => <Redirect to='/apps/ecommerce/product-detail/apple-i-phone-11-64-gb-black-26' />
  },
  {
    path: '/apps/ecommerce/product-detail/:product',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/detail')),
    meta: {
      navLink: '/apps/ecommerce/product-detail'
    }
  },
  {
    path: '/apps/ecommerce/checkout',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/checkout'))
  },
  {
    path: '/apps/user/list',
    component: lazy(() => import('../../views/apps/user/list'))
  },
  {
    path: '/apps/user/edit',
    exact: true,
    component: () => <Redirect to='/apps/user/edit/1' />
  },
  {
    path: '/apps/user/edit/:id',
    component: lazy(() => import('../../views/apps/user/useredit')),
    meta: {
      navLink: '/apps/user/edit'
    }
  },
  //dark 14/01/2022
  {
    path: '/apps/user/permission',
    component: lazy(() => import('../../views/apps/user/permission/edits'))
  },
  {
    path: '/pages/school/edit/:id',
    component: lazy(() => import('../../views/apps/school/edit'))
  },
  {
    path: '/pages/students/edit/:id',
    component: lazy(() => import('../../views/pages/students/edit'))
  },
  //code ends
  {
    path: '/apps/user/view',
    exact: true,
    component: () => <Redirect to='/apps/user/view/1' />
  },
  {
    path: '/apps/user/view/:id',
    component: lazy(() => import('../../views/apps/user/view')),
    meta: {
      navLink: '/apps/user/view'
    }
  },
  {
    path: '/pages/component/edit/:id',
    component: lazy(() => import('../../views/pages/subscriptionplan/Components/edit'))
  },
  {
    path: '/pages/component/manage_sessions/:id',
    component: lazy(() => import('../../views/pages/subscriptionplan/Components/manage_sessions'))
  },
  {
    path: '/pages/component/add-classroom',
    component: lazy(() => import('../../views/pages/classRoom/index'))
  },
  {
    path: '/pages/component/add-update-classroom-type',
    component: lazy(() => import('../../views/pages/classRoom/add-classroom-type'))
  },
  {
    path: '/pages/component/add-update-classroom-function',
    component: lazy(() => import('../../views/pages/classRoom/add-classroom-function'))
  },
  {
    path: '/pages/component/all-classrooms',
    component: lazy(() => import('../../views/pages/classRoom/all-classroom'))
  },
  {
    path: '/pages/component/add-vehicle',
    component: lazy(() => import('../../views/pages/vehicle/index'))
  },
  {
    path: '/pages/component/add-vehicle-type',
    component: lazy(() => import('../../views/pages/vehicle/add-vehicle-type'))
  },
  {
    path: '/pages/component/sessions',
    component: lazy(() => import('../../views/pages/sessions/create'))
  },
  {
    path: '/pages/component/add-vehicle-brand',
    component: lazy(() => import('../../views/pages/vehicle/add-vehicle-brand'))
  },
  {
    path: '/pages/component/all-vehicles',
    component: lazy(() => import('../../views/pages/vehicle/all-vehicle'))
  }
]

export default AppRoutes
