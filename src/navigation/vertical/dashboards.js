import { useEffect } from 'react'
import { Home, Circle } from 'react-feather'

function getChildren() {
  const childArray = []
  const login = JSON.parse(localStorage.getItem('userData'))
  //alert(login.userData.role)
  if (login !== null && login.userData.role === 'superadmin') {
    childArray.push(
      {
            id: 'superAdmin',
            title: 'SuperAdmin',
            icon: <Circle size={12} />,
            navLink: '/dashboard/superadmin'
          }
    )
  } else if (login !== null && login.userData.role === 'schooladmin') {
    childArray.push(
      {
            id: 'schoolAdmin',
            title: 'School Admin',
            icon: <Circle size={12} />,
            navLink: '/dashboard/schooldashboard'
          }
    )
 } else if (login !== null && login.userData.role === 'student') {
  childArray.push(
    {
          id: 'student',
          title: 'Student',
          icon: <Circle size={12} />,
          navLink: '/dashboard/studentDash'
        }
  
  )
 }
 return childArray
}
// useEffect(() => {

export default [
  {
    id: 'dashboards',
    title: 'Dashboards',
    icon: <Home size={20} />,
    badge: 'light-warning',
    badgeText: '3',
     children: [
       {
         id: 'superAdmin',
         title: 'SuperAdmin',
         icon: <Circle size={12} />,
         navLink: '/dashboard/superadmin'
       },
       {
         id: 'schoolAdmin',
         title: 'School Admin',
         icon: <Circle size={12} />,
         navLink: '/dashboard/schooldashboard'
       },
       // {
       //   id: 'adminDash',
       //   title: 'Admin',
       //   icon: <Circle size={12} />,
       //   navLink: '/cards/advance'
       // },
       {
         id: 'student',
         title: 'Student',
         icon: <Circle size={12} />,
         navLink: '/dashboard/studentDash'
       },
       {
         id: 'organizationAdmin',
         title: 'Organization',
         icon: <Circle size={12} />,
         navLink: '/dashboard/organization'
       }
     ]
    //children: getChildren()
  }
]

