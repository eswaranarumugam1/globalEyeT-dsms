import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import EditScheduleForm from './EditScheduleForm'

function index() {
  return ( 
  <Fragment>
    <Row>
      <Col sm='12'>
        <EditScheduleForm />
      </Col>
    </Row>
  </Fragment>
  )
}

export default index

