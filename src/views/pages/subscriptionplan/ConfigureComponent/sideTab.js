import { Nav, NavItem, NavLink } from 'reactstrap'
import { User, Lock, Info, Link, Bell } from 'react-feather'
import { Fragment, useState, useEffect } from 'react'
import { AllComponent } from "../../../../services/home/Componentsapi"


const SideTab = ({ activeTab, toggleTab, parentCallback }) => {
  const [listOfComponents, setListOfComponents] = useState([])

  const getLoadComponents = async () => {
    try {
      const response = await AllComponent()
      if (response) {
        if (response.data) {
          if (response.data.data.result.length && response.data.data.result.length > 0) {
            setListOfComponents(response.data.data.result)
            parentCallback(response.data.data.result)
          }
        }
      }
    } catch (e) {
      console.log(e)
      // ErrorHandler(e)
    }
  }
  useEffect(() => {
    getLoadComponents()
    return () => {
    }
  }, [])
  return (
    <Nav className='nav-left' pills vertical>
      {listOfComponents.map((item, index) => {
        return (
          <NavItem key={index}>
            <NavLink name={item.name} id={item.id} active={activeTab === (index + 1).toString()} onClick={() => toggleTab((index + 1).toString(), item.id, item.name)} key={index}>
              <span className='font-weight-bold' key={index}>{item.name}</span>
            </NavLink>
          </NavItem>
        )
      })
      }

    </Nav>
  )
}
export default SideTab
