import { Fragment, useState, useEffect } from 'react'
import Tabs from './Tabs'
import axios from 'axios'
import Breadcrumbs from '@components/breadcrumbs'
import BannerTabContent from './BannerTabContent'
import SchoolListing from './schoolListing'
import { getLandingPGEnContent } from '../../../../services/home/SchoolLandingPage'
import { Row, Col, TabContent, TabPane, Card, CardBody } from 'reactstrap'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'
import ErrorHandler from "../../../../common/ErrorHandler"

const GroupAdmin = () => {
  const [activeTab, setActiveTab] = useState('1'),
    [data, setData] = useState(null)

  const toggleTab = tab => {
    setActiveTab(tab)
  }
  useEffect(() => {
  }, [])
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Group Admin Settings' breadCrumbParent='Pages' breadCrumbActive='Group Admin Settings' />

      <Row>
        <Col className='mb-2 mb-md-0' md='3'>
          <Tabs activeTab={activeTab} toggleTab={toggleTab} />
        </Col>
        <Col md='9'>
          <Card>
            <CardBody>
              <TabContent activeTab={activeTab}>
                <TabPane tabId='1'>
                  <SchoolListing />
                </TabPane>
                <TabPane tabId='2'>
                  <BannerTabContent />
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>

    </Fragment>
  )
}

export default GroupAdmin