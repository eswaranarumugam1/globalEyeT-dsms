import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import MakePayment from './MakePayment'

function index() {
  return ( 
  <Fragment>
    <Row className="justify-content-center">
      <Col sm='12' className="mt-5">
        <MakePayment />
      </Col>
    </Row>
  </Fragment>
  )
}

export default index

