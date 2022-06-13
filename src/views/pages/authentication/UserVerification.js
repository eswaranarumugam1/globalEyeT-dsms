
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
import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee, AlignCenter } from 'react-feather'
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

import '@styles/base/pages/page-auth.scss'
import '../../../styles/user_verification.css'
import { Image } from 'antd'
import logo from '../../../assets/images/icons/googleIcon.png'
import facebook from '../../../assets/images/icons/facebook.png'

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

    const UserVerification = props => {
    const [skin, setSkin] = useSkin()
    const { register, errors, handleSubmit } = useForm()
    const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
        source = require(`@src/assets/images/pages/${illustration}`).default
  

    return (
        <div className='auth-wrapper auth-v2'>
            <div className="fill-window" >
                <div className='container'>
                    <Card className='card' >

                        <div style={{ margin: 0, padding: 0, borderColor: "red" }} class="row" >
                            <Col xs={4} className='theme-color' style={{
                                justifyContent: 'center',
                                alignContent: 'center'
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
                            </Col>
                            <Col style={{ marginTop:50, marginBottom: 70}}>
                               <center>
                                <form >
                                    <h3 className="mb-5 text-uppercase"> Verification</h3> <hr/><p>Please enter the Code received in Mobile/Email</p>
                                    <Row style={{ width: 305 }} >
                                        <Col>
                                            <Input className="otp" type="text"  onkeyup='tabChange(1)' maxlength={1} />
                                        </Col>
                                        <Col>
                                            <Input className="otp" type="text"  onkeyup='tabChange(2)' maxlength={1} />
                                        </Col>
                                        <Col>
                                            <Input className="otp" type="text"  onkeyup='tabChange(3)' maxlength={1} />
                                        </Col>
                                        <Col>
                                            <Input className="otp" type="text"  onkeyup='tabChange(4)' maxlength={1} />
                                        </Col>
                                    </Row>
                                </form>
                                <button className='register-button' >Register</button>
                                <div>Dont have account <href>Signup here</href></div>
                                <h2 className='header-style'><span className='header-span'>or</span></h2>
                                <div style={{ marginTop: '40px', textAlign: 'center' }}>
                                    <Avatar img={logo} /> Sign in to Google &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Avatar img={facebook} /> Sign in to Facebook
                                </div>
                                                                    
                                </center>
                            </Col>

                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default UserVerification