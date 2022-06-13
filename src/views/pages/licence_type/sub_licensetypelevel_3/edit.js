import { useState, useEffect, Fragment } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Label, Button, Media, Input, Row, Col } from 'reactstrap'
import {
  AvForm,
  AvGroup,
  AvInput,
  AvField,
  AvFeedback
} from 'availity-reactstrap-validation-safe'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { UpdateSublicensetypes3, LicenseTypeget, getSubLicenceType3Id } from "../../../../services/home/LicensePage"
import {  SubLicenseType, SubLicenseType1, SubLicenseType2 } from "../../../../services/home/admin"
import { toast, Slide } from "react-toastify"
import {  Coffee } from "react-feather"
import Avatar from "@components/avatar"
import ErrorHandler from "../../../../common/ErrorHandler"
import { useParams, useHistory } from 'react-router-dom'

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


const edit = () => {
  
  const history = useHistory()
    const [avatar, setAvatar] = useState([])
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [parent_id, setLicenseType] = useState('') 
    const [license_type_id, setSubLicenseType] = useState('')
    const [sublicense_level_1_id, setSubLicenseType1] = useState('')
    const [sublicense_level_2_id, setSubLicenseType2] = useState('')
    const paramsFromRoute = useParams()

    const [licensetypelist, LicenseTypeList] = useState([])
    const [sublicensetypelist, SubLicenseTypeList] = useState([])
    const [SubLicenseType1List, setSubLicenseType1List] = useState([])
    const [SubLicenseType2List, setSubLicenseType2List] = useState([])
    const [picture, setPicture] = useState('')
    const [description, setDescription] = useState('')


  const school_id = parseInt(localStorage.getItem("schoolIdToken"))

    const onChange = e => {
      const reader = new FileReader(),
        files = e.target.files[0]
      reader.onload = function () {
        setImage(reader.result)
      }
      reader.readAsDataURL(files)
      setPicture(files)
    }

    const getLicenceType = async () => {
        try {
          const response = await LicenseTypeget(school_id)
          if (response) {
            if (response.data) {
              const { data: { result } } = response.data
              if (result && result.length && result.length > 0) {
                LicenseTypeList(result)
              }
            }
          }
        } catch (e) {
          //ErrorHandler(e)
        }
      }

      const getSubLicenseType = async (id) => {
        try {
          const response = await SubLicenseType(id, school_id)
          if (response) {
            if (response.data) {
              const { data: { result: { sub_license_list } } } = response.data
              if (sub_license_list && sub_license_list.length && sub_license_list.length > 0) {
                SubLicenseTypeList(sub_license_list)
              }
            }
          }
        } catch (e) {
          //ErrorHandler(e)
        }
      }

      const getSubLicenseType1 = async (id) => {
        try {
          const response = await SubLicenseType1(id, school_id)
          if (response) {
            if (response.data) {
              const { data: { result: { sub_license_lv1 } } } = response.data
              if (sub_license_lv1 && sub_license_lv1.length && sub_license_lv1.length > 0) {
                setSubLicenseType1List(sub_license_lv1)
              }
            }
          }
        } catch (e) {
          //ErrorHandler(e)
        }
      }

      const getSubLicenseType2 = async (id) => {
        try {
          const response = await SubLicenseType2(id, school_id)
          if (response) {
            if (response.data) {
              const { data: { result: { sub_license_lv2 } } } = response.data
              if (sub_license_lv2 && sub_license_lv2.length && sub_license_lv2.length > 0) {
                setSubLicenseType2List(sub_license_lv2)
              }
            }
          }
        } catch (e) {
          //ErrorHandler(e)
        }
      }
  
    const updateSubLicenseType3 = async () => {
      const formData = new FormData()
      formData.append('image', picture)
      formData.append('name', name)
      formData.append('parent_id', parent_id)
      formData.append('license_type_id', license_type_id)
      formData.append('sublicense_level_1_id', sublicense_level_1_id)
      formData.append('sublicense_level_2_id', sublicense_level_2_id)
      formData.append('schools_id', school_id)
      formData.append('description', description)
        // const request = {
        //     name, image, license_type_id, sublicense_level_1_id, sublicense_level_2_id, parent_id
        //     }
        //     console.log(request)
            try {
                const response = await UpdateSublicensetypes3(paramsFromRoute.id && paramsFromRoute.id, formData)
                if (response) {
                if (response.data) {
                    const { data: { message } } = response.data
                    toast.success(<SuccessContent msg={message} />, {
                    transition: Slide,
                    hideProgressBar: true,
                    autoClose: 2000
                    })
                    history.push('/pages/sub_license_type_level3/list')
                }
                }
            } catch (e) {
                console.log(e)
                //ErrorHandler(e)
            }
        }

    const getSubLicenceType3ByID = async (id) => {
    try {
        const response = await getSubLicenceType3Id(id)
        if (response.data) {
            const { data: { result } } = response.data
        
            if (result) {
                const { name, parent_id, license_type_id, image, sublicense_level_1_id, sublicense_level_2_id, description} = result
                setName(name)
                setLicenseType(parent_id)
                setImage(image) 
                setSubLicenseType(license_type_id)
                setSubLicenseType1(sublicense_level_1_id)
                setSubLicenseType2(sublicense_level_2_id)
                setDescription(description)                
            }
        }
    } catch (e) {
        //ErrorHandler(e)
    }
    }
    useEffect(() => {
    getLicenceType()
    getSubLicenceType3ByID(paramsFromRoute.id)
        }, [paramsFromRoute.id])
        useEffect(() => {
          getLicenceType()
          // getSubLicenseType1(paramsFromRoute.id)
          getSubLicenseType(parent_id)
              }, [parent_id])

        useEffect(() => {
               
                getSubLicenseType1(license_type_id)
                    }, [license_type_id])
       useEffect(() => {
                     
                      getSubLicenseType2(sublicense_level_1_id)
                          }, [sublicense_level_1_id])
    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Edit Sub License Types level 3</CardTitle>
            </CardHeader>
            <CardBody>
                <AvForm>
                    <Row>
                        <Col sm='6'>
                        <AvGroup>
                            <Label for='name'>Name</Label>
                            <AvInput name='name' id='name' onChange={(e) => {
                                setName(e.target.value)
                            }} required value={name} />
                            <AvFeedback>Please enter a valid name!</AvFeedback>
                        </AvGroup>
                        </Col>
                        <Col sm='6'>
                            <AvGroup>
                                <Label for='license_type'>License Type</Label> 
                                <AvField type='select' name='license_type' id='license_type' onChange={(e) => {
                                setLicenseType(e.target.value)
                                getSubLicenseType(e.target.value)
                                }} value={parseInt(parent_id)} required>
                                <option value={''}>Select License Type</option>
                                {
                                    licensetypelist ? licensetypelist.map((ele) => (
                                    <option value={ele.id}>{ele.name}</option>
                                    )) : null
                                }
                                </AvField>
                                <AvFeedback>Please select a License Type</AvFeedback>
                            </AvGroup>
                        </Col>
                        <Col sm='6'>
                            <AvGroup>
                                <Label for='description'>Description</Label> 
                                <AvField type='textarea' name='description' value={description} id='description' onChange={(e) => { 
                                setDescription(e.target.value)
                                }} required>
                                </AvField>
                                <AvFeedback>Please enter Description</AvFeedback>
                            </AvGroup>
                        </Col>
                        <Col sm='6'>
                            <AvGroup>
                                <Media>
                                    <Media className='mr-25' left>
                                        <Media 
                                            object className='rounded mr-50' 
                                            src={image} 
                                            alt='upload image' 
                                            height='200' 
                                            width='200' 
                                             />
                                    </Media>
                                    <Media className='mt-75 ml-1' body>
                                        <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                                            Upload
                                            <Input type='file' onChange={onChange} hidden accept='image/*' />
                                        </Button.Ripple>
                                    </Media>
                                </Media>
                            </AvGroup>
                        </Col>
                        <Col sm='6'>
                            <AvGroup>
                                <Label for='sub_license_type'>Sub License Type</Label> 
                                <AvField type='select' name='sub_license_type' id='sub_license_type' onChange={(e) => {
                                setSubLicenseType(e.target.value)
                                getSubLicenseType1(e.target.value)
                                }} value={parseInt(license_type_id)} required>
                                <option value={''}>Select Sub License Type</option>
                                {
                                    sublicensetypelist ? sublicensetypelist.map((ele) => (
                                    <option value={ele.id}>{ele.name}</option>
                                    )) : null
                                }
                                </AvField>
                                <AvFeedback>Please select a Sub License Type</AvFeedback>
                            </AvGroup>
                        </Col>
                        {/* <Col sm='6'>
                  
                        </Col> */}
                        <Col sm='6'>
                            <AvGroup>
                                <Label for='sub_license_type'>Sub License Types level 1</Label> 
                                <AvField type='select' name='sub_license_type' id='sub_license_type' value={parseInt(sublicense_level_1_id)}
                                 onChange={(e) => {
                                setSubLicenseType1(e.target.value)
                                getSubLicenseType2(e.target.value)
                                }}  required>
                                <option value={''}>Select Sub License Types level 1</option>
                                {
                                    SubLicenseType1List ? SubLicenseType1List.map((ele) => (
                                    <option value={ele.id}>{ele.name}</option>
                                    )) : null
                                    
                                }
                                {/* (getSubLicenseType2(ele.id)) */}
                                </AvField>
                                <AvFeedback>Please select a Sub License Types level 1</AvFeedback>
                            </AvGroup>
                        </Col>
                        <Col sm='6'>
                  
                        </Col>
                        <Col sm='6'>
                            <AvGroup>
                                <Label for='sub_license_type'>Sub License Types level 2</Label> 
                                <AvField type='select' name='sub_license_type' id='sub_license_type' onChange={(e) => {
                                setSubLicenseType2(e.target.value)
                                }} required value={parseInt(sublicense_level_2_id)}>
                                <option value={''}>Select Sub License Types level 2</option>
                                {
                                    SubLicenseType2List ? SubLicenseType2List.map((ele) => (
                                    <option value={ele.id}>{ele.name}</option>
                                    )) : null
                                }
                                </AvField>
                                <AvFeedback>Please select a Sub License Types level 2</AvFeedback>
                            </AvGroup>
                        </Col>
                        <Col sm='4'>

                        </Col>
                        <Col sm='4'>
                            <Button color='primary' type='submit' onClick={updateSubLicenseType3} >
                                Submit
                            </Button>
                        </Col>
                        <Col sm='4'>
                            
                        </Col>
                    </Row>
                </AvForm>
            </CardBody>
        </Card>
    )
}

export default edit
