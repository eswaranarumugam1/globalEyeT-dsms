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
import { updateSchoolApi, fetchSchool } from "../../../../services/home/admin"
import { countries, cities, branches } from "../../../../services/home/lookups"
// Error Handler
import ErrorHandler from "../../../../common/ErrorHandler"
import { useParams, useHistory } from 'react-router-dom'
import Editmap from '../Maps/Editmap'
import Autocomplete from 'react-google-autocomplete'
import { Coffee } from 'react-feather'
import { ImTab, ImTerminal } from 'react-icons/im'

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
const Validation = () => {
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
  const [countryCode, setCountryCode] = useState("+966")
  const [cityLookup, setCityLookup] = useState([])
  const [schoolInfo, setSchoolInfo] = useState({})
  const [images, setImage] = useState()
  const [encodeImage, setEncodeImage] = useState('')
  const [register_status, setRegStatus] = useState('')
  const [status, setStatus] = useState('')
  const [branchesOptions, setBranchesOptions] = useState([])
  const [school_branches, setSchool_Branches] = useState(null)

  // const [latlongval, setLatLongval] = useState({
  //   lat:latitude, lng:longitude
  // })

  const setLatLong = (lat, lng) => {
    setLatitude(lat)
    setLongitude(lng)
  }

  const handleBranchesSelect = (e) => {
    setSchool_Branches(e)
    // setSchool_Branches(Array.isArray(e) ? e.map(x => x.value) : [])
  }

  const options = {}
  const getCountries = async () => {
    try {
      const response = await countries()
      if (response) {
        if (response.data) {
          const { data: { result } } = response.data
          if (result && result.length && result.length > 0) {
            setCountryLookup(result)
          }
        }
      }
    } catch (e) {
      ErrorHandler(e)
    }
  }

  const getBranches = async () => {
    try {
      const response = await branches()
      if (response) {
        if (response.data) {
          const {data: {result} } = response.data
          if (result.data && result.data.length && result.data.length > 0) {
            const bList = ([])
            result.data.map((item) => {
              return bList.push({
                value: item.id,
                label: item.group_name_english
              })
            })
            setBranchesOptions(bList)
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
    getBranches()

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
    formData.append('country_code', countryCode)
    formData.append('phone', phone)
    formData.append('latitude', latitude)
    formData.append('longitude', longitude)
    formData.append('school_url', school_url)
    formData.append('country_id', parseInt(country_id))
    formData.append('city_id', parseInt(city_id))
    formData.append('school_group', school_group)
    formData.append('school_branches', school_branches.value)
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
                <AvInput name='name' id='name' onChange={(e) => {
                  setName(e.target.value)
                }} value={name} required placeholder="Enter School Name" />
                <AvFeedback>Please enter a valid name!</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='address'>Address</Label>
                <AvInput type='textarea' col='6' name='address' id='address' onChange={(e) => {
                  setAddress(e.target.value)
                }} value={address} required />
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
                  onChange={(e) => {
                    setSchoolType(e.target.value)
                  }} 
                  value={school_type} 
                  required
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
                <div className='d-flex'>
                <AvField 
                    type="select"
                    name="country_code"
                    onChange={(e) => {
                      setCountryCode(e.target.value)
                    }}
                    value={countryCode}
                    className="w-auto"
                  >
                   { countryLookup && countryLookup.map((country) => (<option value={country.country_code}>{country.country_code}</option>))}
                  </AvField>
                <AvInput 
                  name='phone-number' 
                  id='phone-number' 
                  onChange={(e) => {
                    setPhone(e.target.value)
                  }} 
                  value={phone} 
                  placeholder="Enter Phone Number" 
                  validate={{
                    required: {value: true, errorMessage: 'Please enter a valid Phone Number'},
                    pattern: {value: '^[0-9]+$', errorMessage: 'Phone Number must contain only numbers'}
                  }} 
                  />
                </div>
                <AvFeedback className="phone-valid">Please enter a valid Phone Number!</AvFeedback>
              </AvGroup>
                
            </Col>
            <Col sm='12'>
              <AvGroup>
                {/* <Label for='schoolSearch'>Search Place</Label>
                <Autocomplete className='form-control'
                  apiKey={'AIzaSyC7P_FtqKrU05sNje9wAgDobV3V8ZmB0D0'}
                  onPlaceSelected={(place) => {
                    autoFillMap(place)
                  }}
                /> */}

                {/* <Editmap getLatLongCallback = {(lat, lng) => {
                  setLatLong(lat, lng)
                }} passLatLng = {({lat:'13.335984359874338', lng:'77.09274706914064'})}/>
              </AvGroup> */}

                <Editmap 
                  setLatitude={setLatitude} 
                  setLongitude={setLongitude} 
                  latitude={latitude}
                  longitude={longitude}
                  passLatLng={({ lat: latitude, lng: longitude })}
                  getLatLongCallback={(lat, lng) => {
                    setLatLong(lat, lng)
                  }} 
                />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <Col sm='12'>
                <AvGroup>
                  <Label for='latitude'>Latitude</Label>
                  <AvInput name='latitude' id='latitude' onChange={(e) => {
                    setLatitude(e.target.value)
                  }} value={latitude} required placeholder="Enter Latitude" />
                  <AvFeedback>Please enter a valid latitude!</AvFeedback>
                </AvGroup>
              </Col>
              <Col sm='12'>
                <AvGroup>
                  <Label for='longitude'>Longitude</Label>
                  <AvInput name='longitude' id='longitude' onChange={(e) => {
                    setLongitude(e.target.value)
                  }} value={longitude} required placeholder="Enter Longitude" />
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
                    onChange={(e) => {
                      countryChangeHandler(e.target.value)
                    }} 
                    value={parseInt(country_id)} 
                    required
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
                    onChange={(e) => {
                      setSchool_group(e.target.value)
                    }} 
                    value={school_group} 
                    required
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
                      // isClearable={false}
                      theme={selectThemeColors}
                      defaultValue={[branchesOptions[school_branches]]}
                      // value={school_branches ? branchesOptions.filter(obj => school_branches.includes(obj.value)) : ''}
                      // isMulti
                      name='multi_select'
                      options={branchesOptions}
                      value={school_branches}
                      className='react-select'
                      classNamePrefix='select'
                      onChange={(e) => {
                        handleBranchesSelect(e)
                      }}
                    >
                    </Select>
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
                    onChange={(e) => {
                      cityChangehandler(e.target.value)
                    }} 
                    value={city_id} 
                    required
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
                    <Media className='mt-75 ml-1' body>
                      <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                        Upload
                        <Input type='file' onChange={onChange} hidden accept='image/*' />
                      </Button.Ripple>
                    </Media>
                  </Media>
                </AvGroup>
              </Col>
            </Col>

            <Col sm='6'>
              <Col sm='12'>
                <AvGroup>
                  <Label for='schoolurl'>School Web Link</Label>
                  <AvInput type="text" name='school_url' id='school_url' onChange={(e) => {
                    setSchoolUrl(e.target.value)
                  }} value={school_url} required placeholder="Enter School URL" />
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
                    <AvInput type="email" name='school_email' id='school_email'
                      onChange={(e) => {
                        setSchoolEmail(e.target.value)
                      }} value={school_email} required placeholder="Enter School Email" />
                    <AvFeedback>Please Enter School Email !</AvFeedback>
                  </AvGroup>
                </Col>
                <Col sm='12'>
                  <AvGroup>
                    <Label for='schoolpassword'>School Password</Label>
                    <AvInput type="text" name='school_password' id='school_password'
                      onChange={(e) => {
                        setSchoolPassword(e.target.value)
                      }} value={school_password} placeholder="Enter School Password" />
                    {/* <AvFeedback>Please Enter School Password !</AvFeedback> */}
                  </AvGroup>
                </Col>
                <Col sm='12'>
                  <AvGroup>
                    <Label for='status'>Status</Label>
                    <AvField type='select' name='status' id='status' onChange={(e) => {
                      setStatus(e.target.value)
                    }} value={status} required>
                      <option value={null}>Select</option>
                      <option value={0}>Disable</option>
                      <option value={1}>Publish</option>
                      <option value={2}>Draft</option>
                    </AvField>
                    <AvFeedback>Please Select a Status</AvFeedback>
                  </AvGroup>
                </Col>
                {/* <Col sm='12'>
              <AvGroup>
                <Label for='reg_status'>Registration Status</Label>
                <AvField type='select' name='register_status' value={parseInt(register_status)} id='reg_status' onChange={(e) => {
                  setRegStatus(e.target.value)
                }} required>
                  <option value={null}>Select</option>
                 
                  <option value={1} >Enable</option>
                  <option value={0} >Disable</option>
                </AvField>
               
                <AvFeedback>Please Select Enable or Disable</AvFeedback>
              </AvGroup>
            </Col> */}
              </Col>
              <br />
              <br />
              <br />
              <Button style={{ float: 'right' }} color='primary' type='submit' onClick={updateSchool}>
                Update School
              </Button>
            </Col>
          </Row>

        </AvForm>
      </CardBody>
    </Card>
  )
}

export default Validation
