// ** Styles
import '@styles/react/apps/app-users.scss'
import { AllVehicleType, EditVehicle, AllVehicleBrand, AllVehiclePurpose } from "../../../services/home/manageVehicle"
import { useState, useEffect, Fragment } from 'react'
import { Row, Col, Container, Form, Input, FormGroup, Label, Button, FormFeedback} from 'reactstrap'
import {Coffee } from 'react-feather'
import ErrorHandler from "../../../common/ErrorHandler"
import { toast, Slide } from "react-toastify"
import Avatar from "@components/avatar"
import '../classRoom/classroom.scss'
import { authConfig } from "../../../api-config/authConfig"
import Headers from "../../../api-config/Headers"
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
const modelyear = Array.from({length: 400}, (_, i) => i + 1800) 
const AddClassRooms = () => {
  const history = useHistory()
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [vehicleType, setVehicleType] = useState(null)
  const [purpose, setPurpose] = useState(null)
  const [registration, setregistration] = useState('')
  const [scheduled, setScheduled] = useState('')
  const [passenger, setpassenger] = useState('')
  const [chassis, setChassis] = useState('')
  const [year, setYear] = useState(null)
  const [legal, setLegal] = useState(null)
  const [insurance, setInsurance] = useState('')
  const [gender, setGender] = useState('')
  const [operational, setOperational] = useState('')
  const [maintainance, setMaintainance] = useState('')
  const [delay, setDelay] = useState(null)
  const [gearType, setGearType] = useState('')
  const [rentedFrom, setRentedFrom] = useState('')
  const [rentedTo, setRentedTo] = useState('')
  const [estimatedDelay, setEstimatedDelay] = useState('')
  
  const [brandValid, setbrandValid] = useState(false)
  const [modelValid, setmodelValid] = useState(false)
  const [vehicleTypeValid, setvehicleTypeValid] = useState(false)
  const [purposeValid, setpurposeValid] = useState(false)
  const [registrationValid, setregistrationValid] = useState(false)
  const [scheduledValid, setscheduledValid] = useState(false)
  const [passengerValid, setpassengerValid] = useState(false)
  const [chassisvalid, setchassisvalid] = useState(false)
  const [yearValid, setyearValid] = useState(false)
  const [legalValid, setlegalValid] = useState(false)
  const [insuranceValid, setinsuranceValid] = useState(false)
  const [gendervalid, setgendervalid] = useState(false)
  const [operationalvalid, setoperationalvalid] = useState(false)
  const [maintainanceValid, setmaintainanceValid] = useState(false)
  const [delayValid, setdelayValid] = useState(false)
  const [gearTypeValid, setGearTypeValid] = useState(false)
  const [rentedFromValid, setRentedFromValid] = useState(false)
  const [rentedToValid, setRentedToValid] = useState(false)
  const [estimatedDelayValid, setEstimatedDelayValid] = useState(false)

  const [vehicleTypeData, setvehicleTypeData] = useState([])
  const [vehicleBrandData, setvehicleBrandData] = useState([])
  const [vehiclePurpose, setvehiclePurpose] = useState([])

  const [status, setStatus] = useState('add')
  const [primaryId, setPrimaryId] = useState(null)
  const schoolId = parseInt(localStorage.getItem("schoolIdToken"))


  const getVehicleType = async () => {
    const response = await AllVehicleType(schoolId)
    if (response) {
      if (response.data) {
        const { result } = response.data.data
        setvehicleTypeData(result)
      }
    }
  }

  const EditVehicles = async (id) => {
    const response = await EditVehicle(id)
    if (response) {
      if (response.data) {
        const { result } = response.data.data
            setBrand(result[0].vehicle_brand)
            setModel(result[0].vehicle_model)
            setVehicleType(result[0].vehicle_type)
            setPurpose(result[0].vehicle_purpose)
            setregistration(result[0].vehicle_registration_no)
            setScheduled(result[0].vehicle_scheduled_maintanance)
            setpassenger(result[0].vehicle_passenger_capacity)
            setChassis(result[0].vehicle_chasis_no)
            setYear(result[0].vehicle_model_year)
            setLegal(result[0].vehicle_legal_status)
            setInsurance(result[0].vehicle_insurance_expiry_date)
            setGender(result[0].vehicle_for_gender)
            setOperational(result[0].vehicle_operational_status)
            setMaintainance(result[0].vehicle_maintanance_scheduled_cycle)
            setGearType(result[0].vehicle_gear_type)
            setRentedFrom(result[0].vehicle_rented_from)
            setRentedTo(result[0].vehicle_rented_to)
            setEstimatedDelay(result[0].vehicle_estimated_delay)
            setDelay(result[0].vehicle_usage_status)
            setStatus('update')
            setPrimaryId(id)
      }
    }
  }

  const getVehicleBrand = async () => {
    const response = await AllVehicleBrand(schoolId)
    if (response) {
      if (response.data) {
        const { result } = response.data.data
        setvehicleBrandData(result)
      }
    }
  }
  const getVehiclePurpose = async () => {
    const response = await AllVehiclePurpose(schoolId)
    if (response) {
      if (response.data) {
        const { result } = response.data.data
        setvehiclePurpose(result)
      }
    }
  }
  const handleregis = (event) => {
      //debugger
    function checkValidRegistation(regno) {
        return /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(regno)
    }
    function checkVehicleType(vhclType) {
        return /^[A-Za-z\s]*$/.test(vhclType)
    }
    console.log(checkValidRegistation(registration), registration)
    if (!!brand && !!model && !!vehicleType && checkVehicleType(vehicleType) && !!purpose && !!registration && !checkValidRegistation(registration) && !!scheduled && !!passenger && !!chassis && !!year && !!legal && !!insurance && !!gender && !!operational && !!maintainance && !!delay && !!gearType) {
        // if(operational === '2' && !!estimatedDelay )
        // estimatedDelay rentedTo rentedFrom 
        const reqObj = {
            vehicle_brand: brand,
            vehicle_model: model,
            vehicle_type: vehicleType,
            vehicle_gear_type: +(gearType),
            vehicle_purpose: purpose,
            vehicle_registration_no: registration,
            vehicle_chasis_no: chassis,
            vehicle_passenger_capacity: +(passenger),
            vehicle_model_year: +(year),
            vehicle_legal_status: +(legal),
            vehicle_rented_from: '',
            vehicle_rented_to: '',
            vehicle_insurance_expiry_date: insurance,
            vehicle_for_gender: +(gender),
            vehicle_operational_status: +(operational),
            vehicle_estimated_delay: '',
            vehicle_maintanance_scheduled_cycle: +(maintainance),
            vehicle_scheduled_maintanance: scheduled,
            vehicle_usage_status: +(delay),
            vehicle_school_id: schoolId
        }
        let callAPIFlag = 1
        if (legal === '2') {
            if (!!rentedTo && !!rentedFrom) {
                reqObj.vehicle_rented_from = rentedFrom
                reqObj.vehicle_rented_to = rentedTo
                setRentedToValid(false)
                setRentedFromValid(false)
            } else {
                callAPIFlag = 0
                if (!rentedTo) setRentedToValid(true)
                if (!rentedFrom) setRentedFromValid(true)
            }
        }
        if (operational === '2') {
            if (!!estimatedDelay) {
                reqObj.vehicle_estimated_delay = estimatedDelay
                setEstimatedDelayValid(false)
            } else {
                callAPIFlag = 0
                setEstimatedDelayValid(true)
            }
        }
        if (status === 'update') reqObj.school_id = primaryId
        if (!!callAPIFlag) {
            if (status === 'update') {
                authConfig.post(`/update_vehicle`, reqObj, {
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
                             setTimeout(() => {
                              window.location.href  = '/pages/component/all-vehicles?admin=schoolAdmin'
                             }, 1500)
                    }
                    return response
                })
                .catch((error) => {
                    return error
                })
            } else {
                authConfig.post(`/add_vehicle`, reqObj, {
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
                             setTimeout(() => {
                                window.location.href  = '/pages/component/all-vehicles?admin=schoolAdmin'
                               }, 1500)                            
                    }
                    return response
                })
                .catch((error) => {
                    return error
                })
            }
            
        }     
    } else {
      if (!brand) {
          setbrandValid(true)
      }
      if (!model) {
        setmodelValid(true)
      }   
      if (!checkVehicleType(vehicleType) || vehicleType === "Select Vehicle Type" || !vehicleType) {
        setvehicleTypeValid(true)
      }
    
      if (!purpose) {
          setpurposeValid(true)
      }
      if (checkValidRegistation(registration) || !registration) {
          setregistrationValid(true)
      }
      if (!scheduled) {
          setscheduledValid(true)
      }
      if (!passenger) {
          setpassengerValid(true)
      }
      if (!chassis) {
        setchassisvalid(true)
      }                
      if (!year) {
          setyearValid(true)
      }
      if (!legal) {
          setlegalValid(true)
      }
      if (!insurance) {
          setinsuranceValid(true)
      }
      if (!gender) {
          setgendervalid(true)
      }
      if (!operational) {
          setoperationalvalid(true)
      }
      if (!maintainance) {
        setmaintainanceValid(true)
      }                
      if (!delay) {
          setdelayValid(true)
      }                
      if (!gearType) {
          setGearTypeValid(true)
      }
    }
}
function handleBrand (e) {
setBrand(e.target.value)
if (!!e.target.value) {
    setbrandValid(false)
}
}
function handleModel (e) {
setModel(e.target.value)
if (!!e.target.value) {
  setmodelValid(false)
}
}
function handleVehicleType (e) {
setVehicleType(e.target.value)
console.log(e.target.value)
if (!!e.target.value) {
    setvehicleTypeValid(false)
}
}
function handlePurpose (e) {
setPurpose(e.target.value)
if (!!e.target.value) {
  setpurposeValid(false)
}
}
function handleRegister (e) {
setregistration(e.target.value)
if (!!e.target.value) {
  setregistrationValid(false)
}
}
function handleScheduled (e) {
setScheduled(e.target.value)
if (!!e.target.value) {
    setscheduledValid(false)
}
}
function handleChassis (e) {
setChassis(e.target.value)
if (!!e.target.value) {
    setchassisvalid(false)
}
}
function handlePassenger (e) {
setpassenger(e.target.value)
if (!!e.target.value) {
    setpassengerValid(false)
}
}
function handleYear (e) {
setYear(e.target.value)
if (!!e.target.value) {
    setyearValid(false)
}
}
function handlelegal (e) {
setLegal(e.target.value)
if (!!e.target.value) {
    setlegalValid(false)
}
}
function handleInsurance (e) {
setInsurance(e.target.value)
if (!!e.target.value) {
    setinsuranceValid(false)
}
}
function handledRentedFrom (e) {
setRentedFrom(e.target.value)
if (!!e.target.value) {
    setRentedFromValid(false)
}
}
function handleRentedTo (e) {
setRentedTo(e.target.value)
if (!!e.target.value) {
    setRentedToValid(false)
}
}
function handleOperational (e) {
setOperational(e.target.value)
if (!!e.target.value) {
    setoperationalvalid(false)
}
}
function handleestimatedDelay (e) {
setEstimatedDelay(e.target.value)
if (!!e.target.value) {
    setEstimatedDelayValid(false)
}
}
function handleMaintainance (e) {
setMaintainance(e.target.value)
if (!!e.target.value) {
    setmaintainanceValid(false)
}
}
function handleDelay (e) {
setDelay(e.target.value)
if (!!e.target.value) {
    setdelayValid(false)
}
}
function handleGender (e) {
setGender(e.target.value)
if (!!e.target.value) {
    setgendervalid(false)
}
}
function handleVehicleGearType (e) {
setGearType(e.target.value)
if (!!e.target.value) {
    setGearTypeValid(false)
}
}
useEffect(() => {
  getVehiclePurpose()
  getVehicleBrand()
  getVehicleType()
  const params = queryString.parse(window.location.search)
  if (!!params.id && !!params.st && params.st === 'update') {
    setPrimaryId(params.id)
    setStatus('update')
    EditVehicles(params.id)
  }
}, [])
  return (
    <div className="add-container">
    <div className="title-block">
        Vehicles
        <div className="title-bottom-strip"></div>
    </div>
       <div className="sub_head">
        Add/Update Vehicles
        <div className="title-bottom-strip"></div>
    </div>
    <Form className="add-form">
        <Row className="justify-content-between">
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="brand">Vehicle Brand</Label>
                    <Input invalid={brandValid} type="select" name="brand" id="brand" placeholder="Enter Vehicle Brand i.e. Tata" value={brand} onChange={handleBrand}>
                    <option value={null}>Select Vehicle Brand </option> 
                    {vehicleBrandData.map((item) => {
                      return <option value={item.id}>{item.brand_name}</option>
                    })} 
                    </Input>
                    <FormFeedback>Please enter valid Brand Name</FormFeedback>
                </FormGroup>
            </Col>
             <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="model">Vehicle Model</Label>
                    <Input invalid={modelValid} type="text" name="model" id="model" placeholder="Enter Vehicle Model" value={model} onChange={handleModel}/>
                    <FormFeedback>Please enter valid Model Name</FormFeedback>
                </FormGroup>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="vehicleType">Vehicle Type</Label>
                    <Input invalid={vehicleTypeValid} type="select" name="vehicleType" id="vehicleType" Placeholder="Enter vehicle Type i.e. Bike" value={vehicleType} onChange={handleVehicleType}>
                    <option value={null}>Select Vehicle Type </option> 
                    {vehicleTypeData.map((item) => {
                      return <option value={item.id}>{item.type_name}</option>
                    })}                    
                    </Input>
                    <FormFeedback>Please enter valid Vehicle Type</FormFeedback>
                </FormGroup>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="vehiclegearType">Vehicle Gear Type</Label>
                    <Input invalid={gearTypeValid} type="select" name="vehiclegearType" id="vehiclegearType" Placeholder="select vehicle Gear Type" value={gearType} onChange={handleVehicleGearType}>
                    <option value={null}>Select Gear Type </option> 
                    <option value={1}>Automatic </option> 
                    <option value={2}>Manual</option> 
                    </Input>
                    <FormFeedback>Please select valid Vehicle gear Type</FormFeedback>
                </FormGroup>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="roomFunction">Vehicle Purpose</Label>
                    <Input invalid={purposeValid} type="select" name="roomFunction" id="roomFunction" Placeholder="Enter vehicle Purpose i.e. training" value={purpose} onChange={handlePurpose}>
                    <option value={null}>Select Vehicle Purpose </option> 
                    {vehiclePurpose.map((item) => {
                      return <option value={item.id}>{item.purpose}</option>
                    })} 
                    </Input>
                    <FormFeedback>Please enter valid Purpose</FormFeedback>
                </FormGroup>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="register">Registration No</Label>
                    <Input invalid={registrationValid} type="text" name="register" id="register" Placeholder="Enter vehicle Registration Number" value={registration} onChange={handleRegister}>
                    </Input>
                    <FormFeedback>Please enter valid Registration Number</FormFeedback>
                </FormGroup>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="chassis">Chassis No</Label>
                    <Input invalid={chassisvalid} type="text" name="chassis" id="chassis" Placeholder="Enter vehicle Chassis Number" value={chassis} onChange={handleChassis}>
                    </Input>
                    <FormFeedback>Please enter valid Purpose</FormFeedback>
                </FormGroup>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="roomFunction1">Passenger Capacity</Label>
                    <Input invalid={passengerValid} type="text" name="roomFunction1" id="roomFunction1" Placeholder="Enter vehicle capacity of Passengers" value={passenger} onChange={handlePassenger}>
                    </Input>
                    <FormFeedback>Please enter valid vehicle capacity of Passengers</FormFeedback>
                </FormGroup>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="roomFunction2">Vehicle Year Model</Label>
                    <Input invalid={yearValid} type="select" name="roomFunction2" id="roomFunction2" value={year} onChange={handleYear}>
                    <option value={null}>Select Model year </option> 
                    {modelyear.map((item) => {
                      return <option value={item}>{item}</option>
                    })}
                    </Input>
                    <FormFeedback>Please enter valid Year</FormFeedback>
                </FormGroup>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="roomFunction3">Vehicle Legal Status</Label>
                    <Input invalid={legalValid} type="select" name="roomFunction3" id="roomFunction3" value={legal} onChange={handlelegal}>
                    <option value={null}>Select Legal Status </option> 
                    <option value={1}>Purchased </option> 
                    <option value={2}>Rented</option> 
                    </Input>
                    <FormFeedback>Please enter valid Status</FormFeedback>
                </FormGroup>
            </Col>
            {!!legal && legal === '2' ? <>
                { console.log(legal) }
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="roomFunction43">Rented From Date</Label>
                    <Input invalid={rentedFromValid} type="date" name="roomFunction43" id="roomFunction43" Placeholder="Enter from date of rent" value={rentedFrom} onChange={handledRentedFrom}>
                    </Input>
                    <FormFeedback>Please enter valid Date</FormFeedback>
                </FormGroup>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="roomFunction42">Rented To Date</Label>
                    <Input invalid={rentedToValid} type="date" name="roomFunction42" id="roomFunction42" Placeholder="Enter to date of rent" value={rentedTo} onChange={handleRentedTo}>
                    </Input>
                    <FormFeedback>Please enter valid Date</FormFeedback>
                </FormGroup>
            </Col>
            </> : <></> }
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="roomFunction4">Insurance Expiry Date</Label>
                    <Input invalid={insuranceValid} type="date" name="roomFunction4" id="roomFunction4" Placeholder="Enter select Expiry date of Insurance" value={insurance} onChange={handleInsurance}>
                    </Input>
                    <FormFeedback>Please enter valid Date</FormFeedback>
                </FormGroup>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="maxcap">Gender Type</Label>
                    <Input invalid={gendervalid} type="select" name="maxcap" id="maxcap" value={gender} onChange={handleGender}>
                    <option value={null}>Select Gender </option> 
                    <option value={1}>Male </option> 
                    <option value={2}>Female</option> 
                    <option value={3}>Both</option> 
                    </Input>
                    <FormFeedback>Please select valid gender</FormFeedback>
                </FormGroup>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="legalcap">Vehicle operational Status</Label>
                    <Input invalid={operationalvalid} type="select"  name="legalcap" id="legalcap" value={operational} onChange={handleOperational}>
                    <option value={null}>Select operational Status </option> 
                    <option value={1}>Operational </option> 
                    <option value={2}>Under Maintainance</option> 
                    </Input>
                    <FormFeedback>Please select valid status</FormFeedback>
                </FormGroup> 
            </Col>
            {!!operational && operational === '2' ? <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
            <FormGroup>
                <Label for="roomFunctwion4">Estimated Delay</Label>
                <Input invalid={estimatedDelayValid} type="date" name="roomFunctwion4" id="roomFunctwion4" Placeholder="Enter estimated Delay Date" value={estimatedDelay} onChange={handleestimatedDelay}>
                </Input>
                <FormFeedback>Please enter valid Date</FormFeedback>
            </FormGroup>
        </Col> : <></> }
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="legalcap322">Maintainance Scheduled Cycle</Label>
                    <Input invalid={maintainanceValid} type="text" name="legalcap322" id="legalcap322" placeholder="Maintainance Scheduled Cycle" value={maintainance} onChange={handleMaintainance}>
                    </Input>
                    <FormFeedback>Please enter valid Maintainance Scheduled Cycle</FormFeedback>
                </FormGroup>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="legalcapp">Scheduled Maintainance</Label>
                    <Input invalid={scheduledValid} type="date" name="legalcapp" id="legalcapp" placeholder="Enter Scheduled Maintainance Date" value={scheduled} onChange={handleScheduled}>
                    </Input>
                    <FormFeedback>Please enter Scheduled Maintainance</FormFeedback>
                </FormGroup>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="legalcap11">Usage Status</Label>
                    <Input invalid={delayValid} type="select" name="legalcap11" id="legalcap11" value={delay} onChange={handleDelay}>
                    <option value={null}>Select Usage Status </option> 
                    <option value={1}>Operation </option> 
                    <option value={2}>Backup</option> 
                    </Input>
                    <FormFeedback>Please enter valid Status</FormFeedback>
                </FormGroup>
            </Col>
        </Row>
        <Row>
            <Col>
                <div className='submit-btn m-0'>
                    <Button className="" color='primary' onClick={handleregis}>{!!status && status === 'update' ? 'Update Vehicle' : 'Add Vehicle'}</Button>
                </div>               
            </Col>
            <Col>
                <div className='cancel-btn m-0'>
                    <Button className="" color='info' onClick={() => history.push('/pages/component/all-vehicles')}>Cancel</Button>
                </div>  
            </Col>
        </Row>
    </Form>
</div>
  )
}

export default AddClassRooms