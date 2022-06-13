import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import Validations from './editform'
import Breadcrumbs from '@components/breadcrumbs'

const SchoolEdit = () => {
  return (
    <Fragment>
      <Row>
        <Col sm='12'>
          <Validations />
        </Col>
      </Row>
    </Fragment>
  )
}
export default SchoolEdit