
import { Table, Button, Row, Col } from 'reactstrap'
import Licence_Type_Table from './Table'
import {Link} from 'react-router-dom'

const Licence_type = () => {
  return (
   <div>
     <Row>
       <Col md='12'>
        <Link to="/pages/licence_type/create">
            <Button variant="primary" style={{textAlign: 'right'}} >
                  Add Licence Type
            </Button>
          </Link>
       </Col>
       <Col>
       </Col>
       <Col md='12'>
          <Licence_Type_Table/>
       </Col>
     </Row>
   </div>
  )
}
export default Licence_type