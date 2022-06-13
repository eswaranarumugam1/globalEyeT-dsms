import { Row, Col, Container, Form, Input, FormGroup, Label, Button } from 'reactstrap'
import '../AuthPage.scss'
import eyeIconRedHide from '../../assets/images/eye-hide-red.png'
function ForgotPassword(props) {
    return (
        <div className="forgot-container">
            <div className="title-block">
                <h3>Forgot Password</h3>
                <h6 className='subtitle'> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem <br/> Ipsum has been the industry's standard</h6>
                <div className="title-bottom-strip"></div>
            </div>
            <Form>
                <Row className="justify-content-center">
                    <Col xxl={10} xl={10} lg={10} md={12} sm={12} xs={12}>
                        <FormGroup>
                            <Label for="exampleEmail">Enter your Email Address </Label>
                            <Input type="email" name="email" id="exampleEmail" placeholder="Email Address" />
                        </FormGroup>
                    </Col>
                    {/* <Col xxl={10} xl={10} lg={10} md={12} sm={12} xs={12}>
                        <FormGroup className="password-block-outer">
                            <img src={eyeIconRedHide} />
                            <Label for="examplePassword">Password</Label>
                            <Input type="password" name="password" id="examplePassword" placeholder="Password" />
                        </FormGroup>
                    </Col> */}
                </Row>
                <div>
                    <Button className="btn-block"  onClick={props.onClickVerification}>Send OTP</Button>
                </div>
                {/* <p class="dont-have-account">Don’t Have Account <span>Sign up here</span></p> */}
                                
            </Form>
        </div>
    )
}

export default ForgotPassword