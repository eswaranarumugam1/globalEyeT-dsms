import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import AddGroupForm from './AddGroupForm'

function index() {
  return ( 
  <Fragment>
    <Row>
      <Col sm='12'>
        <AddGroupForm />
      </Col>
    </Row>
  </Fragment>
  )
}

export default index

