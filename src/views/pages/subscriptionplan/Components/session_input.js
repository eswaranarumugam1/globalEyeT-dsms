import React from 'react'
import { Card, CardHeader, CardTitle, CardBody, Label, Button, CardText, Row, Col, Form, FormGroup, Input, CustomInput } from 'reactstrap'
function session_input(sessdata) {
  return (
    <div> <FormGroup>
    <Input type='text' name='arb_name' placeholder='Name Arabic' required
      value={sessdata.id}
    />
  </FormGroup>)</div>
  )
}

export default session_input