import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const PagesRoutes = [
  {
    path: '/schooladmin/login',
    component: lazy(() => import('../../views/pages/authentication/SchooladminLogin')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/groupadmin/login',
    component: lazy(() => import('../../views/pages/authentication/GroupAdminLogin')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/admin/login',
    component: lazy(() => import('../../views/pages/authentication/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/registration',
    component: lazy(() => import('../../views/pages/authentication/Registration')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/userverifiaction',
    component: lazy(() => import('../../views/pages/authentication/UserVerification')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/userlogin',
    component: lazy(() => import('../../views/pages/authentication/UserLogin')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/userforgotpassword',
    component: lazy(() => import('../../views/pages/authentication/UserForgotPassword')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/usernewpassword',
    component: lazy(() => import('../../views/pages/authentication/UserNewPassword')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/pages/login-v1',
    component: lazy(() => import('../../views/pages/authentication/LoginV1')),
    layout: 'BlankLayout'
  },
  {
    path: '/pages/login-v2',
    component: lazy(() => import('../../views/pages/authentication/LoginV2')),
    layout: 'BlankLayout'
  },
  {
    path: '/register',
    component: lazy(() => import('../../views/pages/authentication/Register')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/pages/register-v1',
    component: lazy(() => import('../../views/pages/authentication/RegisterV1')),
    layout: 'BlankLayout'
  },
  {
    path: '/pages/register-v2',
    component: lazy(() => import('../../views/pages/authentication/RegisterV2')),
    layout: 'BlankLayout'
  },
  {
    path: '/forgot-password',
    component: lazy(() => import('../../views/pages/authentication/ForgotPassword')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/pages/forgot-password-v1',
    component: lazy(() => import('../../views/pages/authentication/ForgotPasswordV1')),
    layout: 'BlankLayout'
  },
  {
    path: '/pages/forgot-password-v2',
    component: lazy(() => import('../../views/pages/authentication/ForgotPasswordV2.js')),
    layout: 'BlankLayout'
  },
  {
    path: '/pages/reset-password-v1',
    component: lazy(() => import('../../views/pages/authentication/ResetPasswordV1')),
    layout: 'BlankLayout'
  },
  {
    path: '/pages/reset-password-v2',
    component: lazy(() => import('../../views/pages/authentication/ResetPasswordV2')),
    layout: 'BlankLayout'
  },
  {
    path: '/pages/profile',
    component: lazy(() => import('../../views/pages/profile'))
  },
  {
    path: '/pages/faq',
    component: lazy(() => import('../../views/pages/faq'))
  },
  {
    path: '/pages/knowledge-base',
    exact: true,
    component: lazy(() => import('../../views/pages/knowledge-base/KnowledgeBase'))
  },
  {
    path: '/pages/knowledge-base/:category',
    exact: true,
    component: lazy(() => import('../../views/pages/knowledge-base/KnowledgeBaseCategory')),
    meta: {
      navLink: '/pages/knowledge-base'
    }
  },
  {
    path: '/pages/knowledge-base/:category/:question',
    component: lazy(() => import('../../views/pages/knowledge-base/KnowledgeBaseCategoryQuestion')),
    meta: {
      navLink: '/pages/knowledge-base'
    }
  },
  {
    path: '/pages/account-settings',
    component: lazy(() => import('../../views/pages/account-settings'))
  },
  {
    path: '/pages/blog/list',
    exact: true,
    component: lazy(() => import('../../views/pages/blog/list'))
  },
  {
    path: '/pages/blog/detail/:id',
    exact: true,
    component: lazy(() => import('../../views/pages/blog/details')),
    meta: {
      navLink: '/pages/blog/detail'
    }
  },
  {
    path: '/pages/blog/detail',
    exact: true,
    component: () => <Redirect to='/pages/blog/detail/1' />
  },
  {
    path: '/pages/blog/edit/:id',
    exact: true,
    component: lazy(() => import('../../views/pages/blog/edit')),
    meta: {
      navLink: '/pages/blog/edit'
    }
  },
  {
    path: '/pages/blog/edit',
    exact: true,
    component: () => <Redirect to='/pages/blog/edit/1' />
  },
  {
    path: '/pages/pricing',
    component: lazy(() => import('../../views/pages/pricing'))
  },
  {
    path: '/misc/coming-soon',
    component: lazy(() => import('../../views/pages/misc/ComingSoon')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/misc/not-authorized',
    component: lazy(() => import('../../views/pages/misc/NotAuthorized')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/misc/maintenance',
    component: lazy(() => import('../../views/pages/misc/Maintenance')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/misc/error',
    component: lazy(() => import('../../views/pages/misc/Error')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/pages/app_settings',
    component: lazy(() => import('../../views/pages/landingpage_settings')),
    meta: {
      publicRoute: true
    }
  },
  //dark path
  {
    path: '/pages/landing_settings',
    component: lazy(() => import('../../views/pages/landingpage_settings'))
  },
  {
    path: '/pages/landing_settings_school',
    component: lazy(() => import('../../views/pages/school_cms_settings/landingpage_settings_school'))
  },
  {
    path: '/pages/landing_settings_organization',
    component: lazy(() => import('../../views/pages/organization-cms-settings/landingpage_settings_organization'))
  },
  {
    path: '/pages/organization_general_settings',
    component: lazy(() => import('../../views/pages/organization-cms-settings/organization_general_settings'))
  },
  {
    path: '/pages/organization/school/list',
    component: lazy(() => import('../../views/apps/organization/school/list'))
  },
  {
    path: '/pages/organization/school/view/:id',
    component: lazy(() => import('../../views/apps/organization/school/view'))
  },
  {
    path: '/pages/school/list',
    component: lazy(() => import('../../views/apps/school/list'))
  },
  {
    path: '/pages/school/create',
    component: lazy(() => import('../../views/apps/school/create'))
  },
  {
    path: '/pages/role/create',
    component: lazy(() => import('../../views/pages/role/create'))
  },
  {
    path: '/pages/role/edit/:id',
    component: lazy(() => import('../../views/pages/role/edit'))
  },
  {
    path: '/pages/role/list',
    component: lazy(() => import('../../views/pages/role'))
  },
  {
    path: '/pages/testimonials/create',
    component: lazy(() => import('../../views/pages/testimonials/create'))
  },
  {
    path: '/pages/testimonials/edit/:id',
    component: lazy(() => import('../../views/pages/testimonials/edit'))
  },
  {
    path: '/pages/testimonials/list',
    component: lazy(() => import('../../views/pages/testimonials'))
  },
  {
    path: '/pages/licence_type/create',
    component: lazy(() => import('../../views/pages/licence_type/create'))
  },
  {
    path: '/pages/licence_type/edit/:id',
    component: lazy(() => import('../../views/pages/licence_type/edit'))
  },
  {
    path: '/pages/licence_type/list',
    component: lazy(() => import('../../views/pages/licence_type'))
  },
  {
    path: '/pages/sub_licence_type/create',
    component: lazy(() => import('../../views/pages/licence_type/sub_license_types/create'))
  },
  {
    path: '/pages/sub_licence_type/edit/:id',
    component: lazy(() => import('../../views/pages/licence_type/sub_license_types/edit'))
  },
  {
    path: '/pages/sub_licence_type/list',
    component: lazy(() => import('../../views/pages/licence_type/sub_license_types'))
  },
  {
    path: '/pages/sub_license_type_level1/create',
    component: lazy(() => import('../../views/pages/licence_type/sub_licensetypelevel_1/create'))
  },
  {
    path: '/pages/sub_license_type_level1/edit/:id',
    component: lazy(() => import('../../views/pages/licence_type/sub_licensetypelevel_1/edit'))
  },
  {
    path: '/pages/sub_license_type_level1/list',
    component: lazy(() => import('../../views/pages/licence_type/sub_licensetypelevel_1'))
  },
  {
    path: '/pages/sub_license_type_level2/create',
    component: lazy(() => import('../../views/pages/licence_type/sub_licensetypelevel_2/create'))
  },
  {
    path: '/pages/sub_license_type_level2/edit/:id',
    component: lazy(() => import('../../views/pages/licence_type/sub_licensetypelevel_2/edit'))
  },
  {
    path: '/pages/sub_license_type_level2/list',
    component: lazy(() => import('../../views/pages/licence_type/sub_licensetypelevel_2'))
  },
  {
    path: '/pages/sub_license_type_level3/create',
    component: lazy(() => import('../../views/pages/licence_type/sub_licensetypelevel_3/create'))
  },
  {
    path: '/pages/sub_license_type_level3/edit/:id',
    component: lazy(() => import('../../views/pages/licence_type/sub_licensetypelevel_3/edit'))
  },
  {
    path: '/pages/sub_license_type_level3/list',
    component: lazy(() => import('../../views/pages/licence_type/sub_licensetypelevel_3'))
  },
  {
    path: '/pages/subscriptionplanlist',
    component: lazy(() => import('../../views/pages/subscriptionplan/list'))
  },
  {
    path: '/pages/subscriptionplanadd',
    component: lazy(() => import('../../views/pages/subscriptionplan/create'))
  },
  {
    path: '/pages/subscriptionplanedit/edit/:id',
    component: lazy(() => import('../../views/pages/subscriptionplan/edit'))
  },
  {
    path: '/pages/config-component',
    component: lazy(() => import('../../views/pages/subscriptionplan/ConfigureComponent'))
  },
  {
    path: '/pages/component/list',
    component: lazy(() => import('../../views/pages/subscriptionplan/Components/list'))
  },
  {
    path: '/pages/component/create',
    component: lazy(() => import('../../views/pages/subscriptionplan/Components/create'))
  },
  // {
  //   path: '/pages/component/edit:id',
  //   component: lazy(() => import('../../views/pages/subscriptionplan/Components/edit'))
  // },
  {
    path: '/pages/sub_license_type_level/edit',
    component: lazy(() => import('../../views/pages/licence_type/sub_licensetypelevel_1/edit'))
  },
  {
    path: '/pages/school_cms_settings/footer',
    component: lazy(() => import('../../views/pages/school_cms_settings/footer_settings/footerSettings'))
  },
  {
    path: '/pages/school_cms_settings/menu',
    component: lazy(() => import('../../views/pages/school_cms_settings/menu_settings/menuSettings'))
  },
  {
    path: '/pages/school_cms_settings/groupadmin',
    component: lazy(() => import('../../views/pages/school_cms_settings/group_admin/groupAdmin'))
  },
  //start routing for student
  {
    path: '/pages/all_students',
    component: lazy(() => import('../../views/pages/students/list'))
  },
  {
    path: '/pages/add_student',
    component: lazy(() => import('../../views/pages/students/add'))
  },
  //end routing for student
  //start routing for trainer
  {
    path: '/pages/all_trainers',
    component: lazy(() => import('../../views/pages/trainer/list'))
  },
  {
    path: '/pages/add_trainer',
    component: lazy(() => import('../../views/pages/trainer/create'))
  },
  {
    path: '/pages/edit_trainer/:id',
    component: lazy(() => import('../../views/pages/trainer/edit'))
  },
  //end routing for trainer
  //start routing for trainer
  {
    path: '/pages/all_organizations',
    component: lazy(() => import('../../views/pages/organizations/list'))
  },
  {
    path: '/pages/add_organization',
    component: lazy(() => import('../../views/pages/organizations/create'))
  },
  {
    path: '/pages/organization/edit/:id',
    component: lazy(() => import('../../views/pages/organizations/edit'))
  },
  {
    path: '/pages/superadmin_general_settings',
    component: lazy(() => import('../../views/pages/superadmin_general_settings'))
  },
  //end routing for trainer
  //start routing for simulator
  {
    path: '/pages/all_simulator',
    component: lazy(() => import('../../views/pages/simulator/list'))
  },
  {
    path: '/pages/add_simulator',
    component: lazy(() => import('../../views/pages/simulator/create'))
  },
  {
    path: '/pages/simulator/edit/:id',
    component: lazy(() => import('../../views/pages/simulator/edit'))
  },
  //end routing for simulator
  //start routing for circuit
  {
    path: '/pages/circuit',
    component: lazy(() => import('../../views/dashboard/circuit'))
  },
  {
    path: '/pages/add-circuit',
    component: lazy(() => import('../../views/dashboard/circuit/store'))
  },
  {
    path: '/pages/edit-circuit/:id',
    component: lazy(() => import('../../views/dashboard/circuit/edit'))
  },
  //end routing for circuit
  //start routing for schedule
  {
    path: '/pages/all_schedule',
    component: lazy(() => import('../../views/pages/schedule/list'))
  },
  {
    path: '/pages/add_schedule',
    component: lazy(() => import('../../views/pages/schedule/create'))
  },
  {
    path: '/pages/edit-schedule/:id',
    component: lazy(() => import('../../views/pages/schedule/edit'))
  },
  {
    path: '/pages/schedule/detail/:id',
    component: lazy(() => import('../../views/pages/schedule/details'))
  },
  {
    path: '/group/pages/school/list',
    component: lazy(() => import('../../views/apps/school/list'))
  }
  //end routing for schedule
]

export default PagesRoutes
