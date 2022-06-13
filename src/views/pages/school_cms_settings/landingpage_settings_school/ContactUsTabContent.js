import React, { useState, useEffect, Fragment } from 'react'
import { ContactUsEnContent, ContactUsArContent, AddContactUs } from "../../../../services/home/SchoolLandingPage"
import ErrorHandler from "../../../../common/ErrorHandler"
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { toast, Slide } from "react-toastify"
import Avatar from "@components/avatar"
import {  Coffee } from "react-feather"
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Label, Row, Col } from 'reactstrap'
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

const ContactUsTabContent = () => {
  const [active, setActive] = useState('1')

  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setAvatar(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  const [encontact_title, setEnContactUsTitle] = useState('')
  const [encontact_description, setEnContactUsDescription] = useState('')
  const [encontact_address, setEnContactUsAddress] = useState('')
  const [encontact_email, setEnContactUsEmail] = useState('')
  const [encontact_phone, setEnContactUsPhone] = useState('')

  const [arcontact_title, setArContactUsTitle] = useState('')
  const [arcontact_description, setArContactUsDescription] = useState('')
  const [arcontact_address, setArContactUsAddress] = useState('')
  const [arcontact_email, setArContactUsEmail] = useState('')
  const [arcontact_phone, setArContactUsPhone] = useState('')
  
  const school_id = parseInt(localStorage.getItem("schoolIdToken"))
  const getContactUs = async () => {
      const enresponse = await ContactUsEnContent(school_id)
      if (enresponse) {
        if (enresponse.data && !!enresponse.data.data.result) {
          console.log(enresponse)
          const { data: { result: { en } } }  = enresponse.data
          if (en) {
            const { contact_title, 
                    contact_description,
                    contact_address,
                    contact_email,
                    contact_phone
                  } = en
                  
                  if (!!contact_email) {
                    setEnContactUsEmail(contact_email)
                  }
                  if (!!contact_address) {
                    setEnContactUsAddress(contact_address)
                  }
                  if (!!contact_description) {
                    setEnContactUsDescription(contact_description) 
                  }
                  if (!!contact_title) {
                    setEnContactUsTitle(contact_title)
                  }
                  if (!!contact_phone) {
                    setEnContactUsPhone(contact_phone)
                  }
          }
        }
      }
      const arresponse = await ContactUsArContent(school_id)
      if (arresponse) {
        if (arresponse.data && !!arresponse.data.data.result) {
          console.log(arresponse)
          const { data: { result: { ar } } }  = arresponse.data
          if (ar) {
            const { contact_title, 
                    contact_description,
                    contact_address,
                    contact_email,
                    contact_phone
                  } = ar

                  if (!!contact_email) {
                    setArContactUsEmail(contact_email)
                  }
                  if (!!contact_address) {
                    setArContactUsAddress(contact_address)
                  }
                  if (!!contact_description) {
                    setArContactUsDescription(contact_description) 
                  }
                  if (!!contact_title) {
                    setArContactUsTitle(contact_title)
                  }
                  if (!!contact_phone) {
                    setArContactUsPhone(contact_phone)
                  }
           }
        }
      }
  }

  useEffect(() => {
    getContactUs()
  }, [])

  const toggle = tab => {
    setActive(tab)
  }
  const contactusen = async () => { 
    const formData = new FormData()
    formData.append('lang', 'en')
    formData.append('contact_title', encontact_title)
    formData.append('contact_description', encontact_description)
    formData.append('contact_address', encontact_address)
    formData.append('contact_email', encontact_email)
    formData.append('contact_phone', encontact_phone)
    formData.append('school_id', school_id)
  // const lang = 'en'
  // const contact_title = encontact_title
  // const contact_description = encontact_description
  // const contact_address = encontact_address
  // const contact_email = encontact_email
  // const contact_phone = encontact_phone       

  //   const request = {
  //      lang, contact_title, contact_description, contact_address, contact_email, contact_phone
  //   }
     console.log(formData)
    try {
      const response = await AddContactUs(formData)
      // const response = await AddContactUs(request)
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
   const contactusar = async () => {
    const formData = new FormData()
    formData.append('lang', 'en')
    formData.append('contact_title', arcontact_title)
    formData.append('contact_description', arcontact_description)
    formData.append('contact_address', arcontact_address)
    formData.append('contact_email', arcontact_email)
    formData.append('contact_phone', arcontact_phone)
    formData.append('school_id', school_id)
    // const lang = 'ar'
    // const contact_title = arcontact_title
    // const contact_description = arcontact_description
    // const contact_address = arcontact_address
    // const contact_email = arcontact_email
    // const contact_phone = arcontact_phone       

    //   const request = {
    //     lang, contact_title, contact_description, contact_address, contact_email, contact_phone
    //   }
    console.log(formData)
    try {
      const response = await AddContactUs(formData)
      // const response = await AddContactUs(request)
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
              <center><h5>Contact Us In English</h5><hr/></center>
              <Row>
                <Col sm='12'>
                  <AvGroup>
                    <Label for='contactus_title'><h5><b>Title</b></h5></Label>
                    <AvInput name='title' id='title' onChange={(e) => {
                        setEnContactUsTitle(e.target.value)
                      }}  required value={encontact_title} />    
                  <AvFeedback>Please enter a Title !</AvFeedback>
                  </AvGroup>
                </Col>
                <Col sm='12'>
                  <AvGroup>
                    <Label for='contactus_description'><h5><b>Description</b></h5></Label>
                    <CKEditor
                    data={encontact_description}
                    editor={ ClassicEditor }
                    onFocus={ (event, editor) => { 
                        const data = editor.getData()
                        setEnContactUsDescription(data)
                    } }
                />
                  </AvGroup>
                </Col>
                <Col sm='12'>
                  <AvGroup>
                    <Label for='contactus_address'><h5><b>Adress</b></h5></Label>
                    <AvInput name='contactus_address' id='contactus_address' onChange={(e) => {
                          setEnContactUsAddress(e.target.value)
                        }}  required value={encontact_address} />    
                    <AvFeedback>Please enter a Title !</AvFeedback>
                  </AvGroup>
                </Col>
                <Col sm='12'>
                  <AvGroup>
                    <Label for='contactus_email'><h5><b>Email</b></h5></Label>
                      <AvInput name='title' id='title' onChange={(e) => {
                            setEnContactUsEmail(e.target.value)
                          }}  required value={encontact_email} />    
                      <AvFeedback>Please enter a Email !</AvFeedback>
                  </AvGroup>
                </Col>
                <Col sm='12'>
                  <AvGroup>
                    <Label for='contactus_contact'><h5><b>Contact</b></h5></Label>
                    <AvInput name='title' id='title' onChange={(e) => {
                            setEnContactUsPhone(e.target.value)
                          }}  required value={encontact_phone} />    
                      <AvFeedback>Please enter a Contact !</AvFeedback>
                  </AvGroup>
                </Col>
                <Col className='mt-2' sm='12'>
                  <Button.Ripple type='submit' className='mr-1' color='primary' onClick={contactusen}>
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
              <center><h5>Contact Us In Arabic</h5><hr/></center>
              <Row>
                <Col sm='12'>
                  <AvGroup>
                    <Label for='contactus_title'><h5><b>Title</b></h5></Label>
                    <AvInput name='title' id='title' onChange={(e) => {
                          setArContactUsTitle(e.target.value)
                        }}  required value={arcontact_title} />    
                    <AvFeedback>Please enter a Title !</AvFeedback>
                  </AvGroup>
                </Col>
                <Col sm='12'>
                  <AvGroup>
                    <Label for='contactus_description'><h5><b>Description</b></h5></Label>
                    <CKEditor
                        data={arcontact_description}
                        editor={ ClassicEditor }
                        onChange={ (event, editor) => { 
                          const data = editor.getData()
                          setArContactUsDescription(data)
                      } }
                    />
                  </AvGroup>
                </Col>
                <Col sm='12'>
                  <AvGroup>
                    <Label for='contactus_address'><h5><b>Adress</b></h5></Label>
                    <AvInput name='Adress' id='Adress' onChange={(e) => {
                          setArContactUsAddress(e.target.value)
                        }}  required value={arcontact_address} />    
                    <AvFeedback>Please enter a Title !</AvFeedback>
                  </AvGroup>
                </Col>
                <Col sm='12'>
                  <AvGroup>
                    <Label for='contactus_email'><h5><b>Email</b></h5></Label>
                    <AvInput name='Adress' id='Adress' onChange={(e) => {
                          setArContactUsEmail(e.target.value)
                        }}  required value={arcontact_email} />    
                    <AvFeedback>Please enter a Title !</AvFeedback>
                  </AvGroup>
                </Col>
                <Col sm='12'>
                  <AvGroup>
                    <Label for='contactus_contact'><h5><b>Contact</b></h5></Label>
                    <AvInput name='Adress' id='Adress' onChange={(e) => {
                          setArContactUsPhone(e.target.value)
                        }}  required value={arcontact_phone} />    
                    <AvFeedback>Please enter a Title !</AvFeedback>
                  </AvGroup>
                </Col>
                <Col className='mt-2' sm='12'>
                  <Button.Ripple type='submit' onChange={contactusar} className='mr-1' color='primary'>
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
export default ContactUsTabContent
