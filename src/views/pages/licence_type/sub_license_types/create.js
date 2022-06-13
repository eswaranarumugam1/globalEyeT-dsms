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
import { AddSublicensetype, LicenseTypeget } from "../../../../services/home/LicensePage"
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

const create = () => {
  
  
  const history = useHistory()
    const [avatar, setAvatar] = useState([])
    const [name, setName] = useState('')
    const [image, setImage] = useState([])
    const [license_type_id, setLicenseType] = useState('')

    const [licensetypelist, LicenseTypeList] = useState([])
    const [description, setDescription] = useState('')
  
    const [picture, setPicture] = useState('')

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
          ErrorHandler(e)
        }
      }
  
    const addSubLicenseType = async () => {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('image', picture)
      formData.append('license_type_id', license_type_id)
      formData.append('schools_id', school_id)
      formData.append('description', description)
      console.log('the data is ', formData)
        // const request = {
        //     name, image, license_type_id
        //     }
            console.log(formData)
            try {
                const response = await AddSublicensetype(formData)
                if (response) {
                if (response.data) {
                    const { data: { message } } = response.data
                    toast.success(<SuccessContent msg={message} />, {
                    transition: Slide,
                    hideProgressBar: true,
                    autoClose: 2000
                    })
                    history.push('/pages/sub_licence_type/list')
                }
                }
            } catch (e) {
                console.log(e)
                ErrorHandler(e)
            }
        }

    useEffect(() => {
        getLicenceType()
        }, [])
    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Create Sub License Types</CardTitle>
            </CardHeader>
            <CardBody>
                <AvForm>
                    <Row>
                        <Col sm='6'>
                        <AvGroup>
                            <Label for='name'>Name</Label>
                            <AvInput name='name' id='name' onChange={(e) => {
                                setName(e.target.value)
                            }} required placeholder="Name" />
                            <AvFeedback>Please enter a valid name!</AvFeedback>
                        </AvGroup>
                        </Col>
                        <Col sm='6'>
                            <AvGroup>
                                <Label for='license_type'>License Type</Label> 
                                <AvField type='select' name='license_type' id='license_type' onChange={(e) => {
                                setLicenseType(e.target.value)
                                }} required>
                                <option value={''}>Select License Type</option>
                                {
                                    licensetypelist ? licensetypelist.map((ele) => (
                                    <option value={ele.id}>{ele.name}</option>
                                    )) : null
                                }
                                </AvField>
                                <AvFeedback>Please select a School</AvFeedback>
                            </AvGroup>
                        </Col>
                        <Col sm='6'>
                            <AvGroup>
                                <Label for='description'>Description</Label> 
                                <AvField type='textarea' name='description' id='description' onChange={(e) => { 
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
                        <Col sm='4'>

                        </Col>
                         <Col sm='4'>

                        </Col>
                        <Col sm='4'>
                            <Button color='primary' type='submit' onClick={addSubLicenseType} >
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
