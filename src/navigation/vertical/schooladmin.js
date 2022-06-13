import { FileText, Mail, ShoppingCart, MessageSquare, Calendar, CheckSquare, Circle, User, Users, Clipboard, Trello, Truck } from 'react-feather'

export default [
  //dark code start school admin menu
  {
    header: 'School Admin Dashboard'
  },
  {
    id: 'RolesPrivileges',
    title: 'Roles & Privileges',
    icon: <User size={20} />,
    children: [
      // {
      //   id: 'role',
      //   title: 'Add Role',
      //   icon: <Circle size={12} />,
      //   navLink: '/pages/role/create'
      // },
      {
        id: 'roles',
        title: 'Roles',
        icon: <Circle size={12} />,
        navLink: '/pages/role/list?admin=schoolAdmin'
      },
      {
        id: 'permission',
        title: 'Permission',
        icon: <Circle size={12} />,
        navLink: '/apps/user/permission?admin=schoolAdmin'
      }
    ]
  },
  {
    id: 'UsersStaff',
    title: 'Users / Staff',
    icon: <Users size={20} />,
    children: [
      {
        id: 'adduser',
        title: 'Add User',
        icon: <Circle size={12} />
        // navLink: '/apps/user/list'
      },

      {
        id: 'alluser',
        title: 'All User',
        icon: <Circle size={12} />,
        navLink: '/apps/user/list?admin=schoolAdmin'
      }
    ]
  },
  {
    id: 'ManageStudents',
    title: 'Manage Student',
    icon: <Clipboard size={20} />,
    children: [
      {
        id: 'addstudent',
        title: 'Add New Student',
        icon: <Circle size={12} />,
        navLink: '/pages/add_student?admin=schoolAdmin'
      },

      {
        id: 'allstudent',
        title: 'All Students',
        icon: <Circle size={12} />,
        navLink: '/pages/all_students?admin=schoolAdmin'
      }
      // {
      //   id: 'newregisters',
      //   title: 'New Registers',
      //   icon: <Circle size={12} />
      //   // navLink: '/apps/user/edit'
      // }
    ]
  },

  // {
  //   id: 'schools',
  //   title: 'Manage Schools',
  //   icon: <FileText size={12} />,
  //   //  navLink: '/apps/school',
  //   children:[
  //     {
  //       id: 'schoollist',
  //       title: 'Schools List',
  //       icon: <Circle size={12} />,
  //       navLink: '/pages/school/list?admin=schoolAdmin'

  //     },
  //     {
  //       id: 'addschool',
  //       title: 'Add Schools',
  //       icon: <Circle size={12} />,
  //       navLink: '/pages/school/create?admin=schoolAdmin'

  //     }
  //   ]
  // },
  {
    id: 'ManageTrainers',
    title: 'Manage Trainers',
    icon: <User size={20} />,
    children: [
      {
        id: 'addtrainer',
        title: 'Add New Trainer',
        icon: <Circle size={12} />,
        navLink: '/pages/add_trainer?admin=schoolAdmin'
      },

      {
        id: 'alltrainer',
        title: 'All Trainer',
        icon: <Circle size={12} />,
        navLink: '/pages/all_trainers?admin=schoolAdmin'
      }
    ]
  },
  {
    id: 'ManageSchedules',
    title: 'Manage Schedules',
    icon: <Trello size={20} />,
    children: [
      {
        id: 'addschedules',
        title: 'Add Schedules',
        icon: <Circle size={12} />,
        navLink: '/pages/add_schedule?admin=schoolAdmin'
      },

      {
        id: 'allschedules',
        title: 'All Schedules',
        icon: <Circle size={12} />,
        navLink: '/pages/all_schedule?admin=schoolAdmin'
      }
    ]
  },
  {
    id: 'ManageClassRooms',
    title: 'Manage Class Rooms',
    icon: <User size={20} />,
    children: [
      {
        id: 'addclassroomstype',
        title: 'Class Rooms Type',
        icon: <Circle size={12} />,
        navLink: '/pages/component/add-update-classroom-type?admin=schoolAdmin'
      },
      {
        id: 'addclassrooms',
        title: 'Class Rooms Function',
        icon: <Circle size={12} />,
        navLink: '/pages/component/add-update-classroom-function?admin=schoolAdmin'
      },
      {
        id: 'addclassrooms2',
        title: 'Add Class Rooms',
        icon: <Circle size={12} />,
        navLink: '/pages/component/add-classroom?admin=schoolAdmin'
      },
      {
        id: 'allclassrooms',
        title: 'All Class Rooms',
        icon: <Circle size={12} />,
        navLink: '/pages/component/all-classrooms?admin=schoolAdmin'
      },
      {
        id: 'roomshedules',
        title: 'Room Schedules',
        icon: <Circle size={12} />
        // navLink: '/apps/user/edit'
      }
    ]
  },
  {
    id: 'ManageCircuit ',
    title: 'Manage Circuits',
    icon: <User size={20} />,
    children: [
      {
        id: 'addcircuits',
        title: 'Add Circuits',
        icon: <Circle size={12} />,
        navLink: '/pages/add-circuit?admin=schoolAdmin'
      },
      {
        id: 'allcircuit',
        title: 'All Circuits',
        icon: <Circle size={12} />,
        navLink: '/pages/circuit?admin=schoolAdmin'
      }
      // {
      //   id: 'circuitshedules',
      //   title: 'Circuits Schedules',
      //   icon: <Circle size={12} />
      //   // navLink: '/apps/user/edit'
      // }
    ]
  },
  {
    id: 'ManagecVehicle',
    title: 'Manage Vehicles',
    icon: <Truck size={20} />,
    children: [
      {
        id: 'addvehiclestype',
        title: 'Add Vehicles Type',
        icon: <Circle size={12} />,
        navLink: '/pages/component/add-vehicle-type?admin=schoolAdmin'
      },
      {
        id: 'addvehiclesBrand',
        title: 'Add Vehicles Brand',
        icon: <Circle size={12} />,
        navLink: '/pages/component/add-vehicle-brand?admin=schoolAdmin'
      },
      {
        id: 'addvehicles',
        title: 'Add Vehicles',
        icon: <Circle size={12} />,
        navLink: '/pages/component/add-vehicle?admin=schoolAdmin'
      },
      {
        id: 'allvehicles',
        title: 'All Vehicles',
        icon: <Circle size={12} />,
        navLink: '/pages/component/all-vehicles?admin=schoolAdmin'
      },
      {
        id: 'vehicleshedules',
        title: 'Vehicles Schedules',
        icon: <Circle size={12} />
        // navLink: '/apps/user/edit'
      }
    ]
  },
  {
    id: 'ManagecSimulators',
    title: 'Manage Simulators',
    icon: <User size={20} />,
    children: [
      {
        id: 'addsimulator',
        title: 'Add Simulator',
        icon: <Circle size={12} />,
        navLink: '/pages/add_simulator?admin=schoolAdmin'
      },
      {
        id: 'allsimulators',
        title: 'All Simulators',
        icon: <Circle size={12} />,
        navLink: '/pages/all_simulator?admin=schoolAdmin'
      }
      // {
      //   id: 'simulatorsshedules',
      //   title: 'Simulators Schedules',
      //   icon: <Circle size={12} />
      //   // navLink: '/apps/user/edit'
      // }
    ]
  },
  {
    id: 'ManagecFeepayments',
    title: 'Manage Fee payments',
    icon: <User size={20} />,
    children: [
      {
        id: 'feepayments',
        title: 'Fee payments',
        icon: <Circle size={12} />
        // navLink: '/apps/user/edit'
      },
      {
        id: 'feepaymentrequest',
        title: 'Fee payments Requests',
        icon: <Circle size={12} />
        // navLink: '/apps/user/edit'
      }
    ]
  },
  {
    id: 'Invoices',
    title: 'Manage Invoices',
    icon: <User size={20} />,
    children: [
      {
        id: 'allinvoices',
        title: 'All Invoices',
        icon: <Circle size={12} />
        // navLink: '/apps/user/edit'
      },
      {
        id: 'pendinginvoice',
        title: 'Pending Invoices',
        icon: <Circle size={12} />
        // navLink: '/apps/user/edit'
      }
    ]
  },
  {
    id: 'licensetypes',
    title: 'License Types',
    icon: <User size={20} />,
    children: [
      {
        id: 'licensetypes',
        title: 'License Types',
        icon: <Circle size={12} />,
        navLink: '/pages/licence_type/list?admin=schoolAdmin'
      },
      {
        id: 'sublicensetype',
        title: 'Sub License Type',
        icon: <Circle size={12} />,
        navLink: '/pages/sub_licence_type/list?admin=schoolAdmin'
      },
      {
        id: 'sub_license_type_level1',
        title: 'SubLicenseType One',
        icon: <Circle size={12} />,
        navLink: '/pages/sub_license_type_level1/list?admin=schoolAdmin'
      },
      {
        id: 'sub_license_type_level2',
        title: 'SubLicenseType Two',
        icon: <Circle size={12} />,
        navLink: '/pages/sub_license_type_level2/list?admin=schoolAdmin'
      },
      {
        id: 'sub_license_type_level3',
        title: 'SubLicenseType Three',
        icon: <Circle size={12} />,
        navLink: '/pages/sub_license_type_level3/list?admin=schoolAdmin'
      }
    ]
  },
  {
    id: 'subscriptionplans',
    title: 'Subscription Plans',
    icon: <User size={20} />,
    children: [
      {
        id: 'subscriptionplanlist',
        title: 'All Subscription Plans',
        icon: <Circle size={12} />,
        navLink: '/pages/subscriptionplanlist?admin=schoolAdmin'
      },
      {
        id: 'subscriptionplanadd',
        title: 'Add Subscription Plans',
        icon: <Circle size={12} />,
        navLink: '/pages/subscriptionplanadd?admin=schoolAdmin'
      },
      {
        id: 'configComponent',
        title: 'Configure Component',
        icon: <Circle size={12} />,
        navLink: '/pages/config-component?admin=schoolAdmin'
      },
      {
        id: 'componenetsTypes',
        title: 'Components',
        icon: <Circle size={12} />,
        navLink: '/pages/component/list?admin=schoolAdmin'
      }
    ]
  },
  {
    id: 'examschedules',
    title: 'Exam Schedules',
    icon: <User size={20} />,
    children: [
      {
        id: 'theory',
        title: 'Theory',
        icon: <Circle size={12} />
        // navLink: '/apps/user/edit'
      },
      {
        id: 'pratical',
        title: 'Pratical',
        icon: <Circle size={12} />
        // navLink: '/apps/user/edit'
      }
    ]
  },


  {
    id: 'report',
    title: 'Reports',
    icon: <User size={20} />,
    children: [
      {
        id: 'schoolreports',
        title: 'School Reports',
        icon: <Circle size={12} />,
        navLink: '/apps/report?admin=schoolAdmin'
      },
      {
        id: 'paymentreports',
        title: 'Payment Reports',
        icon: <Circle size={12} />,
        navLink: '/apps/report?admin=schoolAdmin'
      },
      {
        id: 'studentreports',
        title: 'Student Reports',
        icon: <Circle size={12} />,
        navLink: '/apps/report?admin=schoolAdmin'
      },
      {
        id: 'trainerreports',
        title: 'Trainer Reports',
        icon: <Circle size={12} />,
        navLink: '/apps/report?admin=schoolAdmin'
      },
      {
        id: 'schedulingreports',
        title: 'Scheduling Reports',
        icon: <Circle size={12} />,
        navLink: '/apps/report?admin=schoolAdmin'
      },
      {
        id: 'attendance',
        title: 'Attendance Reports',
        icon: <Circle size={12} />,
        navLink: '/apps/report?admin=schoolAdmin'
      },
      {
        id: 'results',
        title: 'Results',
        icon: <Circle size={12} />,
        navLink: '/apps/report?admin=schoolAdmin'
      }
    ]
  },
  {
    id: 'results',
    title: 'Results',
    icon: <User size={20} />,
    children: [
      {
        id: 'theory',
        title: 'Theory Results',
        icon: <Circle size={12} />,
        navLink: '/apps/report?admin=schoolAdmin'
      },
      {
        id: 'practical',
        title: 'Practical Results',
        icon: <Circle size={12} />,
        navLink: '/apps/report?admin=schoolAdmin'
      },
      {
        id: 'license',
        title: 'License issued/completed',
        icon: <Circle size={12} />,
        navLink: '/apps/report?admin=schoolAdmin'
      }
    ]
  },
  {
    id: 'testimonials',
    title: 'Testimonials',
    icon: <User size={20} />,
    children: [
      {
        id: 'addtestimonials',
        title: 'Add Testimonials',
        icon: <Circle size={12} />,
        navLink: '/pages/testimonials/create?admin=superAdmin'
      },
      {
        id: 'alltestimonials',
        title: 'All Testimonials',
        icon: <Circle size={12} />,
        navLink: '/pages/testimonials/list?admin=superAdmin'
      }
    ]
  },

  {
    id: 'cmssettings',
    title: 'School CMS Settings',
    icon: <FileText size={20} />,
    children: [
      // dark here route give
      {
        id: 'landingpagesettings',
        title: 'School LandingPG Settings',
        icon: <Circle size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/landing_settings_school?admin=schoolAdmin'
      },
      {
        id: 'menusettings',
        title: 'Menu Settings',
        icon: <Circle size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/school_cms_settings/menu?admin=schoolAdmin'
      },
      {
        id: 'footersettings',
        title: 'Footer Settings',
        icon: <Circle size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/school_cms_settings/footer?admin=schoolAdmin'
      },
      {
        id: 'pagesettings',
        title: 'Page Settings',
        icon: <Circle size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/school_cms_settings/footer?admin=schoolAdmin'
      },
      {
        id: 'groupadmin',
        title: 'Group Admin',
        icon: <Circle size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/school_cms_settings/groupadmin?admin=schoolAdmin'
      }
    ]
  }
  // {
  //   id: 'testimonials',
  //   title: 'Testimonials',
  //   icon: <User size={20} />,
  //   children: [      
  //     {
  //       id: 'addtestimonials',
  //       title: 'Add Testimonials',
  //       icon: <Circle size={12} />,
  //       navLink: '/pages/testimonials/create?admin=schoolAdmin'
  //     },
  //     {
  //       id: 'alltestimonials',
  //       title: 'All Testimonials',
  //       icon: <Circle size={12} />,
  //       navLink: '/pages/testimonials/list?admin=schoolAdmin'
  //     }
  //   ]
  // },
  //code ends

  // {
  //   header: 'Apps & Pages'
  // },
  //   {
  //     id: 'email',
  //     title: 'Email',
  //     icon: <Mail size={20} />,
  //     navLink: '/apps/email'
  //   },
  //   {
  //     id: 'users',
  //     title: 'User',
  //     icon: <User size={20} />,
  //     children: [
  //       {
  //         id: 'list',
  //         title: 'List',
  //         icon: <Circle size={12} />,
  //         navLink: '/apps/user/list'
  //       },

  //       {
  //         id: 'edit',
  //         title: 'Edit',
  //         icon: <Circle size={12} />,
  //         navLink: '/apps/user/edit'
  //       },
  //       {
  //         id: 'permission',
  //         title: 'Permission',
  //         icon: <Circle size={12} />,
  //         navLink: '/apps/user/permission'
  //       }
  //       // {
  //       //   id: 'role',
  //       //   title: 'Role',
  //       //   icon: <Circle size={12} />
  //       //   // navLink: '/apps/user/edit'
  //       // }
  //     ]
  //   },
  //   // {
  //   //   id: 'schools',
  //   //   title: 'Schools',
  //   //   icon: <Circle size={12} />,
  //   //   //  navLink: '/apps/school',
  //   //   children:[
  //   //     {
  //   //       id: 'shop1',
  //   //       title: 'Schools List',
  //   //       icon: <Circle size={12} />,
  //   //       navLink: '/pages/school/list'

  //   //     },
  //   //     {
  //   //       id: 'shop1',
  //   //       title: 'Add Schools',
  //   //       icon: <Circle size={12} />,
  //   //       navLink: '/pages/school/create'

  //   //     }
  //   //   ]
  //   // },

  //     {
  //       id: 'profile',
  //       title: 'Profile',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/user/view'
  //     },


  //   {
  //     id: 'services',
  //     title: 'Services',
  //      icon: < Circle size={20} />,
  //     //  navLink: '/apps/services',
  //     children:[
  //       {
  //         id: 'shop1',
  //         title: 'Main Categorization',
  //         icon: <Circle size={12} />
  //         // navLink: '/apps/maincategorization'
  //       },
  //       {
  //         id: 'shop1',
  //         title: 'Main Categorization',
  //         icon: <Circle size={12} />
  //         // navLink: '/apps/user/view'
  //       }

  //     ]
  //   },
  //   {
  //     id: 'enduser',
  //     title: 'End Users',
  //      icon: < Circle size={20} />,
  //     // navLink: '/apps/todo',
  //     children:[
  //       {
  //         id: 'shop1',
  //         title: 'Control over End User',
  //         icon: <Circle size={12} />
  //         // navLink: '/apps/user/list'
  //       }

  //     ]
  //   },
  //   {
  //     id: 'teachers',
  //     title: 'Teachers',
  //      icon: < Circle size={20} />,
  //     // navLink: '/apps/todo',
  //     children:[
  //       {
  //         id: 'shop1',
  //         title: 'Control over User',
  //         icon: <Circle size={12} />
  //         // navLink: '/apps/user/list'
  //       }
  //     ]
  //   },
  //   {
  //     id: 'report',
  //     title: 'Reports',
  //      icon: < Circle size={20} />
  //     // navLink: '/apps/report'
  //   },
  //   // {
  //   //   id: 'chat',
  //   //   title: 'Monitization',
  //   //    icon: < Circle size={20} />
  //   //   // navLink: '/apps/todo',
  //   // },
  //   {
  //     id: 'chat',
  //     title: 'Admin to School Level access',
  //      icon: < Circle size={20} />
  //     // navLink: '/apps/todo',
  //   },
  //     // {
  //     //   id: 'users',
  //     //   title: 'Front end Functionality',
  //     //   icon: <User size={20} />,
  //     //   children: [
  //     //     {
  //     //       id: 'list',
  //     //       title: 'Social Media News feeds',
  //     //       icon: <Circle size={12} />
  //     //       // navLink: '/apps/user/list'
  //     //     },
  //     //     {
  //     //       id: 'view',
  //     //       title: 'Listing of schools ',
  //     //       icon: <Circle size={12} />
  //     //       // navLink: '/apps/user/view'
  //     //     },
  //     //     {
  //     //       id: 'edit',
  //     //       title: 'Login in school level',
  //     //       icon: <Circle size={12} />
  //     //       // navLink: '/apps/user/edit'
  //     //     }

  //     //   ]
  //     // },
  //   {
  //     id: 'chat',
  //     title: 'Chat',
  //     icon: <MessageSquare size={20} />,
  //     navLink: '/apps/chat'
  //   },
  //   {
  //     id: 'todo',
  //     title: 'Todo',
  //     icon: <CheckSquare size={20} />,
  //     navLink: '/apps/todo'
  //   },
  //   {
  //     id: 'calendar',
  //     title: 'Calendar',
  //     icon: <Calendar size={20} />,
  //     navLink: '/apps/calendar'
  //   },
  //   {
  //     id: 'invoiceApp',
  //     title: 'Invoice',
  //     icon: <FileText size={20} />,
  //     children: [
  //       {
  //         id: 'invoiceList',
  //         title: 'List',
  //         icon: <Circle size={12} />,
  //         navLink: '/apps/invoice/list'
  //       },
  //       {
  //         id: 'invoicePreview',
  //         title: 'Preview',
  //         icon: <Circle size={12} />,
  //         navLink: '/apps/invoice/preview'
  //       },
  //       {
  //         id: 'invoiceEdit',
  //         title: 'Edit',
  //         icon: <Circle size={12} />,
  //         navLink: '/apps/invoice/edit'
  //       },
  //       {
  //         id: 'invoiceAdd',
  //         title: 'Add',
  //         icon: <Circle size={12} />,
  //         navLink: '/apps/invoice/add'
  //       }
  //     ]
  //   },
  //   {
  //     id: 'eCommerce',
  //     title: 'eCommerce',
  //     icon: <ShoppingCart size={20} />,
  //     children: [
  //       {
  //         id: 'shop',
  //         title: 'Shop',
  //         icon: <Circle size={12} />,
  //         navLink: '/apps/ecommerce/shop'
  //       },
  //       {
  //         id: 'detail',
  //         title: 'Details',
  //         icon: <Circle size={12} />,
  //         navLink: '/apps/ecommerce/product-detail'
  //       },
  //       {
  //         id: 'wishList',
  //         title: 'Wish List',
  //         icon: <Circle size={12} />,
  //         navLink: '/apps/ecommerce/wishlist'
  //       },
  //       {
  //         id: 'checkout',
  //         title: 'Checkout',
  //         icon: <Circle size={12} />,
  //         navLink: '/apps/ecommerce/checkout'
  //       }
  //     ]
  //   }
  // {
  //   id: 'pages',
  //   title: 'Landing Pages',
  //   icon: <FileText size={20} />,
  //   children: [
  //     // dark here route give
  //     {
  //       id: 'landingpagesettings_school',
  //       title: 'School LandingPG Settings',
  //       icon: <Circle size={12} />,
  //       permissions: ['admin', 'editor'],
  //       navLink: '/pages/landing_settings_school?admin=schoolAdmin'
  //     }
  //     //code ends
  //   //   {
  //   //     id: 'authentication',
  //   //     title: 'Authentication',
  //   //     icon: <Circle size={12} />,
  //   //     children: [
  //   //       {
  //   //         id: 'login-v1',
  //   //         title: 'Login v1',
  //   //         permissions: ['admin', 'editor'],
  //   //         navLink: '/pages/login-v1',
  //   //         newTab: true
  //   //       },
  //   //       {
  //   //         id: 'login-v2',
  //   //         title: 'Login v2',
  //   //         permissions: ['admin', 'editor'],
  //   //         navLink: '/pages/login-v2',
  //   //         newTab: true
  //   //       },
  //   //       {
  //   //         id: 'register-v1',
  //   //         title: 'Register v1',
  //   //         permissions: ['admin', 'editor'],
  //   //         navLink: '/pages/register-v1',
  //   //         newTab: true
  //   //       },
  //   //       {
  //   //         id: 'register-v2',
  //   //         title: 'Register v2',
  //   //         permissions: ['admin', 'editor'],
  //   //         navLink: '/pages/register-v2',
  //   //         newTab: true
  //   //       },
  //   //       {
  //   //         id: 'forgotPassword-v1',
  //   //         title: 'Forgot Password v1',
  //   //         permissions: ['admin', 'editor'],
  //   //         navLink: '/pages/forgot-password-v1',
  //   //         newTab: true
  //   //       },
  //   //       {
  //   //         id: 'forgotPassword-v2',
  //   //         title: 'Forgot Password v2',
  //   //         permissions: ['admin', 'editor'],
  //   //         navLink: '/pages/forgot-password-v2',
  //   //         newTab: true
  //   //       },
  //   //       {
  //   //         id: 'resetPassword-v1',
  //   //         title: 'Reset Password v1',
  //   //         permissions: ['admin', 'editor'],
  //   //         navLink: '/pages/reset-password-v1',
  //   //         newTab: true
  //   //       },
  //   //       {
  //   //         id: 'resetPassword-v2',
  //   //         title: 'Reset Password v2',
  //   //         permissions: ['admin', 'editor'],
  //   //         navLink: '/pages/reset-password-v2',
  //   //         newTab: true
  //   //       }
  //   //     ]
  //   //   },
  //   //   {
  //   //     id: 'accountSettings',
  //   //     title: 'Account Settings',
  //   //     icon: <Circle size={12} />,
  //   //     permissions: ['admin', 'editor'],
  //   //     navLink: '/pages/account-settings'
  //   //   },

  //   //   {
  //   //     id: 'profile',
  //   //     title: 'Profile',
  //   //     icon: <Circle size={12} />,
  //   //     permissions: ['admin', 'editor'],
  //   //     navLink: '/pages/profile',
  //   //     collapsed: true
  //   //   },
  //   //   {
  //   //     id: 'faq',
  //   //     title: 'FAQ',
  //   //     icon: <Circle size={12} />,
  //   //     permissions: ['admin', 'editor'],
  //   //     navLink: '/pages/faq'
  //   //   },
  //   //   {
  //   //     id: 'knowledgeBase',
  //   //     title: 'Knowledge Base',
  //   //     icon: <Circle size={12} />,
  //   //     permissions: ['admin', 'editor'],
  //   //     navLink: '/pages/knowledge-base',
  //   //     parentOf: ['/pages/knowledge-base/category/questions', '/pages/knowledge-base/category']
  //   //   },
  //   //   {
  //   //     id: 'pricing',
  //   //     title: 'Pricing',
  //   //     icon: <Circle size={12} />,
  //   //     permissions: ['admin', 'editor'],
  //   //     navLink: '/pages/pricing'
  //   //   },
  //   //   {
  //   //     id: 'blog',
  //   //     title: 'Blog',
  //   //     icon: <Circle size={12} />,
  //   //     children: [
  //   //       {
  //   //         id: 'blogList',
  //   //         title: 'List',
  //   //         permissions: ['admin', 'editor'],
  //   //         navLink: '/pages/blog/list'
  //   //       },
  //   //       {
  //   //         id: 'blogDetail',
  //   //         title: 'Detail',
  //   //         permissions: ['admin', 'editor'],
  //   //         navLink: '/pages/blog/detail'
  //   //       },
  //   //       {
  //   //         id: 'blogEdit',
  //   //         title: 'Edit',
  //   //         permissions: ['admin', 'editor'],
  //   //         navLink: '/pages/blog/edit'
  //   //       }
  //   //     ]
  //   //   },
  //   //   {
  //   //     id: 'mailTemplate',
  //   //     title: 'Mail Template',
  //   //     icon: <Circle size={12} />,
  //   //     children: [
  //   //       {
  //   //         id: 'welcomeTemp',
  //   //         title: 'Welcome',
  //   //         permissions: ['admin', 'editor'],
  //   //         navLink: 'https://pixinvent.com/demo/vuexy-mail-template/mail-welcome.html',
  //   //         externalLink: true
  //   //       },
  //   //       {
  //   //         id: 'resetPassTemp',
  //   //         title: 'Reset Password',
  //   //         permissions: ['admin', 'editor'],
  //   //         navLink: 'https://pixinvent.com/demo/vuexy-mail-template/mail-reset-password.html',
  //   //         externalLink: true
  //   //       },
  //   //       {
  //   //         id: 'verifyEmailTemp',
  //   //         title: 'Verify Email',
  //   //         permissions: ['admin', 'editor'],
  //   //         navLink: 'https://pixinvent.com/demo/vuexy-mail-template/mail-verify-email.html',
  //   //         externalLink: true
  //   //       },
  //   //       {
  //   //         id: 'deactivateAccountTemp',
  //   //         title: 'Deactivate Account',
  //   //         permissions: ['admin', 'editor'],
  //   //         navLink: 'https://pixinvent.com/demo/vuexy-mail-template/mail-deactivate-account.html',
  //   //         externalLink: true
  //   //       },
  //   //       {
  //   //         id: 'invoiceMailTemp',
  //   //         title: 'Invoice',
  //   //         permissions: ['admin', 'editor'],
  //   //         navLink: 'https://pixinvent.com/demo/vuexy-mail-template/mail-invoice.html',
  //   //         externalLink: true
  //   //       },
  //   //       {
  //   //         id: 'promotionalMailTemp',
  //   //         title: 'Promotional',
  //   //         permissions: ['admin', 'editor'],
  //   //         navLink: 'https://pixinvent.com/demo/vuexy-mail-template/mail-promotional.html',
  //   //         externalLink: true
  //   //       }
  //   //     ]
  //   //  },
  //   //   {
  //   //     id: 'miscellaneous',
  //   //     title: 'Miscellaneous',
  //   //     icon: <Circle size={12} />,
  //   //     children: [
  //   //       {
  //   //         id: 'comingSoon',
  //   //         title: 'Coming Soon',
  //   //         permissions: ['admin', 'editor'],
  //   //         navLink: '/misc/coming-soon',
  //   //         newTab: true
  //   //       },

  //   //       {
  //   //         id: 'notAuthorized',
  //   //         title: 'Not Authorized',
  //   //         permissions: ['admin', 'editor'],
  //   //         navLink: '/misc/not-authorized',
  //   //         newTab: true
  //   //       },
  //   //       {
  //   //         id: 'maintenance',
  //   //         title: 'Maintenance',
  //   //         permissions: ['admin', 'editor'],
  //   //         navLink: '/misc/maintenance',
  //   //         newTab: true
  //   //       },
  //   //       {
  //   //         id: 'error',
  //   //         title: 'Error',
  //   //         permissions: ['admin', 'editor'],
  //   //         navLink: '/misc/error',
  //   //         newTab: true
  //   //       }
  //   //     ]
  //   //   }
  //   ]
  // }

]
