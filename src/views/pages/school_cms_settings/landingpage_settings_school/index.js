import { Fragment, useState, useEffect } from 'react'
import Tabs from './Tabs'
import axios from 'axios'
import FeaturesContent from './FeaturesContent'
import Breadcrumbs from '@components/breadcrumbs'
import NewsTabContent from './NewsTabContent'
import BannerTabContent from './BannerTabContent'
import AboutUsTabContent from './AboutUsContent'
import TestimonialsTabContent from './TestimonialsTabContent'
import ContactUsTabContent from './ContactUsTabContent'
import Ckeditorexample from './CkEditorexample'
import { getLandingPGEnContent } from '../../../../services/home/SchoolLandingPage'
import { Row, Col, TabContent, TabPane, Card, CardBody } from 'reactstrap'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'
import ErrorHandler from "../../../../common/ErrorHandler"
const ApplicationSetting = () => {
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
      <Breadcrumbs breadCrumbTitle='Landing Page Settings' breadCrumbParent='Pages' breadCrumbActive='Landing Page Settings' />

      <Row>
        <Col className='mb-2 mb-md-0' md='3'>
          <Tabs activeTab={activeTab} toggleTab={toggleTab} />
        </Col>
        <Col md='9'>
          <Card>
            <CardBody>
              <TabContent activeTab={activeTab}>
                <TabPane tabId='1'>
                  <BannerTabContent />
                </TabPane>
                <TabPane tabId='2'>
                  <AboutUsTabContent />
                </TabPane>
                <TabPane tabId='3'>
                  <FeaturesContent />
                </TabPane>
                <TabPane tabId='4'>
                  <NewsTabContent />
                </TabPane>
                {/* <TabPane tabId='5'>
                    <TestimonialsTabContent  />
                  </TabPane> */}
                <TabPane tabId='6'>
                  <ContactUsTabContent />
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>

    </Fragment>
  )
}

export default ApplicationSetting