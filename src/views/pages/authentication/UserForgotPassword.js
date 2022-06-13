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
import '../../../styles/userforgotpassword.css'
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

const UserForgotPassword = props => {
    const [skin, setSkin] = useSkin()
    const { register, errors, handleSubmit } = useForm()
    const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
        source = require(`@src/assets/images/pages/${illustration}`).default


    return (
        <div className='auth-wrapper auth-v2'>
            <div className="fill-window" >
                <div className='container'>
                    <Card className='card' >

                        <div style={{ margin: 0, padding: 0 }} class="row" >
                            <Col className='theme-color' xs={4} style={{
                                justifyContent: 'center',
                                alignContent: 'center'
                            }}>
                                <div style={{ marginTop: '30%', textAlign: 'left' }}>
                                    <h3 style={{ color: 'white' }}>
                                        Create an account
                                    </h3>
                                    <h6 style={{ color: 'white', fontSize:16 }}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                        It has survived not only five centuries, but also the leap into electronic typesetting, 
                                        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset 
                                        sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
                                        Aldus PageMaker including versions of Lorem Ipsum. </h6>
                                </div>
                            </Col>
                            <Col style={{ marginTop:50, marginBottom: 70}}>
                            <center>
                                <h2 style={{ color: 'black', marginTop: '20px' }}>Forgot Password</h2>
                                <h6 style={{ color: 'black', fontSize:12, marginBottom: '30px', marginLeft:100, marginRight:100 }}>
                                        Ljvjmf  hjgf hjhghgjgh  hu gylo gyo y8o iyo8 g09u8p uhi0 ph h gf hgcfbvdcfbgdfdfg ddf gdfgfdfdgfdfd f ghhj hjg hgj hj hg hf hg jhf hg hjhgf hgffd ,khhkjjkhgkjgjhg
                                    </h6>
                                <form >

                                    {/* <Row > */}
                                    <div className='emailDiv' >
                                       
                                        <Col>
                                            <Label className='form-label' for='login-email'>
                                                Enter your Email address
                                            </Label>
                                            <Input
                                            className = 'input-field'
                                                type='email'
                                                placeholder='Email Address' fontSize='12px'
                                            />
                                        </Col>
                                        </div>
                                  
                                </form>
                                
                                {/* <div><h6 style={{ color: 'blue', fontSize:14, textAlign:'right', marginRight:120, marginTop:10, marginBottom:20 }}>Forgot Password?</h6></div> */}
                                <button className='register-button' >Send OTP</button>
                                {/* <div><h6>Dont have account <href>Signup here</href></h6></div> */}
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

export default UserForgotPassword