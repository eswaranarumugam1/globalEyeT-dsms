
import { Row, Col, Container, Form, Input, FormGroup, Label, Button, FormFeedback} from 'reactstrap'
import '../AuthPage.scss'
import eyeIconRedHide from '../../assets/images/eye-hide-red.png'
import { Link, useHistory } from "react-router-dom"
import { useState } from 'react'

import { authConfig } from "../../../api-config/authConfig"
import Headers from "../../../api-config/Headers"
import { Phone } from 'react-feather'


function RegistrationForm(props) {
    const [nam, setName] = useState('')
    const [eml, setEmail] = useState('')
    const [phone, setPhone] = useState(null)
    const [phoneCode, setPhoneCode] = useState(null)
    const [Dob, setdob] = useState('')
    const [Gender, setGender] = useState('')
    const [idType, setIdType] = useState('')
    const [userName, setUserName] = useState('')
    const [idno, setIdNo] = useState('')
    const [Password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [Level, setLevel] = useState('')

    const [namValid, setNameValid] = useState(false)
    const [emlValid, setEmailValid] = useState(false)
    const [phoneValid, setPhoneValid] = useState(false)
    const [phoneCodeValid, setPhoneCodeValid] = useState(false)
    const [DobValid, setdobValid] = useState(false)
    const [GenderValid, setGenderValid] = useState(false)
    const [idTypeValid, setIdTypeValid] = useState(false)
    const [userNameValid, setUserNameValid] = useState(false)
    const [idnoValid, setIdNoValid] = useState(false)
    const [PasswordValid, setPasswordValid] = useState(false)
    const [confirmValid, setConfirmValid] = useState(false)
    const [LevelValid, setLevelValid] = useState(false)

    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    const phoneRegex = /^[0-9]*$/


    const handleregis = (event) => {
            if (Password === confirm && !!nam && !!eml && !!phone && !!phoneCode && !!Dob && !!Gender && idType && !!userName && !!idno) {
                const reqObj = {
                    name: nam,
                    mobile: phone,
                    gender: Gender,
                    email: eml,
                    username: userName,
                    password: Password,
                    confirm_password: confirm,
                    school_id: props.params.id,
                    arabic_name: '',
                    dob: Dob,
                    id_type: idType,
                    id_number: idno,
                    subscription_id: props.params.planId,
                    level: Level
                }
                authConfig.post(`/student_register`, reqObj, {
                            headers: Headers()
                        })
                        .then((response) => {
                            if (response && response.data.data.success === 'sucess') {
                                props.onOTPCall(userName)
                            }
                            return response
                        })
                        .catch((error) => {
                            return error
                        })
            } else {
                if (!nam) {
                    setNameValid(true)
                }
                if (!eml || regex.test(eml) === false) {
                    setEmailValid(true)
                }                
                if (!Phone || phoneRegex.test(phone) === false || Phone.length < 6) {
                    setPhoneValid(true)
                }
                if (!phoneCode) {
                    setPhoneCodeValid(true)
                }
                if (!Dob) {
                    setdobValid(true)
                }
                if (!Gender) {
                    setGenderValid(true)
                }
                if (!idType) {
                    setIdTypeValid(true)
                }
                if (!userName) {
                    setUserNameValid(true)
                }
                if (!idno) {
                    setIdNoValid(true)
                }
                if (!Password) {
                    setPasswordValid(true)
                }
                if (!Level) {
                    setLevelValid(true)
                }
                if (!!Password && Password !== confirm) {
                    setConfirmValid(true)
                }
            }
    }
    function handleName (e) {
        setName(e.target.value)
        if (!!e.target.value) {
            setNameValid(false)
        }
    }
    function handleEmail (e) {
        setEmail(e.target.value)
        if (!!e.target.value) {
            setEmailValid(false)
        }
    }
    function handleMobileCode (e) {
        setPhoneCode(e.target.value)
        if (!!e.target.value) {
            setPhoneCodeValid(false)
        }
    }
    function handlemobile (e) {
        setPhone(e.target.value)
        if (!!e.target.value) {
            setPhoneValid(false)
        }
    }
    function handleDOB (e) {
        setdob(e.target.value)
        if (!!e.target.value) {
            setdobValid(false)
        }
    }
    function handlegender (e) {
        setGender(e.target.value)
        if (!!e.target.value) {
            setGenderValid(false)
        }
    }
    function handleIDtype (e) {
        setIdType(e.target.value)
        if (!!e.target.value) {
            setIdTypeValid(false)
        }
    }
    function handleUserName (e) {
        setUserName(e.target.value)
        if (!!e.target.value) {
            setUserNameValid(false)
        }
    }
    function handlePassword (e) {
        setPassword(e.target.value)
        if (!!e.target.value) {
            setPasswordValid(false)
        }
    }
    function handleConfirm (e) {
        setConfirm(e.target.value)
        if (!!e.target.value) {
            setConfirmValid(false)
        }
    }
    function handleLevel (e) {
        setLevel(e.target.value)
        if (!!e.target.value) {
            setLevelValid(false)
        }
    }
    function handleIDNo (e) {
        setIdNo(e.target.value)
        if (!!e.target.value) {
            setIdNoValid(false)
        }
    }
    return (
        <div className="register-container">
            <div className="title-block">
                <h3>Registration</h3>
                <div className="title-bottom-strip"></div>
            </div>
            <Form>
                <Row className="justify-content-between">
                    <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                        <FormGroup>
                            <Label for="exampleEmail">Full Name</Label>
                            <Input invalid={namValid} type="text" name="name" id="exampleEmail" placeholder="Full Name" value={nam} onChange={handleName}/>
                            <FormFeedback>Please enter valid Name</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input invalid={emlValid} type="email" name="email" id="exampleEmail" placeholder="Email" value={eml} onChange={handleEmail}/>
                            <FormFeedback>Please enter valid Email</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                            <Row className="no-gutters">
                                <Col xxl={3} xl={3} lg={3} md={3} sm={3} xs={3}>
                                <FormGroup>
                                    <Label for="exampleNumber">Mobile Code</Label>
                                    <Input invalid={phoneCodeValid} type="select" className="country-code" name="select" id="exampleSelect" value={phoneCode} onChange={handleMobileCode}>
                                    <option >select sountry code</option>
                                        <option value={0}>+966</option>
                                        <option value={1}>+967</option>
                                        <option value={2}>+968</option>
                                    </Input>
                                    <FormFeedback>Invalid</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col xxl={9} xl={9} lg={9} md={9} sm={9} xs={9}>
                                <FormGroup>
                                    <Label for="exampleNumber">Mobile Number</Label>
                                    <Input invalid={phoneValid} type="number" className="mobile" name="number" id="exampleNumber448" placeholder="Mobile Number" value={phone} onChange={handlemobile}/>
                                    <FormFeedback>Please enter valid Mobile Number</FormFeedback>
                                </FormGroup>
                                </Col>
                            </Row>
                             {/* <FormFeedback>Please enter valid Mobile Number</FormFeedback> */}

                    </Col>
                    <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                        <FormGroup>
                            <Label for="exampleSelect">Date of Birth</Label>
                            <Input invalid={DobValid} type="date" name="date" id="date" value={Dob} onChange={handleDOB}>
                            </Input>
                            <FormFeedback>Please enter valid DOB</FormFeedback>
                        </FormGroup>

                    </Col>
                    <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                        <FormGroup>
                            <Label for="exampleSelect">Gender</Label>
                            <Input invalid={GenderValid} type="select" name="select" id="exampleSelect" vlaue={Gender} onChange={handlegender}>
                            <option value={null}>Select Your Gender </option> 
                                <option value={0}>Male</option>
                                <option value={1}>Female</option>
                                <option value={2}>Prefer not to say</option> 
                            </Input>
                            <FormFeedback>Please enter valid Gender</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                        <FormGroup>
                            <Label for="exampleSelect">ID Type</Label>
                            <Input invalid={idTypeValid} type="select" name="select" id="exampleSelect" value={idType} onChange={handleIDtype}>
                                <option value={null}>ID Type</option> 
                                <option value={0}>Aadhar</option>
                                <option value={1}>PAN</option>
                                <option value={2}>Licence</option>
                                <option value={3}>Passport</option> 
                            </Input>
                            <FormFeedback>Please enter valid ID Type</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                        <FormGroup>
                            <Label for="exampleEmail">User Name</Label>
                            <Input invalid={userNameValid}  type="text" name="email" id="exampleEmail" placeholder="User Name" value={userName} onChange={handleUserName}/>
                            <FormFeedback>Please enter valid User Name</FormFeedback>
                            </FormGroup>
                    </Col>
                    <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                        <FormGroup>
                            <Label for="exampleEmail">ID No</Label>
                            <Input invalid={idnoValid} type="text" name="email" id="exampleEmail" placeholder="ID no" value={idno} onChange={handleIDNo}/>
                            <FormFeedback>Please enter valid ID No</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                        <FormGroup className="password-block-outer">
                            <img src={eyeIconRedHide} />
                            <Label for="examplePassword">Password</Label>
                            <Input invalid={PasswordValid} type="password" name="password" id="examplePassword" placeholder="Password" value={Password} onChange={handlePassword}/>
                            <FormFeedback>Please enter valid password</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                        <FormGroup className="password-block-outer">
                            <img src={eyeIconRedHide} />
                            <Label for="examplePassword">Confirm Password</Label>
                            <Input invalid={confirmValid} type="password" name="password" id="examplePassword" placeholder="Re-Enter Password" value={confirm} onChange={handleConfirm}/>
                            <FormFeedback>Password and confirm Password is not same</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                    <FormGroup>
                            <Label for="exampleSelect">level</Label>
                            <Input invalid={LevelValid} type="select" name="select" id="exampleSelect" value={Level} onChange={handleLevel}>
                                <option value={null}>Level</option>  
                                <option value={0}>Beginner</option>
                                <option value={1}>Intermediate</option>
                                <option value={2}>Expert</option> 
                            </Input>
                            <FormFeedback>Please enter valid Level</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
                <div>
                    <Button className="btn-block" onClick={handleregis}>Register</Button>
                </div>
                <p class="dont-have-account"  onClick={props.onClickLogin}>Already Have an Account 
                <Link to="/authPage">
                 <span>Sign In here </span>
                 </Link>
                 </p>
                                
            </Form>
        </div>
    )
}

export default RegistrationForm