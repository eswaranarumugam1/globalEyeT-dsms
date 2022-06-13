import { Fragment, useState, useEffect, useRef } from 'react'
import SideTab from './sideTab'
import axios from 'axios'
import Breadcrumbs from '@components/breadcrumbs'
import TheoreticalTab from './Theoretical'
import {
  Row, Col, TabContent, TabPane, Card, CardBody,
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
import BaseFields from './baseFields'
import ErrorHandler from "../../../../common/ErrorHandler"
import '@styles/react/pages/page-account-settings.scss'
import { useSelector, useDispatch } from 'react-redux'
import { handleMainTabData, handleExistingData, handlefieldsData } from '../../../../redux/actions/configCompo'
import { toast, Slide } from "react-toastify"
import { ConfigComponentSave, getConfigComponent, updateConfigComponent } from '../../../../services/home/Componentsapi'
import Avatar from "@components/avatar"
import { Coffee } from "react-feather"
import '@styles/react/libs/flatpickr/flatpickr.scss'
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
const index = () => {
  const childRef = useRef(null)
  const [activeTab, setActiveTab] = useState('1')
  const [childData, setChildData] = useState([])
  const [getSelectedTabInfo, setGetSelectedTabInfo] = useState()
  const mainTabData = useSelector(state => state.configCompoReducer.mainTabData)
  // console.log(mainTabData)
  const subTabData = useSelector(state => state.configCompoReducer.subTabData)
  // console.log(subTabData)
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
  const dispatch = useDispatch()

  const [session_number, setSessionnumber] = useState(0)

  const  find_session_number = async (comp_id, mol_id) => {

       try {
        
      const response = await GetSessionTotal(comp_id, mol_id)
    //   if (response.status_code === 429) {
    //   time.sleep(int(response.headers["Retry-After"]))
    // }
      if (response) {
        const result = response.data.data.result
        if (Number.isInteger(result.length)) {
          setSessionnumber(result.length)
        }
        
        console.log('ses', session_number)

      }
    } catch (e) {
      console.log(e)
    }
  // }

  }

  useEffect(() => {

    return () => {
      localStorage.removeItem("subTabInfo")
    }
  }, [])

  useEffect(() => {
    
    if ((typeof (mainTabData.type_id) === 'number') && (typeof ((subTabData.sub_type_id) === 'number'))) {
      find_session_number(mainTabData.type_id, subTabData.sub_type_id)      
    }

  }, [state => state.configCompoReducer.mainTabData, state => state.configCompoReducer.mainTabData])
  

  useEffect(() => {
    if (childData.length > 0) {
      localStorage.setItem("typeInfo", JSON.stringify({
        type_id: childData.length > 0 ? childData[0].id : '',
        type_name: childData.length > 0 ? childData[0].name : ''
      }))
      const typeInfo = {
        type_id: childData.length > 0 ? childData[0].id : '',
        type_name: childData.length > 0 ? childData[0].name : ''
      }
      dispatch(handleMainTabData(typeInfo))
      const getSelectTabInfoAA = childData.find(x => x.id === childData[0].id)
      const jsonConvertInfo = JSON.parse(getSelectTabInfoAA.mode_of_learning)
      setGetSelectedTabInfo(jsonConvertInfo)
    }

  }, [childData])
  console.log('getSelectTabInfo', getSelectedTabInfo)
  useEffect(() => {
    if (childData.length > 0) {
      const getSelectTabInfoAA = childData.find(x => x.id === childData[0].id)
      const jsonConvertInfo = JSON.parse(getSelectTabInfoAA.mode_of_learning)
      if (childRef.current !== null && mainTabData !== undefined && subTabData !== undefined) {
        childRef.current.changeMessage(mainTabData.type_id, subTabData.sub_type_name)
      }
    }

  }, [childRef.current])

  const toggleTab = (tab, selectedTabId, tabName) => {
    setActiveTab(tab)
    const typeInfo = {
      type_id: selectedTabId,
      type_name: tabName
    }
    dispatch(handleMainTabData(typeInfo))
    localStorage.setItem("typeInfo", JSON.stringify(typeInfo))
    //bindConfigComponent(selectedTabId, tabName)
    if (childData.length > 0) {
      const getSelectTabInfoAA = childData.find(x => x.id === selectedTabId)
      const jsonConvertInfo = JSON.parse(getSelectTabInfoAA.mode_of_learning)
      setGetSelectedTabInfo(jsonConvertInfo)
      console.log(jsonConvertInfo[0].name)
      childRef.current.changeMessage(tab, jsonConvertInfo[0].name)
    }
    dispatch(handleExistingData(null))
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
  }


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
        const response = await updateConfigComponent(getExistingData[getExistingData.length - 1].id, request)
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
  const callbackFunction = (childData) => {
    setChildData(childData)
  }
  // const demo = subTabData.push(session_number)
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Configure Component' breadCrumbParent='Pages' breadCrumbActive='Configure Component' />
      <Row>
        <Col className='mb-2 mb-md-0' md='3'>
          <SideTab activeTab={activeTab} toggleTab={toggleTab} parentCallback={callbackFunction} />
        </Col>
        <Col md='9'>
          <Card>
            <CardBody>
              {childData.map((item, index) => {
                return (
                  getSelectedTabInfo !== undefined && getSelectedTabInfo.length > 0 ? <TabContent activeTab={activeTab}>
                    <TabPane tabId={(index + 1).toString()} id={item.id} name={item.name}>
                      <TheoreticalTab ref={childRef} parentSideTab={childData} session_total={session_number} getSelectedTabInfo={getSelectedTabInfo} activeTab={activeTab}/>
                    </TabPane>
                 
                  </TabContent> : ""
                  // <BaseFields ref={childRef} parentSideTab={childData} selectedTabData={subTabData} session_total={session_number} activeSelectedTab={activeTab} />                
                )
              })
              }
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default index
