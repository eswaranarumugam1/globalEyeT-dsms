import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import EditSimulatorForm from './EditSimulatorForm'

function index() {
  return ( 
  <Fragment>
    <Row>
      <Col sm='12'>
        <EditSimulatorForm />
      </Col>
    </Row>
  </Fragment>
  )
}

export default index

