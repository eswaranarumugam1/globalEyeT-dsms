import React, { useState, useEffect, Fragment } from 'react'
import ErrorHandler from "../../../common/ErrorHandler"
import { BannerEnContent, BannerArContent, AddBanner } from "../../../services/home/AdminLandingPage"
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { toast, Slide } from "react-toastify"
import Avatar from "@components/avatar"
import {  Coffee, Info } from "react-feather"
import { 
  TabContent, 
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
  Tooltip
} from 'reactstrap'
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

const ErrorContent = ({ msg }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="danger" icon={<Coffee size={12} />} />
        <h6 className="toast-title font-weight-bold text-danger">Error</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        {msg}
      </span>
    </div>
  </Fragment>
)

const BannerTabs = () => {
  const [active, setActive] = useState('1')
  const [avatar, setAvatar] = useState()
  const [picture, setPicture] = useState('')

  const [entitle, setEnBannerTitle] = useState('')
  const [endescription, setEnBannerDescription] = useState('')
  const [enimage, setEnBannerImage] = useState('')

  const [artitle, setArBannerTitle] = useState('')
  const [ardescription, setArBannerDescription] = useState('')
  const [ar, LangAr] = useState('')
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const toggleToolTip = () => setTooltipOpen(!tooltipOpen)

  const onChange = e => {
    const reader = new FileReader()
    const files = e.target.files[0]
    const size = files.size / 1024
    console.log("size: ", size)
    if (size > 512) {
      toast.success(<ErrorContent msg={"file size must be less then 512KB."} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000
      })
      return false
    }
    reader.onload = function () {
      setEnBannerImage(reader.result)
    }
    reader.readAsDataURL(files)
    setPicture(files)
    console.log(files)
  }
  console.log('image', picture)
  const getBannerenContent = async () => {
      const enresponse = await BannerEnContent()
      if (enresponse) {
        if (enresponse.data) {
          // try { 
          const { data: { result: { en } } }  = enresponse.data
          if (en) {
            const { banner_title, banner_description, banner_image } = en
            if (!!banner_title) {
              setEnBannerTitle(banner_title)
            }
            if (!!banner_image) {
              setEnBannerImage(banner_image)
            }
            if (!!banner_description) {
              setEnBannerDescription(banner_description)
            }
          }
        // } catch (e) {
        //     ErrorHandler(e)
        //   }
        }
      }
  }
  const getBannerARContent = async () => {
      const arresponse = await BannerArContent()
      if (arresponse) {
        if (arresponse.data) {
          // try { 
          const { data: { result: { ar } } }  = arresponse.data
          if (ar) {
            const { banner_title, banner_description } = ar
            setArBannerTitle(banner_title)
            setArBannerDescription(banner_description)
          }
        // } catch (e) {
        //   ErrorHandler(e)
        // }
        }
      }
  }
  useEffect(() => {
    getBannerenContent()
    getBannerARContent()
  }, [])

  const toggle = tab => {
    setActive(tab)
  }
  // const onSubmit = data => trigger()
  const fileuploaden = async () => {
    const formData = new FormData()
    formData.append('lang', 'en')
    formData.append('banner_title', entitle)
    formData.append('banner_description', endescription)
    formData.append('banner_image', picture)
     console.log('the data is ', formData)

    // const lang = 'en'
    // const banner_title = entitle
    // const banner_description = endescription
    // const banner_image = picture
    // console.log(banner_image)
    // const request = {
    //    lang, banner_title, banner_description, banner_image
    // }
    try {
      const response = await AddBanner(formData)
      // const response = await AddBanner(request)
      console.log('resp', response)
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
   const fileuploadar = async () => {
    const formData = new FormData()
    formData.append('lang', 'ar')
    formData.append('banner_title', artitle)
    formData.append('banner_description', ardescription)
    // formData.append('banner_image', picture)
     console.log('the data is ', formData)

    // const lang = 'ar'
    // const banner_title = artitle
    // const banner_description = ardescription
    // const request = {
    //    lang, banner_title, banner_description
    // }
    try {
      const response = await AddBanner(formData)
      // const response = await AddBanner(request)
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
             <center><h5>Banner Content in English</h5><hr/></center>
             <Row>
               <Col sm='12'>              
                <AvGroup>
                <AvInput type="hidden" name='lang' onChange={(e) => {
                        LangEn(e.target.value)
                      }}  required value="en" /> 
                 <Label for='banner_title'><h5><b>Banner Title</b></h5></Label>                    
                <AvInput name='name' id='name' onChange={(e) => {
                        setEnBannerTitle(e.target.value)
                      }}  required value={entitle} />    
                  <AvFeedback>Please enter a Banner !</AvFeedback>
                </AvGroup>
              </Col>
              <Col sm='12'>
                <AvGroup>
                  <Label for='banner_description'><h5><b>Banner Description</b></h5></Label>
                  <CKEditor
                      data={endescription}
                      editor={ ClassicEditor }
                      onChange={ (event, editor) => { 
                        const data = editor.getData()
                        setEnBannerDescription(data)
                    } }
                  />
                </AvGroup>
              </Col>
              <Col>
                <Media>
                    <Media className='mr-25' left>
                      <Media object className='rounded mr-50' src={enimage} onChange={(e) => { setEnBannerImage(e.target.value) }} alt='Choose a Image to Upload' height='380' width='300' />
                    </Media>
                    <Media className='mt-75 ml-1 d-flex' body>
                        <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                            Upload
                            <Input type='file' onChange={onChange}
                            // onFocus={(e) => { getEnBannerImage(e.target.value) }}
                             hidden accept='image/*' 
                             />
                        </Button.Ripple>
                        <div>
                        <Avatar size="sm" color="muted"  id="TooltipExample" onMouseEnter={toggleToolTip} mouse icon={<Info size={12} />} />
                          <Tooltip placement="right" isOpen={tooltipOpen} target="TooltipExample" toggle={toggleToolTip}>
                            File size must me less then 512KB.
                          </Tooltip>
                        </div>
                    </Media>
                </Media>
              </Col>
              <Col className='mt-2' sm='12'>
                <Button.Ripple type='submit' className='mr-1' color='primary' onClick={fileuploaden}>
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
             <center><h5>Banner Content in Arabic</h5><hr/></center>
             <Row>
               <Col sm='12'>
               <AvGroup>
               <AvInput type="hidden" name='lang' onChange={(e) => {
                        LangAr(e.target.value)
                      }}  required value='ar' /> 
                 <Label for='banner_title'><h5><b>Banner Title</b></h5></Label>                    
                  <AvInput name='name' id='name' onChange={(e) => {
                          setArBannerTitle(e.target.value)
                        }}  required value={artitle} />    
                      <AvFeedback>Please enter a Banner !</AvFeedback>
                    </AvGroup>
                  </Col>
                  <Col sm='12'>
                <AvGroup/>
                 
              </Col>
              <Col sm='12'>
              <AvGroup>
                  <Label for='banner_description'><h5><b>Banner Description</b></h5></Label>
                  <CKEditor
                      data={ardescription}
                      editor={ ClassicEditor } 

                      onChange={ (event, editor) => { 
                        const data = editor.getData()
                        setEnBannerDescription(data)
                    } }
                  />
                </AvGroup>
              </Col>
              <Col className='mt-2' sm='12'>
                <Button.Ripple type='submit' className='mr-1' color='primary' onClick={fileuploadar}>
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
export default BannerTabs
