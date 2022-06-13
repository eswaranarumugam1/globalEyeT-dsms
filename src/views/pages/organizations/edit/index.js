import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import EditGroupForm from './EditGroupForm'

function index() {
  return ( 
  <Fragment>
    <Row>
      <Col sm='12'>
        <EditGroupForm />
      </Col>
    </Row>
  </Fragment>
  )
}

export default index
