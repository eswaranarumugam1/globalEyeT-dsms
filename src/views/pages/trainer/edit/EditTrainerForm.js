import { useState, useEffect, Fragment } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Label, Button, Row, Col, CustomInput, div } from 'reactstrap'
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
import { selectThemeColors } from '@utils'
import '@styles/react/libs/flatpickr/flatpickr.scss'
//services
import { EditTrainer, LicenseType, GetTrainerById, SubLicenseType3, getCertification, Trainer_speciality, trainer_position, getemployeeType, get_training_languages } from "../../../../services/home/admin"
import { countries, cities } from "../../../../services/home/lookups"
// Error Handler
import ErrorHandler from "../../../../common/ErrorHandler"
import { valueEmptyCheck, mobileValidator, textareaValidator } from "../../../../common/Validators/CommonValidators"
import Flatpickr from 'react-flatpickr'
import validator from 'validator'
import Select, { components } from 'react-select'
import InputPasswordToggle from '../../../../@core/components/input-password-toggle'
import 'react-phone-number-input/style.css'

import './number_input.css'
import PhoneInput from 'react-phone-number-input'

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
  const history = useHistory()
  const [password, setPassword] = useState('')
  const [extra_hrs_active, setExtrahrs] = useState(true)
  const [resourcesOptions, setResourcesOptions] = useState([])
  const [training_languages, setresources] = useState()
  const [countryLookup, setCountryLookup] = useState([])
  const [certifications, setCertifications] = useState([])
  const [certificationsOptions, setCertificationsOptions] = useState([])
  const [employeeTypes, setEmployeetypes] = useState([])
  const [trainerposition, settrainerPosition] = useState([])
  const [family_name_arabic, Setfamily_name_arabic] = useState([])
  // const [trainerSpeciality, SettrainerSpeciality] = useState([])
  const [trainerSpecialityOptions, SettrainerSpecialityOptions] = useState([])
 
  const options = {}
  const paramsFromRoute = useParams()
  const school_id = parseInt(localStorage.getItem("schoolIdToken"))
  
  const [name, setName] = useState('')
  const [extra_hours, Setextra_hours] = useState(0)
  const [arabic_name, setNameArabic] = useState('')
  const [email, setEmail] = useState('')
  // const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [family_name_english, setFamilyName] = useState('')
  const [gender, setGender] = useState('')
  const [username, setUserName] = useState('')
  const [date_of_enrolment, Setdate_of_enrolment] = useState('')
  const [nationality, setNationality] = useState('')
  const [certification, setCertification] = useState('')
  const [date_of_birth, setDate_of_birth] = useState('')
  const [employee_type, setEmployee_type] = useState('')
  const [age, setAge] = useState('')
  const [working_from_time, setWorkingTimeFrom] = useState('')
  const [working_to_time, setWorkingTimeTo] = useState('')
  const [eligible_to_teach_gender, Seteligible_to_teach_gender] = useState('')
  const [trainer_position_value, Settrainer_position_value] = useState('')
  const [speciality, setSpeciality] = useState('')
  const [outdoor_training, setOutdoor_training] = useState('')
  const [extra_hour_from, Setextra_hour_from] = useState('')
  const [extra_hour_to, Setextra_hour_to] = useState('')
  const [Licensetypeoptions, setLicensetypeOptions] = useState([])
  const [license_types, SetLicense_types] = useState([])
  const [id_or_iquama_no, Setid_or_iquama_no] = useState([])
  const [value, setValue] = useState()
  const [status, setStatus] = useState()
  
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
      // ErrorHandler(e)
      console.log(e)
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
      // ErrorHandler(e)
      console.log(e)
    }
  }

  const getTrainercertifications = async () => {
    // console.log("here")
    try {
      const response = await getCertification(school_id)
      if (response) {
        const value = response.data.data
        if (value) {
          const iList2 = []
          if (response.data.data.result.length && response.data.data.result.length > 0) {
            response.data.data.result.map((item) => {
              if (item.name !== '') {
                return iList2.push({
                  value: item.id,
                  label: item.certification_name

                })
              }
            })

            console.log('the trainer certification', iList2)
            setCertificationsOptions(iList2)
          }
        }
        // console.log(value)
        // setCertificationsOptions(value.result)


      }
    } catch (e) {
      // ErrorHandler(e)
      console.log(e)
    }
  }


  const getEmployeetype = async () => {
    // console.log("here")
    try {
      const response = await getemployeeType(school_id)
      if (response) {
        const value = response.data.data
        // console.log(value)
         setEmployeetypes(value.result)

      }
    } catch (e) {
      // ErrorHandler(e)
      console.log(e)
    }
  }
  const trainerPosition = async () => {
    // console.log("here")
    try {
      const response = await trainer_position(school_id)
      if (response) {
        const value = response.data.data
        // console.log(value)
        settrainerPosition(value.result)

      }
    } catch (e) {
      // ErrorHandler(e)
      console.log(e)
    }
  }

  const trainerspeciality = async () => {
    // console.log("here")
    try {
      const response = await Trainer_speciality(school_id)
      if (response) {
        const value = response.data.data
        // console.log(value)
        if (response.data) {
          const iList1 = []
          if (response.data.data.result.length && response.data.data.result.length > 0) {
            response.data.data.result.map((item) => {
              if (item.name !== '') {
                return iList1.push({
                  value: item.id,
                  label: item.speciality_name

                })
              }
            })

            console.log('the trainer specialties', iList1)
            SettrainerSpecialityOptions(iList1)
          }
        }
        // SettrainerSpeciality(value.result)

      }
    } catch (e) {
      // ErrorHandler(e)
      console.log(e)
    }
  }

  const getResources = async () => {
    try {
      const response = await get_training_languages()
      if (response) {
        if (response.data) {
          const iList = []
          if (response.data.data.result.length && response.data.data.result.length > 0) {
            response.data.data.result.map((item) => {
              if (item.name !== '') {
                return iList.push({
                  value: item.id,
                  label: item.language_name

                })
              }
            })

            console.log(iList)
            setResourcesOptions(iList)
          }
        }
      }
    } catch (e) {
      //ErrorHandler(e)
      console.log("Error for Resources", e)
    }
  }
  const getLicenseType = async () => {
    try {
      const response = await LicenseType(school_id)
      if (response) {
       
        if (response.data) {
          const iList3 = []
          if (response.data.data.result.length && response.data.data.result.length > 0) {
            response.data.data.result.map((item) => {
              if (item.name !== '') {
                return iList3.push({
                  value: item.id,
                  label: item.name

                })
              }
            })

            console.log('the License types', iList3)
            setLicensetypeOptions(iList3)
          }
        }
      }
    } catch (e) {
      // ErrorHandler(e)
      console.log(e)
    }
  }
  const handleResourcesSelect = (e) => {
    setresources(Array.isArray(e) ? e.map(x => x.value) : [])
    console.log('this is the data ', e)
  }

  const setMultiSelectionLicensetype = (e) => {
    SetLicense_types(Array.isArray(e) ? e.map(x => x.value) : [])
    console.log('this is the license data ', e)
  }

  const setMultiSelectionSpecialities = (e) => {
    setSpeciality(Array.isArray(e) ? e.map(x => x.value) : [])
    console.log('this is the data ', e)
  }

  const setMultiSelectionCertifications = (e) => {
    setCertifications(Array.isArray(e) ? e.map(x => x.value) : [])
    console.log('this is the data ', e)
  }

