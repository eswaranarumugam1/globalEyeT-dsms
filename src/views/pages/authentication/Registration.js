
import { useState, useContext, Fragment } from 'react'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast, Slide } from 'react-toastify'
import { handleLogin } from '@store/actions/auth'
import { AbilityContext } from '@src/utility/context/Can'
import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { getHomeRouteForLoggedInUser, isObjEmpty } from '@utils'
import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee } from 'react-feather'
import DatePicker from "react-datepicker"
import Select from 'react-select'
import {
    Alert,
    Row,
    Col,
    CardTitle,
    CardText,
    Form,
    Input,
    FormGroup,
    Label,
    CustomInput,
    Button,
    UncontrolledTooltip,
    Card
} from 'reactstrap'

import { Image } from 'antd'
import logo from '../../../assets/images/icons/googleIcon.png'
import facebook from '../../../assets/images/icons/facebook.png'
// import '../../../newComponents/App.css'

const ToastContent = ({ name, role }) => (
    <Fragment>
        <div className='toastify-header'>
            <div className='title-wrapper'>
                <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
                <h6 className='toast-title font-weight-bold'>Welcome, {name}</h6>
            </div>
        </div>
        <div className='toastify-body'>
            <span>You have successfully logged in as an {role} user to Vuexy. Now you can start to explore. Enjoy!</span>
        </div>
    </Fragment>
)

    const Registration = props => {
    const [skin, setSkin] = useSkin()
    const { register, errors, handleSubmit } = useForm()
    const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
        source = require(`@src/assets/images/pages/${illustration}`).default
    const options = [
        { value: '91', label: '+91' },
        { value: '92', label: '+92' },
        { value: '93', label: '+93' },
        { value: '94', label: '+94' },
        { value: '95', label: '+95' },
        { value: '96', label: '+96' }
        ]


    return (
        <div className='container-fluid loginContainer'>
            <div >
                <div >
                    <Card  >

                        <div style={{ margin: 0, padding: 0 }} class="row" >
                            <Col xs={4} style={{
                                justifyContent: 'center',
                                alignContent: 'center',
                                backgroundColor: 'red'
                            }}>
                                <div style={{ marginTop: '20%', textAlign: 'left' }}>
                                    <h3 style={{ color: 'white' }}>
                                        Create an account
                                    </h3>
                                    <h3 className='sidetext' style={{ color: 'white'}}>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                        It has survived not only five centuries, but also the leap into electronic typesetting, 
                                        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset 
                                        sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
                                        Aldus PageMaker including versions of Lorem Ipsum.
                                    </h3>
                                </div>
                                                <div className='loginTextBorder'></div>

                            </Col>
                            <Col style={{ marginTop:50, marginBottom: 70}}>
                          <center>
                                Registration
                                <form >
                                    <Row >
                                        <Col>
                                            <Label className='form-label' for='login-email'>
                                                Full Name
                                            </Label>
                                            <Input 
                                                autoFocus 
                                                name='Full Name' 
                                                placeholder='Full name' 
                                            />
                                        </Col>
                                        <Col>
                                            <Label className='form-label' for='login-email'>
                                                Email
                                            </Label>
                                            <Input
                                                type='email'
                                                autoFocus
                                                name='email'
                                                placeholder='Email'
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Label className='form-label' for='login-email'>
                                                Mobile Number
                                            </Label>
                                            {/* <div className="country_code">
                                                <Select options={options} />
                                            </div> */}
                                            {/* <div className="mobile_num"> */}
                                                <Input
                                                    autoFocus
                                                    className="mobile_num"
                                                    name='mobile-number'
                                                    placeholder='Mobile number'
                                                />
                                            {/* </div> */}
                                        </Col>
                                        <Col>
                                            <Label className='form-label' for='login-email'>
                                                Date of Birth
                                            </Label>
                                            <Input
                                                autoFocus
                                                type="date"
                                                name='dob'
                                                placeholder='Date of Birth'
                                            />
                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col>
                                            <Label className='form-label' for='login-email'>
                                                Gender
                                            </Label>
                                            <Input
                                                autoFocus
                                                name='gender'
                                                placeholder='Gender'
                                            />

                                        </Col>
                                        <Col>
                                            <Label className='form-label' for='login-email'>
                                                ID type
                                            </Label>
                                            <Input
                                                autoFocus
                                                name='idno'
                                                placeholder='Id Type'
                                            />
                                        </Col>
                                    </Row>
                                    <Row  >
                                        <Col >
                                            <Label className='form-label' for='login-email'>
                                                Username
                                            </Label>
                                            <Input
                                                autoFocus
                                                placeholder='Username'

                                            />
                                        </Col>
                                        <Col>
                                            <Label className='form-label' for='login-email'>
                                                ID No
                                            </Label>
                                            <Input
                                                placeholder='Id no'
                                            />
                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col>
                                            <Label className='form-label' for='login-email'>
                                                Password
                                            </Label>
                                            <Input
                                                placeholder='Password'
                                            />
                                        </Col>
                                        <Col>
                                            <Label className='form-label' for='login-email'>
                                                Confirm Password
                                            </Label>
                                            <Input
                                                placeholder='Confirm Password'
                                            />
                                        </Col>
                                    </Row>
                                </form>
                                <Button className='register-button' color="danger">Register</Button>
                                <div>Dont have account <href>Signup here</href></div>
                                <h2 className='header-style'><span className='header-span'>or</span></h2>
                                <div style={{ marginTop: '40px', textAlign: 'center' }}>
                                    <Avatar img={logo} /> Sign in to Google &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Avatar img={facebook} /> Sign in to Facebook
                                </div>
                                {/* <div className='media_link1'>
                                    <Image src={logo} /> Sign in to Google                    
                                </div>
                                <div className='media_link2'>
                                    <Image src={facebook} /> Sign in to facebook               
                                </div>                                    */}
                                </center>
                            </Col>

                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Registration

