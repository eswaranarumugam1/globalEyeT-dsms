import { Row, Col, Container, Form, Input, FormGroup, Label, Button } from 'reactstrap'
import '../AuthPage.scss'
import { Link, useHistory } from "react-router-dom"
import eyeIconRedHide from '../../assets/images/eye-hide-red.png'
import { useState } from 'react'
 
import { authConfig } from "../../../api-config/authConfig"
import Headers from "../../../api-config/Headers"
// import OtpInput
function Verification(props) {
    const [otp1, setOtp1] = useState('')
    const [otp2, setOtp2] = useState('')
    const [otp3, setOtp3] = useState('')
    const [otp4, setOtp4] = useState('')

  const history = useHistory()

    const handleVerification = () => {
        if (!!otp1 && !!otp2 && !!otp3 && otp4) {
            const otp = otp1 + otp2 + otp3 + otp4
            const reqObj = {
                username: props.userName, 
                otp_code: otp
            }
            authConfig.post(`/otp_verfiy`, reqObj, {
                headers: Headers()
            })
            .then((response) => { 
                if (!!response.data.data.result.student_info.student_id) {
                    props.setStudentId(response.data.data.result.student_info.student_id)
                }
                return response 
            })
            .catch((error) => {
                return error
            })
        } else {
            alert('please enter valid otp')
        }
    }
    return (
        <div className="verification-container">
            <div className="title-block">
                <h3>Verification</h3>
                <h6 className='subtitle'> Please enter the Code recieved in your Mobile/Email</h6>
                <div className="title-bottom-strip"></div>
            </div>
            <Form>
                <Row className="justify-content-center otp-blk-r">
                    <Col xxl={1} xl={1} lg={2} md={2} sm={2} xs={3}>
                        <FormGroup>
                        <Input type= "text" name = "otp1" value={otp1} maxLength = "1" onChange={ (e) => { setOtp1(e.target.value) }}/>
                          </FormGroup>
                    </Col>
                    <Col xxl={1} xl={1} lg={2} md={2} sm={2} xs={3}>
                     <FormGroup>
                        <Input type= "text" name = "otp2" value={otp2} maxLength = "1" onChange={ (e) => { setOtp2(e.target.value) }}/>
                    </FormGroup>
                    </Col>
                    <Col xxl={1} xl={1} lg={2} md={2} sm={2} xs={3}>
                     <FormGroup>
                        <Input type= "text" name = "otp3" value={otp3} maxLength = "1" onChange={ (e) => { setOtp3(e.target.value) }}/>
                          </FormGroup>
                    </Col>
                    <Col xxl={1} xl={1} lg={2} md={2} sm={2} xs={3}>
                     <FormGroup>
                        <Input type= "text" name = "otp4" value={otp4} maxLength = "1" onChange={ (e) => { setOtp4(e.target.value) }}/>
                    </FormGroup>
                    </Col>
                </Row>
                
                <p class="resend-otp"> <span>Resend Code</span></p>
                <div>
                    <Button className="btn-block" onClick={handleVerification}>Verify</Button>
                </div>
                {/* <p class="dont-have-account">Don’t Have Account <span>Sign up here</span></p> */}
                                
            </Form>
        </div>
    )
}

export default Verification