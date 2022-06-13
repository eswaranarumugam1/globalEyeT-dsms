import React, { useState, Fragment, useEffect } from 'react'
import {
  Row,
  Col,
  Label,
  Input,
  Button,
  CustomInput
} from 'reactstrap'
import {
  AvForm,
  AvGroup,
  AvField,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio
} from 'availity-reactstrap-validation-safe'
import { useSelector, useDispatch } from 'react-redux'
import { toast, Slide } from "react-toastify"
import { ConfigComponentSave, getConfigComponent, updateConfigComponent } from '../../../../services/home/Componentsapi'
import Avatar from "@components/avatar"
import { Coffee } from "react-feather"
import '@styles/react/libs/flatpickr/flatpickr.scss'
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
const OnlineWithoutTeacher = ({ ...props }) => {
  const dispatch = useDispatch()
  const mainTabData = useSelector(state => state.configCompoReducer.mainTabData)
  const subTabData = useSelector(state => state.configCompoReducer.subTabData)
  const [getExistingData, setGetExistingData] = useState([])
  const [fieldsData, setFieldsData] = useState({
    id: 0,
    dueInvoices: null,
    enoughBalance: null,
    endsWithExam: null,
    prereqAttendance: null,
    attendanceDueInvoice: null,
    price: '',
    total_hours: '',
    sessions: '',
    miss_session: '',
    days: '',
    time_sesstion: '',
    pricr_session: '',
    miss_session_price: '',
    exam_success: '',
    exam_price: '',
    missed_exam_price: '',
    free_exam_tentatives: ''
  })
  const clearObject = () => {
    setGetExistingData([])
    setFieldsData(prevState => (
      {
        ...prevState,
        ['dueInvoices']: null,
        ['enoughBalance']: null,
        ['endsWithExam']: null,
        ['prereqAttendance']: null,
        ['attendanceDueInvoice']: null,
        ['price']: '',
        ['total_hours']: '',
        ['sessions']: '',
        ['miss_session']: '',
        ['days']: '',
        ['time_sesstion']: '',
        ['pricr_session']: '',
        ['miss_session_price']: '',
        ['exam_success']: '',
        ['exam_price']: '',
        ['missed_exam_price']: '',
        ['free_exam_tentatives']: ''
      }
    ))
  }
  const bindConfigComponent = async (id) => {
    const request = {
      id: 0,
      type_id: '',
      type_name: '',
      sub_tab_name: '',
      dataJson: {}
    }
    try {
      const response = await getConfigComponent(id)
      if (response) {
        if (response.data.data.result.length > 0) {
          let getMatchData = {}
          if (response.data.data.result[response.data.data.result.length - 1].sub_tab_name !== null) {
            getMatchData = response.data.data.result.find(x => x.sub_tab_name === subTabData.sub_type_name)
          } else {
            getMatchData = response.data.data.result.find(x => x.type_id === mainTabData.type_id.toString())
          }
          if (getMatchData.id !== undefined) {
            setGetExistingData(response.data.data.result)
            request.id = getMatchData.id
            request.type_id = getMatchData.type_id
            request.type_name = getMatchData.type_name
            request.sub_tab_name = getMatchData.sub_tab_name
            request.dataJson = JSON.parse(getMatchData.data.slice(1, -1))
            setFieldsData(prevState => (
              {
                ...prevState,
                ['dueInvoices']: request.dataJson.dueInvoices,
                ['enoughBalance']: request.dataJson.enoughBalance,
                ['endsWithExam']: request.dataJson.endsWithExam,
                ['prereqAttendance']: request.dataJson.prereqAttendance,
                ['attendanceDueInvoice']: request.dataJson.attendanceDueInvoice,
                ['price']: request.dataJson.price,
                ['total_hours']: request.dataJson.total_hours,
                ['sessions']: request.dataJson.sessions,
                ['miss_session']: request.dataJson.miss_session,
                ['days']: request.dataJson.days,
                ['time_sesstion']: request.dataJson.time_sesstion,
                ['pricr_session']: request.dataJson.pricr_session,
                ['miss_session_price']: request.dataJson.miss_session_price,
                ['exam_success']: request.dataJson.exam_success,
                ['exam_price']: request.dataJson.exam_price,
                ['missed_exam_price']: request.dataJson.missed_exam_price,
                ['free_exam_tentatives']: request.dataJson.free_exam_tentatives
              }
            ))
          } else {
            clearObject()
          }
        } else {
          clearObject()
        }
      }
    } catch (e) {
      console.log("Error", e)
      //ErrorHandler(e)
    }
  }
  useEffect(() => {
    if (mainTabData.type_id && subTabData.sub_type_name === "OnlineWithoutTeacher") {
      bindConfigComponent(mainTabData.type_id)
    }
  }, [])

  const SaveComponents = async () => {
    const sub_tab_name = localStorage.getItem('subTabName')
    const schoolId = localStorage.getItem('schoolIdToken')
    const type_info = JSON.parse(localStorage.getItem('typeInfo'))
    const request = {
      type_id: type_info ? type_info.type_id : '',
      type_name: type_info ? type_info.type_name : '',
      sub_tab_name: type_info.type_name === 'Theory' ? sub_tab_name : '',
      school_id: schoolId,
      data: [
        {
          dueInvoices: fieldsData.dueInvoices === null ? '' : fieldsData.dueInvoices,
          enoughBalance: fieldsData.enoughBalance === null ? '' : fieldsData.enoughBalance,
          endsWithExam: fieldsData.endsWithExam === null ? '' : fieldsData.endsWithExam,
          prereqAttendance: fieldsData.prereqAttendance === null ? '' : fieldsData.prereqAttendance,
          attendanceDueInvoice: fieldsData.attendanceDueInvoice === null ? '' : fieldsData.attendanceDueInvoice,
          price: fieldsData.price,
          total_hours: fieldsData.total_hours,
          sessions: fieldsData.sessions,
          miss_session: fieldsData.miss_session,
          days: fieldsData.days,
          time_sesstion: fieldsData.time_sesstion,
          pricr_session: fieldsData.pricr_session,
          miss_session_price: fieldsData.miss_session_price,
          exam_success: fieldsData.exam_success,
          exam_price: fieldsData.exam_price,
          missed_exam_price: fieldsData.missed_exam_price,
          free_exam_tentatives: fieldsData.free_exam_tentatives
        }
      ]
    }
    try {
      if (getExistingData.length > 0) {
        const getMatchData = getExistingData.find(x => x.sub_tab_name === "OnlineWithoutTeacher")
        const response = await updateConfigComponent(getMatchData.id, request)
        if (response) {
          if (response.data) {
            const { data: { message } } = response.data
            toast.success(<SuccessContent msg={message} />, {
              transition: Slide,
              hideProgressBar: true,
              autoClose: 2000
            })
          } else {
            console.log('ERROR', response.response.data.message)
            toast.error(<ErrorContent msg={response.response.data.message} />, {
              transition: Slide,
              hideProgressBar: true,
              autoClose: 2000
            })
          }
        }
      } else {
        const response = await ConfigComponentSave(request)
        if (response) {
          if (response.data) {
            const { data: { message } } = response.data
            toast.success(<SuccessContent msg={message} />, {
              transition: Slide,
              hideProgressBar: true,
              autoClose: 2000
            })
          } else {
            console.log('ERROR', response.response.data.message)
            toast.error(<ErrorContent msg={response.response.data.message} />, {
              transition: Slide,
              hideProgressBar: true,
              autoClose: 2000
            })
          }
        }
      }
    } catch (e) {
      console.log(e)
      console.log('ERROR', e)
      toast.error(<ErrorContent msg={e} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000
      })
    }
  }

  const onSelectOption = (e, type) => {
    setFieldsData({ ...fieldsData, [type]: e })
  }
  return (
    <React.Fragment>
      <AvForm>
        <Row>
          <Col sm='3'>
            <AvGroup>
              <Input type='checkbox' id='chkPrice' />
              <Label for='price'>Price</Label>
              <AvInput value={fieldsData.price} type='number' name='price' id='price' onChange={(e) => setFieldsData({ ...fieldsData, ["price"]: e.target.value })} placeholder="price" />
              <AvFeedback>Please enter a valid price!</AvFeedback>
            </AvGroup>
          </Col>
          <Col sm='3'>
            <AvGroup>
              <Input type='checkbox' id='chkHrs' />
              <Label for='total_hours'>Total Hours</Label>
              <AvInput value={fieldsData.total_hours} type='number' name='total_hours' id='total_hours' onChange={(e) => setFieldsData({ ...fieldsData, ["total_hours"]: e.target.value })} placeholder="Total Hours" />
              <AvFeedback>Please enter a valid Total Hours!</AvFeedback>
            </AvGroup>
          </Col>
          <Col sm='3'>
            <AvGroup>
              <Input type='checkbox' id='chkSessions' />
              <Label for='sessions'>No Of Sessions</Label>
              <AvInput value={fieldsData.sessions} type='number' name='sessions' id='sessions' onChange={(e) => setFieldsData({ ...fieldsData, ["sessions"]: e.target.value })} placeholder="Session" />
              <AvFeedback>Please enter a valid No Of Session!</AvFeedback>
            </AvGroup>
          </Col>
          <Col sm='3'>
            <AvGroup>
              <Input type='checkbox' id='chkNoOfMissed' />
              <Label for='miss_session'>No Of Missed Session Allowed</Label>
              <AvInput value={fieldsData.miss_session} type='number' name='miss_session' id='miss_session' onChange={(e) => setFieldsData({ ...fieldsData, ["miss_session"]: e.target.value })} placeholder="Missed Session" />
              <AvFeedback>Please enter a valid Missed Session!</AvFeedback>
            </AvGroup>
          </Col>

          <Col sm='3'>
            <AvGroup>
              <Input type='checkbox' id='chkNoOfDays' />
              <Label for='days'>No OF Days</Label>
              <AvInput value={fieldsData.days} type='number' name='days' id='days' onChange={(e) => setFieldsData({ ...fieldsData, ["days"]: e.target.value })} placeholder="price" />
              <AvFeedback>Please enter a valid Days!</AvFeedback>
            </AvGroup>
          </Col>
          <Col sm='3'>
            <AvGroup>
              <Input type='checkbox' id='chkTimePerSession' />
              <Label for='time_sesstion'>Time Per Session</Label>
              <AvInput value={fieldsData.time_sesstion} name='time_sesstion' id='time_sesstion' onChange={(e) => setFieldsData({ ...fieldsData, ["time_sesstion"]: e.target.value })} placeholder="Time Per Session" />
              <AvFeedback>Please enter a valid Time Per Session!</AvFeedback>
            </AvGroup>
          </Col>
          <Col sm='3'>
            <AvGroup>
              <Input type='checkbox' id='chkPricePerSession' />
              <Label for='pricr_session'>Price Per Session</Label>
              <AvInput value={fieldsData.pricr_session} type='number' name='pricr_session' id='pricr_session' onChange={(e) => setFieldsData({ ...fieldsData, ["pricr_session"]: e.target.value })} placeholder="Session" />
              <AvFeedback>Please enter a valid Price Per Session!</AvFeedback>
            </AvGroup>
          </Col>
          <Col sm='3'>
            <AvGroup>
              <Input type='checkbox' id='chkMissedSessionPrice' />
              <Label for='miss_session_price'>Missed Session Price</Label>
              <AvInput value={fieldsData.miss_session_price} name='miss_session_price' id='miss_session_price' onChange={(e) => setFieldsData({ ...fieldsData, ["miss_session_price"]: e.target.value })} placeholder="Missed Session Price" />
              <AvFeedback>Please enter a valid Missed Session Price!</AvFeedback>
            </AvGroup>
          </Col>

          {/* -----------Configured Exam------------ */}

          <Col sm='3'>
            <AvGroup>
              <Input type='checkbox' id='chkExamSuccess' />
              <Label for='exam_success'>Exam Success %</Label>
              <AvInput value={fieldsData.exam_success} name='exam_success' id='exam_success' onChange={(e) => setFieldsData({ ...fieldsData, ["exam_success"]: e.target.value })} placeholder="Exam Success %" />
              <AvFeedback>Please enter a valid Exam Success %!</AvFeedback>
            </AvGroup>
          </Col>
          <Col sm='3'>
            <AvGroup>
              <Input type='checkbox' id='chkExamPrice' />
              <Label for='exam_price'>Exam Price </Label>
              <AvInput value={fieldsData.exam_price} name='exam_price' id='exam_price' onChange={(e) => setFieldsData({ ...fieldsData, ["exam_price"]: e.target.value })} placeholder="Exam Price" />
              <AvFeedback>Please enter a valid Exam Price!</AvFeedback>
            </AvGroup>
          </Col>

          <Col sm='3'>
            <AvGroup>
              <Input type='checkbox' id='chkMissedexamprice' />
              <Label for='missed_exam_price'>Missed Exam Price</Label>
              <AvInput value={fieldsData.missed_exam_price} name='missed_exam_price' id='missed_exam_price' onChange={(e) => setFieldsData({ ...fieldsData, ["missed_exam_price"]: e.target.value })} placeholder="Exam Price" />
              <AvFeedback>Please enter a valid Missed Exam price!</AvFeedback>
            </AvGroup>
          </Col>
          <Col sm='3'>
            <AvGroup>
              <Input type='checkbox' id='chkFreeExamtentatives' />
              <Label for='free_exam_tentatives'>Free Exam Tentatives </Label>
              <AvInput value={fieldsData.free_exam_tentatives} name='free_exam_tentatives' id='free_exam_tentatives' onChange={(e) => setFieldsData({ ...fieldsData, ["free_exam_tentatives"]: e.target.value })} placeholder="Free Exam tentatives" />
              <AvFeedback>Please enter a valid Missed Free Exam Tentatives!</AvFeedback>
            </AvGroup>
          </Col>
        </Row>

        {/* ----------dropdown--------------- */}
        <div>
          <Row>
            <Col sm='3'><Input type='checkbox' id='chkdueInvoices' /> <Label for='state'>Access With Due Invoices</Label></Col>
            <Col sm='3'>
              <AvGroup>
                <AvField type='select' name='state' id='state' onChange={(e) => {
                  onSelectOption(e.target.value, "dueInvoices")
                }} value={parseInt(fieldsData.dueInvoices)}>
                  <option value={null}>Select Yes or No</option>
                  <option value={1}>Yes</option>
                  <option value={2}>No</option>
                </AvField>
                {/* <AvFeedback>Please select a Access With Due Invoices</AvFeedback> */}
              </AvGroup>
            </Col>

            <Col sm='3'> <Input type='checkbox' id='chkEnoughBalance' /><Label for='state'>Access If Enough Balance</Label></Col>
            <Col sm='3'>
              <AvGroup>
                <AvField type='select' name='state' id='state' onChange={(e) => {
                  onSelectOption(e.target.value, "enoughBalance")
                }} value={parseInt(fieldsData.enoughBalance)}>
                  <option value={null}>Select Yes or No</option>
                  <option value={1}>Yes</option>
                  <option value={2}>No</option>
                </AvField>
                {/* <AvFeedback>Please select a Access With Due Invoices</AvFeedback> */}
              </AvGroup>
            </Col>
            <Col sm='3'><Input type='checkbox' id='chkEndsWithExam' /> <Label for='state'>Ends With Exam</Label></Col>
            <Col sm='3'>
              <AvGroup>
                <AvField type='select' name='state' id='state' onChange={(e) => {
                  onSelectOption(e.target.value, "endsWithExam")
                }} value={parseInt(fieldsData.endsWithExam)}>
                  <option value={null}>Select Yes or No</option>
                  <option value={1}>Yes</option>
                  <option value={2}>No</option>
                </AvField>
                {/* <AvFeedback>Please select a Access With Due Invoices</AvFeedback> */}
              </AvGroup>
            </Col>

            <Col sm='3'> <Input type='checkbox' id='chkReqAttendance' /><Label for='state'>Pre req Attendance all sessions</Label></Col>
            <Col sm='3'>
              <AvGroup>
                <AvField type='select' name='state' id='state' onChange={(e) => {
                  onSelectOption(e.target.value, "prereqAttendance")
                }} value={parseInt(fieldsData.prereqAttendance)}>
                  <option value={null}>Select Yes or No</option>
                  <option value={1}>Yes</option>
                  <option value={2}>No</option>
                </AvField>
                {/* <AvFeedback>Please select a Access With Due Invoices</AvFeedback> */}
              </AvGroup>
            </Col>
            <Col sm='3'> <Input type='checkbox' id='chkdueInvoice' /><Label for='state'>Attendance with due invoice</Label></Col>
            <Col sm='3'>
              <AvGroup>
                <AvField type='select' name='state' id='state' onChange={(e) => {
                  onSelectOption(e.target.value, "attendanceDueInvoice")
                }} value={parseInt(fieldsData.attendanceDueInvoice)}>
                  <option value={null}>Select Yes or No</option>
                  <option value={1}>Yes</option>
                  <option value={2}>No</option>
                </AvField>
                {/* <AvFeedback>Please select a Access With Due Invoices</AvFeedback> */}
              </AvGroup>
            </Col>
            <Col sm='12'>
              <br />
              <Button color='primary' type='submit' onClick={SaveComponents}>
                {getExistingData.length > 0 ? "Update" : "Save"}
              </Button>
            </Col>
          </Row>

        </div>
      </AvForm>
    </React.Fragment >
  )
}
export default OnlineWithoutTeacher
