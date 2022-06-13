import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import AddStudentForm from './AddStudentForm'

function index() {
  return ( 
  <Fragment>
    <Row>
      <Col sm='12'>
        <AddStudentForm />
      </Col>
    </Row>
  </Fragment>
  )
}

export default index

