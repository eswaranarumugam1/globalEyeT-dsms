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
import { LicenseType, SubLicenseType, SubLicenseType1, Trainers} from "../../../../services/home/admin"

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
const EditScheduleForm = () => {
  const history = useHistory()
  const paramsFromRoute = useParams()
  const [scheduleData, setScheduleData] = useState({})
  const schools_id = parseInt(localStorage.getItem("schoolIdToken"))
  const [subscriptionPlanList, setSubscriptionPlanList] = useState([])
  const [selectedSubscriptionPlan, setSelectedSubscriptionPlan] = useState(null)
  const [componetList, setComponetList] = useState([])
  const [selectedComponent, setSelectedComponent] = useState({})
  const [selectedModeofLearn, setSelectedModeofLearn] = useState({})
  const [availableVehicleList, setAvailableVehicleList] = useState([])
  const [availableTrainerList, setAvailableTrainerList] = useState([])
  const [availableCircuitList, setAvailableCircuitList] = useState([])
  const [availableSimulatorList, setAvailableSimulatorList] = useState([])
  const [availableClassroomList, setAvailableClassroomList] = useState([])
  const [startTime, setStartTime] = useState({})

  const getComponentById = async (id) => {
    try {
      const { data } = await ScheduleService.GetComponentById(id)
      if (data?.status_code === 200) {
        const { data: { result } } = data
        setSelectedComponent(result)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const getAllocatedData = async (payload) => {
    const { data: { data} }  = await ScheduleService.AllocatedData(schools_id, payload)

    setAvailableCircuitList(availableCircuitList.filter(ele => {
      if (ele.id !== scheduleData.circuit_id && !data.circuit.includes(ele.id)) return ele
    }))

    setAvailableSimulatorList(availableSimulatorList.filter(ele => {
      if (ele.id !== scheduleData.simulator_id && !data.simulator.includes(ele.id)) return ele
    }))

    setAvailableTrainerList(availableTrainerList.filter(ele => {
      if (ele.id !== scheduleData.trainer_id &&  !data.trainer.includes(ele.id)) return ele
    }))

    setAvailableVehicleList(availableVehicleList.filter(ele => {
      if (ele.id !== scheduleData.vehicle_id &&  !data.vehicle.includes(ele.id)) return ele
    }))

    setAvailableClassroomList(availableClassroomList.filter(ele => {
      if (ele.id !== scheduleData.room_id &&  !data.room.includes(parseInt(ele.id))) return ele
    }))
   
  }

  const getScheduleById = async () => {
    try {
      const { data } = await ScheduleService.ScheduleShow(paramsFromRoute.id)
      if (data.status_code && data.status_code === 200) {
        const { data: { result } } = data
        result.weekends = result.weekends.split(',')
        result.start_time = moment(result.start_time, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DDTHH:mm')
        result.end_time = moment(result.end_time, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DDTHH:mm')
        setScheduleData(result)
      }
      } catch (e) {
      console.error(e)
    }
  }

  const getAvailableVehicle = async () => {
    try {
      const { data } = await AllVehicles(schools_id)
      if (data?.status_code === 200) {
        const { data: { result } } = data
        setAvailableVehicleList(result.filter(ele => parseInt(ele.vehicle_operational_status) === 1))
      }
    } catch (e) {
      console.error(e)
    }
  }

  const getAvailableTrainer = async () => {
    try {
      const { data } = await Trainers(schools_id, 1)
      if (data?.status_code === 200) {
        const { data: { result } } = data
        setAvailableTrainerList(result)
      //   setAvailableVehicleList(result.filter(ele => ele.vehicle_operational_status === '1'))
      }
    } catch (e) {
      console.error(e)
    }
  }

  const getAvailableCircuit = async () => {
    try {
      const { data } = await Circuit.Index()
      if (data?.status_code === 200) {
        const { data: { result } } = data
        // setAvailableCircuitList(result.data.filter(ele => ele.status === '1'))
        setAvailableCircuitList(result.data)
      }
    } catch (e) {
      console.error(e)
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
      console.error(e)
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
      console.error(e)
    }
  }

  const setSubscriptionData = async () => {
    const { data } = await ScheduleService.GetSubscriptionPlan(schools_id)
    if (data?.status_code === 200) {
      let { data: { result } } = data
      result = result.map(ele => {
        ele.components = JSON.parse(ele.components)
        return ele
      })

      setSubscriptionPlanList(result)
      const subPlan = result.find(ele => scheduleData.subscription_id === ele.id)
      setSelectedSubscriptionPlan(subPlan)
    }
  }

  const setComponentData = async () => {
    if (selectedSubscriptionPlan) {
      setComponetList(selectedSubscriptionPlan.components)
      getComponentById(scheduleData.component_id)
    }
  }

  const setModeOfLearnData = async () => {
    if (selectedComponent) {
      const mode_of_learn = selectedComponent?.mode_of_learn?.find(ele => scheduleData.mode_of_learn_id === ele.id)
      setSelectedModeofLearn(mode_of_learn)
    }
  }

  useEffect(() => {
    getScheduleById()
    getAvailableVehicle()
    getAvailableTrainer()
    getAvailableCircuit()
    getAvailableSimulator()
    getAvailableClassRoom()
  }, [])

  useEffect(() => {
    setSubscriptionData()
  }, [scheduleData])

  useEffect(() => {
    setComponentData()
  }, [selectedSubscriptionPlan])

  useEffect(() => {
    setModeOfLearnData()
  }, [selectedComponent])

  // useEffect(() => {
  //   getAllocatedData({startTime: moment(scheduleData.start_time).format('YYYY-MM-DD HH:mm:ss'), endTime: moment(scheduleData.end_time).format('YYYY-MM-DD HH:mm:ss')})
  // }, [scheduleData, availableCircuitList, availableClassroomList, availableTrainerList, availableVehicleList, availableSimulatorList])
  

  const updateSchedule = async (data) => {
    const request = {
      ...data,
      school_id: schools_id
    }

    request.weekends = request.weekends ? request.weekends.join(',') : scheduleData.weekends.join(',')

    try {
      const response = await ScheduleService.ScheduleUpdate(paramsFromRoute.id, request)
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
      updateSchedule(values)
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
    legal_capacity: {
      required: {value: true, errorMessage: 'Legal capacity is required'},
      max: {value: 50, errorMessage: 'Can not be greater than 50'}
    },
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
        <CardTitle tag='h4'>Add Schedule ({scheduleData.schedule_type})</CardTitle>
      </CardHeader>
      <CardBody>
        <AvForm onSubmit={onFormSubmit}>
          <Row>
            <Col sm='6'>
              <AvGroup>
                <Label for='name_english'>Schedule Name(English)</Label>
                <AvField name='name_english' placeholder="Enter schedule Name" value={scheduleData.name_english} validate={validation.name_english} />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='name_arabic'>Schedule Name(Arabic)</Label>
                <AvField name='name_arabic' placeholder="Enter schedule Name" value={scheduleData.name_arabic} validate={validation.name_arabic} />
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='subscription_id'>Subscription Plans</Label>
                <AvField type='select' name='subscription_id' value={scheduleData.subscription_id} validate={validation.subscription_id}
                  onChange={(e) => {
                    if (e.target.value) {
                      const subPlan = subscriptionPlanList.find(ele => e.target.value === ele.id.toString())
                      setSelectedSubscriptionPlan(subPlan)
                      setComponetList(subPlan?.components)
                    }
                  }}>
                  <option value={null} hidden={true}>Select</option>
                  {
                    subscriptionPlanList ? subscriptionPlanList.map((ele) => (
                    <option key={ele.id} value={ele.id}>{ele.name}</option>
                    )) : null
                  }
                </AvField>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='component_id'>Components</Label>
                <AvField type='select' name='component_id' value={scheduleData.component_id} validate={validation.component_id} 
                onChange={(e) => { 
                  getComponentById(e.target.value)
                }}>
                  <option value={null} hidden={true}>Select</option>
                  {
                    componetList ? componetList.map((ele) => (
                    <option key={ele.compid} value={ele.order}>{ele.compid}</option>
                    )) : null
                  }
                </AvField>
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='mode_of_learn_id'>Mode of learning</Label>
                <AvField type='select' name='mode_of_learn_id' value={scheduleData.mode_of_learn_id} validate={validation.mode_of_learn_id} 
                onChange={(e) => { 
                  // getComponentById(e.target.value)
                  const mode_of_learn = selectedComponent?.mode_of_learn.find(ele => e.target.value === ele.id.toString())
                  setSelectedModeofLearn(mode_of_learn)
                }}>
                  <option value={null} hidden={true}>Select</option>
                  {
                    selectedComponent?.mode_of_learn?.length > 0 ? selectedComponent?.mode_of_learn?.map((ele) => (
                    <option key={ele.id} value={ele.id}>{ele.name}</option>
                    )) : null
                  }
                </AvField>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='session_id'>Session</Label>
                <AvField type='select' name='session_id' value={scheduleData.session_id} validate={validation.session_id}>
                  <option value={null} hidden={true}>Select</option>
                  {
                    selectedModeofLearn?.sessions?.length > 0 ? selectedModeofLearn?.sessions?.map((ele) => (
                    <option key={ele.id} value={ele.id}>{ele.session_name}</option>
                    )) : null
                  }
                </AvField>
              </AvGroup>
            </Col>
            
            {/* <Col sm='6'>
              <AvGroup>
                <Label for='date'>Select Date</Label>
                <AvField type='date' name='date' value={scheduleData.date} validate={validation.date} />
              </AvGroup>
            </Col> */}
            <Col sm='6'>
              <AvGroup>
                <Label for='is_private'>Private / Public</Label>
                <AvField type='select' name='is_private' value={scheduleData.is_private} validate={validation.is_private}>
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
                <Label for='start_time'>Start Date & Time</Label>
                <AvField type="datetime-local" name='start_time' placeholder="Start" value={scheduleData.start_time}  onChange={(e) => { 
                  const formattedDate = moment(e.target.value).format('YYYY-MM-DD HH:mm:ss')
                  setStartTime(formattedDate)
                }} />
              </AvGroup>
            </Col>
            <Col sm='6'>
            <AvGroup>
                <Label for='end_time'>End Date & Time</Label>
                <AvField type="datetime-local" name='end_time' placeholder="End" value={scheduleData.start_time} onChange={(e) => { 
                  const formattedDate = moment(e.target.value).format('YYYY-MM-DD HH:mm:ss')
                  getAllocatedData({startTime, endTime: formattedDate})
                }} />
              </AvGroup>
            </Col>
          </Row>

          <Row>
            <Col sm='6'>
              <AvGroup>
                <Label for='vehicle_id'>Available Vehicle</Label>
                <AvField type='select' name='vehicle_id' value={scheduleData.vehicle_id}>
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
                <AvField type='select' name='trainer_id' value={scheduleData.trainer_id}>
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
                <AvField type='select' name='circuit_id' value={scheduleData.circuit_id}>
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
                <AvField type='select' name='simulator_id' value={scheduleData.simulator_id}>
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
                <AvField type='select' name='room_id' value={scheduleData.room_id}>
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
          
          <Row>
            <Col sm='6'>
              <AvRadioGroup inline name="schedule_type" value={scheduleData.schedule_type} validate={validation.schedule_type} onChange={(e) => {
                  setScheduleType(e.target.value)
                }}>
                <Label for='schedule_type'>Schedule type</Label><br></br>
                <AvRadio label="Automatic" value="Automatic" />
                <AvRadio label="Manual" value="Manual" />
              </AvRadioGroup>
            </Col>
            <Col sm='6'>
              <AvRadioGroup inline name="status" value={parseInt(scheduleData.status)} validate={validation.status}>
                <Label for='status'>Status</Label> <br></br>
                <AvRadio label="Enable" value={1} />
                <AvRadio label="Disable" value={0} />
              </AvRadioGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='language'>Language</Label>
                <AvField type='select' name='language' value={scheduleData.language} validate={validation.language}>
                  <option value={null} hidden={true}>Select</option>
                  <option value={1}>English</option>
                  <option value={2}>Arbic</option>
                </AvField>
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='legal_capacity'>Legal Capacity</Label>
                <AvField type='number' name='legal_capacity' value={scheduleData.legal_capacity} validate={validation.legal_capacity} />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='session_capacity'>Session Capacity</Label>
                <AvField type='number' name='session_capacity' value={scheduleData.session_capacity} validate={validation.session_capacity} />
              </AvGroup>
            </Col>

            {/* <Col sm='12'>
              <AvCheckboxGroup inline name='weekends' defaultValue={scheduleData.weekends} validate={validation.weekends}>
                <Label for='weekends'>Weekends (Default selection of Friday, Saturday)</Label><br></br>
                <AvCheckbox label="Monday" value="Monday" />
                <AvCheckbox label="Tuesday" value="Tuesday" />
                <AvCheckbox label="Wednesday" value="Wednesday" />
                <AvCheckbox label="Thursday" value="Thursday" />
                <AvCheckbox label="Friday" value="Friday" />
                <AvCheckbox label="Saturday" value="Saturday" />
                <AvCheckbox label="Sunday" value="Sunday" />
              </AvCheckboxGroup >
            </Col> */}
            

            <Col sm='12'>
              <br />
              <Button color='primary' type='submit'>
                Edit Schedule
              </Button>
            </Col>
          </Row>
        </AvForm>
      </CardBody>
    </Card>
  )
}
export default EditScheduleForm
