import React, { useState } from 'react'
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row, 
  Col,
  Label,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap'
import {
  AvForm,
  AvGroup,
  AvField,
  AvInput,
  AvFeedback
} from 'availity-reactstrap-validation-safe'

const Without = () => {
  const [active, setActive] = useState('1')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggle = tab => {
    setActive(tab)
  }
  return (
<React.Fragment>
  <AvForm>
      <Row>
        <Col sm='4'>
          <AvGroup>
              <Label for='price'>Price</Label>
              <AvInput type='number' name='price' id='price' onChange={(e) => {
              withPrice(e.target.value)
              }} required placeholder="price" />
              <AvFeedback>Please enter a valid price!</AvFeedback>
          </AvGroup>
        </Col>
        <Col sm='2'>
          <AvGroup>
              <Label for='total_hours'>Total Hours</Label>
              <AvInput type='number' name='total_hours' id='total_hours' onChange={(e) => {
              withTotalHours(e.target.value)
              }} required placeholder="Total Hours" />
              <AvFeedback>Please enter a valid Total Hours!</AvFeedback>
          </AvGroup>
        </Col>
        <Col sm='2'>
          <AvGroup>
              <Label for='sessions'>No Of Sessions</Label>
              <AvInput type='number' name='sessions' id='sessions' onChange={(e) => {
              withSession(e.target.value)
              }} required placeholder="Session" />
              <AvFeedback>Please enter a valid No Of Session!</AvFeedback>
          </AvGroup>
        </Col>
        <Col sm='4'>
          <AvGroup>
              <Label for='miss_session'>No Of Missed Session Allowed</Label>
              <AvInput type='number' name='miss_session' id='miss_session' onChange={(e) => {
              withMissSession(e.target.value)
              }} required placeholder="Missed Session" />
              <AvFeedback>Please enter a valid Missed Session!</AvFeedback>
          </AvGroup>
        </Col>
        
        <Col sm='4'>
          <AvGroup>
              <Label for='days'>No OF Days</Label>
              <AvInput type='number' name='days' id='days' onChange={(e) => {
              withDays(e.target.value)
              }} required placeholder="price" />
              <AvFeedback>Please enter a valid Days!</AvFeedback>
          </AvGroup>
        </Col>
        <Col sm='2'>
          <AvGroup>
              <Label for='time_sesstion'>Time Per Session</Label>
              <AvInput name='time_sesstion' id='time_sesstion' onChange={(e) => {
              withTimePerSession(e.target.value)
              }} required placeholder="Time Per Session" />
              <AvFeedback>Please enter a valid Time Per Session!</AvFeedback>
          </AvGroup>
        </Col>
        <Col sm='2'>
          <AvGroup>
              <Label for='pricr_session'>Price Per Session</Label>
              <AvInput type='number' name='pricr_session' id='pricr_session' onChange={(e) => {
              withPricePerSession(e.target.value)
              }} required placeholder="Session" />
              <AvFeedback>Please enter a valid Price Per Session!</AvFeedback>
          </AvGroup>
        </Col>
        <Col sm='4'>
          <AvGroup>
              <Label for='miss_session_price'>Missed Session Price</Label>
              <AvInput name='miss_session_price' id='miss_session_price' onChange={(e) => {
              withMissedSessionPrice(e.target.value)
              }} required placeholder="Missed Session Price" />
              <AvFeedback>Please enter a valid Missed Session Price!</AvFeedback>
          </AvGroup>
        </Col>
      </Row>      
  </AvForm>
</React.Fragment>
  )
}
export default Without