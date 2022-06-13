import React from 'react'
import { ListGroup, ListGroupItem, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap'

const MakePayment = () => {
    return (
        <div>
            <h1>INVOICES</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore quo libero expedita. Unde molestiae impedit sed eos pariatur quibusdam perspiciatis? Deserunt quo quis nostrum possimus maiores hic error recusandae blanditiis. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae nam nisi totam labore perspiciatis excepturi nostrum quisquam dolorem optio perferendis tenetur eum quod quas velit porro officiis consequuntur, doloribus laborum.</p>
            <Row className="justify-content-center mt-3">
                <Col sm={10}>
                    <ListGroup>
                        <ListGroupItem style={{ backgroundColor: "#ebebe0" }}>
                            <Row>
                                <Col sm={2}>
                                    <img src="https://pickaface.net/gallery/avatar/20130319_083314_1174_admin.png" height="50px" width="50px" className="rounded-circle" />
                                </Col>
                                <Col sm={8}>
                                    <h2>INTERMMEDIATE PLAN</h2>
                                    <p>30 HOURS</p>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit aperiam cum </p>
                                </Col>
                                <Col sm={2}>
                                    <h6 className='text-danger'>SAR2,250</h6>
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col sm={10}>
                                    <ListGroupItem>
                                        <div className='d-flex'>
                                            <div>
                                                <h6>E-LEARNING</h6>
                                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, voluptate.</p>
                                            </div>
                                            <div className='mt-2'>
                                                <p style={{ border: "1px solid #ebebe0", color: "red", padding:"5px"}}>SAR250</p>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem className="my-2">
                                        <div className='d-flex'>
                                            <div>
                                                <h6>E-LEARNING</h6>
                                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, voluptate.</p>
                                            </div>
                                            <div className='mt-2'>
                                                <p style={{ border: "1px solid #ebebe0", color: "red", padding:"5px" }}>SAR250</p>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                </Col>
                            </Row>
                            {/* <Row className="justify-content-right">
                                <Col sm={4}>
                                    hqhewkh
                                </Col>
                            </Row> */}
                            <div className='text-right' style={{backgroundColor:"#b30000"}}>
                                <h6 className='text-white mx-1'>SUBTOTAL</h6>
                                <h6 className='text-white mx-1'>E-LEARNING</h6>
                                <h6 className='text-white mx-1'>VAT</h6>
                                {/* <hr style={{border:"2px solid white"}}/> */}
                                <h6 className='text-white mx-1 my-4'>TOTAL</h6>
                            </div>
                        </ListGroupItem>
                    </ListGroup>
                    <div className='text-center mt-2'>
                <Button className="btn-danger">Make Payment</Button>
            </div>
                </Col>
            </Row>

        </div>
    )
}

export default MakePayment