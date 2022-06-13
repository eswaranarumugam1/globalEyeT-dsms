import { useState, useEffect, Fragment } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Label, Button, CardText, Row, Col, Form, FormGroup, Input, CustomInput } from 'reactstrap'
import {
  AvRadioGroup,
  AvRadio,
  AvForm,
  AvGroup,
  AvField,
  AvInput,
  AvFeedback
} from 'availity-reactstrap-validation-safe'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Repeater from '@components/repeater'
import { X, Plus, Coffee } from 'react-feather'
import { SlideDown } from 'react-slidedown'
import { toast, Slide } from "react-toastify"
import Avatar from "@components/avatar"
import { selectThemeColors } from '@utils'
import Select, { components } from 'react-select'
import { AddComponents, LoadResourcesList, getCommunicationMode, getCommunicationtype } from '../../../../../services/home/Componentsapi'
import { All_sessions } from "../../../../../services/home/sessions"

import { useParams, useHistory, Link } from 'react-router-dom'
import { message } from 'antd'
import ErrorHandler from '../../../../../common/ErrorHandler'

// const colorOptions = [
//   { value: '0', label: 'Circuit'},  
//   { value: '1', label: 'Room' },
//   { value: '2', label: 'Trainer'}
// ]


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
        <h6 className="toast-title font-weight-bold text-danger">Error</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        {msg}
      </span>
    </div>
  </Fragment>
)
function Fields() {

  const [mode_of_learning, setmode_of_learning] = useState([{ id: 0, name: '', arb_name: ''}])
  const [resources, setresources] = useState()
  const [name, setName] = useState()
  const [arabic_name, setarabic_name] = useState()
  const [trainingMode, setTrainingMode] = useState('')
  const [component_type, setComponent_type] = useState()
  const [status, setStatus] = useState('')
  const [resourcesOptions, setResourcesOptions] = useState([])
  const [componentOptions, setComponentOptions] = useState([])
  const [training_modes, setTraining_modes] = useState([])
  const [sessions, setSessions] = useState([])
  // const [resources, setResources] = useState([])
  const schoolId = parseInt(localStorage.getItem("schoolIdToken"))
  const history = useHistory()
  const statusOption = [
    { value: '', label: "Select Status" },
    { value: 1, label: " Active" },
    { value: 0, label: "Inactive" }
  ]
  const getRources = async () => {
    try {
      const response = await LoadResourcesList()
      if (response) {
        if (response.data) {
          const iList = []
          if (response.data.data.result.length && response.data.data.result.length > 0) {
            response.data.data.result.map((item) => {
              if (item.name !== '') {
                return iList.push({
                  value: item.id,
                  label: item.name

                })
              }
            })

            console.log(iList)
            setResourcesOptions(iList)
          }
        }
      }
    } catch (e) {
      //ErrorHandler(e)
      console.log("Error for Resources", e)
    }
  }

  const getCommunicationmode = async () => {
    try {
      const response = await getCommunicationMode()
      if (response) {
        if (response.data) {
          const datas = []
          if (response.data.data.result.length && response.data.data.result.length > 0) {
            response.data.data.result.map((item) => {
              if (item.name !== '') {
                return datas.push({
                  value: item.id,
                  label: item.name

                })
              }
            })
            // console.log("here")
            // console.log(datas)
            setComponentOptions(datas)
          }
        }
      }
    } catch (e) {
      //ErrorHandler(e)
      console.log("Error for Resources", e)
    }
  }
  const getCommunicationtypes = async () => {
    try {
      const response = await getCommunicationtype()
      if (response) {
        if (response.data) {
          const types = []
          if (response.data.data.result.length && response.data.data.result.length > 0) {
            response.data.data.result.map((item) => {
              if (item.name !== '') {
                return types.push({
                  value: item.id,
                  label: item.name
                })
              }
            })
            console.log("here")
            console.log(types)
            setTraining_modes(types)
          }
        }
      }
    } catch (e) {
      //ErrorHandler(e)
      console.log("Error for Resources", e)
    }
  }

  const getSessions = async () => {

    try {
      const response = await All_sessions(schoolId)
      if (response) {
        if (response.data) {
          const sessions = []
          if (response.data.data.result.length && response.data.data.result.length > 0) {
            response.data.data.result.map((item) => {
              if (item.id !== '') {
                return sessions.push({
                  value: item.id,
                  label: item.session_name,
                  label_ar: item.session_name_arabic
                })
              }
            })
            // console.log("here")
            // console.log(types)
            setSessions(sessions)
          }
        }
      }
    } catch (e) {
      //ErrorHandler(e)
      console.log("Error for Resources", e)
    }
    
  }

  useEffect(() => {
    getRources()
    getCommunicationmode()
    getCommunicationtypes()
    getSessions()
    return () => {
    }
  }, [])
  const handleChange = (index, event) => {
    // console.log(event.value)
    // return false
    const values = [...mode_of_learning]
    if (event.target.name === 'eng_name') {
      values[index].id = index + 1
      values[index].name = event.target.value

    } else if (event.target.name === 'arb_name') {
      values[index].id = index + 1
      values[index].arb_name = event.target.value
    } 
     
    setmode_of_learning(values)
    console.log(mode_of_learning)
  }

  const handleAddFields = () => {
    const values = [...mode_of_learning]
    values.push({ name: '', arb_name: '' })
    setmode_of_learning(values)
  }

  const handleRemoveFields = (i, event, data) => {
    //preventDefault(event)
    console.log(i)
    //  console.log(event)
    //  console.log(data)
    // return false
    const values = [...mode_of_learning]
    const lists = values.filter((x, index) => {
      return index !== i
    })
    // console.log(lists)
   
    setmode_of_learning([])
    setmode_of_learning(lists)
    console.log(lists)
  }

  const schools_id = parseInt(localStorage.getItem("schoolIdToken"))

  const addComponent = async () => {
    const request = { name, arabic_name, resources, trainingMode, component_type, status, mode_of_learning, schools_id }
    console.log('data: ', request)
    // console.log(request)
    // return false
    try {
      const response = await AddComponents(request)
      if (response) {
        
       if (response.status === 200) {
        if (response.data) {
          const { data: { message } } = response.data
          toast.success(<SuccessContent msg={message} />, {
            transition: Slide,
            hideProgressBar: true,
            autoClose: 2000
          })
          history.push('/pages/component/list')
        }
      } else {
      
        // <ErrorContent msg={"hello"} />
        console.log(response)
        toast.success(<ErrorContent msg={response.Error} />, {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000
        })
      }
      }
    } catch (e) {
      // console.log(e.message)
      console.log(e)
      toast.success(<ErrorContent msg={e} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000
      })
      // console.log(e)
    }
  }
  const handleSubmit = (index, e) => {
    e.preventDefault()
  }

  const handleResourcesSelect = (e) => {
    setresources(e)
    console.log('this is the data ', e)
  }
  const handlecomponentTypelSelect = (e) => {
    // console.log(e)
    setComponent_type(e.value)
    console.log('this is the data ', e)
  }
  const handleTraingModeSelect = (e) => {
    setTrainingMode(e)
    console.log('this is the data ', e)
  }

  const handleStatus = (e) => {
    setStatus(e.value)
    //setSelectStatus(e.target.value)
  }

  const handleTrainerModeSelect = (e) => {
    //setresources(e)
    console.log('this is the data ', e)
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Create New Component</CardTitle>
      </CardHeader>
      <CardBody>
        <AvForm >
          <Row>
            <Col sm='6'>
              <AvGroup>
                <Label for='name_english'> Name (English)</Label>
                <AvInput name='name_english' id='name_english' onChange={(e) => {
                  setName(e.target.value)
                }} required placeholder="Name" />
                <AvFeedback>Please enter a valid Name!</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='name_arabic'> Name (Arabic)</Label>
                <AvInput name='name_arabic' id='name_arabic' onChange={(e) => {
                  setarabic_name(e.target.value)
                }} requied placeholder="Name" />
                <AvFeedback>Please enter a valid Name!</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label>Resources</Label>
                <Select
                  isClearable={false}
                  theme={selectThemeColors}
                  defaultValue={[resourcesOptions[0]]}
                  isMulti
                  name='multi_select'
                  options={resourcesOptions}
                  className='react-select'
                  classNamePrefix='select'
                  onChange={(e) => {
                    handleResourcesSelect(e)
                  }}
                ></Select>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <Label>Trainer Mode</Label>
              {/* <Select
                isClearable={false}
                theme={selectThemeColors}
                defaultValue={trainingMode}
                name='training_mode'
                options={training_modes}
                className='react-select'
                classNamePrefix='select'
                onChange={(e) => {
                  handleTraingModeSelect(e)
                }}
              /> */}
              <AvField type='select' name='trainer' onChange={(e) => {
                  handleTraingModeSelect(e.target.value)
                }}  id='trainer' required>
                  <option value={null}>Select Mode</option>
                  {training_modes ? training_modes.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  )) : null}
                </AvField>

            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label>Componet Type</Label>
                <Select
                  isClearable={false}
                  theme={selectThemeColors}
                  defaultValue={component_type}
                  name='multi_select'
                  options={componentOptions}
                  className='react-select'
                  classNamePrefix='select'
                  onChange={(e) => {
                    handlecomponentTypelSelect(e)
                  }}
                ></Select>
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label>Status</Label>
                <Select
                  isClearable={false}
                  theme={selectThemeColors}
                  defaultValue={status}
                  name='multi_select'
                  options={statusOption}
                  className='react-select'
                  classNamePrefix='select'
                  onChange={(e) => {
                    handleStatus(e)
                  }}
                  required
                ></Select>
                 <AvFeedback>Please Select</AvFeedback>
              </AvGroup>

              {/* <AvRadioGroup name='Status' onChange={(e) => {
                setStatus(e.target.value)
              }} required>
                <Label for='status'>Status</Label>
                <AvRadio className='mb-1' customInput label='Active' value={1} />
                <AvRadio customInput label='Inactive' value={0} />
              </AvRadioGroup> */}

            </Col>


            <Col sm='12'>
              <CardText>
                Mode Of Learning
              </CardText>
              <Form>
                {
                  mode_of_learning ? mode_of_learning.map((data, i) => {
                    return (
                      <Row className='justify-content-between align-items-center'>
                        <Col md={5}>
                          <FormGroup>
                            <Label for={`animation-item-name-${i}`}>Name (English)</Label>
                            <Input type='text' id={`animation-item-name-${i}`} name='eng_name' placeholder='Name English' required
                              onChange={event => handleChange(i, event)}
                              value={data.name}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={5}>
                          <FormGroup>
                            <Label for={`animation-item-name-${i}`}>Name (Arabic)</Label>
                            <Input type='text' id={`animation-item-name-${i}`} name='arb_name' placeholder='Name Arabic' required
                              onChange={event => handleChange(i, event)}
                              value={data.arb_name}
                            />
                          </FormGroup>
                        </Col>
                        {/* <Col md={4}>
                <AvGroup>
                <Label for={`animation-item-name-${i}`}>Session</Label>
                <AvField type='select' id={`animation-item-name-${i}`} name='sessions' multiple={true}  onChange={event => handleChange(i, event)} >
                  <option value={''} hidden={false}>Select Session</option>
                  {
                    sessions ? sessions.map((ele) => (
                      <option value={ele.value}>{ele.label} [ {ele.label_ar} ]</option>
                    )) : null
                  }
                </AvField>
              </AvGroup>
                        </Col> */}
                        <Col md={2}>
                          <Button.Ripple color='danger' className='text-nowrap px-1' onClick={event => handleRemoveFields(i, event, data)} outline>
                            <X size={14} className='mr-50' />
                            <span>Delete</span>
                          </Button.Ripple>
                        </Col>
                      </Row>
                    )
                  }) : null
                }
                <Row>
                  <Col sm='6'>
                    <Button.Ripple className='btn-icon' color='primary' onClick={handleAddFields}>
                      <Plus size={14} />
                      <span className='align-middle ml-25'>Add More</span>
                    </Button.Ripple>
                  
              {/* <Link to="/pages/component/sessions?admin=schoolAdmin" target="_blank" >
              <Button.Ripple color='primary' className='text-nowrap px-1 ml-3'  outline>
                           
                            <span>Create Sessions</span>
                          </Button.Ripple>
                          </Link> */}
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col sm='4'>

            </Col>

            <Col sm='4'>
              <Button.Ripple type="submit" className='btn-icon' color='success' onClick={addComponent}>
                <span className='align-middle ml-25'>Save</span>
              </Button.Ripple>
            </Col>
            <Col sm='4'>

            </Col>
          </Row>
        </AvForm>
      </CardBody>
    </Card>
  )
}

export default Fields
