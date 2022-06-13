import { Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User } from 'react-feather'

export default [
  {
    header: 'School Admin Dashboard'
  },
  {
    id: 'email',
    title: 'DashBoard',
    icon: <Mail size={20} />,
    navLink: '/apps/email'
  },
  {
    id: 'chat',
    title: 'Schools',
    icon: <MessageSquare size={20} />,
    navLink: '/apps/chat'
  },
  {
    id: 'todo',
    title: 'Todo',
    icon: <CheckSquare size={20} />,
    navLink: '/apps/todo'
  },
  {
    id: 'calendar',
    title: 'Calendar',
    icon: <Calendar size={20} />,
    navLink: '/apps/calendar'
  },
  {
    id: 'invoiceApp',
    title: 'Invoice',
    icon: <FileText size={20} />,
    children: [
      {
        id: 'invoiceList',
        title: 'List',
        icon: <Circle size={12} />,
        navLink: '/apps/invoice/list'
      },
      {
        id: 'invoicePreview',
        title: 'Preview',
        icon: <Circle size={12} />,
        navLink: '/apps/invoice/preview'
      },
      {
        id: 'invoiceEdit',
        title: 'Edit',
        icon: <Circle size={12} />,
        navLink: '/apps/invoice/edit'
      },
      {
        id: 'invoiceAdd',
        title: 'Add',
        icon: <Circle size={12} />,
        navLink: '/apps/invoice/add'
      }
    ]
  },
  {
    id: 'eCommerce',
    title: 'Students',
    icon: <ShoppingCart size={20} />,
    children: [
      {
        id: 'shop',
        title: 'New Registers',
        icon: <Circle size={12} />,
        navLink: '/apps/ecommerce/shop'
      },
      {
        id: 'detail',
        title: 'Waiting list',
        icon: <Circle size={12} />,
        navLink: '/apps/ecommerce/product-detail'
      },
      {
        id: 'wishList',
        title: 'All students',
        icon: <Circle size={12} />,
        navLink: '/apps/ecommerce/wishlist'
      },
      {
        id: 'checkout',
        title: 'Checkout',
        icon: <Circle size={12} />,
        navLink: '/apps/ecommerce/checkout'
      }
    ]
  },
  {
    id: 'checkout',
    title: 'Trainers/Teachers',
    icon: <User size={20} />,
    children: [
      {
        id: 'list',
        title: 'New Registers',
        icon: <Circle size={12} />,
        navLink: '/apps/user/list'
      },
      {
        id: 'view',
        title: 'Reports settings',
        icon: <Circle size={12} />,
        navLink: '/apps/user/view'
      },
      {
        id: 'edit',
        title: 'All Trainers',
        icon: <Circle size={12} />,
        navLink: '/apps/user/edit'
      },
      {
        id: 'edit',
        title: 'Pages',
        icon: <Circle size={12} />,
        navLink: '/apps/user/edit'
      },
      {
        id: 'edit',
        title: 'Footer Settings',
        icon: <Circle size={12} />,
        navLink: '/apps/user/edit'
      }
    ]
  },
  {
    id: 'users',
    title: 'Manage class rooms',
    icon: <User size={20} />,
    children: [
      {
        id: 'list',
        title: 'Add class room',
        icon: <Circle size={12} />,
        navLink: '/apps/user/list'
      },
      {
        id: 'view',
        title: 'All classes',
        icon: <Circle size={12} />,
        navLink: '/apps/user/view'
      },      
      {
        id: 'edit',
        title: 'Pages',
        icon: <Circle size={12} />,
        navLink: '/apps/user/edit'
      },
      {
        id: 'edit',
        title: 'Footer Settings',
        icon: <Circle size={12} />,
        navLink: '/apps/user/edit'
      }
    ]
  },
  {
    id: 'email',
    title: 'Time Table (Calendar)',
    icon: <Mail size={20} />,
    navLink: '/apps/user/edit'
  }
]
