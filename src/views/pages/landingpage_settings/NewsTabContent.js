import React, { useState, useEffect, Fragment } from 'react'
import { NewsEnContent, NewsArContent, Addnews } from "../../../services/home/AdminLandingPage"
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

const NewsTabContent = () => {
  const [active, setActive] = useState('1')
  const [avatar, setAvatar] = useState()

  const [ennews_title, setEnNewsTitle] = useState('')
  const [ennews_title1, setEnNewsTitle1] = useState('')
  const [ennews_title2, setEnNewsTitle2] = useState('')
  const [ennews_description, setEnNewsDescription] = useState('')
  const [ennews_description1, setEnNewsDescription1] = useState('')
  const [ennews_description2, setEnNewsDescription2] = useState('')
  const [ennews_image1, setEnNewsImage1] = useState('')
  const [ennews_image2, setEnNewsImage2] = useState('')

  const [arnews_title, setArNewsTitle] = useState('')
  const [arnews_title1, setArNewsTitle1] = useState('')
  const [arnews_title2, setArNewsTitle2] = useState('')
  const [arnews_description, setArNewsDescription] = useState('')
  const [arnews_description1, setArNewsDescription1] = useState('')
  const [arnews_description2, setArNewsDescription2] = useState('')
  const [arnews_image1, setArNewsImage1] = useState('')
  const [arnews_image2, setArNewsImage2] = useState('')

  const [picture1, setPicture1] = useState('')
  const [picture2, setPicture2] = useState('')
  
  const onChange1 = e => {
    const reader = new FileReader(),
      files1 = e.target.files[0]
    reader.onload = function () {
      setEnNewsImage1(reader.result)
    }
    reader.readAsDataURL(files1)
    setPicture1(files1)
  }
  const onChange2 = e => {
    const reader = new FileReader(),
      files2 = e.target.files[0]
    reader.onload = function () {
      setEnNewsImage2(reader.result)
    }
    reader.readAsDataURL(files2)
    setPicture2(files2)
  }

  const getNewsContent = async () => {
    try {
      const enresponse = await NewsEnContent()
      if (enresponse) {
        if (enresponse.data) {
          console.log(enresponse)
          // try {
          const { data: { result: { en } } }  = enresponse.data
          if (en) {
            const { news_title, 
                    content_title1, 
                    content_title2, 
                    news_description, 
                    content_description1, 
                    content_description2, 
                    content_image1,
                    content_image2 
                  } = en
                    setEnNewsTitle(news_title)
                    setEnNewsTitle1(content_title1)
                    setEnNewsTitle2(content_title2)
                    setEnNewsDescription(news_description)            
                    setEnNewsDescription1(content_description1)            
                    setEnNewsDescription2(content_description2)
                    setEnNewsImage1(content_image1)
                    setEnNewsImage2(content_image2)
          }
        // } catch (e) {
        //   ErrorHandler(e)
        // }
        }
      }
      const arresponse = await NewsArContent()
      if (arresponse) {
        if (arresponse.data) {
          // try {
          console.log(arresponse)
          const { data: { result: { ar } } }  = arresponse.data
          if (ar) {
            const { news_title, 
                    content_title1, 
                    content_title2, 
                    news_description, 
                    content_description1, 
                    content_description2, 
                    content_image1,
                    content_image2 
                  } = ar
                    setArNewsTitle(news_title)
                    setArNewsTitle1(content_title1)
                    setArNewsTitle2(content_title2)
                    setArNewsDescription(news_description)            
                    setArNewsDescription1(content_description1)            
                    setArNewsDescription2(content_description2)
                    setArNewsImage1(content_image1)
                    setArNewsImage2(content_image2)
          }
        // } catch (e) {
        //   ErrorHandler(e)
        // }
        }
      }

    } catch (e) {
     ErrorHandler(e)
     console.log(e)
    }
  }

  useEffect(() => {
    getNewsContent()
  }, [])

  const toggle = tab => {
    setActive(tab)
  }
  const newsen = async () => {
    const formData = new FormData()
    formData.append('lang', 'en')
    formData.append('news_title', ennews_title)
    formData.append('news_description', ennews_description)
    formData.append('content_title1', ennews_title1)
    formData.append('content_title2', ennews_title2)
    formData.append('content_description1', ennews_description1)
    formData.append('content_description2', ennews_description2)
    formData.append('content_image1', picture1)
    formData.append('content_image2', picture2)
  
    // const lang = 'en'
    // const news_title = ennews_title
    // const content_title1 = ennews_title1
    // const content_title2 =  ennews_title2
    // const news_description =  ennews_description
    // const content_description1 =  ennews_description1
    // const content_description2 = ennews_description2
    // const content_image1 = ennews_image1
    // const content_image2 = ennews_image2      
    // const request = {
    //   lang,
    //   news_title, 
    //   content_title1, 
    //   content_title2, 
    //   news_description, 
    //   content_description1, 
    //   content_description2, 
    //   content_image1,
    //   content_image2
    // }
     console.log(formData)
    try {
      const response = await Addnews(formData)
      // const response = await Addnews(request)
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
   const newsar = async () => {
    const formData = new FormData()
    formData.append('lang', 'ar')
    formData.append('news_title', arnews_title)
    formData.append('news_description', arnews_description)
    formData.append('content_title1', arnews_title1)
    formData.append('content_title2', arnews_title2)
    formData.append('content_description1', arnews_description1)
    formData.append('content_description2', arnews_description2)
    formData.append('content_image1', picture1)
    formData.append('content_image2', picture2)
  
    // const lang = 'en'
    // const news_title = arnews_title
    // const content_title1 = arnews_title1
    // const content_title2 =  arnews_title2
    // const news_description =  arnews_description
    // const content_description1 =  arnews_description1
    // const content_description2 = arnews_description2
    // const content_image1 = picture1
    // const content_image2 = picture2

    // const request = {
    //   lang,
    //   news_title, 
    //   content_title1, 
    //   content_title2, 
    //   news_description, 
    //   content_description1, 
    //   content_description2, 
    //   content_image1,
    //   content_image2
    // }
     console.log(formData)
    try {
      const response = await Addnews(formData)
      // const response = await Addnews(request)
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
            <h5><center>News In English<hr/></center></h5>
          <Row>
            <Col sm='12'>
              <AvGroup>
                <Label for='feature_title'><h5><b>Title</b></h5></Label>
                <AvInput name='title' id='title' onChange={(e) => {
                        setEnNewsTitle(e.target.value)
                      }}  required value={ennews_title} />    
                  <AvFeedback>Please enter a Title !</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='12'>
              <AvGroup>
                <Label for='feature_description'><h5><b> Description </b></h5></Label>
                <CKEditor
                    data={ennews_description}
                    editor={ ClassicEditor }
                     
                    onChange={ (event, editor) => { 
                      const data = editor.getData()
                      setEnNewsDescription(data)
                  } }
                />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='feature_title'><h5><b>Title 1</b></h5></Label>
                <AvInput name='title' id='title' onChange={(e) => {
                        setEnNewsTitle1(e.target.value)
                      }}  required value={ennews_title1} />    
                  <AvFeedback>Please enter a Title !</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='feature_title'><h5><b>Title 2</b></h5></Label>                   
                <AvInput name='title' id='title' onChange={(e) => {
                        setEnNewsTitle2(e.target.value)
                      }}  required value={ennews_title2} />    
                  <AvFeedback>Please enter a Title !</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='feature_description'><h5><b> Description 1</b></h5></Label>
                <CKEditor
                    data={ennews_description1}
                    editor={ ClassicEditor }
                     
                    onChange={ (event, editor) => { 
                      const data = editor.getData()
                      setEnNewsDescription1(data)
                  } }
                />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='feature_description'><h5><b> Description 2</b></h5></Label>
                <CKEditor
                    data={ennews_description2}
                    editor={ ClassicEditor }
                     
                    onChange={ (event, editor) => { 
                      const data = editor.getData()
                      setEnNewsDescription2(data)
                  } }
                />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='content1'><h5><b>Content 1</b></h5></Label>
                  <Media>
                      <Media className='mr-25' left>
                          <Media object className='rounded mr-50' src={ennews_image1} alt='Generic placeholder image' height='80' width='80' />
                      </Media>
                      <Media className='mt-75 ml-1' body>
                          <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                              Upload
                              <Input type='file' onChange={onChange1} hidden accept='image/*' />
                          </Button.Ripple>
                      </Media>
                  </Media>
              </AvGroup>
            </Col>   
            <Col sm='6'>
              <AvGroup>
                <Label for='content1'><h5><b>Content 2</b></h5></Label>
                  <Media>
                      <Media className='mr-25' left>
                          <Media object className='rounded mr-50' src={ennews_image2} alt='Generic placeholder image' height='80' width='80' />
                      </Media>
                      <Media className='mt-75 ml-1' body>
                          <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                              Upload
                              <Input type='file' onChange={onChange2} hidden accept='image/*' />
                          </Button.Ripple>
                      </Media>
                  </Media>
              </AvGroup>
            </Col>   
            <Col className='mt-2' sm='12'>
              <Button.Ripple type='submit' className='mr-1' color='primary' onClick={newsen}>
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
            <h5><center>News In Arabic<hr/></center></h5>
          <Row>
          <Col sm='12'>
              <AvGroup>
                <Label for='feature_title'><h5><b>Title</b></h5></Label>
                <AvInput name='title' id='title' onChange={(e) => {
                        setArNewsTitle(e.target.value)
                      }}  required value={arnews_title} />    
                  <AvFeedback>Please enter a Title !</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='12'>
              <AvGroup>
                <Label for='feature_description'><h5><b> Description 1</b></h5></Label>
                <CKEditor
                    data={arnews_description}
                    editor={ ClassicEditor }
                     
                    onChange={ (event, editor) => { 
                      const data = editor.getData()
                      setArNewsDescription(data)
                  } }
                />
              </AvGroup>
            </Col>
          <Col sm='6'>
              <AvGroup>
                <Label for='feature_title'><h5><b>Title 1</b></h5></Label>
                <AvInput name='title' id='title' onChange={(e) => {
                        setArNewsTitle1(e.target.value)
                      }}  required value={arnews_title1} />    
                  <AvFeedback>Please enter a Title !</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='feature_title'><h5><b>Title 2</b></h5></Label>
                <AvInput name='title' id='title' onChange={(e) => {
                        setArNewsTitle2(e.target.value)
                      }}  required value={arnews_title2} />    
                  <AvFeedback>Please enter a Title !</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='feature_description'><h5><b> Description</b></h5></Label>
                <CKEditor
                    data={arnews_description1}
                    editor={ ClassicEditor }
                     
                    onChange={ (event, editor) => { 
                      const data = editor.getData()
                      setArNewsDescription1(data)
                  } }
                />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='feature_description'><h5><b> Description</b></h5></Label>
                <CKEditor
                    data={arnews_description2}
                    editor={ ClassicEditor }
                     
                    onChange={ (event, editor) => { 
                      const data = editor.getData()
                      setArNewsDescription2(data)
                  } }
                />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='content1'><h5><b>Content 1</b></h5></Label>
                  <Media>
                      <Media className='mr-25' left>
                          <Media object className='rounded mr-50' src={arnews_image1} alt='Generic placeholder image' height='80' width='80' />
                      </Media>
                      <Media className='mt-75 ml-1' body>
                          <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                              Upload
                              <Input type='file' onChange={onChange1} hidden accept='image/*' />
                          </Button.Ripple>
                      </Media>
                  </Media>
              </AvGroup>
            </Col>   
            <Col sm='6'>
              <AvGroup>
                <Label for='content1'><h5><b>Content 2</b></h5></Label>
                  <Media>
                      <Media className='mr-25' left>
                          <Media object className='rounded mr-50' src={arnews_image2} alt='Generic placeholder image' height='80' width='80' />
                      </Media>
                      <Media className='mt-75 ml-1' body>
                          <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                              Upload
                              <Input type='file' onChange={onChange2} hidden accept='image/*' />
                          </Button.Ripple>
                      </Media>
                  </Media>
              </AvGroup>
            </Col>  
            <Col className='mt-2' sm='12'>
              <Button.Ripple type='submit' className='mr-1' color='primary' onClick={newsar}>
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
export default NewsTabContent