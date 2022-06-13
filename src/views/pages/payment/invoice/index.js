import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import InvoiceForm from './InvoiceForm'

function index() {
  return ( 
  <Fragment>
    <Row className="justify-content-center">
      <Col sm='8' className="mt-5">
        <InvoiceForm />
      </Col>
    </Row>
  </Fragment>
  )
}

export default index

