import React, { useState, Fragment, useEffect, useImperativeHandle, forwardRef } from 'react'
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
import { handlefieldsData, handleExistingData } from '../../../../redux/actions/configCompo'
import { All_sessions, DeleteSession, Editsession, GetSessionTotal } from "../../../../services/home/sessions"
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


const BaseFields = forwardRef((props, ref) => {
  // console.log('sssssss', parseInt(session_total))
  // console.log(ref)
  // console.log('total_sessions are', props.session_total)
  const dispatch = useDispatch()
  const mainTabData = useSelector(state => state.configCompoReducer.mainTabData)
  const subTabData = useSelector(state => state.configCompoReducer.subTabData)
  const TabData = useSelector(state => state.configCompoReducer.tabData)
  const isExistData = useSelector(state => state.configCompoReducer.isExistData)
  const [getExistingData, setGetExistingData] = useState([])
  const [testing, setTesting] = useState(false)
  const isFieldsData = useSelector(state => state.configCompoReducer.fieldsData)
  // console.log("main", mainTabData.type_id)
  // console.log("sub", subTabData.sub_type_id)
  // const comp_id =  mainTabData.type_id
  // const mol_id = subTabData.sub_type_id
  // console.log(typeof (comp_id))
  // console.log('basefield', props)
  const [session_number, setSessionnumber1] = useState(0)
  useEffect(() => {
    // setSessionnumber1(props.session_total)
    console.log('sessions', props.session_total)
  }, [props.session_total])

  // console.log('totalsessions', session_number)
  
  const  find_session_number = async (comp_id, mol_id) => {

       try {
 
      const response = await GetSessionTotal(comp_id, mol_id)
      if (response) {

        const result = response.data.data.result
        setSessionnumber(result.length)
        console.log(result)
      }
    } catch (e) {
      console.log(e)
    }
  // }

  }
  // useEffect(() => {
  //   if ((typeof (mainTabData.type_id) === 'number') && (typeof ((subTabData.sub_type_id) === 'number'))) {
  //   find_session_number(mainTabData.type_id, subTabData.sub_type_id)  
  // }
  // }, [state => state.configCompoReducer.mainTabData, state => state.configCompoReducer.mainTabData])
  
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
  const counter = true
  const clearObject = () => {
    setGetExistingData([])
    const request = {
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
    }
    dispatch(handlefieldsData(request))
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
  const bindConfigComponent = async (id, tabName) => {
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
          const sub_tab_info = JSON.parse(localStorage.getItem('subTabInfo'))
          const suntabname = tabName === undefined ? sub_tab_info.sub_type_name : tabName
          if (response.data.data.result[response.data.data.result.length - 1].sub_tab_name !== null && suntabname !== null) {
            getMatchData = response.data.data.result.find(x => x.sub_tab_name.toLowerCase() === suntabname.toLowerCase())
          } else {
            getMatchData = response.data.data.result.find(x => x.type_id === mainTabData.type_id.toString())
          }
          if (getMatchData !== undefined) {
            dispatch(handleExistingData(response.data.data.result))
            setGetExistingData(response.data.data.result)
            request.id = getMatchData.id
            request.type_id = getMatchData.type_id
            request.type_name = getMatchData.type_name
            request.sub_tab_name = getMatchData.sub_tab_name
            request.dataJson = JSON.parse(getMatchData.data.slice(1, -1))
            dispatch(handlefieldsData(request.dataJson))
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
  const SaveComponents = async () => {
    const sub_tab_info = JSON.parse(localStorage.getItem('subTabInfo'))
    const schoolId = localStorage.getItem('schoolIdToken')
    const type_info = JSON.parse(localStorage.getItem('typeInfo'))
    const request = {
      type_id: type_info ? type_info.type_id : '',
      type_name: type_info ? type_info.type_name : '',
      sub_tab_name: props.selectedTabData.sub_type_name,
      school_id: schoolId,
      data: [
        {
          dueInvoices: isFieldsData.dueInvoices === null ? '' : fieldsData.dueInvoices,
          enoughBalance: isFieldsData.enoughBalance === null ? '' : fieldsData.enoughBalance,
          endsWithExam: isFieldsData.endsWithExam === null ? '' : fieldsData.endsWithExam,
          prereqAttendance: isFieldsData.prereqAttendance === null ? '' : fieldsData.prereqAttendance,
          attendanceDueInvoice: isFieldsData.attendanceDueInvoice === null ? '' : fieldsData.attendanceDueInvoice,
          price: isFieldsData.price,
          total_hours: isFieldsData.total_hours,
          sessions: isFieldsData.sessions,
          miss_session: isFieldsData.miss_session,
          days: isFieldsData.days,
          time_sesstion: isFieldsData.time_sesstion,
          pricr_session: isFieldsData.pricr_session,
          miss_session_price: isFieldsData.miss_session_price,
          exam_success: isFieldsData.exam_success,
          exam_price: isFieldsData.exam_price,
          missed_exam_price: isFieldsData.missed_exam_price,
          free_exam_tentatives: isFieldsData.free_exam_tentatives
        }
      ]
    }
    try {
      let getMatchData = {}
      if (isExistData !== null) {
        if (props.selectedTabData.sub_type_name !== null) {
          getMatchData = isExistData.find(x => x.sub_tab_name.toLowerCase() === props.selectedTabData.sub_type_name.toLowerCase())
        } else {
          getMatchData = isExistData.find(x => x.type_id === mainTabData.type_id.toString())
        }
        console.log(getMatchData, "getMatchData")
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
  useImperativeHandle(ref, () => ({
    changeMessage(type_id, tabName) {
      bindConfigComponent(type_id, tabName)
    }
  }))
  const onSelectOption = (e, type) => {
    setFieldsData({ ...fieldsData, [type]: e })
    dispatch(handlefieldsData({ ...isFieldsData, [type]: e }))
  }
  const onSelectFields = (e, type) => {
    setFieldsData({ ...fieldsData, [type]: e.target.value })
    dispatch(handlefieldsData({ ...isFieldsData, [type]: e.target.value }))
  }
  return (
    <React.Fragment>
      <AvForm>
        <Row>
          <Col sm='3'>
            <AvGroup>
              <Input type='checkbox' id='chkPrice' />
              <Label for='price'>Price</Label>
              <AvInput min="0" value={isFieldsData ? isFieldsData.price : ""} type='number' name='price' id='price' onChange={(e) => onSelectFields(e, "price")} placeholder="price" />
              <AvFeedback>Please enter a valid price!</AvFeedback>
            </AvGroup>
          </Col>
          <Col sm='3'>
            <AvGroup>
              <Input type='checkbox' id='chkHrs' />
              <Label for='total_hours'>Total Hours</Label>
               {/* <AvInput min="0" readOnly value={isFieldsData.time_sesstion ? (isFieldsData.time_sesstion * session_number) / 60 : "0" } type='number' name='total_hours'  id='total_hours' onChange={(e) => onSelectFields(e, "total_hours")} placeholder="Total Hours" />  */}
              <AvInput min="0"  value={ isFieldsData.total_hours ? isFieldsData.total_hours : "" } type='number' name='total_hours'  id='total_hours' onChange={(e) => onSelectFields(e, "total_hours")} placeholder="Total Hours" />
              <AvFeedback>Please enter a valid Total Hours!</AvFeedback>
            </AvGroup>
          </Col>
          <Col sm='3'>
            <AvGroup>
              <Input type='checkbox' id='chkSessions' />
              <Label for='sessions'>No Of Sessions</Label>
              <AvInput min="0" value={props.session_total ? parseInt(props.session_total) : '0' } readOnly type='number' name='sessions'  id='sessions' onChange={(e) => onSelectFields(e, "sessions")} placeholder="Session" />
              <AvFeedback>Please enter a valid No Of Session!</AvFeedback>
            </AvGroup>
          </Col>
          <Col sm='3'>
            <AvGroup>
              <Input type='checkbox' id='chkNoOfMissed' />
              <Label for='miss_session'>No Of Missed Session Allowed</Label>
              <AvInput min="0" value={isFieldsData ? isFieldsData.miss_session : ""} type='number' name='miss_session' id='miss_session' onChange={(e) => onSelectFields(e, "miss_session")} placeholder="Missed Session" />
              <AvFeedback>Please enter a valid Missed Session!</AvFeedback>
            </AvGroup>
          </Col>
{/* {console.log('sessssss', selectedTabData)} */}
          <Col sm='3'>
            <AvGroup>
              <Input type='checkbox' id='chkNoOfDays' />
              <Label for='days'>No OF Days</Label>
              <AvInput min="0" value={isFieldsData ? isFieldsData.days : ""} type='number' name='days' id='days' onChange={(e) => onSelectFields(e, "days")} placeholder="price" />
              <AvFeedback>Please enter a valid Days!</AvFeedback>
            </AvGroup>
          </Col>
          <Col sm='3'>
            <AvGroup>
              <Input type='checkbox' id='chkTimePerSession' />
              <Label for='time_sesstion'>Time Per Session (in minutes)</Label>
              <AvInput min="0" value={isFieldsData ? isFieldsData.time_sesstion : ""} name='time_sesstion' id='time_sesstion' onChange={(e) => onSelectFields(e, "time_sesstion")} placeholder="Time Per Session" />
              <AvFeedback>Please enter a valid Time Per Session!</AvFeedback>
            </AvGroup>
          </Col>
          <Col sm='3'>
            <AvGroup>
              <Input type='checkbox' id='chkPricePerSession' />
              <Label for='pricr_session'>Price Per Session</Label>
              <AvInput min="0" value={isFieldsData ? isFieldsData.pricr_session : ""} type='number' name='pricr_session' id='pricr_session' onChange={(e) => onSelectFields(e, "pricr_session")} placeholder="Session" />
              <AvFeedback>Please enter a valid Price Per Session!</AvFeedback>
            </AvGroup>
          </Col>
          <Col sm='3'>
            <AvGroup>
              <Input type='checkbox' id='chkMissedSessionPrice' />
              <Label for='miss_session_price'>Missed Session Price</Label>
              <AvInput min="0" value={isFieldsData ? isFieldsData.miss_session_price : ""} name='miss_session_price' id='miss_session_price' onChange={(e) => onSelectFields(e, "miss_session_price")} placeholder="Missed Session Price" />
              <AvFeedback>Please enter a valid Missed Session Price!</AvFeedback>
            </AvGroup>
          </Col>

          {/* -----------Configured Exam------------ */}

          <Col sm='3'>
            <AvGroup>
              <Input type='checkbox' id='chkExamSuccess' />
              <Label for='exam_success'>Exam Success %</Label>
              <AvInput min="0" value={isFieldsData ? isFieldsData.exam_success : ""} name='exam_success' id='exam_success' onChange={(e) => onSelectFields(e, "exam_success")} placeholder="Exam Success %" />
              <AvFeedback>Please enter a valid Exam Success %!</AvFeedback>
            </AvGroup>
          </Col>
          <Col sm='3'>
            <AvGroup>
              <Input type='checkbox' id='chkExamPrice' />
              <Label for='exam_price'>Exam Price </Label>
              <AvInput min="0" value={isFieldsData ? isFieldsData.exam_price : ""} name='exam_price' id='exam_price' onChange={(e) => onSelectFields(e, "exam_price")} placeholder="Exam Price" />
              <AvFeedback>Please enter a valid Exam Price!</AvFeedback>
            </AvGroup>
          </Col>

          <Col sm='3'>
            <AvGroup>
              <Input type='checkbox' id='chkMissedexamprice' />
              <Label for='missed_exam_price'>Missed Exam Price</Label>
              <AvInput min="0" value={isFieldsData ? isFieldsData.missed_exam_price : ""} name='missed_exam_price' id='missed_exam_price' onChange={(e) => onSelectFields(e, "missed_exam_price")} placeholder="Exam Price" />
              <AvFeedback>Please enter a valid Missed Exam price!</AvFeedback>
            </AvGroup>
          </Col>
          <Col sm='3'>
            <AvGroup>
              <Input type='checkbox' id='chkFreeExamtentatives' />
              <Label for='free_exam_tentatives'>Free Exam Tentatives </Label>
              <AvInput min="0" value={isFieldsData ? isFieldsData.free_exam_tentatives : ""} name='free_exam_tentatives' id='free_exam_tentatives' onChange={(e) => onSelectFields(e, "free_exam_tentatives")} placeholder="Free Exam tentatives" />
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
                }} value={parseInt(isFieldsData ? isFieldsData.dueInvoices : null)}>
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
                }} value={parseInt(isFieldsData ? isFieldsData.enoughBalance : null)}>
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
                }} value={parseInt(isFieldsData ? isFieldsData.endsWithExam : null)}>
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
                }} value={parseInt(isFieldsData ? isFieldsData.prereqAttendance : null)}>
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
                }} value={parseInt(isFieldsData ? isFieldsData.attendanceDueInvoice : null)}>
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
                {isExistData !== null ? "Update" : "Save"}
              </Button>
            </Col>
          </Row>

        </div>
      </AvForm>
    </React.Fragment >
  )
})
export default BaseFields

