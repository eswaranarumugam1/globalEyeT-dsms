// ** React Imports
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** User Edit Components
import Permission from './Permissions'

// ** Store & Actions
import { getUser } from '../../store/action'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import { User, Info, Share2 } from 'react-feather'
import { Card, CardBody, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Alert } from 'reactstrap'

// ** Styles
import '@styles/react/apps/app-users.scss'

const UserEdit = () => {
  // ** States & Vars
  // const [activeTab, setActiveTab] = useState('1'),
  //   store = useSelector(state => state.users),
  //   dispatch = useDispatch(),
  //   { id } = useParams()
  // // ** Function to toggle tabs
  // const toggle = tab => setActiveTab(tab)

  // // ** Function to get user on mount
  // useEffect(() => {
  //   dispatch(getUser(parseInt(id)))
  //   return () => dispatch(getUser(parseInt(0)))
  // }, [dispatch, id])

  return  (
    <div>
      <Permission />
    </div>
    // <Row className='app-user-edit'>
    //   <Col sm='12'>
    //     <Card>
    //       <CardBody className='pt-2'>
    //         {/* <TabContent activeTab={activeTab}> */}
    //         <TabContent>
    //           <TabPane tabId='1'>
    //             <Permission />
    //           </TabPane>
    //         </TabContent>
    //       </CardBody>
    //     </Card>
    //   </Col>
    // </Row>
  ) 
}
export default UserEdit
