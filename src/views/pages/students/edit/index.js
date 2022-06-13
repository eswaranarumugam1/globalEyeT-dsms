import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import EditStudentForm from './EditStudentForm'

function index() {
  return ( 
  <Fragment>
    <Row>
      <Col sm='12'>
        <EditStudentForm />
      </Col>
    </Row>
  </Fragment>
  )
}

export default index

