import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import EditTrainerForm from './EditTrainerForm'

function index() {
  return ( 
  <Fragment>
    <Row>
      <Col sm='12'>
        <EditTrainerForm />
      </Col>
    </Row>
  </Fragment>
  )
}

export default index

