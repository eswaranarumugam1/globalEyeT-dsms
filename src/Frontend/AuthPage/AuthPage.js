import './AuthPage.scss'
import { Row, Col, Container} from 'reactstrap'
import RegistrationForm from './Registration/Registration'
import google from '../assets/images/google.png'
import facebook from '../assets/images/facebook.png'
import LoginForm from './Login/Login'
import ForgotPassword from './ForgotPassword/ForgotPassword'
import CreateNewPassword from './CreateNewPassword/CreateNewPassword'
import Verification from './Verification/Verification'
import { useState, useEffect } from 'react'
import HeaderNavbar from '../shared/Header/Header'
import Footer from '../shared/Footer/Footer'
import queryString from 'query-string'


function AuthPage() {
    const [showLogin, setShowLogin] = useState(true)
    const [showRegister, setShowRegister] = useState(false)
    const [showVerification, setShowVerification] = useState(false)
    const [showVerificationForm, setShowVerificationForm] = useState(false)
    const [showForgotPassword, setShowForgotPassword] = useState(false)
    const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false)
    const [showCreateNewPassword, setShowCreateNewPassword] = useState(false)
    const [userName, setUserName] = useState('')
    const [studentId, setSId] = useState('')
    

    function toggleForm() {
        setShowLogin(false)
        setShowForgotPasswordForm(true)
    }
    function toggleFormRegister () {
        setShowLogin(false)
        setShowRegister(true)
    }
    // function toggleFormLogin () {
    //     setShowLogin(true)
    //     setShowRegister(false)
    // }
    function toggleFormVerification () {
        setShowForgotPasswordForm(false)
        setShowVerificationForm(true)
    }
    function toggleFormCreateNewPassword () {
        setShowCreateNewPassword(true)
        setShowVerificationForm(false)
    }
    function toggleOTP (username) {
        setShowVerification(true)
        setShowRegister(false)
        setUserName(username)
    }
    function setStudentId (id) {
        setSId(id)
        const url = `/profile?studentId=${id}`
        window.location.href = url
    }
    const params = queryString.parse(window.location.search)
    useEffect(() => {
        if (!!params.from && params.from === 'plan') {
            toggleFormRegister()
        }
    }, [])
    return (
        <div>
            <HeaderNavbar />
        <div className="auth-block-container mt-5">
            <Container fluid>
                <div className="auth-block-outer w-100">
                    <Row className="w-100 no-gutters">
                        <Col className="left-block" md="4">
                            <div className="ellipse"></div>
                            <div className='content-block'>
                                <h5>CREATE AN ACCOUNT</h5>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing</p>
                            </div>

                            </Col>
                            <Col className="right-block" md="8">
                                
                               {/* {showRegister ? <RegistrationForm onClickLogin={() => toggleFormLogin()}  /> : ""}
                            {showLogin ? <LoginForm /> :  ""}
                          
                            {showLogin ? <LoginForm onClickRegister={() => toggleFormRegister()}  /> : ""}
                            {showRegister ? <RegistrationForm /> :  ""} */}
                        
                          {showLogin ? <LoginForm onClickForgotPassword={() => toggleForm()} onClickRegister={() => toggleFormRegister()} /> : ""}
                            {showForgotPassword ? <ForgotPassword /> :  ""}
                            {showRegister ? <RegistrationForm params={params} onOTPCall={toggleOTP}/> :  ""}
                           
                            {showForgotPasswordForm ? <ForgotPassword onClickVerification={() => toggleFormVerification()}  /> : ""}
                            {showVerification && userName ? <Verification userName={userName} setStudentId={setStudentId} /> :  ""}
                           
                            {/* {showVerificationForm ? <Verification onClickCreateNewPassword={() => toggleFormCreateNewPassword()}  /> : ""} */}
                            {showCreateNewPassword ? <CreateNewPassword /> :  ""}
                            {/* <CreateNewPassword /> */}
                            {/* <Verification /> */}
                            <div>
                                {/* <p class="dont-have-account">Don’t Have Account <span>Sign up here</span></p> */}
                                <div class="or-block">
                                    <div></div> <div>OR</div><div></div>
                                </div>
                                <Row className="justify-content-center mt-4">
                                    <Col xxl={5} xl={5} lg={5} md={5} sm={5} xs={5}>
                                        <div className="social-block"><img src={google} /> <span>Sign in to google</span></div>
                                    </Col>
                                    <Col xxl={5} xl={5} lg={5} md={5} sm={5} xs={5}>
                                        <div className="social-block"><img src={facebook} /> <span>Sign in to google</span></div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>

            </Container>
        </div>
        <Footer />
        </div>

    )

}
export default AuthPage
