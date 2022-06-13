import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import TableList from './tablelist'

function index() {
  return ( 
  <Fragment>
    <Row>
      <Col sm='12'>
        <TableList />
      </Col>
    </Row>
  </Fragment>
  )
}

export default index
