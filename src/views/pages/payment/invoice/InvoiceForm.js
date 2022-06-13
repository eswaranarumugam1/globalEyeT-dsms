import React from 'react'
import { ListGroup, ListGroupItem, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap'

function InvoiceForm() {
    const li_style = {
        listStyle: "none"
    }
    return (
        <div>
            <Row>
                <Col sm={3}>
                    <h3>Card</h3>
                </Col>
                <Col sm={3}>
                    <h3>Sadad</h3>
                </Col>
                <Col sm={3}>
                    <h3>Tabby</h3>
                </Col>
                <Col sm={3}>
                    <h3>Cash</h3>
                </Col>
            </Row>
            <ListGroup>
                <ListGroupItem style={{ backgroundColor: "#ebebe0" }}>
                    <div className='d-flex my-2'>
                        <h4 className='ml-1'>TOTAL</h4>
                        <h4 className='text-muted mx-3'>SAR2,220</h4>
                    </div>
                    <Row className="mt-3">
                        <Col sm={6}>
                            <h6>BILLING INFO</h6>
                            <FormGroup className="mt-2">
                                <Label for="fillname">
                                    FULL NAME
                                </Label>
                                <Input
                                    id="fullname"
                                    name="email"
                                    placeholder="Enter Your Fullname"
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="address">
                                    ADDRESS
                                </Label>
                                <Input
                                    id="fullname"
                                    name="email"
                                    placeholder="Enter Your Address"
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="city">
                                    CITY
                                </Label>
                                <Input
                                    id="fullname"
                                    name="email"
                                    placeholder="Enter Your City"
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="country">
                                    COUNTRY
                                </Label>
                                <Input
                                    id="fullname"
                                    name="email"
                                    placeholder="Enter Your Country"
                                    type="text"
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <h6>CREDIT CARD INFO</h6>
                            <FormGroup className="mt-2">
                                <Label for="cardnumber">
                                    CARD NUMBER
                                </Label>
                                <Input
                                    id="fullname"
                                    name="email"
                                    placeholder="Enter Your Card Number"
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup className="">
                                <Label for="cardnumber">
                                    CARDHOLDER NAME
                                </Label>
                                <Input
                                    id="fullname"
                                    name="email"
                                    placeholder="Enter Holder Name"
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup className="">
                                <Label for="cardnumber">
                                    EXPIRE DATE
                                </Label>
                                <Input
                                    id="fullname"
                                    name="email"
                                    placeholder="Enter Holder Name"
                                    type="date"
                                />
                            </FormGroup>
                            <FormGroup className="">
                                <Label for="cardnumber">
                                    CVV
                                </Label>
                                <Input
                                    id="fullname"
                                    name="email"
                                    type="text"
                                    className='w-25'
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                </ListGroupItem>
            </ListGroup>
            <div className='text-center mt-2'>
                <Button className="btn-danger">pay</Button>
            </div>
        </div>
    )
}

export default InvoiceForm