//   function ageCount(e) {
//     const now = new Date()
//     const currentY = now.getFullYear()
//     const currentM = now.getMonth()
//     // console.log(e.target.value)
//     const dobget = e.target.value
//     const dobs = new Date(dobget)
//     const prevY = dobs.getFullYear()
//     const prevM = dobs.getMonth()
//     // console.log(prevY)
//     const ageY = currentY - prevY
//     const ageM = Math.abs(currentM - prevM)
//     // setAge(ageY)
//   }

const user_id = paramsFromRoute.id
 const phone = value
  const addTrainer = async (data) => {
    const request = {
      ...data,
      password,
      phone,
      school_id,
      speciality,
      certifications,
      training_languages,
      user_id
    }
    // console.log(request)
    //  return false
    try {
      const response = await EditTrainer(request, user_id)
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

  const onFormSubmit = (event, errors, values) => {
    if (errors.length === 0) {
      addTrainer(values)
    }
  }
  
   
  const getTrainerById = async () => {
    try {
      const response = await GetTrainerById(paramsFromRoute.id)
      if (response) {
        //   console.log(response)
        if (response.data) {
            const data = response.data.data.result
          
            setName(data.name) 
            setNameArabic(data.arabic_name)
            setEmail(data.email)
            setValue(data.phone)
            setAddress(data.address)      
            setFamilyName(data.family_name_english)
            Setfamily_name_arabic(data.family_name_arabic)
            setGender(data.gender)
            setUserName(data.username)
            Setdate_of_enrolment(data.date_of_enrolment)
            setNationality(data.nationality)
            setCertifications(data.certifications)
            setDate_of_birth(data.dob)
            setEmployee_type(data.employee_type)
            Setid_or_iquama_no(data.id_or_iquama_no)
            setWorkingTimeFrom(data.working_from_time)
            setWorkingTimeTo(data.working_to_time)
            Seteligible_to_teach_gender(data.eligible_to_teach_gender)
            Settrainer_position_value(data.trainer_position)
            setSpeciality(data.speciality)
            SetLicense_types(data.license_types)
            setOutdoor_training(data.outdoor_training)
            Setextra_hours(data.extra_hours) 
            if (parseInt(data.extra_hours) === 1) {
              setExtrahrs(false)
            } else {
              setExtrahrs(true)
            }
            Setextra_hour_from(data.extra_hour_from)    
            Setextra_hour_to(data.extra_hour_to)
            setresources(data.training_languages)    
            setStatus(data.status)        
        }
      }
    } catch (error) {
     // ErrorHandler(error)
    }
  }

  const validation = {
    email: {
      required: {value: true, errorMessage: 'Email is required'},
      email: {value: true, errorMessage: 'Please enter a valid email'}
    },
    name_english: {
      required: {value: true, errorMessage: 'Name is required'}
    },
    name_arabic: {
      required: {value: true, errorMessage: 'Arabic name is required'}
    },
    phone: {
      required: {value: true, errorMessage: 'Phone number is required'},
      maxLength: {value: 10, errorMessage: 'Phone number is invalid'}
    },
    family_name_english: {
      required: {value: true, errorMessage: 'Family name is required'}
    },
    gender: {
      required: {value: true, errorMessage: 'Gender is required'}
    },
    user_name: {
      required: {value: true, errorMessage: 'Username is required'}
    },
    nationality: {
      required: {value: true, errorMessage: 'Nationality is required'}
    },
    password: {
      required: {value: true, errorMessage: 'Password is required'}
    },
    certifications: {
      required: {value: true, errorMessage: 'Certifications is required'}
    },
    date_of_birth: {
      required: {value: true, errorMessage: 'Date of birth is required'}
    },
    employee_type: {
      required: {value: true, errorMessage: 'Employee type is required'}
    },
    age: {
      required: {value: true, errorMessage: 'Age is required'}
    },
    trainer_type: {
      required: {value: true, errorMessage: 'Trainer position is required'}
    },
    working_timing: {
      required: {value: true, errorMessage: 'Working timing is required'}
    },
    speciality: {
      required: {value: true, errorMessage: 'Speciality is required'}
    },
    outdoor_training: {
      required: {value: true, errorMessage: 'Outdoor training is required'}
    },
    extra_hours: {
      required: {value: true, errorMessage: 'Extra hours is required'}
    }
  }
  useEffect(() => {
    getCountries()
    getTrainercertifications()
    getEmployeetype()
    trainerPosition()
    trainerspeciality()
    getResources()
    getTrainerById()
    getLicenseType()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Edit Trainer</CardTitle>
      </CardHeader>
      <CardBody>
        <AvForm onSubmit={onFormSubmit} autoComplete="off">
          <Row>
            <Col sm='6'>
              <AvGroup>
                <Label for='name_english'>Name (English)</Label>
                <AvField name='name_english' placeholder="Name" value={name} validate={validation.name_english} />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='name_arabic'>Name (Arabic)</Label>
                <AvField name='name_arabic' placeholder="Name" value={arabic_name}  validate={validation.name_arabic} />
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='family_name_english'>Family Name (English)</Label>
                <AvField name='family_name_english' placeholder="Family Name" value={family_name_english} validate={validation.family_name_english} />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='family_name_arabic'>Family Name (Arabic)</Label>
                <AvField name='family_name_arabic' value={family_name_arabic} placeholder="Family Name Arabic"  />
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='email'>Email</Label>
                <AvField name='email' id='email' type="email" value={email} placeholder="Enter Email" validate={validation.email} />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='phone'>Phone Number</Label>
               <PhoneInput
                placeholder="Enter phone number"
                value={value} 
                onChange={setValue}
                required
                />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='address'>Home Address</Label>
                <AvField name='address' value={address} placeholder="Home address" type="textarea"  />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='gender'>Gender</Label>
                <AvField type='select' name='gender' value={gender} validate={validation.gender}>
                  <option value={null} hidden={true}>Select Gender</option>
                  <option value={0}>Male</option>
                  <option value={1}>Female</option>
                  <option value={2}>Others</option>
                </AvField>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='user_name'>User Name </Label>
                <AvField name='user_name' type="text"  placeholder="User Name" value={username ? username : ""} validate={validation.user_name} />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='date_of_enrolment'>Date of Enrolment </Label>
                <AvField name='date_of_enrolment' type='date' value={date_of_enrolment} placeholder="Date of Enrolment"  />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='nationality'>Nationality</Label>
                <AvField type='select' name='nationality' value={nationality} onChange={(e) => { getCities(e.target.value) }} validate={validation.nationality}>
                  <option value={''} hidden={true}>Select Nationality</option>
                  {
                    countryLookup ? countryLookup.map((ele) => (
                      <option value={ele.id}>{ele.name}</option>
                    )) : null
                  }
                </AvField>
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='password'>Password</Label>
                <InputPasswordToggle name='password' autoComplete="none"  value={password}  placeholder="Password" onChange={(e) => { setPassword(e.target.value) }}
                 validate={validation.password} />
                <AvFeedback>Password is required</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='licensetype'>License Type</Label>
                
                 <Select
                  isClearable={false}
                  theme={selectThemeColors}
                  isMulti
                  defaultValue={[Licensetypeoptions[license_types]]}
                  value={license_types ? Licensetypeoptions.filter(obj => license_types.includes(obj.value)) : ''}
                  name='multi_select'
                  options={Licensetypeoptions}
                  className='react-select'
                  classNamePrefix='select'
                  onChange={(e) => {
                    setMultiSelectionLicensetype(e)
                  }}
                ></Select>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='certifications'>Certifications</Label>
              
                 <Select
                  isClearable={false}
                  theme={selectThemeColors}
                  defaultValue={[certificationsOptions[certifications]]}
                  value={certifications ? certificationsOptions.filter(obj => certifications.includes(obj.value)) : ''}
                  isMulti
                  name='multi_select'
                  options={certificationsOptions}
                  className='react-select'
                  classNamePrefix='select'
                  onChange={(e) => {
                    setMultiSelectionCertifications(e)
                  }}
                ></Select>
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='dob'>Date Of Birth</Label>
                <AvField type='date' name='dob' value={date_of_birth} placeholder="Enter date of birth" validate={validation.date_of_birth} />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='employee_type'>Employee Type</Label>
                <AvField type='select' value={employee_type} name='employee_type' validate={validation.employee_type}>
                  <option value={null} hidden={false}>Select Employee Type</option>
                
                  {
                    employeeTypes ? employeeTypes.map((ele) => (
                      <option value={ele.id}>{ele.type_name}</option>
                    )) : null
                  }
                </AvField>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='id_or_iquama_no'>National ID / Iqama No</Label>
                <AvField type='text'  name='id_or_iquama_no' value={id_or_iquama_no} placeholder="National ID Number or Iqama Number" validate={validation.id_or_iquama} />
              </AvGroup>
            </Col>

            {/* <Col sm='6'>
              <AvGroup>
                <Label for='age'>Age</Label> 
                <AvField type='number' value={age} name='age' placeholder="Age" validate={validation.age} />
              </AvGroup>
            </Col> */}
            <Col sm='6'>
              <AvGroup>
                <Label for='trainer_position'>Trainer Position</Label>
                <AvField type='select' value={trainer_position_value} name='trainer_position'  validate={validation.trainer_type}>
                  <option value={null}>Select Trainer Position</option>
                  {
                    trainerposition ? trainerposition.map((ele) => (
                      <option value={ele.id}>{ele.position_name}</option>
                    )) : null
                  }
                  
                </AvField>
              </AvGroup>
            </Col>

            <Col sm='3'>
              <AvGroup>
                <Label for='working_from_time'>Working Time From</Label>
                <AvField type='time' name='working_from_time' value={working_from_time} validate={validation.working_timing} /> 
              </AvGroup>
            </Col>
            <Col sm='3'>
              <AvGroup>
                <Label for='working_to_time'>Working Time To</Label>
                <AvField type='time' value={working_to_time} name='working_to_time' validate={validation.working_timing} /> 
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='eligible_to_teach_gender'>Eligible to teach Gender</Label>
                <AvField type='select' value={eligible_to_teach_gender} name='eligible_to_teach_gender' >
                  <option value={null} >Select Gender</option>
                  <option value={1}>Male</option>
                  <option value={2}>Female</option>
                  <option value={3}>Both</option>
                </AvField>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='speciality'>Speciality</Label>
             
                <Select
                  isClearable={false}
                  theme={selectThemeColors}
                  // defaultValue={[trainerSpecialityOptions[0]]}
                  defaultValue={[trainerSpecialityOptions[speciality]]}
                  value={speciality ? trainerSpecialityOptions.filter(obj => speciality.includes(obj.value)) : ''}
                  isMulti
                  name='multi_select'
                  options={trainerSpecialityOptions}
                  className='react-select'
                  classNamePrefix='select'
                  onChange={(e) => {
                    setMultiSelectionSpecialities(e)
                  }}
                ></Select>
                <AvFeedback>Please select a Speciality</AvFeedback>
              </AvGroup>
            </Col>


            <Col sm='6'>
              
               
                <AvGroup>
                <Label for='outdoor_training'>Authorized for outdoor training</Label>
                <AvField type='select' name='outdoor_training' value={outdoor_training} >
                  <option value={0}>NO</option>
                  <option value={1}>YES</option>
                </AvField>
              </AvGroup>
            </Col>
            <Col sm='6'>
            <AvGroup>
                <Label for='extra hours'>Extra Hours</Label>
                <AvField type='select' name='extra_hours' value={extra_hours} onChange = { (e) => { 
                  if (parseInt(e.target.value) === 1) {
                    setExtrahrs(false)
                  } else {
                    setExtrahrs(true)
                  }
                 
                }} validate={validation.extra_hours}>
                  <option value={0}>NO</option>
                  <option value={1}>YES</option>
                </AvField>
              </AvGroup>
            </Col>
          
            <Col sm='3' hidden={extra_hrs_active}>
            <AvGroup>
                <Label for='extra_hour_from'>Extra Time From</Label>
                <AvField type='time' name='extra_hour_from' value={extra_hour_from}  /> 
              </AvGroup>
            </Col>
            <Col sm='3' hidden={ extra_hrs_active }>
            <AvGroup>
                <Label for='extra_hour_to'>Extra Time To</Label>
                <AvField type='time' name='extra_hour_to' value={extra_hour_to} /> 
              </AvGroup>
            </Col>
            <Col sm='6'>
            <AvGroup>
                <Label>Training Languages</Label>
                <Select
                  isClearable={false}
                  theme={selectThemeColors}
                  defaultValue={[resourcesOptions[training_languages]]}
                   value={training_languages ? resourcesOptions.filter(obj => training_languages.includes(obj.value)) : ''}
                  // value={resourcesOptions ? training_languages.filter(obj => resourcesOptions.includes(obj.value)) : ''}
                  isMulti
                  name='multi_select'
                  options={resourcesOptions}
                  className='react-select'
                  classNamePrefix='select'
                  onChange={(e) => {
                    handleResourcesSelect(e)
                  }}
                ></Select>
              </AvGroup>
              </Col>
              <Col sm='6'>
              <AvGroup>
                <Label for='status'>Status</Label>
                <AvField type='select' value={status}  name='status' >
                  <option value={0}>Inactive</option>
                  <option value={1}>Active</option>
                </AvField>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <br />
              <Button color='primary' type='submit'>
                Update Trainer
              </Button>
            </Col>
          </Row>
        </AvForm>
      </CardBody>
    </Card>
  )
}
export default Validation
