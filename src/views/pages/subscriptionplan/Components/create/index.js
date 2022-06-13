import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import Fields from './fields'

function index() {
  return ( 
  <Fragment>
    <Row>
      <Col sm='12'>
        <Fields />
      </Col>
    </Row>
  </Fragment>
  )
}

export default index