import { useState, useEffect, Fragment } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Label, Button, Row, Col, CustomInput } from 'reactstrap'
import {
  AvForm,
  AvGroup,
  AvField,
  AvInput,
  AvFeedback
} from 'availity-reactstrap-validation-safe'
import { toast, Slide } from "react-toastify"
import {  Coffee } from "react-feather"
import Avatar from "@components/avatar"
import '@styles/react/libs/flatpickr/flatpickr.scss'

import { useParams, useHistory} from 'react-router-dom'
//services
import {  Schools, LicenseType, Students, editStudent, getStudentById, SubLicenseType } from "../../../../services/home/admin"
import { StudentService } from "../../../../services/home/student"
import { countries, cities, id_types, levels, gender } from "../../../../services/home/lookups"
// Error Handler
import ErrorHandler from "../../../../common/ErrorHandler"
import { mobileValidator } from "../../../../common/Validators/CommonValidators"

import validator from 'validator'

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
const EditStudentForm = () => {
  const paramsFromRoute = useParams()
  const history = useHistory()
  const [first_name_english, setNameEnglish] = useState('')
  const [first_name_arabc, setnameArabic] = useState('')
  const [second_name_english, setSecondName] = useState('')
  const [second_name_arabic, setSecondNameArabic] = useState('')
  const [family_name_english, setFamilyName] = useState('')
  const [family_name_arabic, setFamilyNameArabic] = useState('')
  const [sex, setGender] = useState(null)
  const [nationality, setNationality] = useState('')
  const [id_type, setIdType] = useState('')
  const [id_no, setIdNo] = useState('')
  const [province, setProvince] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [level, setLevel] = useState('')
  const [date_of_birth, setPicker] = useState(new Date())
  const [license_type, setLicenseType] = useState('')
  const [sub_license, setSubLicense] = useState('')
  const [idTypeLookup, setIdTypeLookup] = useState([])
  const [levelLookup, setLevelLookup] = useState([])
  const [genderLookup, setGenderLookup] = useState([])
  const [countryCode, setCountryCode] = useState([])

  // const [school_id, setSchoolId] = useState('')
  const [age, setAge] = useState('')
  const [media_file, setMedicalFile] = useState('')
  const [license_file, setLicenseFile] = useState('')
  const [iqama_file, setIqamaFile] = useState('')

  const [countryLookup, setCountryLookup] = useState([])
  const [cityLookup, setCityLookup] = useState([])
  const [schoolLookup, setschoolLookup] = useState([])
  const [licenseTypeList, setLicenseTypeList] = useState([])
  const [subLicenseList, setSubLicenseList] = useState([])
  const [studentInfo, setstudentinfo] = useState({})
  const [studentmeta, setstudentmeta] = useState({})

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

  const getLicenseType = async () => {
    try {
      const response = await LicenseType(schools_id)
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

  const setFormData = (data) => {
    if (data) {
      setNameEnglish(data.first_name_english)
      setnameArabic(data.first_name_arabc)
      setSecondName(data.second_name_english)
      setSecondNameArabic(data.second_name_arabic)
      setFamilyName(data.family_name_english)
      setFamilyNameArabic(data.family_name_arabic)
      setGender(data.sex)
      setNationality(data.nationality)
      getCities(data.nationality)
      setIdType(data.id_type)
      setIdNo(data.id_no)
      setProvince(data.province)
      setAddress(data.address)
      setCountryCode(data.country_code)
      setPhone(data.phone)
      setEmail(data.email)
      setLevel(data.level)
      setPicker(data.date_of_birth)
      setLicenseType(data.license_type)
      getSubLicenseType(data.license_type)
      setSubLicense(data.sub_license)
    }
  }

  const getstudentById = async () => {
    try {
      const { data } = await StudentService.Show(paramsFromRoute.id)
      if (data.status_code && data.status_code === 200) {
        const { data: { result } } = data
        setFormData(result)
      }
    } catch (e) {
      ErrorHandler(e)
    }
  }

  useEffect(() => {
    getCountries()
    getLicenseType()
    getstudentById()
    getIdType()
    getLevels()
    getGender()
  }, [])

  const updateStudent = async () => {
    const request = {
      first_name_english, 
      first_name_arabc,
      second_name_english,
      second_name_arabic,
      family_name_english,
      family_name_arabic,
      sex,
      nationality,
      id_type,
      id_no,
      province,
      address,
      country_code: countryCode,
      phone,
      email, 
      level,
      date_of_birth,
      license_type,
      sub_license,
      document,
      age,
      schools_id
    }

    try {
      const response = await StudentService.Update(paramsFromRoute.id, request)
      if (response) {
        if (response.data) {
          const { data: { message } } = response.data

          toast.success(<SuccessContent msg={message} />, {
            transition: Slide,
            hideProgressBar: true,
            autoClose: 2000
          })
          history.push(`/pages/all_students/`)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleValidSubmit = () => {
    updateStudent()
  }

  const handleInvalidSubmit = () => {
    console.log('This is invalid submit!!!')
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
        <CardTitle tag='h4'>Edit Student Details</CardTitle>
      </CardHeader>
      <CardBody>
        <AvForm onValidSubmit={handleValidSubmit} onInvalidSubmit={handleInvalidSubmit}>
          <Row>
            <Col sm='6'>
              <AvGroup>
                <Label for='first_name_english'>First Name (English)</Label>
                <AvInput name='first_name_english' id='first_name_english' value={first_name_english} onChange={(e) => {
                  setNameEnglish(e.target.value)
                }} required placeholder="First Name" />
                <AvFeedback>Please enter a valid first name!</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='first_name_arabc'>First Name (Arabic)</Label>
                <AvInput name='first_name_arabc' id='first_name_arabc' value={first_name_arabc} onChange={(e) => {
                  setnameArabic(e.target.value)
                }} required placeholder="Name" />
                <AvFeedback>Please enter a valid first name!</AvFeedback>
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='second_name_english'>Second Name (English)</Label>
                <AvInput name='second_name_english' id='second_name_english' value={second_name_english} onChange={(e) => {
                  setSecondName(e.target.value)
                }} required placeholder="Name" />
                <AvFeedback>Please enter a valid name!</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='second_name_arabic'>Second Name (Arabic)</Label>
                <AvInput name='second_name_arabic' id='second_name_arabic' value={second_name_arabic} onChange={(e) => {
                  setSecondNameArabic(e.target.value)
                }} required placeholder="Name" />
                <AvFeedback>Please enter a valid second name in arabic!</AvFeedback>
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='family_name_english'>Family Name (English)</Label>
                <AvInput name='family_name_english' id='family_name_english' value={family_name_english} onChange={(e) => {
                  setFamilyName(e.target.value)
                }} required placeholder="Name" />
                <AvFeedback>Please enter a valid family name!</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='family_name_arabic'>Family Name (Arabic)</Label>
                <AvInput name='family_name_arabic' id='family_name_arabic' value={family_name_arabic} onChange={(e) => {
                  setFamilyNameArabic(e.target.value)
                }} required placeholder="Name" />
                <AvFeedback>Please enter a valid family name in arabic!</AvFeedback>
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='sex'>sex</Label>
                <AvField type='select' name='sex' id='sex' value={sex} onChange={(e) => {
                  setGender(e.target.value)
                }} required>
                   <option value={null} hidden={true}>Select Gender</option>
                  {
                    genderLookup ? genderLookup.map((ele) => (
                      <option value={ele.id}>{ele.gender}</option>
                    )) : null
                  }
                </AvField>
                <AvFeedback>Please select a Gender Type</AvFeedback>
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
                <Label for='id_type'>ID Type</Label>
                <AvField type='select' name='id_type' id='id_type' value={id_type} onChange={(e) => {
                  setIdType(e.target.value)
                }} required>
                  <option value={''}>Select ID Type</option>
                  {
                    idTypeLookup ? idTypeLookup.map((item) => (
                      <option value={item.id}>{item.id_type}</option>
                    )) : null
                  }
                </AvField>
                <AvFeedback>Please select a ID Type</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='id_no'>Id No</Label>
                <AvInput name='id_no' id='id_no' value={id_no} onChange={(e) => {
                  setIdNo(e.target.value)
                }} required placeholder="Enter Id No" />
                <AvFeedback>Please enter a valid Id No!</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='province'>Province</Label>
                <AvField type='select' name='province' id='province' value={province} onChange={(e) => {
                  setProvince(e.target.value)
                }} required>
                  <option value={null}>Select Province</option>
                  {
                    cityLookup ? cityLookup.map((ele) => (
                      <option value={ele.id}>{ele.name}</option>
                    )) : null
                  }                  
                </AvField>
                <AvFeedback>Please select a Province</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='address'>Address</Label>
                <AvInput type='textarea' name='address' id='address' value={address} onChange={(e) => {
                  setAddress(e.target.value)
                }} required />
                <AvFeedback>Please enter Address!</AvFeedback>
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
                <AvInput name='phone-number' id='phone-number' onChange={(e) => {
                  setPhone(e.target.value)
                }} value={phone} required placeholder="Enter Phone Number" />
                </div>
                {/* <AvInput type='text' maxlength='10' name='phone' id='phone' value={phone} onChange={(e) => {
                  setPhone(e.target.value)
                }} required placeholder="Enter Phone Number" /> */}
                <AvFeedback>Please enter a valid Phone Number!</AvFeedback>
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
                <Label for='level'>Level</Label>
                <AvField type='select' name='level' id='level' value={level} onChange={(e) => {
                  setLevel(e.target.value)
                  // getLicenseType(e.target.value)
                }} required>
                  <option value={null}>Select Level</option>
                 {
                    levelLookup ? levelLookup.map((ele) => (
                      <option value={ele.id}>{ele.level_name}</option>
                    )) : null
                  }
                </AvField>
                <AvFeedback>Please select a Level</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='date_of_birth'>Date Of Birth</Label>
                <AvField type='date' name='date_of_birth' id='date_of_birth' value={date_of_birth}
                  onChange={(e) => {
                    setPicker(e.target.value)
                  }}
                  required placeholder="Enter Your date of birth" />
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='license_type'>License Type</Label>
                <AvField type='select' name='license_type' id='license_type' value={license_type} onChange={(e) => {
                  setLicenseType(e.target.value)
                  getSubLicenseType(e.target.value)
                }} required>
                  <option value={null} hidden={true}>Select License Type</option>
                  {
                    licenseTypeList ? licenseTypeList.map((ele) => (
                      <option value={ele.id}>{ele.name}</option>
                    )) : null
                  }                  
                </AvField>
                <AvFeedback>Please select a License Type</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='sub_license'>Sub License</Label>
                <AvField type='select' name='sub_license' id='sub_license' value={sub_license} onChange={(e) => {
                  setSubLicense(e.target.value)
                }} required>
                  <option value={null} hidden={true}>Select Sub License</option>
                  {
                    subLicenseList ? subLicenseList.map((ele) => (
                      <option value={ele.id}>{ele.name}</option>
                    )) : null
                  }
                  {/* <option value={null}>Select Sub License</option>
                  <option value={1}>Iquma 1</option>
                  <option value={2}>Iquma 2</option>
                  <option value={3}>Iquma 3</option> */}
                </AvField>
                <AvFeedback>Please select a Sub License Type</AvFeedback>
              </AvGroup>
            </Col>

            {/* <Col sm='6'>
              <AvGroup style={Form_style}>
                <Label for='documents'>Photo</Label>
                <AvInput type='file' name='profilephoto' style={File_style} onChange={(e) => setPhotoFile(e.target.files[0])} required />
                <AvFeedback>Please upload documents</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup style={Form_style}>
                <Label for='documents'>ID or Iqama</Label>
                <AvInput type='file' name='iqama_file' style={File_style} onChange={(e) => setIdFile(e.target.files[0])} />
                <AvFeedback>Please upload documents</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup style={Form_style}>
                <Label for='documents'>Medical Report</Label>
                <AvInput type='file' name='medicalFile' style={File_style} onChange={(e) => setMedicalFile(e.target.files[0])} />
                <AvFeedback>Please upload documents</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup style={Form_style}>
                <Label for='documents'>Driving License</Label>
                <AvInput type='file' name='drivingFile' style={File_style} onChange={(e) => setDrivingFile(e.target.files[0])} />
                <AvFeedback>Please upload documents</AvFeedback>
              </AvGroup>
            </Col> */}

            <Col sm='6'>
              <br />
              <Button color='primary' type='submit'>              
                Update Student
              </Button>
            </Col>
          </Row>
        </AvForm>
      </CardBody>
    </Card>
  )
}
export default EditStudentForm
