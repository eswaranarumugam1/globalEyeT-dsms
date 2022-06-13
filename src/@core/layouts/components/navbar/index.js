// ** React Imports
import { Fragment } from 'react'

// ** Dropdowns Imports
import IntlDropdown from './IntlDropdown'
import CartDropdown from './CartDropdown'
import UserDropdown from './UserDropdown'
import NavbarSearch from './NavbarSearch'
import NotificationDropdown from './NotificationDropdown'

// ** Custom Components
import NavbarBookmarks from './NavbarBookmarks'

// ** Third Party Components
import { Sun, Moon } from 'react-feather'
import { NavItem, NavLink } from 'reactstrap'

const ThemeNavbar = props => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  const userData = JSON.parse(localStorage.getItem('userData'))
  //console.log(userData.userData)
  const school_name = "<h1 className='text-primary'><b>School Name</b></h1>"
  return (
    <Fragment>
      <div className='bookmark-wrapper d-flex align-items-center'>
        {/* <NavbarBookmarks setMenuVisibility={setMenuVisibility} /> */}
       {(userData?.userData?.role === "schooladmin") ?  <h3 className='text-primary'><b>{!!(userData.userData.school_name) ? userData.userData.school_name : ""}</b></h3>  : ""}
      </div>
      <ul className='nav navbar-nav align-items-center ml-auto'>
        <IntlDropdown />
        {/* <NavItem className='d-none d-lg-block'>
          <NavLink className='nav-link-style'>
            <ThemeToggler />
          </NavLink>
        </NavItem> 
        <NavbarSearch />*/}
        {/* <CartDropdown /> */}
        <NotificationDropdown />
        <UserDropdown />
      </ul>
    </Fragment>
  )
}

export default ThemeNavbar
