import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import AddSimulatorForm from './AddSimulatorForm'

function index() {
  return ( 
  <Fragment>
    <Row>
      <Col sm='12'>
        <AddSimulatorForm />
      </Col>
    </Row>
  </Fragment>
  )
}

export default index

