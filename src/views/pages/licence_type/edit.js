import { useState, useEffect, Fragment } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Label, Button, Media, Input, Row, Col } from 'reactstrap'
import { AvForm, AvGroup, AvInput, AvField, AvFeedback } from 'availity-reactstrap-validation-safe'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { UpdateLicenceTypes, Schools, getLicenceTypeId } from "../../../services/home/LicensePage"
import { toast, Slide } from "react-toastify"
import {  Coffee } from "react-feather"
import Avatar from "@components/avatar"
import { useParams, useHistory } from 'react-router-dom'
import ErrorHandler from '../../../common/ErrorHandler'
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

const create = () => {
  
  const history = useHistory()
    const [avatar, setAvatar] = useState([])
    const [name, setName] = useState('')
    const [name_arabic, setNameArabic] = useState('')
    const [gender, setGender] = useState('')
    const [image, setImage] = useState('')
    const [schools_id, setSchool] = useState('')
    const paramsFromRoute = useParams()
    console.log(paramsFromRoute)

    const [schoollist, SetSchoolList] = useState([])
    const [picture, setPicture] = useState('')
    const [encodeImage, setEncodeImage] = useState('')
    const [description, setDescription] = useState('')
    const [registration_status, setRegistration_status] = useState('')

    const school_id = parseInt(localStorage.getItem("schoolIdToken"))

    const onChange = e => {
      const reader = new FileReader(),
        files = e.target.files[0]
      reader.onload = function () {
        setImage(reader.result)
      }
      reader.readAsDataURL(files) 
       setPicture(files)
      console.log(files)
    }
//school list dropdown removed no need to this api method///
    // const getSchoollist = async () => {
    //     try {
    //       const response = await Schools()
    //       if (response) {
    //         if (response.data) {
    //           const { data: { result: { data } } } = response.data
    //           if (data && data.length && data.length > 0) {
    //             SetSchoolList(data)
    //           }
    //         }
    //       }
    //     } catch (e) {
    //       ErrorHandler(e)
    //     }
    //   }
  
    const UpdateLicenseType = async () => { 
      const formData = new FormData()
      formData.append('name', name)
      formData.append('name_arabic', name_arabic)
      formData.append('gender', gender)
      formData.append('image', picture)
      formData.append('description', description)
      formData.append('registration_status', registration_status)
      formData.append('schools_id', school_id)
      formData.append('id', paramsFromRoute.id && paramsFromRoute.id)

      console.log('the data is ', name_arabic)
  
        // const request = {
        //     name, gender, image, schools_id
        //     }
            // console.log(formData)
            // return false
            try {
                const response = await UpdateLicenceTypes(formData)
                // const response = await UpdateLicenceTypes(paramsFromRoute.id && paramsFromRoute.id, request)
                if (response) {
                if (response.data) {
                    const { data: { message } } = response.data
                    toast.success(<SuccessContent msg={message} />, {
                    transition: Slide,
                    hideProgressBar: true,
                    autoClose: 2000
                    })
                    history.push('/pages/licence_type/list')
                }
                }
            } catch (e) {
                console.log(e)
            }
        }

    // useEffect(() => {
    //     getSchoollist()
    //     }, [])

        const getLicenceTypeByID = async (id) => {
            try {
              const response = await getLicenceTypeId(id, school_id)
              if (response) {
                if (response.data) {
                  const { data: { result } } = response.data
                  if (result) {
                    // setstudentinfo(result)
                    const { name, name_arabic, schools_id, image, gender, description, registration_status} = result
                    setName(name)
                    setNameArabic(name_arabic)
                    setGender(gender)
                    setDescription(description)
                    setRegistration_status(registration_status)
                    //setImage(image) 
                    setEncodeImage(result.image)
                     
                  }
                }
              }
            } catch (e) {
              ErrorHandler(e)
            }
          }
          useEffect(() => {
            //setSchool(parseInt(localStorage.getItem("schoolIdToken")))
            getLicenceTypeByID(paramsFromRoute.id)
              }, [paramsFromRoute.id])
    
    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4'>License Types</CardTitle>
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
                            <Label for='name-arabic'>Arabic Name</Label>
                            <AvInput name='name_arabic' id='name-arabic' onChange={(e) => {
                                setNameArabic(e.target.value)
                            }} required value={name_arabic} />
                            <AvFeedback>Please enter a valid Arabic name!</AvFeedback>
                        </AvGroup>
                        </Col>
                        <Col sm='6'>
                            <AvGroup>
                                <Label for='gender'>For Gender </Label>
                                <AvField type='select' name='gender' id='gender' onChange={(e) => {
                                    setGender(e.target.value)
                                    }} value={parseInt(gender)} required>
                                    <option value={null}>Select Gender</option>
                                    <option value={1}>Male</option>
                                    <option value={2}>Female</option>
                                    <option value={3}>Others</option>
                                </AvField>
                                <AvFeedback>Please select a Gender Type</AvFeedback>
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
                                <Label for='registration'>Student Registration</Label>
                                <AvField type='select' name='registration' id='registration' onChange={(e) => {
                                    setRegistration_status(e.target.value)
                                    }} value={registration_status} >
                                    <option value={1}>Enable</option>
                                    <option value={0}>Disable</option>
                                   
                                </AvField>
                                {/* <AvFeedback>Student Registration</AvFeedback> */}
                            </AvGroup>
                        </Col>
                        {/* <Col sm='6'>
                            <AvGroup>
                                <Label for='school'>School</Label> 
                                <AvField type='select' name='school' id='school' onChange={(e) => {
                                setSchool(e.target.value)
                                }} value={schools_id}  required>
                                {
                                    schoollist ? schoollist.map((ele) => (
                                    <option value={ele.id}>{ele.name}</option>
                                    )) : null
                                }
                                </AvField>
                                <AvFeedback>Please select a School</AvFeedback>
                            </AvGroup>
                        </Col> */}
                        <Col sm='6'>
                            <AvGroup>
                                <Media>
                                    <Media className='mr-25' left>
                                        <Media 
                                            object className='rounded mr-50' 
                                            src={encodeImage}
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
                        <Col sm='4'>

                        </Col>
                        <Col sm='4'>
                            <Button color='primary' type='submit' onClick={UpdateLicenseType} >
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

export default create
