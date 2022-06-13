import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import AddSubscriptionPlan from './validation'

function index() {
  return ( 
  <Fragment>
    <Row>
      <Col sm='12'>
        <AddSubscriptionPlan />
      </Col>
    </Row>
  </Fragment>
  )
}

export default index