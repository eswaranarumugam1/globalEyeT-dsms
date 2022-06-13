import { Fragment, useState, useEffect } from 'react'
import Tabs from './Tabs'
import axios from 'axios'
import Breadcrumbs from '@components/breadcrumbs'
import RegistrationSettings from './RegistrationSettings'
import { Row, Col, TabContent, TabPane, Card, CardBody } from 'reactstrap'

import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

import ErrorHandler from "../../../../common/ErrorHandler" 
const GeneralSettingsOrganization = () => {
  const [activeTab, setActiveTab] = useState('1'),
    [data, setData] = useState(null)

  const toggleTab = tab => {
    setActiveTab(tab)
  }
 
  const getLandingPGEnContentApi = async () => {
    try {
      const response = await getLandingPGEnContent()
      if (response) {  
        if (response.data) {
            setData(response.data)
        }
      }
    } catch (e) {
      console.log(e)
      ErrorHandler(e)
    }
  }

  useEffect(() => {
    //axios.get('/account-setting/data').then(response => setData(response.data))
   //getLandingPGEnContentApi() 
  }, [])

  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='General Settings' breadCrumbParent='Pages' breadCrumbActive='General Settings' />
       
        <Row>
          <Col className='mb-2 mb-md-0' md='3'>
            <Tabs activeTab={activeTab} toggleTab={toggleTab} />
          </Col>
          <Col md='9'>
            <Card>
              <CardBody>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId='1'>
                    <RegistrationSettings   />
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      
    </Fragment>
  )
}

export default GeneralSettingsOrganization