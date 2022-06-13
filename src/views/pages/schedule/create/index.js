import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import AddScheduleForm from './AddScheduleForm'

function index() {
  return ( 
  <Fragment>
    <Row>
      <Col sm='12'>
        <AddScheduleForm />
      </Col>
    </Row>
  </Fragment>
  )
}

export default index

