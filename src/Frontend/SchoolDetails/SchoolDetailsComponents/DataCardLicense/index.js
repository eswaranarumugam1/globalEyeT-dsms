import { Row, Col, Container } from 'reactstrap'
import './style.scss'
import { ArrowRightCircle } from 'react-feather'

export default function DataCard({nextTab}) {
  return (
    <Row className='sub-license-details'>
        <Col lg={6}>
            <h1>About the Category heading & content here</h1>
        </Col>
        <Row>
          <Col lg={8}>
              <p>
              Lorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy 
              text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and 
              typesettingLorem Ipsum is simply dummy text of the printing and typesetting. Lorem Ipsum 
              is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the 
              printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem 
              Ipsum is simply dummy text of the printing and typesetting.
              </p>
              <p>
              Lorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of 
              the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy.
              </p>
          </Col>
          <Col lg={4} className='align'>
            <div className='continue' onClick={() =>  nextTab()}>Continue <ArrowRightCircle /></div>
          </Col>
        </Row>
    </Row>
  )
}
