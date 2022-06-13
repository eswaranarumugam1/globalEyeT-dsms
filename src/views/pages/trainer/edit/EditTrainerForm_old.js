import { useState, useEffect, Fragment } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Label, Button, Row, Col, CustomInput } from 'reactstrap'
import { useParams, useHistory } from 'react-router-dom'
import {
  AvRadioGroup,
  AvRadio,
  AvForm,
  AvGroup,
  AvField,
  AvInput,
  AvFeedback
} from 'availity-reactstrap-validation-safe'
import { toast, Slide } from "react-toastify"
import { Coffee } from "react-feather"
import Avatar from "@components/avatar"
import '@styles/react/libs/flatpickr/flatpickr.scss'
//services
import { EditTrainer, Schools, LicenseType, SubLicenseType, SubLicenseType1, SubLicenseType2, SubLicenseType3, GetTrainerById } from "../../../../services/home/admin"
import { countries, cities } from "../../../../services/home/lookups"
// Error Handler
import ErrorHandler from "../../../../common/ErrorHandler"
import InputPasswordToggle from '../../../../@core/components/input-password-toggle'
// import { valueEmptyCheck, mobileValidator, textareaValidator } from "../../../../common/Validators/CommonValidators"
// import Flatpickr from 'react-flatpickr'
// import validator from 'validator'

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
const EditTrainerForm = () => {
  const history = useHistory()
  const [name_english, setName] = useState('')
  const [name_arabic, setNameArabic] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [family_name_english, setFamilyName] = useState('')
  const [gender, setGender] = useState('')
  const [user_name, setUserName] = useState('')
  const [nationality, setNationality] = useState('')
  const [password, setPassword] = useState('')
  const [certifications, setCertifications] = useState('')
  const [date_of_birth, setPicker] = useState('')
  const [employee_type, setEmType] = useState('')
  const [age, setAge] = useState('')
  const [trainer_type, setTrainerType] = useState('')
  const [working_timing, setWorkingTime] = useState('')
  const [speciality, setSpeciality] = useState('')
  const [outdoor_training, setTraining] = useState('')
  const [extra_hours, setExtraHour] = useState('')
  const [id, setTrainerId] = useState('')
  const [countryLookup, setCountryLookup] = useState([])
  const [schoolList, SetSchoolList] = useState([])

  const paramsFromRoute = useParams()

  const schools_id = parseInt(localStorage.getItem("schoolIdToken"))


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

  const getSchoollist = async () => {
    try {
      const response = await Schools()
      if (response) {
        if (response.data) {
          const { data: { result: { data } } } = response.data
          if (data && data.length && data.length > 0) {
            SetSchoolList(data)
          }
        }
      }
    } catch (e) {
      ErrorHandler(e)
    }
  }

  const getSubLicenseType = async (id) => {
    try {
      const response = await SubLicenseType(id)
      if (response) {
        if (response.data) {
          const { data: { result: { sub_license_list } } } = response.data
          if (sub_license_list && sub_license_list.length && sub_license_list.length > 0) {
            setSubLicenseTypeList(sub_license_list)
          }
          const { data: { result: { plans } } } = response.data
          if (plans && plans.length && plans.length > 0) {
            setPlanList(plans)
            console.log(plans)
          }
        }
      }
    } catch (e) {
      ErrorHandler(e)
    }
  }

  const setFormData = (data) => {
    if (data) {
      setName(data.name_english) 
      setNameArabic(data.name_arabic)
      setEmail(data.email)
      setPhone(data.phone)
      setFamilyName(data.family_name_english)
      setGender(data.gender)
      setUserName(data.user_name)
      setNationality(data.nationality)
      setPassword(data.password)
      setCertifications(data.certifications)
      setPicker(data.date_of_birth)
      setEmType(data.employee_type)
      setAge(data.age)
      setTrainerType(data.trainer_type)
      setWorkingTime(data.working_timing)
      setSpeciality(data.speciality)
      setTraining(data.outdoor_training)
      setExtraHour(data.extra_hours)
      setTrainerId(data.id)
    }
  }

  const getTrainerById = async () => {
    try {
      const response = await GetTrainerById(paramsFromRoute.id)
      if (response) {
        if (response.data) {
          const { data: { result } } = response.data
          if (result) {
            setFormData(result)
          }
        }
      }
    } catch (error) {
      ErrorHandler(error)
    }
  }


  useEffect(() => {
    getCountries()
    getSchoollist()
    getTrainerById()
  }, [])

  function ageCount(e) {
    const now = new Date()
    const currentY = now.getFullYear()
    const currentM = now.getMonth()
    // console.log(e.target.value)
    const dobget = e.target.value
    const dobs = new Date(dobget)
    const prevY = dobs.getFullYear()
    const prevM = dobs.getMonth()
    // console.log(prevY)
    const ageY = currentY - prevY
    const ageM = Math.abs(currentM - prevM)
    setAge(ageY)
  }

  const editTrainer = async () => {
    const request = {
      name_english,
      name_arabic,
      email,
      phone,
      family_name_english,
      gender,
      user_name,
      nationality,
      password,
      certifications,
      date_of_birth,
      employee_type,
      age,
      trainer_type,
      working_timing,
      speciality,
      outdoor_training,
      extra_hours,
      schools_id
    }

    try {
      const response = await EditTrainer(request, id)
      if (response) { 
        if (response.data) {
          const { data: { message } } = response.data
          toast.success(<SuccessContent msg={message} />, {
            transition: Slide,
            hideProgressBar: true,
            autoClose: 2000
          })
          history.push(`/pages/all_trainers/`)
        } else { 
          console.log('ERROR', response.response.data.errors.msg)
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

  const handleValidSubmit = () => {
    editTrainer()
  }

  const handleInvalidSubmit = () => {
    console.log('This is invalid submit!!!')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Edit Trainer</CardTitle>
      </CardHeader>
      <CardBody>
        <AvForm onValidSubmit={handleValidSubmit} onInvalidSubmit={handleInvalidSubmit}>
          <Row>
            <Col sm='6'>
              <AvGroup>
                <Label for='name_english'>Name (English)</Label>
                <AvInput name='name_english' id='name_english' value={name_english} onChange={(e) => {
                  setName(e.target.value)
                }} required placeholder="Name" />
                <AvFeedback>Please enter a valid name!</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='name_arabic'>Name (Arabic)</Label>
                <AvInput name='name_arabic' id='name_arabic' value={name_arabic} onChange={(e) => {
                  setNameArabic(e.target.value)
                }} required placeholder="Name" />
                <AvFeedback>Please enter a valid name!</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='email'>Email</Label>
                <AvInput name='email' id='email' value={email} onChange={(e) => {
                  setEmail(e.target.value)
                }} required placeholder="Enter Email Name" />
                <AvFeedback>Please enter a valid Email name!</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='phone'>Phone Number</Label>
                <AvInput maxLength='10' name='phone' id='phone' value={phone} onChange={(e) => {
                  setPhone(e.target.value)
                }} required placeholder="Enter Phone Number" />
                <AvFeedback>Please enter a valid Phone Number!</AvFeedback>
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='family_name_english'>Family Name (English)</Label>
                <AvInput name='family_name_english' id='family_name_english' value={family_name_english} onChange={(e) => {
                  setFamilyName(e.target.value)
                }} required placeholder="Family Name" />
                <AvFeedback>Please enter a valid family name!</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='gender'>Gender</Label>
                <AvField type='select' name='gender' id='gender' value={gender} onChange={(e) => {
                  setGender(e.target.value)
                }} required>
                  <option value={null} disabled={true}>Select Gender</option>
                  <option value={0}>Male</option>
                  <option value={1}>Female</option>
                  <option value={2}>Others</option>
                </AvField>
                <AvFeedback>Please select a Gender Type</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='user_name'>User Name </Label>
                {/* <AvInput name='user_name' id='user_name' value={user_name} onChange={(e) => {
                  setUserName(e.target.value)
                }} required placeholder="Name" />
                <AvFeedback>Please enter a valid user name!</AvFeedback> */}
                <AvInput name='user_name' id='user_name' value={user_name} disabled placeholder="Name" />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='nationality'>Nationality</Label>
                <AvField type='select' name='nationality' id='nationality' value={nationality} onChange={(e) => {
                  setNationality(e.target.value)
                  getCities(e.target.value)
                }} required>
                  <option value={''}>Select Nationality</option>
                  {
                    countryLookup ? countryLookup.map((ele) => (
                      <option value={ele.id}>{ele.name}</option>
                    )) : null
                  }
                </AvField>
                <AvFeedback>Please select a Nationality</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='password'>Password</Label>
                <InputPasswordToggle name='password' id='password' value={password} onChange={(e) => {
                  setPassword(e.target.value)
                }} required placeholder="" />
                <AvFeedback>Please enter password!</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='certifications'>Certifications</Label>
                <AvField type='select' name='certifications' id='certifications' value={certifications} onChange={(e) => {
                  setCertifications(e.target.value)
                }} required>
                  <option value={null}>Select Certifications</option>
                  <option value={0}>Yes</option>
                  <option value={1}>No</option>
                </AvField>
                <AvFeedback>Please select Certifications</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='date_of_birth'>Date Of Birth</Label>
                <AvInput type='date' name='date_of_birth' id='date_of_birth' value={date_of_birth}
                  onChange={(e) => {
                    setPicker(e.target.value)
                    ageCount(e)
                  }}

                  // onchange={ageCount()}
                  required placeholder="Enter date of birth" >
                </AvInput>
                {/* console.log(dob) */}
                {/* <Flatpickr className='form-control' value={dob} onChange={date => setPicker(date)} id='default-picker' /> */}
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='employee_type'>Employee Type</Label>
                <AvField type='select' name='employee_type' id='employee_type' value={employee_type} onChange={(e) => {
                  setEmType(e.target.value)
                }} required>
                  <option value={null}>Select ID Type</option>
                  <option value={0}>Iquma 1</option>
                  <option value={1}>Iquma 2</option>
                  <option value={2}>Iquma 3</option>
                </AvField>
                <AvFeedback>Please select an Employee Type</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='age'>Age</Label>
                <AvInput name='age' id='age' value={age} onChange={(e) => {
                  setAge(e.target.value)
                }} required placeholder="" />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='trainer_type'>Trainer Type</Label>
                <AvField type='select' name='trainer_type' id='trainer_type' value={trainer_type} onChange={(e) => {
                  setTrainerType(e.target.value)
                  getSubLicenseType(e.target.value)
                }} required>
                  {/* <option value={null}>Select Trainer Type</option>
                  {
                    lisencetypelist ? lisencetypelist.map((ele) => (
                      <option value={ele.id}>{ele.name}</option>
                    )) : null
                  } */}
                  <option value={null}>Select ID Type</option>
                  <option value={0}>Iquma 1</option>
                  <option value={1}>Iquma 2</option>
                  <option value={2}>Iquma 3</option>
                </AvField>
                <AvFeedback>Please select a Trainer Type</AvFeedback>
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='working_timing'>Working Time</Label>
                <AvField type='select' name='working_timing' id='working_timing' value={working_timing} onChange={(e) => {
                  setWorkingTime(e.target.value)
                }} required>
                  {/* <option value={''}>Select Working Time</option>
                  {
                    cityLookup ? cityLookup.map((ele) => (
                      <option value={ele.id}>{ele.name}</option>
                    )) : null
                  } */}
                  <option value={null}>Select ID Type</option>
                  <option value={0}>Iquma 1</option>
                  <option value={1}>Iquma 2</option>
                  <option value={2}>Iquma 3</option>
                </AvField>
                <AvFeedback>Please select a Working Time</AvFeedback>
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='speciality'>Speciality</Label>
                <AvField type='select' name='speciality' id='speciality' value={speciality} onChange={(e) => {
                  setSpeciality(e.target.value)
                }} required>
                  {/* <option value={''}>Select Speciality</option>
                  {
                    cityLookup ? cityLookup.map((ele) => (
                      <option value={ele.id}>{ele.name}</option>
                    )) : null
                  } */}
                  <option value={null}>Select ID Type</option>
                  <option value={0}>Iquma 1</option>
                  <option value={1}>Iquma 2</option>
                  <option value={2}>Iquma 3</option>
                </AvField>
                <AvFeedback>Please select a Speciality</AvFeedback>
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvRadioGroup name='outdoor_training' value={parseInt(outdoor_training)} onChange={(e) => {
                setTraining(e.target.value)
              }} required>
                <Label for='outdoor_training'>Authorized for outdoor training</Label>
                <AvRadio className='mb-1' customInput label='Yes' value={1} checked />
                <AvRadio customInput label='No' value={0} />
              </AvRadioGroup>
            </Col>
            <Col sm='6'>
              <AvRadioGroup name='extra_hours' value={parseInt(extra_hours)} onChange={(e) => {
                setExtraHour(e.target.value)
              }} required>
                <Label for='extra_hours'>Extra Hours</Label>
                <AvRadio className='mb-1' customInput label='Yes' value={1} />
                <AvRadio customInput label='No' value={0} />
              </AvRadioGroup>
            </Col>

            <Col sm='6'>
              <br />
              <Button color='primary' type='submit'>
                Edit Trainer
              </Button>
            </Col>
          </Row>
        </AvForm>
      </CardBody>
    </Card>
  )
}
export default EditTrainerForm
