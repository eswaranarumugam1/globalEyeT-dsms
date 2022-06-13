import { Row, Col, Container, Form, Input, FormGroup, Label, Button } from 'reactstrap'
import '../AuthPage.scss'
import eyeIconRedHide from '../../assets/images/eye-hide-red.png'

import InputPasswordToggle from "@components/input-password-toggle"
function CreateNewPassword() {
    return (
        <div className="create-new-password-container">
            <div className="title-block">
                <h3>Create New Password</h3>
                <h6 className='subtitle'> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem <br/> Ipsum has been the industry's standard</h6>
                <div className="title-bottom-strip"></div>
            </div>
            <Form>
                <Row className="justify-content-center">
                    <Col xxl={10} xl={10} lg={10} md={12} sm={12} xs={12}>
                        <FormGroup className="password-block-outer">
                        <img src={eyeIconRedHide} />
                            <Label for="exampleEmail">New Password</Label>
                            <Input type="password" name="newpassowrd" id="newpassword" placeholder="minimum 8 characters with upper and lower case and a symbol or a number" />
                        </FormGroup>
                    </Col>
                    <Col xxl={10} xl={10} lg={10} md={12} sm={12} xs={12}>
                        <FormGroup className="password-block-outer">
                            <img src={eyeIconRedHide} />
                            <Label for="examplePassword">Confirm Password</Label>
                            <Input type="password" name="confirmpassword" id="confirmpasword" placeholder="minimum 8 characters with upper and lower case and a symbol or a number" />
                        </FormGroup>
                    </Col>
                </Row>
                
                {/* <p class="forgot-password"> <span>Forgot Password?</span></p> */}
                <div>
                    <Button className="btn-block">Login</Button>
                </div>
                {/* <p class="dont-have-account">Don’t Have Account <span>Sign up here</span></p> */}
                                
            </Form>
        </div>
    )
}

export default CreateNewPassword