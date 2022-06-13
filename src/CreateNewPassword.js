import React from 'react'
import './App.css'

import Footer from './Footer'
import Navbar from './NavBar'

function CreateNewPassword() {
  return (
      <div>
          <Navbar />

          <div className='container-fluid loginContainer'>
              <div className='row'>
                  <div className='col-md-4 loginText text-left'>
                      <h4>CREATE AN ACCOUNT</h4>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                      <div className='loginTextBorder'></div>
                  </div>

                  <div className='col-md-8 loginFields mb-0'>
                      <h4>Create New Password</h4><br/>
                      <h6>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                          Lorem Ipsum has been the industry's standard</h6>
                      <span className='loginBorder'></span><br/><br/>

                      <form>
                          <div className='form-group'>

                              <label for="New Password">New Password:</label>
                              <input className='form-control' placeholder='Minimum 8 characters with upper and lower case and a symbol or a number' type="password" id="new_password" name="new_password" />
                              <div className="form-group-append">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                      <circle cx="12" cy="12" r="3"></circle>
                                  </svg>
                              </div>
                          </div>
                          <div className='form-group mb-1'>
                              <label for="Password">Confirm Password:</label>
                              <input className='form-control' placeholder='Minimum 8 characters with upper and lower case and a symbol or a number' type="password" id="new_password" name="new_password" />
                             <div className="form-group-append">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                      <circle cx="12" cy="12" r="3"></circle>
                                  </svg>
                              </div>
                          </div><br/>
                          {/* <div className='ForgotPwd'>
                              <a href='#'>Forgot password?</a>
                          </div> */}
                          <button className='btn signInBtn mb-4'>Login</button>
                          {/* <div className='SigninTxt'>
                              <p>Dont have account? < a href='#' >sign up here</a></p>
                          </div> */}
                      </form>
                      <div className='loginOptions text-center'><span>OR</span></div>
                      <div className='SocialLogin mt-5'>
                          
                              <a href='#' className='mr-5'>
                                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <g clip-path="url(#clip0_1349_3985)">
                                          <path d="M24.9988 12.7772C25.0139 11.9178 24.9234 11.0598 24.7292 10.2217H12.7539V14.8605H19.7833C19.6501 15.6739 19.3505 16.4524 18.9024 17.1494C18.4542 17.8463 17.8669 18.4472 17.1757 18.916L17.1512 19.0713L20.9378 21.946L21.2 21.9717C23.6091 19.7911 24.9983 16.5826 24.9983 12.7772" fill="#4285F4" />
                                          <path d="M12.7539 24.9995C16.1977 24.9995 19.0888 23.8884 21.2007 21.9717L17.1757 18.916C16.0987 19.6523 14.6531 20.1662 12.7539 20.1662C11.141 20.157 9.57195 19.6502 8.26946 18.7178C6.96697 17.7854 5.99716 16.4747 5.49762 14.9717L5.34813 14.9842L1.41084 17.9702L1.35938 18.1105C2.41979 20.1816 4.04716 21.9228 6.05953 23.1394C8.0719 24.356 10.3899 25.0001 12.7544 24.9995" fill="#34A853" />
                                          <path d="M5.49874 14.9722C5.21975 14.1765 5.07579 13.3414 5.07259 12.5001C5.07772 11.6601 5.21637 10.8261 5.48354 10.0279L5.47644 9.86222L1.49087 6.82812L1.3605 6.88889C0.465953 8.62941 0 10.5511 0 12.4999C0 14.4488 0.465953 16.3705 1.3605 18.111L5.49874 14.9722Z" fill="#FBBC05" />
                                          <path d="M12.7544 4.83323C14.5821 4.80542 16.3498 5.47248 17.6864 6.69442L21.2863 3.24989C18.9774 1.12725 15.92 -0.0374179 12.7544 -0.000107015C10.39 -0.000658328 8.07195 0.643355 6.05958 1.85992C4.04721 3.07649 2.41982 4.81765 1.35938 6.8887L5.4839 10.0278C5.98836 8.52501 6.96139 7.21533 8.2658 6.28338C9.57021 5.35142 11.1402 4.8442 12.7544 4.83323Z" fill="#EB4335" />
                                      </g>
                                      <defs>
                                          <clipPath id="clip0_1349_3985">
                                              <rect width="25" height="25" fill="white" />
                                          </clipPath>
                                      </defs>
                                  </svg>
                                  <span className='ml-2'>Sign in to Google</span>
                              </a>
                              <a href='#'>
                                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M24.9927 0H0.00732422C0.00327916 0 0 0.00327916 0 0.00732422V24.9927C0 24.9967 0.00327916 25 0.00732422 25H24.9927C24.9967 25 25 24.9967 25 24.9927V0.00732422C25 0.00327916 24.9967 0 24.9927 0Z" fill="#1877F2" />
                                      <path d="M17.3652 16.1133L17.9219 12.5H14.4551V10.1562C14.4551 9.16992 14.9385 8.20312 16.4912 8.20312H18.0684V5.12695C18.0684 5.12695 16.6377 4.88281 15.2705 4.88281C12.4141 4.88281 10.5488 6.61133 10.5488 9.74609V12.5H7.375V16.1133H10.5488V25H14.4551V16.1133H17.3652Z" fill="white" />
                                  </svg>
                                  <span className='ml-2'>Sign in to Facebook</span>
                              </a>

                      </div>


                  </div>
              </div>
          </div>

          <Footer />
      </div>
  )
}

export default CreateNewPassword
