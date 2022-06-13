import { FileText, Mail, ShoppingCart, MessageSquare, Calendar, CheckSquare, Circle, User, Users, Clipboard, Trello, Truck } from 'react-feather'

export default [
    {
        header: "Organization"
    },
    {
      id: 'school',
      title: 'Manage Schools',
      icon: <FileText size={12} />,
      children: [
          {
            id: 'shop1',
            title: 'Schools List',
            icon: <Circle size={12} />,
            navLink: '/pages/organization/school/list?admin=superAdmin'
              
          }
      ]
    },
    {
      id: 'pages',
      title: 'Organization Settings',
      icon: <FileText size={20} />,
      children: [
        {
          id: 'landingpagesettings',
          title: 'OrganizationPG Settings',
          icon: <Circle size={12} />,
          permissions: ['admin', 'editor'],
          navLink: '/pages/landing_settings_organization?admin=superAdmin'
        },
        {
          id: 'landingpagesettings',
          title: 'General Settings',
          icon: <Circle size={12} />,
          permissions: ['admin', 'editor'],
          navLink: '/pages/organization_general_settings?admin=superAdmin'
        }
      ]
    }
]