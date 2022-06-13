import banner from '../../assets/images/landing-contact-banner.png'
import map from '../../assets/images/map.png'
import { Row, Col, Container, Form, Input, FormGroup, Label, Button } from 'reactstrap'
import './GroupContactUs.scss'
function GroupContactUs() {
    return (
        <div className="contactus-block">
            <div className='contact-outer-block'>
                <div className='contactus-content'>
                    <h6>Contact Us</h6>
                    <h2>Get In Touch</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt sodales tincidunt. Praesent mattis eu lorem aliquet convalla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt sodales tincidunt.</p>
                </div>
                <img className="w-100" src={banner} />
            </div>
            <div className='address-form-block'>
                <Row className="justify-content-around">
                    <Col xxl={4} xl={4} lg={4} md={6} sm={12} xs={12} >
                        <div className='left-block'>
                            <Row className="justify-content-start">
                                <Col xxl={2} xl={2} lg={2} md={2} sm={2} xs={3}>
                                    <img src={map} />
                                </Col>
                                <Col className="" xxl={9} xl={9} lg={9} md={9} sm={9} xs={9}>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </Col>
                            </Row>
                            <Row className="justify-content-start mt-3">
                                <Col xxl={2} xl={2} lg={2} md={2} sm={2} xs={3}>
                                    <img src={map} />
                                </Col>
                                <Col className="" xxl={9} xl={9} lg={9} md={9} sm={9} xs={9}>
                                    <p className='mb-0'>email@domainname.com</p>
                                    <p>email@domainname.com</p>
                                </Col>
                            </Row>
                            <Row className="justify-content-start mt-3">
                                <Col xxl={2} xl={2} lg={2} md={2} sm={2} xs={3}>
                                    <img src={map} />
                                </Col>
                                <Col className="" xxl={9} xl={9} lg={9} md={9} sm={9} xs={9}>
                                    <p className='mb-0'>+098 7654 3210</p>
                                    <p>+098 7654 3210</p>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col xxl={4} xl={4} lg={4} md={6} sm={12} xs={12} className="right-block">
                        <div className='form-outer'>
                            <h5>Say Something</h5>
                            <Form>

                                <FormGroup>
                                    <Input type="text" name="email" id="exampleEmail" placeholder="Name" />
                                </FormGroup>
                                <FormGroup>
                                    <Input type="number" name="password" id="examplePassword" placeholder="Phone Number" />
                                </FormGroup>
                                <FormGroup>
                                    <Input type="email" name="password" id="examplePassword" placeholder="Email" />
                                </FormGroup>
                                <FormGroup>
                                    <Input type="textarea" className="message" name="text" id="exampleText" placeholder="Message" />
                                </FormGroup>
                                <Button className="submit-btn">Submit</Button>
                            </Form>
                        </div>

                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default GroupContactUs