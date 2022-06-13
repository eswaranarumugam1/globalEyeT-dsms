import { useState, useEffect, Fragment } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Label, Button, Row, Col, Media, Input } from 'reactstrap'
import {
  AvForm,
  AvGroup,
  AvField,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio
} from 'availity-reactstrap-validation-safe'
import { toast, Slide } from "react-toastify"
import { selectThemeColors } from '@utils'
import Avatar from "@components/avatar"
import Select from 'react-select'
import '@styles/react/libs/flatpickr/flatpickr.scss'
//services
import { updateSchoolApi, fetchSchool } from "../../../../../services/home/admin"
import { countries, cities } from "../../../../../services/home/lookups"
// Error Handler
import ErrorHandler from "../../../../../common/ErrorHandler"
import { useParams, useHistory } from 'react-router-dom'
import Editmap from '../Maps/Editmap'
import Autocomplete from 'react-google-autocomplete'
import { Coffee } from 'react-feather'

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
        <h6 className="toast-title font-weight-bold">Error in the form</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        {msg}
      </span>
    </div>
  </Fragment>
)
const ViewSchool = () => {
  const [picker, setPicker] = useState('')
  // Property
  const paramsFromRoute = useParams()
  const history = useHistory()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [school_type, setSchoolType] = useState(null)
  const [phone, setPhone] = useState('')
  const [latitude, setLatitude] = useState(23.956012)
  const [longitude, setLongitude] = useState(36.0460317)
  const [school_url, setSchoolUrl] = useState('')
  const [school_email, setSchoolEmail] = useState('')
  const [school_password, setSchoolPassword] = useState('')
  const [country_id, setCountry] = useState('')
  const [city_id, setCity] = useState('')
  const [school_group, setSchool_group] = useState(null)
  const [countryLookup, setCountryLookup] = useState([])
  const [cityLookup, setCityLookup] = useState([])
  const [schoolInfo, setSchoolInfo] = useState({})
  const [images, setImage] = useState()
  const [encodeImage, setEncodeImage] = useState('')
  const [register_status, setRegStatus] = useState('')
  const [status, setStatus] = useState('')
  const [branchesOptions, setBranchesOptions] = useState([])
  const [school_branches, setSchool_Branches] = useState()

  // const [latlongval, setLatLongval] = useState({
  //   lat:latitude, lng:longitude
  // })

  const setLatLong = (lat, lng) => {
    setLatitude(lat)
    setLongitude(lng)
  }

  const handleBranchesSelect = (e) => {
    setComponent_type(e)
  
  }

  const options = {}
  const getCountries = async () => {
    try {
      const response = await countries()
      if (response) {
        if (response.data) {
          const { data: { result } } = response.data
          if (result && result.length && result.length > 0) {
            console.log("countries: ", result)
            setCountryLookup(result)
          }
        }
      }
    } catch (e) {
      ErrorHandler(e)
    }
  }
  const getCities = async (id) => {
    try {
      const response = await cities(id)
      if (response) {
        if (response.data) {
          const { data: { result } } = response.data
          if (result && result.length && result.length > 0) {
            setCityLookup(result)
          }
        }
      }
    } catch (e) {
      ErrorHandler(e)
    }
  }

  const imagevalue = ''
  const getSchoolById = async (id) => {
    try {
      const response = await fetchSchool(id)
      if (response) {
        if (response.data) {
          const { data: { result } } = response.data
          if (result) {
            setSchoolInfo(result)
            const { name, address, latitude, longitude, school_url, school_type, school_group, phone, country_id, city_id, image, admin_user_email, register_status, status } = result
            setName(name)
            setPhone(phone)
            setLatitude(latitude)
            setLongitude(longitude)
            setSchoolUrl(school_url)
            setAddress(address)
            setCountry(country_id)
            getCities(country_id)
            setCity(city_id)
            setSchoolType(school_type)
            setSchool_group(school_group)
            setEncodeImage(result.image)
            setSchoolEmail(admin_user_email)
            setRegStatus(register_status)
            setStatus(status)
            // setSchoolPassword(schoolPassword)

            // setLatLongval({
            //   lat: result.latitude,
            //   lng: result.longitude
            // })
            
            //  console.log(longitude)
          }
          // const { data: }
          // setSchoolEmail(result.admin_user_email)

        }
        //console.log(encodeImage)

      }

    } catch (e) {
      ErrorHandler(e)
    }
  }


  const [picture, setPicture] = useState('')
  const onChange = e => {
    const reader = new FileReader(),
    files = e.target.files[0]
    reader.onload = function () {
      setImage(reader.result)
    }
    reader.onload = function () {
      setEncodeImage(reader.result)
    }
    reader.readAsDataURL(files)
    setPicture(files)
   
  }

  useEffect(() => {
    getCountries()
    getSchoolById(paramsFromRoute.id)

    // decodeBase64()
  }, [paramsFromRoute.id])

  const updateSchoolOld = async () => {
    const request = {
      name, address, school_type, phone, latitude, longitude, school_url, country_id: parseInt(country_id), city_id: parseInt(city_id), school_group
    }
    
    try {
      const response = await updateSchoolApi(paramsFromRoute.id && paramsFromRoute.id, request)
      if (response) {
        if (response.data) {
          const { data: { message } } = response.data
          toast.success(<SuccessContent msg={message} />, {
            transition: Slide,
            hideProgressBar: true,
            autoClose: 2000
          })
          history.push('/pages/school/list')
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  const updateSchool = async () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('address', address)
    formData.append('school_type', school_type)
    formData.append('phone', phone)
    formData.append('latitude', latitude)
    formData.append('longitude', longitude)
    formData.append('school_url', school_url)
    formData.append('country_id', parseInt(country_id))
    formData.append('city_id', parseInt(city_id))
    formData.append('school_group', school_group)
    formData.append('image', picture)
    formData.append('user_email', school_email)
    formData.append('user_password', school_password)
    formData.append('register_status', register_status)
    formData.append('status', status)


    try {
      const response = await updateSchoolApi(paramsFromRoute.id && paramsFromRoute.id, formData)
      if (response) {
        if (response.data) {
          const { data: { message } } = response.data
          toast.success(<SuccessContent msg={message} />, {
            transition: Slide,
            hideProgressBar: true,
            autoClose: 2000
          })
          history.push('/pages/school/list')
        } else {
         
          toast.error(<ErrorContent msg={response.response.data.errors.msg} />, {
            transition: Slide,
            hideProgressBar: true,
            autoClose: 2000
          })
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  const countryChangeHandler = (id) => {
    setCountry(id)
    getCities(id)
    const country = countryLookup.filter((country) => country.id === Number(id))
    if (country.length > 0) {
      if (country[0]?.latitude > 0 || country[0]?.longitude > 0) {
        setLatitude(country[0]?.latitude)
        setLongitude(country[0]?.longitude)
      }
    }
  }

  const cityChangehandler = (id) => {
    setCity(id)
    const city = cityLookup.filter(city => city.id === Number(id))
    if (city.length > 0) {
      if (city[0]?.latitude > 0 || city[0]?.longitude > 0) {
        setLatitude(city[0]?.latitude)
        setLongitude(city[0]?.longitude)
      }
    }
  } 
 
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Edit School</CardTitle>
      </CardHeader>
      <CardBody>
        <AvForm>
          <Row>
            <Col sm='6'>
              <AvGroup>
                <Label for='name'>Name</Label>
                <AvInput 
                  name='name' 
                  id='name' 
                  value={name} 
                  required 
                  placeholder="Enter School Name" 
                  readOnly={true}
                />
                <AvFeedback>Please enter a valid name!</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='address'>Address</Label>
                <AvInput 
                  type='textarea' 
                  col='6' 
                  name='address' 
                  id='address' 
                  value={address} 
                  required 
                  readOnly={true}
                  />
                <AvFeedback>Please enter Address!</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='school_type'>Select School Type</Label>
                <AvField 
                  type='select' 
                  name='school_type' 
                  id='school_type' 
                  value={school_type} 
                  required
                  readOnly={true}
                >
                  <option value={""}>Select School Type</option>
                  <option value={0}>Male</option>
                  <option value={1}>Women</option>
                  <option value={1}>Mixed</option>
                </AvField>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='phone-number'>Phone Number</Label>
                <AvInput 
                name='phone-number' 
                id='phone-number' 
                value={phone} 
                required 
                placeholder="Enter Phone Number" 
                readOnly={true}
                />
                <AvFeedback>Please enter a valid Phone Number!</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='12'>
              <AvGroup>
                <Editmap 
                  setLatitude={setLatitude} 
                  setLongitude={setLongitude} 
                  latitude={latitude}
                  longitude={longitude}
                  passLatLng={({ lat: latitude, lng: longitude })}
                />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <Col sm='12'>
                <AvGroup>
                  <Label for='latitude'>Latitude</Label>
                  <AvInput 
                    name='latitude' 
                    id='latitude' 
                    value={latitude} 
                    required 
                    placeholder="Enter Latitude" 
                    readOnly={true}
                  />
                  <AvFeedback>Please enter a valid latitude!</AvFeedback>
                </AvGroup>
              </Col>
              <Col sm='12'>
                <AvGroup>
                  <Label for='longitude'>Longitude</Label>
                  <AvInput 
                    name='longitude' 
                    id='longitude' 
                    value={longitude} 
                    required 
                    placeholder="Enter Longitude" 
                    readOnly={true}
                  />
                  <AvFeedback>Please enter a valid Longitude!</AvFeedback>
                </AvGroup>
              </Col>
              <Col sm='6'>
                <AvGroup>
                  <Label for='country'>Country</Label>
                  <AvField 
                    type='select' 
                    name='country' 
                    id='country' 
                    value={parseInt(country_id)} 
                    required
                    readOnly={true}
                  >
                    <option value={''}>Select Country</option>
                    {
                      countryLookup ? countryLookup.map((ele) => (
                        <option value={ele.id}>{ele.name}</option>
                      )) : null
                    }
                  </AvField>
                  <AvFeedback>Please select a country</AvFeedback>
                </AvGroup>
              </Col>
              <Col sm='6'>
                <AvGroup>
                  <Label for='state'>Has School contains Multiple Branches?</Label>
                  <AvField 
                    type='select' 
                    name='state' 
                    id='state' 
                    value={school_group} 
                    required
                    readOnly={true}
                  >
                    <option value={null}>Select Yes or No</option>
                    <option value={0}>Yes</option>
                    <option value={1}>No</option>
                  </AvField>
                  <AvFeedback>Please select a School Group</AvFeedback>
                </AvGroup>
                {school_group === "0" &&
                  <AvGroup>
                    <Label>Branches</Label>
                    <Select
                      isClearable={false}
                      theme={selectThemeColors}
                      defaultValue={school_branches}
                      name='multi_select'
                      options={branchesOptions}
                      className='react-select'
                      classNamePrefix='select'
                      readOnly={true}
                    ></Select>
                  </AvGroup>
                }
              </Col>
              <Col sm='6'>
                <AvGroup>
                  <Label for='city'>City</Label>
                  <AvField 
                    type='select' 
                    name='city' 
                    id='city' 
                    value={city_id} 
                    required
                    readOnly={true}
                  >
                    <option value={''}>Select City</option>
                    {
                      cityLookup ? cityLookup.map((ele) => (
                        <option value={ele.id}>{ele.name}</option>
                      )) : null
                    }
                  </AvField>
                  <AvFeedback>Please select a City</AvFeedback>
                </AvGroup>
              </Col>
              <Col sm='12'>
                <AvGroup>
                  <Media>
                    <Media className='mr-25' left>
                      <Media className='rounded mr-50'
                        src={encodeImage}
                        alt='upload image22'
                        height='200'
                        width='200'
                      />
                    </Media>
                  </Media>
                </AvGroup>
              </Col>
            </Col>
            <Col sm='6'>
              <Col sm='12'>
                <AvGroup>
                  <Label for='schoolurl'>School Web Link</Label>
                  <AvInput 
                    type="text" 
                    name='school_url' 
                    id='school_url' 
                    value={school_url}
                    required 
                    placeholder="Enter School URL" 
                    readOnly={true}
                  />
                  <AvFeedback>Please Enter School Url !</AvFeedback>
                </AvGroup>
              </Col>
              <br />
              <br />
              <Col sm='12'>
                <Label for='schoolurl'><h4>Add Admin to School</h4></Label>
                <Col sm='12'>
                  <AvGroup>
                    <Label for='schoolEmail'>Add School Email</Label>
                    <AvInput 
                      type="email" 
                      name='school_email' 
                      id='school_email'
                      value={school_email}
                      required 
                      placeholder="Enter School Email" 
                      readOnly={true}
                    />
                    <AvFeedback>Please Enter School Email !</AvFeedback>
                  </AvGroup>
                </Col>
                <Col sm='12'>
                  <AvGroup>
                    <Label for='schoolpassword'>School Password</Label>
                    <AvInput 
                      type="text" 
                      name='school_password' 
                      id='school_password'
                      value={school_password} 
                      placeholder="Enter School Password"
                      readOnly={true}
                    />
                    {/* <AvFeedback>Please Enter School Password !</AvFeedback> */}
                  </AvGroup>
                </Col>
                <Col sm='12'>
                  <AvGroup>
                    <Label for='status'>Status</Label>
                    <AvField 
                      type='select' 
                      name='status' 
                      id='status' 
                      value={status} 
                      required
                      readOnly={true}
                    >
                      <option value={null}>Select</option>
                      <option value={0}>Disable</option>
                      <option value={1}>Publish</option>
                      <option value={2}>Draft</option>
                    </AvField>
                    <AvFeedback>Please Select a Status</AvFeedback>
                  </AvGroup>
                </Col>
              </Col>
            </Col>
          </Row>
        </AvForm>
      </CardBody>
    </Card>
  )
}

export default ViewSchool
