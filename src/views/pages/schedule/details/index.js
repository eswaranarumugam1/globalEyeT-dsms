import { useState, useEffect, Fragment } from 'react'
import { useParams, useHistory} from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardBody, Label, Button, Row, Col } from 'reactstrap'
import { AvForm, AvGroup, AvField, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation-safe'
import { ScheduleService } from "../../../../services/home/schedule"
import { Trainers } from "../../../../services/home/admin"
import ErrorHandler from "../../../../common/ErrorHandler"
import { toast, Slide } from "react-toastify"
import { Coffee } from "react-feather"


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

const ScheduleDetail = () => {
  const paramsFromRoute = useParams()
  const history = useHistory()
  const [scheduleData, setScheduleData] = useState({})
  const schools_id = parseInt(localStorage.getItem("schoolIdToken"))
  const [roomList, setRoomList] = useState([])
  const [trainerList, setTrainerList] = useState([])
  const [vehicleList, setVehicleList] = useState([])
  // const [selectedTab, setTab] = useState('vehicle')
  // const [trainersChecks, setTrainersChecks] = useState('')


  const getScheduleById = async () => {
    try {
      const { data } = await ScheduleService.GetPreScheduleByID(paramsFromRoute.id)
      if (data.status_code && data.status_code === 200) {
        const { data: { result } } = data
        setScheduleData(result)
      }
      } catch (e) {
      ErrorHandler(e)
    }
  }

  const getRooms = async () => {
    try {
      const { data } = await ScheduleService.GetRooms(schools_id)
      if (data.status_code && data.status_code === 200) {
        const { data: { result } } = data
        setRoomList(result)
      }
      } catch (e) {
      ErrorHandler(e)
    }
  }

  const getTrainerlist = async () => {
    try {
      const { data : { data } } = await Trainers(schools_id, 0)
      if (data) {
        setTrainerList(data.result)
      } else {
        toast.error(<ErrorContent msg={data.errors.msg} />, {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000
        })
      }
    } catch (e) {
      ErrorHandler(e)
    }
  }

  const getVehicleList = async () => {
    try {
      const { data } = await ScheduleService.GetVehicleList(schools_id)
      if (data.status_code && data.status_code === 200) {
        const { data: { result } } = data
        setVehicleList(result)
      }
      } catch (e) {
      ErrorHandler(e)
    }
  }

  useEffect(() => {
    getScheduleById()
    getRooms()
    getTrainerlist()
    getVehicleList()
  }, [])

  const storeSchedule = async (data) => {
    const request = {
      preschedule_id: paramsFromRoute.id,
      student_per_session: data.student_per_session,
      book: data.book,
      num_of_sessions: data.num_of_sessions,
      trainer_mode: data.trainer_mode,
      allowed_num_of_session_per_day_per_student: data.allowed_num_of_session_per_day_per_student,
      repeat_num_of_days: data.repeat_num_of_days,
      available_trainers: 'trainer1,trainer2',
      backup_trainers: 'traiter3,trainer,4',
      available_vehicles: 'v1,v2',
      backup_vehicle: 'v3,v4',
      school_id: schools_id
    }

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


  const storeAllocate = async (data) => {
    const request = {
      schedule_id: paramsFromRoute.id,
      allocated_teacher: data.allocated_teacher,
      teacher_start_session: data.teacher_start_session,
      teacher_end_session: data.teacher_end_session,
      allocated_vehicles: data.allocated_vehicles,
      vehicle_start_session: data.vehicle_start_session,
      vehicle_end_session: data.vehicle_end_session
    }

    try {
      const response = await ScheduleService.AllocateStore(request)
      if (response) { 
        if (response.data) {
          const { data: { success } } = response.data
          if (success === 'success') {
            console.log('Schedule called', response.data)
            storeSchedule(data)
          }
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
      storeAllocate(values)
    }
  }

  const validation = {
    student_per_session: {
      required: {value: true, errorMessage: 'Students per session is required'}
    },
    book: {
      required: {value: true, errorMessage: 'Book Space/Room/Circuit is required'}
    },
    num_of_sessions: {
      required: {value: true, errorMessage: 'No of sessions is required'}
    },
    allowed_num_of_session_per_day_per_student: {
      required: {value: true, errorMessage: 'Allowed no of sessions per day per student is required'}
    },
    repeat_num_of_days: {
      required: {value: true, errorMessage: 'Repeat no of days is required'}
    }
    // status: {
    //   required: {value: true, errorMessage: 'Status is required'}
    // },
    // date: {
    //   required: {value: true, errorMessage: 'Date is required'}
    // },
    // language: {
    //   required: {value: true, errorMessage: 'Language is required'}
    // },
    // legal_capacity: {
    //   required: {value: true, errorMessage: 'Legal capacity is required'},
    //   max: {value: 50, errorMessage: 'Can not be greater than 50'}
    // },
    // avoided_days: {
    //   required: {value: true, errorMessage: 'Avoided days is required'}
    // }
  }

  const styles = {
    divBorder: {
      border: '1px solid darkgrey',
      borderRadius: '10px'
    },
    tabContainer: {
      margin: '0em 5em',
      border: '1px solid #D4D8DB',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column'
    },
    tab: {
      display: 'flex',
      justifyContent: 'center',
      width: '50%',
      padding: '1em 0em'
    },
    highlightedTab: {
      backgroundColor: '#DDDDDD',
      color: '#6F7B85'
    },
    bodyContainers: {
      padding: '2em 0em',
      display: 'flex', 
      width: '50%',
      justifyContent: 'center'
    }
  }


  return ( 
    <Fragment>
      <Row>
        <Col sm='12'>
          <Card>
              <CardHeader className="justify-content-around">
                <CardTitle tag='h4'>Schedule Name : {scheduleData.name_english}</CardTitle>
                <CardTitle tag='h4'>Component : Practical</CardTitle>
              </CardHeader>

              <CardBody>
                <AvForm onSubmit={onFormSubmit}>
                  <Row>
                    <Col sm='4'>
                      <AvGroup>
                        <Label for='date'>Session Start Date</Label>
                        <AvField type='date' name='date' value={scheduleData.date} placeholder="Enter schedule Name" disabled  />
                      </AvGroup>
                    </Col>
                    <Col sm='4'>
                      <AvGroup>
                        <Label for='student_per_session'>Students Per Session</Label>
                        <AvField type="number" name='student_per_session' placeholder="Students Per Session" validate={validation.student_per_session} />
                      </AvGroup>
                    </Col>
                    <Col sm='4'>
                      <AvGroup>
                        <Label for='book'>Book Space/Room/Circuit</Label>
                        <AvField type="select" name='book' validate={validation.book}>
                          <option value={null} hidden={true}>Select</option>
                          {
                            roomList ? roomList.map((ele) => (
                            <option value={ele.id}>{ele.room_type_name}</option>
                            )) : null
                          }
                        </AvField>
                      </AvGroup>
                    </Col>

                    <Col sm='4'>
                      <AvGroup>
                        <Label for='num_of_sessions'>No of Sessions</Label>
                        <AvField type="number" name='num_of_sessions' placeholder="No of Sessions" validate={validation.num_of_sessions} />
                      </AvGroup>
                    </Col>
                    <Col sm='4'>
                      <AvGroup>
                        <Label for='legal_capacity'>Legal Capacity</Label>
                        <AvField type='number' name='legal_capacity' value={scheduleData.legal_capacity} disabled  />
                      </AvGroup>
                    </Col>
                    <Col sm='4'>
                      <AvGroup>
                        <Label for='trainer_mode'>Trainers Mode</Label>
                        <AvField type="select" name='trainer_mode' value={1} disabled >
                          <option value={null} hidden={true}>Select</option>
                          <option value={1}>One to Many</option>
                        </AvField> 
                      </AvGroup>
                    </Col>

                    <Col sm='6'>
                      <AvGroup>
                        <Label for='allowed_num_of_session_per_day_per_student'>Allowed No of Sessions per day per Student</Label>
                        <AvField type="number" name='allowed_num_of_session_per_day_per_student' validate={validation.allowed_num_of_session_per_day_per_student}/>
                          {/* <option value={null} hidden={true}>Select</option>
                          <option value={10}>10</option>
                          <option value={20}>20</option>
                          <option value={30}>30</option>
                        </AvField> */}
                      </AvGroup>
                    </Col>
                    <Col sm='6'>
                      <AvGroup>
                        <Label for='repeat_num_of_days'>Repeat No of Days</Label>
                        <AvField type="number" name='repeat_num_of_days' validate={validation.repeat_num_of_days}/>
                          {/* <option value={null} hidden={true}>Select</option>
                          <option value={10}>10</option>
                          <option value={20}>20</option>
                          <option value={30}>30</option>
                        </AvField> */}
                      </AvGroup>
                    </Col>
                  </Row>

                  <Row className="p-1 m-1" style={styles.divBorder}>
                    <Col sm='6'>
                      <AvGroup>
                        <Label for='allocated_teacher'>Allocate Trainers</Label>
                        <AvField type="select" name='allocated_teacher' placeholder="Select" >
                          <option value={null} hidden={true}>Select</option>
                          {
                            trainerList ? trainerList.map((ele) => (
                            <option value={ele.id}>{ele.name}</option>
                            )) : null
                          }
                        </AvField>
                      </AvGroup>
                    </Col>
                    <Col sm='3'>
                      <AvGroup>
                        <Label for='teacher_start_session'>Start Session</Label>
                        <AvField type="time" name='teacher_start_session' placeholder="Start Session" />
                      </AvGroup>
                    </Col>
                    <Col sm='3'>
                      <AvGroup>
                        <Label for='teacher_end_session'>End Session</Label>
                        <AvField type="time" name='teacher_end_session' placeholder="End Session" />
                      </AvGroup>
                    </Col>

                    <Col sm='6'>
                      <AvGroup>
                        <Label for='allocated_vehicles'>Allocate Vehicles</Label>
                        <AvField type="select" name='allocated_vehicles' placeholder="Select">
                          <option value={null} hidden={true}>Select</option>
                          {
                            vehicleList ? vehicleList.map((ele) => (
                            <option value={ele.id}>{ele.brand_name}</option>
                            )) : null
                          }
                        </AvField>
                      </AvGroup>
                    </Col>
                    <Col sm='3'>
                      <AvGroup>
                        <Label for='vehicle_start_session'>Start Session</Label>
                        <AvField type="time" name='vehicle_start_session' placeholder="Start Session" />
                      </AvGroup>
                    </Col>
                    <Col sm='3'>
                      <AvGroup>
                        <Label for='vehicle_end_session'>End Session</Label>
                        <AvField type="time" name='vehicle_end_session' placeholder="End Session" />
                      </AvGroup>
                    </Col>

                  </Row>

                  <Row>
                    <Col sm='12'>
                      <Button color='primary' type='submit'>
                        Save
                      </Button>
                    </Col>
                  </Row>

                    {/* <div style={styles.tabContainer}>
                      <div style={{display: 'flex', borderBottom: '1px solid #D4D8DB'}}>
                        <div style={selectedTab === 'vehicle' ? {...styles.tab, borderRight: '1px solid #D4D8DB', ...styles.highlightedTab} : {...styles.tab, borderRight: '1px solid #D4D8DB'}} 
                        onClick={() => {
                          setTab('vehicle')
                        }}>
                          Vehicle
                        </div>
                        <div style={selectedTab === 'trainers' ? {...styles.tab, borderRight: '1px solid #D4D8DB', ...styles.highlightedTab} : {...styles.tab, borderRight: '1px solid #D4D8DB'}}
                        onClick={() => {
                          setTab('trainers')
                        }}>
                          Trainers
                        </div>
                      </div>
                      <div style={{display: 'flex'}}>
                        <div style={styles.bodyContainers}>
                          <AvCheckboxGroup name='available_trainers' value={trainersChecks}>
                            <Label for='available_trainers'>No of Available Trainers : {trainerList.length}</Label><br></br>
                            <AvCheckbox label="selectAll" value="Check All" onChange={() => {
                              setTrainersChecks(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
                            }} />

                            <AvCheckbox label="Monday" value="Monday" />
                            <AvCheckbox label="Tuesday" value="Tuesday" />
                            <AvCheckbox label="Wednesday" value="Wednesday" />
                            <AvCheckbox label="Thursday" value="Thursday" />
                            <AvCheckbox label="Friday" value="Friday" />
                            <AvCheckbox label="Saturday" value="Saturday" />
                            <AvCheckbox label="Sunday" value="Sunday" />
                          </AvCheckboxGroup >
                        </div>
                        <div style={styles.bodyContainers}>
                          <span>No of Available Backup Trainers : 4</span>

                        </div>
                      </div>
                    </div> */}

                </AvForm>
              </CardBody>    
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default ScheduleDetail

