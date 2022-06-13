import React, { useState, useEffect, Fragment } from 'react'
import { FeaturesEnContent, FeaturesArContent, AddFeature } from "../../../../services/home/SchoolLandingPage"
import ErrorHandler from "../../../../common/ErrorHandler"
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { toast, Slide } from "react-toastify"
import Avatar from "@components/avatar"
import {  Coffee } from "react-feather"
import { useForm, Controller } from 'react-hook-form'
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

const FeaturesContent = () => {
  const [active, setActive] = useState('1')
  const [avatar, setAvatar] = useState('')

  const [picture1, setPicture1] = useState('')
  const [picture2, setPicture2] = useState('')
  const [picture3, setPicture3] = useState('')
  const [picture4, setPicture4] = useState('')


  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setAvatar(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  const [enfeature_description, setEnFeatureDes] = useState('')
  const [enfeature_image1, setEnFeatureimg1] = useState('')
  const [enfeature_image2, setEnFeatureimg2] = useState('')
  const [enfeature_image3, setEnFeatureimg3] = useState('')
  const [enfeature_image4, setEnFeatureimg4] = useState('')
  const [enfeature_sub_description1, setEnFeatureSubDes1] = useState('')
  const [enfeature_sub_description2, setEnFeatureSubDes2] = useState('')
  const [enfeature_sub_description3, setEnFeatureSubDes3] = useState('')
  const [enfeature_sub_description4, setEnFeatureSubDes4] = useState('')
  const [enfeature_sub_title1, setEnFeatureSubTitle1] = useState('')
  const [enfeature_sub_title2, setEnFeatureSubTitle2] = useState('')
  const [enfeature_sub_title3, setEnFeatureSubTitle3] = useState('')
  const [enfeature_sub_title4, setEnFeatureSubTitle4] = useState('')
  const [enfeature_title, setEnFeatureTitle] = useState('')

  const [arfeature_description, setArFeatureDes] = useState('')
  const [arfeature_description1, setArFeatureDes1] = useState('')
  const [arfeature_description2, setArFeatureDes2] = useState('')
  const [arfeature_description3, setArFeatureDes3] = useState('')
  const [arfeature_description4, setArFeatureDes4] = useState('')
  const [arfeature_image1, setArFeatureimg1] = useState('')
  const [arfeature_image2, setArFeatureimg2] = useState('')
  const [arfeature_image3, setArFeatureimg3] = useState('')
  const [arfeature_image4, setArFeatureimg4] = useState('')
  const [arfeature_sub_description1, setArFeatureSubDes1] = useState('')
  const [arfeature_sub_description2, setArFeatureSubDes2] = useState('')
  const [arfeature_sub_description3, setArFeatureSubDes3] = useState('')
  const [arfeature_sub_description4, setArFeatureSubDes4] = useState('')
  const [arfeature_sub_title1, setArFeatureSubTitle1] = useState('')
  const [arfeature_sub_title2, setArFeatureSubTitle2] = useState('')
  const [arfeature_sub_title3, setArFeatureSubTitle3] = useState('')
  const [arfeature_sub_title4, setArFeatureSubTitle4] = useState('')
  const [arfeature_title, setArFeatureTitle] = useState('')
  
  const school_id = parseInt(localStorage.getItem("schoolIdToken"))
  const onChange1 = e => {
    const reader = new FileReader(),
      files1 = e.target.files[0]
    reader.onload = function () {
      setEnFeatureimg1(reader.result)
    }
    reader.readAsDataURL(files1)
    setPicture1(files1)
    console.log(files1)
  }
  const onChange2 = e => {
    const reader = new FileReader(),
      files2 = e.target.files[0]
    reader.onload = function () {
      setEnFeatureimg2(reader.result)
    }
    reader.readAsDataURL(files2)
    setPicture2(files2)
    console.log(files2)
  }
  const onChange3 = e => {
    const reader = new FileReader(),
      files3 = e.target.files[0]
    reader.onload = function () {
      setEnFeatureimg3(reader.result)
    }
    reader.readAsDataURL(files3)
    setPicture3(files3)
    console.log(files3)
  }
  const onChange4 = e => {
    const reader = new FileReader(),
      files4 = e.target.files[0]
    reader.onload = function () {
      setEnFeatureimg4(reader.result)
    }
    reader.readAsDataURL(files4)
    setPicture4(files4)
    console.log(files4)
  }

  const getFeatures = async () => { }

  useEffect(() => {
    getFeatures()
  }, [])

  const toggle = tab => {
    setActive(tab)
  }

  const featureen = async () => { }
  const featurear = async () => { }

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
              <center><h5>Our Feature In English<hr/></h5></center>
              <Row>
                <Col sm='12'>
                <AvGroup>
                    <Label for='feature_title'><h5><b>Title</b></h5></Label>
                    <AvInput name='title' id='title' onChange={(e) => {
                            setEnFeatureTitle(e.target.value)
                          }}  required value={enfeature_title} />    
                      <AvFeedback>Please enter a Title !</AvFeedback>
                </AvGroup>
                </Col>
                <Col sm='12'>
                  <AvGroup>
                    <Label for='feature_description'><h5><b> Description</b></h5></Label>
                    <CKEditor
                            data={enfeature_description}
                            editor={ ClassicEditor }
                            onChange={ (event, editor) => { 
                              const data = editor.getData()
                              setEnFeatureDes(data)
                            } } 
                        />
                  </AvGroup>
                </Col>
                <Col sm='4'>
                  <AvGroup>
                    <Label for='feature_title1'><h5><b>Title</b></h5></Label>
                    <AvInput name='title' id='title' onChange={(e) => {
                            setEnFeatureSubTitle1(e.target.value)
                          }}  required value={enfeature_sub_title1} /> 
                  </AvGroup>
                </Col>
                <Col sm='4'>
                  <AvGroup>
                    <Label for='description_title1'><h5><b>Description</b></h5></Label>
                    <AvInput name='title' id='title' onChange={(e) => {
                            setEnFeatureSubDes1(e.target.value)
                          }}  required value={enfeature_sub_description1} /> 
                  </AvGroup>
                </Col>
                <Col sm='4'>
                <Media>
                      <Media className='mr-25' left>
                          <Media object className='rounded mr-50' src={enfeature_image1} alt='Generic placeholder image' height='80' width='80' />
                      </Media>
                      <Media className='mt-75 ml-1' body>
                          <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                              Upload
                              <Input type='file' onChange={onChange1} hidden accept='image/*' />
                          </Button.Ripple>
                      </Media>
                  </Media>
                </Col>
                <Col sm='4'>
                  <AvGroup>
                    <Label for='feature_title2'><h5><b>Title</b></h5></Label>
                    <AvInput name='title' id='title' onChange={(e) => {
                            setEnFeatureSubTitle2(e.target.value)
                          }}  required value={enfeature_sub_title2} /> 
                  </AvGroup>
                </Col>
                <Col sm='4'>
                  <AvGroup>
                    <Label for='description_title2'><h5><b>Description</b></h5></Label>
                    <AvInput name='title' id='title' onChange={(e) => {
                            setEnFeatureSubDes2(e.target.value)
                          }}  required value={enfeature_sub_description2} /> 
                  </AvGroup>
                </Col>
                <Col sm='4'>
                <Media>
                      <Media className='mr-25' left>
                          <Media object className='rounded mr-50' src={enfeature_image2} alt='Generic placeholder image' height='80' width='80' />
                      </Media>
                      <Media className='mt-75 ml-1' body>
                          <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                              Upload
                              <Input type='file' onChange={onChange2} hidden accept='image/*' />
                          </Button.Ripple>
                      </Media>
                  </Media>
                </Col>
                <Col sm='4'>
                  <AvGroup>
                    <Label for='feature_title3'><h5><b>Title</b></h5></Label>
                    <AvInput name='title' id='title' onChange={(e) => {
                            setEnFeatureSubTitle3(e.target.value)
                          }}  required value={enfeature_sub_title3} /> 
                  </AvGroup>
                </Col>
                <Col sm='4'>
                  <AvGroup>
                    <Label for='description_title3'><h5><b>Description</b></h5></Label>
                    <AvInput name='title' id='title' onChange={(e) => {
                            setEnFeatureSubDes3(e.target.value)
                          }}  required value={enfeature_sub_description3} /> 
                  </AvGroup>
                </Col>
                <Col sm='4'>
                <Media>
                      <Media className='mr-25' left>
                          <Media object className='rounded mr-50' src={enfeature_image3} alt='Generic placeholder image' height='80' width='80' />
                      </Media>
                      <Media className='mt-75 ml-1' body>
                          <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                              Upload
                              <Input type='file' onChange={onChange3} hidden accept='image/*' />
                          </Button.Ripple>
                      </Media>
                  </Media>
                </Col>
                <Col sm='4'>
                  <AvGroup>
                    <Label for='feature_title4'><h5><b>Title</b></h5></Label>
                    <AvInput name='title' id='title' onChange={(e) => {
                            setEnFeatureSubTitle4(e.target.value)
                          }}  required value={enfeature_sub_title4} /> 
                  </AvGroup>
                </Col>
                <Col sm='4'>
                  <AvGroup>
                    <Label for='description_title4'><h5><b>Description</b></h5></Label>
                    <AvInput name='title' id='title' onChange={(e) => {
                            setEnFeatureSubDes4(e.target.value)
                          }}  required value={enfeature_sub_description4} /> 
                  </AvGroup>
                </Col>
                <Col sm='4'>
                <Media>
                      <Media className='mr-25' left>
                          <Media object className='rounded mr-50' src={enfeature_image4} alt='Generic placeholder image' height='80' width='80' />
                      </Media>
                      <Media className='mt-75 ml-1' body>
                          <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                              Upload
                              <Input type='file' onChange={onChange4} hidden accept='image/*' />
                          </Button.Ripple>
                      </Media>
                  </Media>
                </Col>
                <Col className='mt-2' sm='12'>
                  <Button.Ripple type='submit' className='mr-1' color='primary' onClick={featureen}>
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
              <center><h5>Our Feature In Arabic<hr/></h5></center>
              <Row>
                <Col sm='12'>
                  <AvGroup>
                    <Label for='feature_title'><h5><b>Title</b></h5></Label>
                    <AvInput name='title' id='title' onChange={(e) => {
                            setArFeatureTitle(e.target.value)
                          }}  required value={arfeature_title === '' ? arfeature_title : "null"} /> 
                  </AvGroup>
                </Col>
                <Col sm='12'>
                  <AvGroup>
                    <Label for='feature_description'><h5><b> Description</b></h5></Label>
                    <AvInput name='title' id='title' onChange={(e) => {
                            setArFeatureDes(e.target.value)
                          }}  required value={arfeature_description === '' ? arfeature_description : "null"} /> 
                  </AvGroup>
                </Col>
                <Col sm='4'>
                  <AvGroup>
                    <Label for='feature_title1'><h5><b>Title</b></h5></Label>
                    <AvInput name='title' id='title' onChange={(e) => {
                            setArFeatureSubTitle1(e.target.value)
                          }}  required value={arfeature_sub_title1 === '' ? arfeature_sub_title1 : "null"} /> 
                  </AvGroup>
                </Col>
                <Col sm='4'>
                  <AvGroup>
                    <Label for='description_title1'><h5><b>Description</b></h5></Label>
                    <AvInput name='title' id='title' onChange={(e) => {
                            setArFeatureSubDes1(e.target.value)
                          }}  required value={arfeature_sub_description1 === '' ? arfeature_sub_description1 : "null"} /> 
                  </AvGroup>
                </Col>
                <Col sm='4'>
                <Media>
                      <Media className='mr-25' left>
                          <Media object className='rounded mr-50' src={arfeature_image1} alt='Generic placeholder image' height='80' width='80' />
                      </Media>
                      <Media className='mt-75 ml-1' body>
                          <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                              Upload
                              <Input type='file' onChange={onChange1} hidden accept='image/*' />
                          </Button.Ripple>
                      </Media>
                  </Media>
                </Col>
                <Col sm='4'>
                  <AvGroup>
                    <Label for='feature_title2'><h5><b>Title</b></h5></Label>
                    <AvInput name='title' id='title' onChange={(e) => {
                            setArFeatureSubTitle2(e.target.value)
                          }}  required value={arfeature_sub_title2 === '' ? arfeature_sub_title2 : "null"} /> 
                  </AvGroup>
                </Col>
                <Col sm='4'>
                  <AvGroup>
                    <Label for='description_title2'><h5><b>Description</b></h5></Label>
                    <AvInput name='title' id='title' onChange={(e) => {
                            setArFeatureSubDes2(e.target.value)
                          }}  required value={arfeature_sub_description2 === '' ? arfeature_sub_description2 : "null"} /> 
                  </AvGroup>
                </Col>
                <Col sm='4'>
                <Media>
                      <Media className='mr-25' left>
                          <Media object className='rounded mr-50' src={arfeature_image2} alt='Generic placeholder image' height='80' width='80' />
                      </Media>
                      <Media className='mt-75 ml-1' body>
                          <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                              Upload
                              <Input type='file' onChange={onChange2} hidden accept='image/*' />
                          </Button.Ripple>
                      </Media>
                  </Media>
                </Col>
                <Col sm='4'>
                  <AvGroup>
                    <Label for='feature_title3'><h5><b>Title</b></h5></Label>
                    <AvInput name='title' id='title' onChange={(e) => {
                            setArFeatureSubTitle3(e.target.value)
                          }}  required value={arfeature_sub_title3 === '' ? arfeature_sub_title3 : "null"} /> 
                  </AvGroup>
                </Col>
                <Col sm='4'>
                  <AvGroup>
                    <Label for='description_title3'><h5><b>Description</b></h5></Label>
                    <AvInput name='title' id='title' onChange={(e) => {
                            setArFeatureSubDes3(e.target.value)
                          }}  required value={arfeature_sub_description3 === '' ? arfeature_sub_description3 : "null"} /> 
                  </AvGroup>
                </Col>
                <Col sm='4'>
                <Media>
                      <Media className='mr-25' left>
                          <Media object className='rounded mr-50' src={arfeature_image3} alt='Generic placeholder image' height='80' width='80' />
                      </Media>
                      <Media className='mt-75 ml-1' body>
                          <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                              Upload
                              <Input type='file' onChange={onChange3} hidden accept='image/*' />
                          </Button.Ripple>
                      </Media>
                  </Media>
                </Col>
                <Col sm='4'>
                  <AvGroup>
                    <Label for='feature_title4'><h5><b>Title</b></h5></Label>
                    <AvInput name='title' id='title' onChange={(e) => {
                            setArFeatureSubTitle4(e.target.value)
                          }}  required value={arfeature_sub_title4 === '' ? arfeature_sub_title4 : "null"} /> 
                  </AvGroup>
                </Col>
                <Col sm='4'>
                  <AvGroup>
                    <Label for='description_title4'><h5><b>Description</b></h5></Label>
                    <AvInput name='title' id='title' onChange={(e) => {
                            setArFeatureSubDes4(e.target.value)
                          }}  required value={arfeature_sub_description4 === '' ? arfeature_sub_description4 : "null"} /> 
                  </AvGroup>
                </Col>
                <Col sm='4'> 
                <Media>
                      <Media className='mr-25' left>
                          <Media object className='rounded mr-50' src={arfeature_image4} alt='Generic placeholder image' height='80' width='80' />
                      </Media>
                      <Media className='mt-75 ml-1' body>
                          <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                              Upload
                              <Input type='file' onChange={onChange4} hidden accept='image/*' />
                          </Button.Ripple>
                      </Media>
                  </Media>
                </Col>
                <Col className='mt-2' sm='12'>
                  <Button.Ripple type='submit' className='mr-1' color='primary' onClick={featurear}>
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
export default FeaturesContent