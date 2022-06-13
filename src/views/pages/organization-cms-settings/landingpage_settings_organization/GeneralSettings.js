import React, { useState, useEffect, Fragment } from 'react'
import { AboutUsEnContent, AboutUsArContent, AddAboutUs } from "../../../../services/home/SchoolLandingPage"
import ErrorHandler from "../../../../common/ErrorHandler"
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
         Input } from 'reactstrap'
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

const GeneralSettings = () => {
  const [active, setActive] = useState('1')
  const [avatar, setAvatar] = useState()

  const [entitle, setEnAboutUSTitle] = useState('')
  const [endescription, setEnAboutUSDescription] = useState('')
  const [enimage, setEnAboutUSImage] = useState('')
  const [artitle, setArAboutUSTitle] = useState('')
  const [ardescription, setArAboutUSDescription] = useState('')

  const [picture, setPicture] = useState('')
   
  const school_id = parseInt(localStorage.getItem("schoolIdToken")) 
  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files[0]
    reader.onload = function () {
      setEnAboutUSImage(reader.result)
    }
    reader.readAsDataURL(files)
    setPicture(files)
    console.log(files)
  }

  const getAboutUsContent = async () => {
      const enresponse = await AboutUsEnContent(school_id)
      if (enresponse) {
        if (enresponse.data && !!enresponse.data.data.result) {
          console.log(enresponse)
          const { data: { result: { en } } }  = enresponse.data
          if (en) {
            const { about_title, about_description, about_us_image } = en
            if (!!about_title) {
              setEnAboutUSTitle(about_title)
            }
            if (!!about_description) {
              setEnAboutUSDescription(about_description)
            }
            if (!!about_us_image) {
              setEnAboutUSImage(about_us_image)
            }
          }
        }
      }
      const arresponse = await AboutUsArContent(school_id) 
      if (arresponse) {
        if (arresponse.data && !!arresponse.data.data.result) {
          const { data: { result: { ar } } }  = arresponse.data
          if (ar) {
            const { about_title, about_description } = ar
            if (!!about_description) {
              setArAboutUSDescription(about_description)
            }
            if (!!about_title) {
              setArAboutUSTitle(about_title)
            }
          }
        }
      }
  }
  const toggle = tab => {
    setActive(tab)
  }
  useEffect(() => {
    getAboutUsContent()
  }, [])

  const aboutusen = async () => { 
    const formData = new FormData()
    formData.append('lang', 'en')
    formData.append('about_title', entitle)
    formData.append('about_description', endescription)
    formData.append('about_us_image', picture)
    formData.append('school_id', school_id)
    console.log('the data is ', formData)

    // const lang = 'en'
    // const about_title = entitle
    // const about_description = endescription
    // const about_us_image = enimage
    // const request = {
    //    lang, about_title, about_description, about_us_image
    // }
    try {
      const response = await AddAboutUs(formData)
      // const response = await AddAboutUs(request)
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
   const aboutusar = async () => { 
   
    const formData = new FormData()
    formData.append('lang', 'ar')
    formData.append('about_title', artitle)
    formData.append('about_description', ardescription)
    formData.append('school_id', school_id)
    // formData.append('about_us_image', picture)
    console.log('the data is ', formData)

    try {
      const response = await AddAboutUs(formData)
      // const response = await AddAboutUs(request)
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
        
        </NavItem>
      </Nav>
      <TabContent className='py-50' activeTab={active}>
        <TabPane tabId='1'>
          <p>
            <AvForm>
              <center><h5>General Settings</h5><hr/></center>
                <Row>
                  <Col sm='12'>
                  <AvGroup>
                    <Label for='title'><h5><b>Title</b></h5></Label>                    
                    <AvInput name='title' id='title' onChange={(e) => {
                            setEnAboutUSTitle(e.target.value)
                          }}  required value={entitle} />    
                      <AvFeedback>Please enter a Title !</AvFeedback>
                    </AvGroup>
                  </Col>
                  <Col sm='12'>
                      <AvGroup>
                        <Label for='aboutus_description'><h5><b> Description</b></h5></Label>
                        <CKEditor
                            data={endescription}
                            editor={ ClassicEditor }
                            onChange={(event, editor) => {
                              const data = editor.getData()
                              setEnAboutUSDescription(data)
                            }}
                        />
                      </AvGroup>
                  </Col>
                  <Col>
                  <Media>
                        <Media className='mr-25' left>
                            <Media object className='rounded mr-50' src={enimage}  alt='Choose image' height='300' width='340' />
                        </Media>
                        <Media className='mt-75 ml-1' body>
                            <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                                Upload
                                <Input type='file' onChange={onChange} hidden accept='image/*' />
                            </Button.Ripple>
                        </Media>
                    </Media>
                  </Col>
                  <Col className='mt-2' sm='12'>
                    <Button.Ripple type='submit' className='mr-1' color='primary' onClick={aboutusen}>
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
export default GeneralSettings
