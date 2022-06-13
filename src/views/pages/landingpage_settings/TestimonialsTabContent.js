import React, { useState, useEffect, Fragment } from 'react'
import { TestimonialsEnContent, TestimonialsArContent, AddTestimonial } from "../../../services/home/AdminLandingPage"
import ErrorHandler from "../../../common/ErrorHandler"
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { toast, Slide } from "react-toastify"
import Avatar from "@components/avatar"
import {  Coffee } from "react-feather"
import { TabContent, 
         TabPane, 
         Nav, 
         NavItem, 
         NavLink, 
         Button, 
         Media, 
         Label, 
         Row, 
         Col, 
         Input,  
         Alert, 
         Form } from 'reactstrap'
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation-safe'

const SuccessContent = ({ msg }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
        <h6 className="toast-title font-weight-bold">Success</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        {msg}
      </span>
    </div>
  </Fragment>
)

const TestimonialsTabContent = () => {
  const [active, setActive] = useState('1')
  const [avatar, setAvatar] = useState()

  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setAvatar(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  const [entestimonial_title, setEnTestimonialTitle] = useState('')
  const [entestimonia_description, setEnTestimonialDescription] = useState('')

  const [artestimonial_title, setArTestimonialTitle] = useState('')
  const [artestimonia_description, setArTestimonialDescription] = useState('')

  const getTestimonials = async () => {
    try {
      const enresponse = await TestimonialsEnContent()
      if (enresponse) {
        if (enresponse.data) {
          console.log(enresponse)
          try {
          const { data: { result: { en } } }  = enresponse.data
          if (en) {
            const { testimonial_title, 
                    testimonial_description
                  } = en
                    setEnTestimonialTitle(testimonial_title)
                    setEnTestimonialDescription(testimonial_description) 
          } 
        } catch (e) {
            ErrorHandler(e)
          }
        }
      }
      const arresponse = await TestimonialsArContent()
      if (arresponse) {
        if (arresponse.data) {
          try {
          console.log(arresponse)
          const { data: { result: { ar } } }  = arresponse.data
          if (ar) {
            const { testimonial_title, 
                    testimonial_description
                  } = ar
                    setArTestimonialTitle(testimonial_title)
                    setArTestimonialDescription(testimonial_description) 
           } 
        } catch (e) {
      ErrorHandler(e)
    }
        }
      }

    } catch (e) {
      ErrorHandler(e)
    }
  }

  useEffect(() => {
    getTestimonials()
  }, [])

  const toggle = tab => {
    setActive(tab)
  }
  const testimonialen = async () => {
    const formData = new FormData()
    formData.append('lang', 'en')
    formData.append('testimonial_title', entestimonial_title)
    formData.append('testimonial_description', entestimonial_title)
  
    // const lang = 'en'               
    // const testimonial_title = entestimonial_title
    // const testimonial_description = entestimonial_title
    // const request = {
    //    lang, testimonial_title, testimonial_description
    // }
     console.log(formData)
    try {
      const response = await AddTestimonial(formData)
      // const response = await AddTestimonial(request)
      if (response) {
        if (response.data) {
          const { data: { message } } = response.data
          toast.success(<SuccessContent msg={message} />, {
            transition: Slide,
            hideProgressBar: true,
            autoClose: 2000
          })
        }
        // window.location.reload()
      }
    } catch (e) {
      console.log(e)
    }
   }
   const testimonialar = async () => {
    const formData = new FormData()
    formData.append('lang', 'ar')
    formData.append('testimonial_title', artestimonial_title)
    formData.append('testimonial_description', artestimonial_title)
  
    // const lang = 'ar'               
    // const testimonial_title = artestimonial_title
    // const testimonial_description = artestimonial_title
    // const request = {
    //    lang, testimonial_title, testimonial_description
    // }
    console.log(formData)
    try {
      const response = await AddTestimonial(formData)
      // const response = await AddTestimonial(request)
     if (response) {
        if (response.data) {
          const { data: { message } } = response.data
          toast.success(<SuccessContent msg={message} />, {
            transition: Slide,
            hideProgressBar: true,
            autoClose: 2000
          })
        }
        // window.location.reload()
      }
    } catch (e) {
      ErrorHandler(e)
      console.log(e)
    }
   }
  return (
    <React.Fragment>
      <Nav pills>
        <NavItem>
          <NavLink
            active={active === '1'}
            onClick={() => {
              toggle('1')
            }}
          >
            English
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '2'}
            onClick={() => {
              toggle('2')
            }}
          >
            Arabic
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className='py-50' activeTab={active}>
        <TabPane tabId='1'>
          <p>
          <AvForm>
            <h5><center>Testimonial In English</center></h5>
              <Row>
                <Col sm='12'>
                  <AvGroup>
                    <Label for='testimonial_title'><h5><b>Title</b></h5></Label>
                    <AvInput name='title' id='title' onChange={(e) => {
                        setEnTestimonialTitle(e.target.value)
                      }}  required value={entestimonial_title} />    
                  <AvFeedback>Please enter a Title !</AvFeedback>
                  </AvGroup>
                </Col>
                <Col sm='12'>
                  <AvGroup>
                    <Label for='testimonials_description'><h5><b>Description</b></h5></Label>
                    <CKEditor
                    data={entestimonia_description}
                    editor={ ClassicEditor }
                     
                    onChange={ (event, editor) => { 
                      const data = editor.getData()
                      setEnTestimonialDescription(data)
                  } }
                />
                  </AvGroup>
                </Col>
                <Col className='mt-2' sm='12'>
                  <Button.Ripple type='submit' className='mr-1' color='primary' onClick={testimonialen}>
                    Save changes
                  </Button.Ripple>
                </Col>
              </Row>
            </AvForm> 
          </p>
        </TabPane>
        <TabPane tabId='2'>
          <p>
            <AvForm>
            <h5><center>Testimonial In Arabic</center></h5>
              <Row>
                <Col sm='12'>
                  <AvGroup>
                    <Label for='testimonial_title'><h5><b>Title</b></h5></Label>
                    <AvInput name='title' id='title' onChange={(e) => {
                        setArTestimonialTitle(e.target.value)
                      }}  required value={artestimonial_title} />    
                    <AvFeedback>Please enter a Title !</AvFeedback>
                  </AvGroup>
                </Col>
                <Col sm='12'>
                  <AvGroup>
                    <Label for='testimonials_description'><h5><b>Description</b></h5></Label>
                    <CKEditor
                        data={artestimonia_description}
                        editor={ ClassicEditor }
                         
                        onChange={ (event, editor) => { 
                          const data = editor.getData()
                          setArTestimonialDescription(data)
                      } }
                    />
                  </AvGroup>
                </Col>
                <Col className='mt-2' sm='12'>
                  <Button.Ripple type='submit' className='mr-1' color='primary' onClick={testimonialar}>
                    Save changes
                  </Button.Ripple>
                </Col>
              </Row>
            </AvForm> 
          </p>
        </TabPane>
      </TabContent>
    </React.Fragment>
  )
}
export default TestimonialsTabContent