import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import AddTrainerForm from './AddTrainerForm'

function index() {
  return ( 
  <Fragment>
    <Row>
      <Col sm='12'>
        <AddTrainerForm />
      </Col>
    </Row>
  </Fragment>
  )
}

export default index

