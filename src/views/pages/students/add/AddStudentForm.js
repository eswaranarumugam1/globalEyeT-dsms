import { useState, useEffect, Fragment } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Label, Button, Row, Col } from 'reactstrap'
import {
  AvForm,
  AvGroup,
  AvField,
  AvInput
} from 'availity-reactstrap-validation-safe'
import '@styles/react/libs/flatpickr/flatpickr.scss'
//services
import { LicenseType, SubLicenseType} from "../../../../services/home/admin"
import { StudentService } from "../../../../services/home/student"
import { countries, cities, id_types, levels, gender } from "../../../../services/home/lookups"
// Error Handler
import ErrorHandler from "../../../../common/ErrorHandler"
import { useHistory } from 'react-router-dom'
import { SuccessContent } from '../../../../utility/Utils'

const AddStudentForm = () => {
  const history = useHistory()
  const [countryLookup, setCountryLookup] = useState([])
  const [cityLookup, setCityLookup] = useState([])
  const [idTypeLookup, setIdTypeLookup] = useState([])
  const [levelLookup, setLevelLookup] = useState([])
  const [genderLookup, setGenderLookup] = useState([])
  const [licenseTypeList, setLicenseTypeList] = useState([])
  const [subLicenseList, setSubLicenseList] = useState([])
  const [sex, setSex] = useState("")
  const [idType, setIdType] = useState("")
  const [level, setLevel] = useState("")
  const school_id = parseInt(localStorage.getItem("schoolIdToken"))
  const [countryCode, setCountryCode] = useState([])


  //For fetching country list intially
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
  //For fetching citis based on countries
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

  const getLicenseType = async () => {
    try {
      const response = await LicenseType(school_id)
      if (response) {
        if (response.data) {
          const { data: { result } } = response.data
          if (result && result.length && result.length > 0) {
            setLicenseTypeList(result)
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
            setSubLicenseList(sub_license_list)
          }
        }
      }
    } catch (e) {
      ErrorHandler(e)
    }
  }

  const getIdType = async () => {
    try {
      const response = await id_types()
      if (response) {
        if (response.data) {
          const {data: {result}} = response.data
          if (result && result.length && result.length > 0) {
            setIdTypeLookup(result)
          }
        }
      }
    } catch (e) {
      ErrorHandler(e)
    }
  }

  const getLevels = async () => {
    try {
      const response = await levels()
      if (response) {
        if (response.data) {
          const {data: {result}} = response.data
          if (result && result.length && result.length > 0) {
            setLevelLookup(result)
          }
        }
      }
    } catch (e) {
      ErrorHandler(e)
    }
  }

  const getGender = async () => {
    try {
      const response = await gender()
      if (response) {
        if (response.data) {
          const {data: {result}} = response.data
          if (result && result.length && result.length > 0) {
            setGenderLookup(result)
          }
        }
      }
    } catch (e) {
      ErrorHandler(e)
    }
  }

  useEffect(() => {
    getCountries()
    getLicenseType()
    getIdType()
    getLevels()
    getGender()
  }, [])

  const validation = {
    first_name_english: {
      required: {value: true, errorMessage: 'First name in english is required'},
      pattern: {value: '^[A-Za-z ]+$', errorMessage: 'First name must be composed only with english letter'}
    },
    first_name_arabc: {
      required: {value: true, errorMessage: 'First name in arabic is required'},
      pattern: {value: '^[\u0621-\u064A0-9 ]+$', errorMessage: 'First name must be composed only with arabic letter'}
    },
    second_name_english: {
      required: {value: true, errorMessage: 'Second name in english is required'},
      pattern: {value: '^[A-Za-z ]+$', errorMessage: 'Second name must be composed only with english letter'}
    },
    second_name_arabic: {
      required: {value: true, errorMessage: 'Second name in arbic is required'},
      pattern: {value: '^[\u0621-\u064A0-9 ]+$', errorMessage: 'Second name must be composed only with arabic letter'}
    },
    family_name_english: {
      required: {value: true, errorMessage: 'Family name in english is required'},
      pattern: {value: '^[A-Za-z ]+$', errorMessage: 'Family name must be composed only with english letter'}
    },
    family_name_arabic: {
      required: {value: true, errorMessage: 'Family name in arbic is required'},
      pattern: {value: '^[\u0621-\u064A0-9 ]+$', errorMessage: 'Family name must be composed only with arabic letter'}
    },
    sex: {
      required: {value: true, errorMessage: 'Sex is required'}
    },
    nationality: {
      required: {value: true, errorMessage: 'Nationality is required'}
    },
    id_type: {
      required: {value: true, errorMessage: 'ID type is required'}
    },
    id_no: {
      required: {value: true, errorMessage: 'ID number is required'}
    },
    id_no: {
      required: {value: true, errorMessage: 'ID number is required'}
    },
    province: {
      required: {value: true, errorMessage: 'Province is required'}
    },
    address: {
      required: {value: true, errorMessage: 'Address is required'}
    },
    phone: {
      required: {value: true, errorMessage: 'Phone number is required'}
    },
    email: {
      required: {value: true, errorMessage: 'Phone number is required'}
    },
    level: {
      required: {value: true, errorMessage: 'Level is required'}
    },
    date_of_birth: {
      required: {value: true, errorMessage: 'DOB is required'}
    },
    license_type: {
      required: {value: true, errorMessage: 'License type is required'}
    },
    sub_license: {
      required: {value: true, errorMessage: 'Sub-license is required'}
    },
    profilephoto: {
      required: {value: true, errorMessage: 'Profile photo is required'}
    },
    iqama_file: {
      required: {value: true, errorMessage: 'Iqama file is required'}
    },
    medicalFile: {
      required: {value: true, errorMessage: 'Medical file is required'}
    },
    drivingFile: {
      required: {value: true, errorMessage: 'Driving file is required'}
    }
  }
  
  const addStudent = async (data) => {
    const request = {
      ...data,
      school_id
    }
    
    try {
      const response = await StudentService.Store(request)
      if (response) {
        if (response.data) {
          const { data: { message } } = response.data
          SuccessContent({ msg: message })
          history.push(`/pages/all_students?admin=schoolAdmin`)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onFormSubmit = (event, errors, values) => {
    if (errors.length === 0) {
      addStudent(values)
    }
  }

  // Adding Style for File Input Feild 
  const File_style = {
    border: "2px dashed #a0a0a0",
    padding: "15px 15%",
    backgroundColor: "white"
  }
  const Form_style = {
    backgroundColor: "#eee",
    borderRadius: "10px",
    padding: "20px"

  }

  
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Create New Student</CardTitle>
      </CardHeader>
      <CardBody>
        <AvForm  onSubmit={onFormSubmit}>
          <Row>
            <Col sm='6'>
              <AvGroup>
                <Label for='first_name_english'>First Name (English)</Label>
                <AvField name='first_name_english' placeholder="First Name" validate={validation.first_name_english} />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='first_name_arabc'>First Name (Arabic)</Label>
                <AvField name='first_name_arabc' placeholder="First Name Arbic" validate={validation.first_name_arabc} />
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='second_name_english'>Second Name (English)</Label>
                <AvField name='second_name_english' placeholder="Name" validate={validation.second_name_english} />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='second_name_arabic'>Second Name (Arabic)</Label>
                <AvField name='second_name_arabic' placeholder="Name" validate={validation.second_name_arabic} />
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='family_name_english'>Family Name (English)</Label>
                <AvField name='family_name_english' placeholder="Name" validate={validation.family_name_english} />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='family_name_arabic'>Family Name (Arabic)</Label>
                <AvField name='family_name_arabic' placeholder="Name" validate={validation.family_name_arabic} />
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='sex'>sex</Label>
                <AvField 
                  type='select' 
                  name='sex' 
                  validate={validation.sex}
                  onChange={(e) => {
                    setSex(e.target.value)
                  }}
                  value={sex}
                >
                  <option value={null} hidden={true}>Select Gender</option>
                  {
                    genderLookup ? genderLookup.map((ele) => (
                      <option value={ele.id}>{ele.gender}</option>
                    )) : null
                  }
                </AvField>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='nationality'>Nationality</Label>
                <AvField type='select' name='nationality'  validate={validation.nationality} onChange={(e) => {
                  getCities(e.target.value)
                }} required>
                  <option value={''}>Select Nationality</option>
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
                <Label for='id_type'>ID Type</Label>
                <AvField 
                  type='select' 
                  name='id_type' 
                  validate={validation.id_type} 
                  onChange={(e) => {
                    setIdType(e.target.value)
                  }}
                  value={idType}
                >
                  <option value={''} hidden={true}>Select ID Type</option>
                  {
                    idTypeLookup ? idTypeLookup.map((item) => (
                      <option value={item.id}>{item.id_type}</option>
                    )) : null
                  }
                </AvField>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='id_no'>Id No</Label>
                <AvField name='id_no' placeholder="Enter Id No" validate={validation.id_no} />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='province'>Province</Label>
                <AvField type='select' name='province' validate={validation.province}>
                  <option value={null}>Select Province</option>
                  {
                    cityLookup ? cityLookup.map((ele) => (
                      <option value={ele.id}>{ele.name}</option>
                    )) : null
                  }                  
                </AvField>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='address'>Address</Label>
                <AvField type='textarea' name='address' validate={validation.address} />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='phone'>Mobile Number</Label>
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
                  <AvInput type='text' maxlength='10' name='phone' placeholder="Enter Phone Number" validate={validation.phone} />
                </div>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='email'>Email</Label>
                <AvField name='email' placeholder="Enter Email Name" validate={validation.email} />
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='level'>Level</Label>
                <AvField 
                  type='select' 
                  name='level' 
                  validate={validation.level} 
                  onChange={(e) => setLevel(e.target.value)} 
                  value={level}
                  >
                  <option value={null}>Select Level</option>
                  {
                    levelLookup ? levelLookup.map((ele) => (
                      <option value={ele.id}>{ele.level_name}</option>
                    )) : null
                  }
                </AvField>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='date_of_birth'>Date Of Birth</Label>
                <AvField type='date' name='date_of_birth' placeholder="Enter Your date of birth" validate={validation.date_of_birth} />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='license_type'>License Type</Label>
                <AvField type='select' name='license_type' validate={validation.license_type} onChange={(e) => {
                  getSubLicenseType(e.target.value)
                }}>
                  <option value={null} hidden={true}>Select License Type</option>
                  {
                    licenseTypeList ? licenseTypeList.map((ele) => (
                      <option value={ele.id}>{ele.name}</option>
                    )) : null
                  }                  
                </AvField>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='sub_license'>Sub License</Label>
                <AvField type='select' name='sub_license'  validate={validation.sub_license}>
                  <option value={null} hidden={true}>Select Sub License</option>
                  {
                    subLicenseList ? subLicenseList.map((ele) => (
                      <option value={ele.id}>{ele.name}</option>
                    )) : null
                  }
                </AvField>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup style={Form_style}>
                <Label for='documents'>Photo</Label>
                {/* <AvField type='file' name='profilephoto' style={File_style} onChange={(e) => setPhotoFile(e.target.files[0])} /> */}
                <AvField type='file' name='profilephoto' style={File_style} validate={validation.profilephoto} />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup style={Form_style}>
                <Label for='documents'>ID or Iqama</Label>
                {/* <AvInput type='file' name='iqama_file' style={File_style} onChange={(e) => setIdFile(e.target.files[0])} /> */}
                <AvField type='file' name='iqama_file' style={File_style} validate={validation.iqama_file} />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup style={Form_style}>
                <Label for='documents'>Medical Report</Label>
                {/* <AvField type='file' name='medicalFile' style={File_style} onChange={(e) => setMedicalFile(e.target.files[0])} /> */}
                <AvField type='file' name='medicalFile' style={File_style}  validate={validation.medicalFile} />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup style={Form_style}>
                <Label for='documents'>Driving License</Label>
                {/* <AvField type='file' name='drivingFile' style={File_style} onChange={(e) => setDrivingFile(e.target.files[0])} /> */}
                <AvField type='file' name='drivingFile' style={File_style}  validate={validation.drivingFile} />
              </AvGroup>
            </Col>

            <Col sm='6'>
              <br />
              <Button color='primary' type='submit'>              
                Add Student
              </Button>
            </Col>
          </Row>
        </AvForm>
      </CardBody>
    </Card>
  )
}
export default AddStudentForm