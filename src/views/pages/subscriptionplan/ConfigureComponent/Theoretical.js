import React, { Fragment, useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  Row,
  Label,
  CustomInput,
  Col,
  NavLink,
  Button,
  Input
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
import { ConfigComponentSave, getConfigComponent, updateConfigComponent } from '../../../../services/home/Componentsapi'
import { toast, Slide } from "react-toastify"
import Avatar from "@components/avatar"
import { Coffee } from "react-feather"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Classroom from './classroom'
import { handleSubTabData, handleMainTabData, handleExistingData, handlefieldsData } from '../../../../redux/actions/configCompo'
import { useSelector, useDispatch } from 'react-redux'
const TheoreticalTab = forwardRef((prop, ref) => {
  console.log('theoretical props', prop)
  const childRef = useRef(null)
  const mainTabData = useSelector(state => state.configCompoReducer.mainTabData)
  const subTabData = useSelector(state => state.configCompoReducer.subTabData)
  const dispatch = useDispatch()
  const [activeInfo, setActiveInfo] = useState('1')
  const [getSelectedData, setGetSelectedData] = useState()
  const [getExistingData, setGetExistingData] = useState([])
  const {getSelectedTabInfo, activeTab} = prop
  useEffect(() => {
    const subTypeInfo = {
      sub_type_id: prop.getSelectedTabInfo[0].
        id,
      sub_type_name: prop.getSelectedTabInfo[0].name
    }
    dispatch(handleSubTabData(subTypeInfo))
    localStorage.setItem("subTabInfo", JSON.stringify(subTypeInfo))
    setGetSelectedData(subTypeInfo)
    return () => {

    }
  }, [])

  const toggle = (tab, tabName) => {
    setActiveInfo(tab)
    const currentactiveSubTab = JSON.parse(localStorage.getItem("activeSubTab"))
    const storageText = currentactiveSubTab ? { ...currentactiveSubTab, [`activeTab${activeTab}`]:Number(tab)} : {[`activeTab${activeTab}`]:Number(tab)} 
    localStorage.setItem("activeSubTab", JSON.stringify(storageText))
    const subTypeInfo = {
      sub_type_id: tab,
      sub_type_name: tabName
    }
    dispatch(handleSubTabData(subTypeInfo))
    localStorage.setItem("subTabInfo", JSON.stringify(subTypeInfo))
    setGetSelectedData(subTypeInfo)
    childRef.current.changeMessage(mainTabData.type_id, tabName)
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

  useEffect(() => {
    let activeSubTab = JSON.parse(localStorage.getItem("activeSubTab"))
    activeSubTab = activeSubTab ? activeSubTab[`activeTab${activeTab}`] : activeInfo 
    const currentTab = getSelectedTabInfo.find(tab => tab.id === Number(activeSubTab)) 
    if (currentTab) {
      toggle(`${currentTab.id}`, currentTab.name)
    }
    
  }, [getSelectedTabInfo])

  const callChildMetho = (type_id, tabName) => {
    childRef.current.changeMessage(type_id, tabName)
  }
  useImperativeHandle(ref, () => ({
    changeMessage(type_id, tabName) {
      callChildMetho(type_id, tabName)
    }
  }))
console.log('activeInfo', activeInfo)
  return (
    <React.Fragment>
      <Nav pills>
        {prop.getSelectedTabInfo !== undefined && prop.getSelectedTabInfo.map((item, index) => {
          return (
            <NavItem key={Math.trunc(Math.random() * 10000)}>
              <NavLink name={item.name} id={index + 1} active={activeInfo === (item.id).toString()} onClick={() => toggle((item.id).toString(), item.name)} key={index}>
                {item.name}
              </NavLink>
            </NavItem>
          )
        })
        }
      </Nav>
      {prop.getSelectedTabInfo !== undefined && prop.getSelectedTabInfo.map((item, index) => {
        return (
          <TabContent TabContent activeTab={activeInfo} key={Math.trunc(Math.random() * 10000)}>
            <TabPane tabId={(index + 1).toString()}>
              <BaseFields ref={childRef} parentSideTab={prop.parentSideTab} session_total={prop.session_total} selectedTabData={getSelectedData}  activeSelectedTab={activeInfo} />
            </TabPane>
          </TabContent>
        )
      })
      }
    </React.Fragment >
  )
})
export default TheoreticalTab
