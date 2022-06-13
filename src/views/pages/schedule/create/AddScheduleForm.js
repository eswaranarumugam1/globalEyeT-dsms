import { useState, useEffect, Fragment } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Label, Button, Row, Col, CustomInput } from 'reactstrap'
import { useParams, useHistory } from 'react-router-dom'
import {
  AvRadioGroup,
  AvRadio,
  AvForm,
  AvGroup,
  AvField,
  AvCheckboxGroup,
  AvCheckbox
} from 'availity-reactstrap-validation-safe'
import { toast, Slide } from "react-toastify"
import { Coffee } from "react-feather"
import Avatar from "@components/avatar"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import moment from 'moment'

//services
import { AllVehicles } from "../../../../services/home/manageVehicle"
import { ScheduleService } from "../../../../services/home/schedule"
import { Circuit } from "../../../../services/home/circuit"
import { SimulatorService } from "../../../../services/home/simulator"
import { AllClassRooms } from "../../../../services/home/manageClassroom.js"
import { LicenseType, SubLicenseType, SubLicenseType1, Trainers, TrainerAvailable} from "../../../../services/home/admin"

// Error Handler
import ErrorHandler from "../../../../common/ErrorHandler"
import { valueEmptyCheck, mobileValidator, textareaValidator } from "../../../../common/Validators/CommonValidators"
import Flatpickr from 'react-flatpickr'
import validator from 'validator'
import InputPasswordToggle from '../../../../@core/components/input-password-toggle'


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
const AddScheduleForm = () => {
  const history = useHistory()
  const [scheduleType, setScheduleType] = useState('Automatic')
  const schools_id = parseInt(localStorage.getItem("schoolIdToken"))
  const [subscriptionPlanList, setSubscriptionPlanList] = useState([])
  const [selectedSubscriptionPlan, setSelectedSubscriptionPlan] = useState(null)
  const [componetList, setComponetList] = useState([])
  const [selectedComponent, setSelectedComponent] = useState({})
  const [selectedModeofLearn, setSelectedModeofLearn] = useState({})
  const [startTime, setStartTime] = useState(null)

  const [availableVehicleList, setAvailableVehicleList] = useState([])
  const [availableTrainerList, setAvailableTrainerList] = useState([])
  const [availableCircuitList, setAvailableCircuitList] = useState([])
  const [availableSimulatorList, setAvailableSimulatorList] = useState([])
  const [availableClassroomList, setAvailableClassroomList] = useState([])
  const [legalCapacity, setLegalCapacity] = useState(0)

  // const [licenseTypeList, setLicenseTypeList] = useState([])
  // const [subLicenseList, setSubLicenseList] = useState([])
  // const [sublisencetypelist1, setSubLicenseType1List] = useState([])

  // const getLicenseType = async () => {
  //   try {
  //     const response = await LicenseType(schools_id)
  //     if (response) {
  //       if (response.data) {
  //         const { data: { result: { data } } } = response.data
  //         if (data && data.length && data.length > 0) {
  //           setLicenseTypeList(data)
  //         }
  //       }
  //     }
  //   } catch (e) {
  //     ErrorHandler(e)
  //   }
  // }

  // const getSubLicenseType = async (id) => {
  //   console.log('Sublicene called')
  //   try {
  //     const response = await SubLicenseType(id)
  //     if (response) {
  //       if (response.data) {
  //         const { data: { result: { sub_license_list } } } = response.data
  //         if (sub_license_list && sub_license_list.length && sub_license_list.length > 0) {
  //           setSubLicenseList(sub_license_list)
  //         }
  //       }
  //     }
  //   } catch (e) {
  //     ErrorHandler(e)
  //   }
  // }

  // const getSubLicenseType1 = async (id) => {
  //   try {
  //     const response = await SubLicenseType1(id)
  //     if (response) {
  //       if (response.data) {
  //         const { data: { result: { sub_license_lv1 } } } = response.data
  //         if (sub_license_lv1 && sub_license_lv1.length > 0) {
  //           setSubLicenseType1List(sub_license_lv1)
  //         }
  //       }
  //     }
  //   } catch (e) {
  //     ErrorHandler(e)
  //   }
  // }
  const getSubscriptionPlan = async () => {
    try {
      const { data } = await ScheduleService.GetSubscriptionPlan(schools_id)
      if (data?.status_code === 200) {
        const { data: { result } } = data
        setSubscriptionPlanList(result)
      }
    } catch (e) {
      ErrorHandler(e)
    }
  }

  const getComponentById = async (id) => {

    try {
      const { data } = await ScheduleService.GetComponentById(id)
      if (data?.status_code === 200) {
        const { data: { result } } = data
        setSelectedComponent(result)
      }
    } catch (error) {
      console.error(error)
    }

    // try {
    //   const { data } = await ScheduleService.GetComponentById(id)
    //   if (data?.status_code === 200) {
    //     const { data: { result } } = data
    //     setSelectedComponent(result)
    //   }
    // } catch (e) {
    //   ErrorHandler(e)
    // }
  }

  const getAvailableVehicle = async () => {
    try {
      const { data } = await AllVehicles(schools_id)
      if (data?.status_code === 200) {
        const { data: { result } } = data
        setAvailableVehicleList(result.filter(ele => parseInt(ele.vehicle_operational_status) === 1))
      }
    } catch (e) {
      ErrorHandler(e)
    }
  }

  const getAvailableTrainer = async () => {
    try {
      const { data: { data: {result} } } = await Trainers(schools_id, 1)
      setAvailableTrainerList(result)
      //   setAvailableVehicleList(result.filter(ele => ele.vehicle_operational_status === '1'))
    } catch (e) {
      ErrorHandler(e)
    }
  }

  const getAvailableCircuit = async () => {
    const { data } =  await Circuit.Index()

    if (data?.status_code === 200) {
      const { data: { result } } = data
      setAvailableCircuitList(result.data)
    }
  }

  const getAvailableSimulator = async () => {
    try {
      const { data } = await SimulatorService.Index()
      if (data?.status_code === 200) {
        const { data: { result } } = data
        setAvailableSimulatorList(result.data.filter(ele => ele.status === 'Available'))
      }
    } catch (e) {
      ErrorHandler(e)
    }
  }

  const getAvailableClassRoom = async () => {
    try {
      const { data } = await AllClassRooms(schools_id)
      if (data?.status_code === 200) {
        const { data: { result } } = data
        setAvailableClassroomList(result)
        // setAvailableSimulatorList(result.data.filter(ele => ele.status === 'Available'))
      }
    } catch (e) {
      ErrorHandler(e)
    }
  }

  useEffect(() => {
    getSubscriptionPlan()
    getAvailableCircuit()
    getAvailableVehicle()
    getAvailableTrainer()
    getAvailableSimulator()
    getAvailableClassRoom()
    // getLicenseType()
  }, [])


  const getAllocatedData = async (payload) => {
    const { data: { data} }  = await ScheduleService.AllocatedData(schools_id, payload)

    // if (data.status_code === 200) {

      setAvailableCircuitList(availableCircuitList.filter(ele => {
        if (!data.circuit.includes(ele.id)) return ele
      }))
  
      setAvailableSimulatorList(availableSimulatorList.filter(ele => {
        if (!data.simulator.includes(ele.id)) return ele
      }))
  
      setAvailableTrainerList(availableTrainerList.filter(ele => {
        if (!data.trainer.includes(ele.id)) return ele
      }))

      setAvailableVehicleList(availableVehicleList.filter(ele => {
        if (!data.vehicle.includes(ele.id)) return ele
      }))

      setAvailableClassroomList(availableClassroomList.filter(ele => {
        if (!data.room.includes(parseInt(ele.id))) return ele
      }))
    // }
   
  }

  const storeSchedule = async (data) => {
    const request = {
      ...data,
      school_id: schools_id
    }

    request.weekends = request.weekends.join(',')

    try {
      const response = await ScheduleService.ScheduleStore(request)
      if (response) { 
        if (response.data) {
          const { data: { message } } = response.data
          toast.success(<SuccessContent msg={message} />, {
            transition: Slide,
            hideProgressBar: true,
            autoClose: 2000
          })
          history.push(`/pages/all_schedule`)
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
      // storePreschedule(values)
      storeSchedule(values)
    }
  }

  const validation = {
    name_english: {
      required: {value: true, errorMessage: 'Schedule name in english is required'}
    },
    name_arabic: {
      required: {value: true, errorMessage: 'Schedule name in arbic is required'}
    },
    subscription_id: {
      required: {value: true, errorMessage: 'Subscription plans is required'}
    },
    component_id: {
      required: {value: true, errorMessage: 'Components is required'}
    },
    mode_of_learn_id: {
      required: {value: true, errorMessage: 'Mode of learn is required'}
    },
    session_id: {
      required: {value: true, errorMessage: 'Session is required'}
    },
    is_private: {
      required: {value: true, errorMessage: 'Private/Public is required'}
    },
    available_vehicle: {
      required: {value: true, errorMessage: 'Available vehicle is required'}
    },
    available_trainer: {
      required: {value: true, errorMessage: 'Available trainer is required'}
    },
    available_circuit: {
      required: {value: true, errorMessage: 'Available circuit is required'}
    },
    available_simulator: {
      required: {value: true, errorMessage: 'Available simulator is required'}
    },
    available_room: {
      required: {value: true, errorMessage: 'Available room is required'}
    },
    schedule_type: {
      required: {value: true, errorMessage: 'Schedule type is required'}
    },
    status: {
      required: {value: true, errorMessage: 'Status is required'}
    },
    date: {
      required: {value: true, errorMessage: 'Date is required'}
    },
    language: {
      required: {value: true, errorMessage: 'Language is required'}
    },
    // legal_capacity: {
    //   required: {value: true, errorMessage: 'Legal capacity is required'},
    //   max: {value: 50, errorMessage: 'Can not be greater than 50'}
    // },
    session_capacity: {
      required: {value: true, errorMessage: 'Session capacity is required'}
    },
    weekends: {
      required: {value: true, errorMessage: 'Weekends is required'}
    }
  }

  const styles = {
    divBorder: {
      border: '1px solid darkgrey',
      borderRadius: '10px'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Add Schedule ({scheduleType})</CardTitle>
      </CardHeader>
      <CardBody>
        <AvForm onSubmit={onFormSubmit}>
          <Row>
            <Col sm='6'>
              <AvRadioGroup inline name="schedule_type" value={scheduleType} validate={validation.schedule_type} onChange={(e) => {
                  setScheduleType(e.target.value)
                }}>
                <Label for='schedule_type'>Schedule type</Label><br></br>
                <AvRadio label="Automatic" value="Automatic" />
                <AvRadio label="Manual" value="Manual" />
              </AvRadioGroup>
            </Col>
            <Col sm='6'>
              <AvRadioGroup inline name="status" validate={validation.status}>
                <Label for='status'>Status</Label> <br></br>
                <AvRadio label="Enable" value={1} />
                <AvRadio label="Disable" value={0} />
              </AvRadioGroup>
            </Col>
          </Row>
          <Row>
            <Col sm='6'>
              <AvGroup>
                <Label for='start_time'>Start Date & Time</Label>
                <AvField type="datetime-local" name='start_time' placeholder="Start"  onChange={(e) => { 
                  const formattedDate = moment(e.target.value).format('YYYY-MM-DD HH:mm:ss')
                  setStartTime(formattedDate)
                }} />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='end_time'>End Date & Time</Label>
                <AvField type="datetime-local" name='end_time' placeholder="End" onChange={(e) => { 
                  const formattedDate = moment(e.target.value).format('YYYY-MM-DD HH:mm:ss')
                  getAllocatedData({startTime, endTime: formattedDate})
                }} />
              </AvGroup>
            </Col>
          </Row>
          <Row>
            <Col sm='6'>
              <AvGroup>
                <Label for='name_english'>Schedule Name(English)</Label>
                <AvField name='name_english' placeholder="Enter schedule Name" validate={validation.name_english} />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='name_arabic'>Schedule Name(Arabic)</Label>
                <AvField name='name_arabic' placeholder="Enter schedule Name" validate={validation.name_arabic} />
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='subscription_id'>Subscription Plans</Label>
                <AvField type='select' name='subscription_id' placeholder="Enter Subscription Plans" validate={validation.subscription_id}
                  onChange={(e) => {
                    if (e.target.value) {
                      const subPlan = subscriptionPlanList.find(ele => e.target.value === ele.id.toString())
                      setSelectedSubscriptionPlan(subPlan)
                      setComponetList(JSON.parse(subPlan?.components))
                    //   getSubLicenseType(parseInt(subPlan.license_type_id))
                    //   getSubLicenseType1(parseInt(subPlan.sub_license_id))
                    }
                  }}>
                  <option value={null} hidden={true}>Select</option>
                  {
                    subscriptionPlanList ? subscriptionPlanList.map((ele) => (
                    <option value={ele.id}>{ele.name}</option>
                    )) : null
                  }
                </AvField>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='component_id'>Components</Label>
                <AvField type='select' name='component_id' validate={validation.component_id} 
                onChange={(e) => { 
                  getComponentById(e.target.value)
                }}>
                  <option value={null} hidden={true}>Select</option>
                  {
                    componetList ? componetList.map((ele) => (
                    <option value={ele.order}>{ele.compid}</option>
                    )) : null
                  }
                </AvField>
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='mode_of_learn_id'>Mode of learning</Label>
                <AvField type='select' name='mode_of_learn_id' validate={validation.mode_of_learn_id} 
                onChange={(e) => { 
                  // getComponentById(e.target.value)
                  const mode_of_learn = selectedComponent?.mode_of_learn.find(ele => e.target.value === ele.id.toString())
                  setSelectedModeofLearn(mode_of_learn)
                }}>
                  <option value={null} hidden={true}>Select</option>
                  {
                    selectedComponent?.mode_of_learn?.length > 0 ? selectedComponent?.mode_of_learn?.map((ele) => (
                    <option value={ele.id}>{ele.name}</option>
                    )) : null
                  }
                </AvField>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='session_id'>Session</Label>
                <AvField type='select' name='session_id' validate={validation.session_id}>
                  <option value={null} hidden={true}>Select</option>
                  {
                    selectedModeofLearn?.sessions?.length > 0 ? selectedModeofLearn?.sessions?.map((ele) => (
                    <option value={ele.id}>{ele.session_name}</option>
                    )) : null
                  }
                </AvField>
              </AvGroup>
            </Col>
            
            {/* <Col sm='6'>
              <AvGroup>
                <Label for='date'>Select Date</Label>
                <AvField type='date' name='date' validate={validation.date} />
              </AvGroup>
            </Col> */}
            <Col sm='6'>
              <AvGroup>
                <Label for='is_private'>Private / Public</Label>
                <AvField type='select' name='is_private' validate={validation.is_private}>
                  <option value={null} hidden={true}>Select</option>
                  <option value={0}>Public</option>
                  <option value={1}>Private</option>
                </AvField>
              </AvGroup>
            </Col>

          </Row>

          <Row>
            <Col sm='6'>
              <AvGroup>
                <Label for='vehicle_id'>Available Vehicle</Label>
                {/* <AvField type='select' name='vehicle_id' validate={validation.available_vehicle}> */}
                <AvField type='select' name='vehicle_id'>
                  <option value={null} hidden={true}>Select</option>
                  {
                    availableVehicleList?.length > 0 ? availableVehicleList?.map((ele) => (
                    <option key={ele.id} value={ele.id}>{ele.brand_name}</option>
                    )) : null
                  }
                </AvField>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='trainer_id'>Available Trainer</Label>
                {/* <AvField type='select' name='trainer_id' validate={validation.available_trainer}> */}
                <AvField type='select' name='trainer_id'>
                  <option value={null} hidden={true}>Select</option>
                  {
                    availableTrainerList?.length > 0 ? availableTrainerList?.map((ele) => (
                    <option key={ele.id} value={ele.id}>{ele.name}</option>
                    )) : null
                  }
                </AvField>
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='circuit_id'>Available Circuit</Label>
                {/* <AvField type='select' name='circuit_id' validate={validation.available_circuit}> */}
                <AvField type='select' name='circuit_id'>
                  <option value={null} hidden={true}>Select</option>
                  {
                    availableCircuitList?.length > 0 ? availableCircuitList?.map((ele) => (
                    <option key={ele.id} value={ele.id}>{ele.name}</option>
                    )) : null
                  }
                </AvField>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='simulator_id'>Available Simulator</Label>
                {/* <AvField type='select' name='simulator_id' validate={validation.available_simulator}> */}
                <AvField type='select' name='simulator_id'>
                  <option value={null} hidden={true}>Select</option>
                  {
                    availableSimulatorList?.length > 0 ? availableSimulatorList?.map((ele) => (
                    <option key={ele.id} value={ele.id}>{ele.id}</option>
                    )) : null
                  }
                </AvField>
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='room_id'>Available Room</Label>
                {/* <AvField type='select' name='room_id' validate={validation.available_room}> */}
                <AvField type='select' name='room_id'  
                onChange={(e) => { 
                  const room = availableClassroomList?.length > 0 ? availableClassroomList?.find(ele => e.target.value === ele.id.toString()) : null
                  setLegalCapacity(room?.room_legal_capacity)
                }}>
                  <option value={null} hidden={true}>Select</option>
                  {
                    availableClassroomList?.length > 0 ? availableClassroomList?.map((ele) => (
                    <option key={ele.id} value={ele.id}>{ele.room_name}</option>
                    )) : null
                  }
                </AvField>
              </AvGroup>
            </Col>
          </Row>
          {/* {selectedSubscriptionPlan ? <Row className="p-1 m-1" style={styles.divBorder}>
            <Col sm='6' className="mb-1">
              <span>Gender : {selectedSubscriptionPlan.gender === '0' ? 'Male' : selectedSubscriptionPlan.gender === '1' ? 'Female' : 'Others'}</span>
            </Col>
            <Col sm='6'>
              <span>License Type : {licenseTypeList.find(ele => ele.id.toString() === selectedSubscriptionPlan.license_type_id)?.name}</span>
            </Col>
            <Col sm='6'>
              <span>Sub License : {subLicenseList.find(ele => ele.id.toString() === selectedSubscriptionPlan.sub_license_id)?.name}</span>
            </Col>
            <Col sm='6'>
              <span>Sub License Level1 : {sublisencetypelist1.find(ele => ele.id.toString() === selectedSubscriptionPlan.sub_license_lv1_id)?.name}</span>
            </Col>
          </Row> : null} */}
          
          <Row>
            <Col sm='6'>
              <AvGroup>
                <Label for='language'>Language</Label>
                <AvField type='select' name='language' placeholder="Enter Language" validate={validation.language}>
                  <option value={null} hidden={true}>Select</option>
                  <option value={1}>English</option>
                  <option value={2}>Arbic</option>
                </AvField>
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='legal_capacity'>Legal Capacity</Label>
                <AvField type='number' name='legal_capacity' value={legalCapacity} disabled />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='session_capacity'>Session Capacity</Label>
                <AvField type='number' name='session_capacity' validate={validation.session_capacity} />
              </AvGroup>
            </Col>

            <Col sm='12'>
              <AvCheckboxGroup inline name='weekends' validate={validation.weekends}>
                <Label for='weekends'>Weekends (Default selection of Friday, Saturday)</Label><br></br>
                <AvCheckbox label="Monday" value="Monday" />
                <AvCheckbox label="Tuesday" value="Tuesday" />
                <AvCheckbox label="Wednesday" value="Wednesday" />
                <AvCheckbox label="Thursday" value="Thursday" />
                <AvCheckbox label="Friday" value="Friday" />
                <AvCheckbox label="Saturday" value="Saturday" />
                <AvCheckbox label="Sunday" value="Sunday" />
              </AvCheckboxGroup >
            </Col>
            

            <Col sm='12'>
              <br />
              <Button color='primary' type='submit'>
                Add Schedule
              </Button>
            </Col>
          </Row>
        </AvForm>
      </CardBody>
    </Card>
  )
}
export default AddScheduleForm
