import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import ViewSchool from './ViewSchool'
import Breadcrumbs from '@components/breadcrumbs'

const SchoolView = () => {
  return (
    <Fragment>
      <Row>
        <Col sm='12'>
          <ViewSchool />
        </Col>
      </Row>
    </Fragment>
  )
}
export default SchoolView