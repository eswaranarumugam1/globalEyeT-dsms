import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import EditSubscriptionPlan from './validation'

function index() {
  return ( 
  <Fragment>
    <Row>
      <Col sm='12'>
        <EditSubscriptionPlan />
      </Col>
    </Row>
  </Fragment>
  )
}

export default index