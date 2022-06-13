import { Row, Col, Container, Form, Input, FormGroup, Label, Button } from 'reactstrap'
import '../AuthPage.scss'
import eyeIconRedHide from '../../assets/images/eye-hide-red.png'
import { Link } from 'react-router-dom'
function LoginForm(props) {
    return (
        <div className="login-container">
            <div className="title-block">
                <h3>Login</h3>
                <div className="title-bottom-strip"></div>
            </div>
            <Form>
                <Row className="justify-content-center">
                    <Col xxl={10} xl={10} lg={10} md={12} sm={12} xs={12}>
                        <FormGroup>
                            <Label for="exampleEmail">User Name</Label>
                            <Input type="text" name="email" id="exampleEmail" placeholder="Full Name" />
                        </FormGroup>
                    </Col>
                    <Col xxl={10} xl={10} lg={10} md={12} sm={12} xs={12}>
                        <FormGroup className="password-block-outer">
                            <img src={eyeIconRedHide} />
                            <Label for="examplePassword">Password</Label>
                            <Input type="password" name="password" id="examplePassword" placeholder="Password" />
                        </FormGroup>
                    </Col>
                </Row>
                
                <p class="forgot-password" onClick={props.onClickForgotPassword}> <span>Forgot Password?</span></p>
                <div>
                <Link
                to='/profile'><Button className="btn-block">Login</Button></Link>
                </div>
                <p class="dont-have-account" onClick={props.onClickRegister}>Don’t Have Account <span>Sign up here</span></p>
                                
            </Form>
        </div>
    )
}

export default LoginForm