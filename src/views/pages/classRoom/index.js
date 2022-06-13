// ** Styles
import '@styles/react/apps/app-users.scss'
import { fetchRole, deleteRole } from '../../../services/home/role'
import { useState, useEffect, Fragment } from 'react'
import { Row, Col, Container, Form, Input, FormGroup, Label, Button, FormFeedback} from 'reactstrap'
import {Coffee } from 'react-feather'
import ErrorHandler from "../../../common/ErrorHandler"
import { toast, Slide } from "react-toastify"
import Avatar from "@components/avatar"
import './classroom.scss'
import { authConfig } from "../../../api-config/authConfig"
import Headers from "../../../api-config/Headers"
import { AllClassRoomsFunction,  AllClassRoomsType, EditClassRooms} from "../../../services/home/manageClassroom.js"
import { LicenseType, SubLicenseType} from "../../../services/home/admin"
import queryString from 'query-string' 
import { useHistory } from 'react-router-dom'

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

const AddClassRooms = () => {
  const history = useHistory()
  const [nam, setName] = useState('')
  const [namArabic, setNamArabic] = useState('')
  const [roomType, setRoomType] = useState(null)
  const [roomFunction, setRoomFunction] = useState(null)
  const [maxCap, setMaxCap] = useState('')
  const [legalCap, setLegalCap] = useState('')
  const [classStatus, setClassStatus] = useState(false)
  const [licenseType, setLicenseType] = useState(null)
  const [subLicensetype, setSubLicenseType] = useState(null)

  const [namValid, setNameValid] = useState(false)
  const [namArabicValid, setNamArabicValid] = useState(false)
  const [roomTypeValid, setRoomTypeValid] = useState(false)
  const [roomFunctionValid, setRoomFunctionValid] = useState(false)
  const [maxCapValid, setMaxCapValid] = useState(false)
  const [legalCapValid, setLegalCapValid] = useState(false)
  const [classStatusValid, setClassStatusValid] = useState(false)
  const [licenseTypeValid, setLicenseValid] = useState(false)
  const [subLicenseTypeValid, setSubLicenseValid] = useState(false)

  const [roomTypeData, setRoomTypeData] = useState([])
  const [roomFunctionData, setRoomFunctionData] = useState([])
  const [licenseTypeList, setLicenseTypeList] = useState([])
  const [subLicenseList, setSubLicenseList] = useState([])

  const [status, setStatus] = useState('add')
  const [primaryId, setPrimaryId] = useState(null)

  const schoolId = parseInt(localStorage.getItem("schoolIdToken"))
  
  const getClassroomsType = async () => {
    const response = await AllClassRoomsType(schoolId)
    if (response) {
      if (response.data) {
        const { result } = response.data.data
        setRoomTypeData(result)
      }
    }
  }
  
  const getLicenseType = async () => {
    try {
      const response = await LicenseType(schoolId)
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

  const EditClassRoom = async (id) => {
    const response = await EditClassRooms(id)
    if (response) {
      if (response.data) {
        const { result } = response.data.data
            setNamArabic(result[0].room_name)
            setName(result[0].room_name_arabic)
            setRoomType(result[0].room_type)
            setRoomFunction(result[0].room_function)
            setMaxCap(result[0].room_max_capacity)
            setLegalCap(result[0].room_legal_capacity)
            setStatus('update')
            setPrimaryId(id)
      }
    }
  }

  const getClassroomsFunction = async () => {
    const response = await AllClassRoomsFunction(schoolId)
    if (response) {
      if (response.data) {
        const { result } = response.data.data
        setRoomFunctionData(result)
      }
    }
  }

  const handleregis = (event) => {
    if (!!nam && !!namArabic && !!roomType && !!roomFunction && !!maxCap && !!legalCap && status === 'add') {
        const reqObj = {
          room_name: nam,
          room_name_arabic: namArabic,
          room_type: roomType,
          room_function: roomFunction,
          room_max_capacity: maxCap,
          room_legal_capacity: legalCap,
          school_id: schoolId
        }
        authConfig.post(`/add_classroom`, reqObj, {
                    headers: Headers()
                })
                .then((response) => {
                    if (response && response.data) {
                      const { data: { message } } = response.data
                               toast.success(<SuccessContent msg={message} />, {
                               transition: Slide,
                               hideProgressBar: true,
                               autoClose: 2000
                             })
                             setNamArabic('')
                             setName('')
                             setRoomType('')
                             setRoomFunction('')
                             setMaxCap('')
                             setLegalCap('')

                           setTimeout(() => {
                            window.location.href  = '/pages/component/all-classrooms?admin=schoolAdmin'
                           }, 1500)
                    }
                    return response
                })
                .catch((error) => {
                    return error
                })
    } else if (!!nam && !!namArabic && !!roomType && !!roomFunction && !!maxCap && !!legalCap && status === 'update') {
      const reqObj = {
        room_name: nam,
        room_name_arabic: namArabic,
        room_type: roomType,
        room_function: roomFunction,
        room_max_capacity: maxCap,
        room_legal_capacity: legalCap,
        school_id: schoolId,
        id: primaryId
      }
      authConfig.post(`/update_classroom`, reqObj, {
                  headers: Headers()
              })
              .then((response) => {
                  if (response && response.data) {
                    const { data: { message } } = response.data
                             toast.success(<SuccessContent msg={message} />, {
                             transition: Slide,
                             hideProgressBar: true,
                             autoClose: 2000
                           })
                           setNamArabic('')
                           setName('')
                           setRoomType('')
                           setRoomFunction('')
                           setMaxCap('')
                           setLegalCap('')
                           setTimeout(() => {
                            window.location.href  = '/pages/component/all-classrooms?admin=schoolAdmin'
                           }, 1500)
                  }
                  return response
              })
              .catch((error) => {
                  return error
              })
  } else {
        if (!nam) {
            setNameValid(true)
        }
        if (!namArabic) {
          setNamArabicValid(true)
        }                
        if (!roomType) {
            setRoomTypeValid(true)
        }
        if (!roomFunction) {
            setRoomFunctionValid(true)
        }
        if (!maxCap && maxCap <= 0) {
            setMaxCapValid(true)
        }
        if (!legalCap && legalCap <= 0) {
            setLegalCapValid(true)
        }
    }
}
function handleName (e) {
setName(e.target.value)
if (!!e.target.value) {
    setNameValid(false)
}
}
function handleNameAr (e) {
setNamArabic(e.target.value)
if (!!e.target.value) {
  setNamArabicValid(false)
}
}
function handleRoomType (e) {
setRoomType(e.target.value)
if (!!e.target.value) {
    setRoomTypeValid(false)
}
}
const handleLicenseType = (e) => {
  setLicenseType(e.target.value)
  getSubLicenseType(e.target.value)
  if (!!e.target.value) {
    setLicenseValid(false)
  }
}
const handleSubLicenseType = (e) => {
  setSubLicenseType(e.target.value)
  if (!!e.target.value) {
    setSubLicenseValid(false)
  }
}
function handleRoomFunction (e) {
setRoomFunction(e.target.value)
if (!!e.target.value) {
  setRoomFunctionValid(false)
}
}
function handleMaxCapacity (e) {
setMaxCap(e.target.value)
if (!!e.target.value) {
  setMaxCapValid(false)
}
}
function handleLegalCapacity (e) {
setLegalCap(e.target.value)
if (!!e.target.value) {
    setLegalCapValid(false)
}
}

const handleStatus = (e) => {
  setClassStatus(e.target.value)
  if (!!e.target.value) {
    setClassStatusValid(false)
  }
}

useEffect(() => {
  getClassroomsFunction()
  getClassroomsType()
  getLicenseType()
  const params = queryString.parse(window.location.search)
  if (!!params.id && !!params.st && params.st === 'update') {
    setPrimaryId(params.id)
    setStatus('update')
    EditClassRoom(params.id)
  }
}, [])
  return (
    <div className="add-container">
    <div className="title-block">
        Class rooms
        <div className="title-bottom-strip"></div>
    </div>
       <div className="sub_head">
        Add & Update Class rooms
        <div className="title-bottom-strip"></div>
    </div>
    <Form className="add-form">
        <Row className="justify-content-between">
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="name">Name (English)</Label>
                    <Input invalid={namValid} type="text" name="name" id="name" placeholder="Full Name in English" value={nam} onChange={handleName}/>
                    <FormFeedback>Please enter valid Name</FormFeedback>
                </FormGroup>
            </Col>
             <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="nameAr">Name (Arabic)</Label>
                    <Input invalid={namArabicValid} type="text" name="nameAr" id="nameAr" placeholder="Full Name in Arabic" value={namArabic} onChange={handleNameAr}/>
                    <FormFeedback>Please enter valid Name</FormFeedback>
                </FormGroup>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="roomType">Room Type</Label>
                    <Input invalid={roomTypeValid} type="select" name="roomType" id="roomType" value={roomType} onChange={handleRoomType}>
                    <option value={null}>Select Room Type </option> 
                    {roomTypeData.map((item) => {
                      return <option value={item.id}>{item.room_type_name}</option>
                    })}
                    </Input>
                    <FormFeedback>Please select valid RoomType</FormFeedback>
                </FormGroup>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="roomFunction">Room Function</Label>
                    <Input invalid={roomFunctionValid} type="select" name="roomFunction" id="roomFunction" value={roomFunction} onChange={handleRoomFunction}>
                    <option value={null}>Select Room Function </option> 
                    {roomFunctionData.map((item) => {
                      return <option value={item.id}>{item.function_name}</option>
                    })}
                    </Input>
                    <FormFeedback>Please select valid Room Function</FormFeedback>
                </FormGroup>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="licenseType">License Type</Label>
                    <Input invalid={licenseTypeValid} type="select" name="licenseType" id="roomType" value={licenseType} onChange={handleLicenseType}>
                    <option value={null}>Select License Type</option>
                    {
                      licenseTypeList ? licenseTypeList.map((ele) => (
                        <option value={ele.id}>{ele.name}</option>
                      )) : null
                    }  
                    </Input>
                    <FormFeedback>Please select valid License Type</FormFeedback>
                </FormGroup>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="subLicenseType">Sub-License Type</Label>
                    <Input invalid={subLicenseTypeValid} type="select" name="subLicenseType" id="roomFunction" value={subLicensetype} onChange={handleSubLicenseType}>
                      <option value={null}>Select Sub License</option>
                      {
                        subLicenseList ? subLicenseList.map((ele) => (
                          <option value={ele.id}>{ele.name}</option>
                        )) : null
                      }
                    </Input>
                    <FormFeedback>Please select valid Sub License Type</FormFeedback>
                </FormGroup>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="maxcap">Maximum Capacity</Label>
                    <Input invalid={maxCapValid} type="number" min={0} name="maxcap" id="maxcap" placeholder="Enter Maximum Capacity" value={maxCap} onChange={handleMaxCapacity}>
                    </Input>
                    <FormFeedback>Please enter valid Capacity</FormFeedback>
                </FormGroup>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="legalcap">Maximum Legal Capacity</Label>
                    <Input invalid={legalCapValid} type="number" min={0} name="legalcap" id="legalcap" placeholder="Enter Legal Capacity" value={legalCap} onChange={handleLegalCapacity}>
                    </Input>
                    <FormFeedback>Please enter valid Capacity</FormFeedback>
                </FormGroup>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="stauts">Status</Label>
                    <Input invalid={classStatusValid} type="select" name="status" id="stauts" value={classStatus} onChange={handleStatus}>
                    <option value={true}>Enable</option> 
                    <option value={false}>Disabled</option> 
                    
                    </Input>
                    <FormFeedback>Please select Status</FormFeedback>
                </FormGroup>
            </Col>
        </Row>
        <Row>
          <Col>
            <div className='submit-btn'>
                <Button className="btn btn-primary" color='primary' onClick={handleregis}>{!!status && status === 'update' ? 'Update Class Room' : 'Add Class Room'}</Button>
            </div>               
          </Col>
          <Col>
            <div className='cancel-btn'>
                <Button className="btn btn-info" color='info' onClick={() => history.push('/pages/component/all-classrooms?admin=schoolAdmin') }>Cancel</Button>
            </div>               
          </Col>
        </Row>
    </Form>
</div>
  )
}

export default AddClassRooms