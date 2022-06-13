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
import { selectThemeColors } from '@utils'
import Select, { components } from 'react-select'
import Multiselect from 'multiselect-react-dropdown'
import Avatar from "@components/avatar"
import { toast, Slide } from "react-toastify"
// import ErrorHandler from "../../../../common/ErrorHandler"
import { useParams, useHistory } from 'react-router-dom'
import { All_sessions } from "../../../../../services/home/sessions"
import { AddComponents, fetchComponent, updateComponent, getCommunicationMode, getCommunicationtype, LoadResourcesList } from '../../../../../services/home/Componentsapi'
const colorOptions = [
  { value: '0', label: 'Circuit' },
  { value: '1', label: 'Room' },
  { value: '2', label: 'Trainer' }
]
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
function Fields() {
  const [options, setOptions] = useState('')
  const paramsFromRoute = useParams()
  const history = useHistory()
  const [mode_of_learning, setmode_of_learning] = useState([{ id: 0, name: '', arb_name: ''}])
  const [resources, setresources] = useState([])
  const [name, setName] = useState()
  const [arabic_name, setarabic_name] = useState()
  const [communication_mode, setTrainingmode] = useState()
  const [component_type, setCommuniction_type] = useState()
  const [status, setStatus] = useState()
  const [communicationOptions, setcommunicationOptions] = useState([])
  const [communication_modes, setcommunication_modes] = useState([])
  const [sessions, setSessions] = useState([])
  const [ResourcesOptions, setResourcesOptions] = useState([])
  const [componentInfo, setComponentInfo] = useState({})
  const handleChange = (index, event) => {
    const values = [...mode_of_learning]
    if (event.target.name === 'eng_name') {
      values[index].id = index + 1
      values[index].name = event.target.value
    } else if (event.target.name === 'arb_name') {
      values[index].id = index + 1
      values[index].arb_name = event.target.value
    }

    setmode_of_learning(values)
    // console.log(mode_of_learning)
  }

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

  const handleAddFields = () => {
    const values = [...mode_of_learning]
    values.push({ name: '', arb_name: '', sessions:'' })
    setmode_of_learning(values)
  }

  const handleRemoveFields = (i, event, data) => {
    const values = [...mode_of_learning]
    const lists = values.filter(x => {
      return x.id !== data.id
    })
    setmode_of_learning(lists)
  }

  const schools_id = parseInt(localStorage.getItem("schoolIdToken"))

  const updateComponents = async () => {
    //console.log(resources)
    const request = { name, arabic_name, resources, communication_mode, component_type, status, mode_of_learning, schools_id }

    // console.log('data: ', request)
    try {
      const response = await updateComponent(paramsFromRoute.id && paramsFromRoute.id, request)
      if (response) {
        if (response.data) {
          const { data: { message } } = response.data
          toast.success(<SuccessContent msg={message} />, {
            transition: Slide,
            hideProgressBar: true,
            autoClose: 2000
          })
          history.push('/pages/component/list')
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  const getComponentId = async (id) => {
    // console.log(id)
    try {
      const response = await fetchComponent(id)
      if (response) {
        if (response.data) {
          const { data: { result: { component } } } = response.data
          if (component) {
            // console.log('results: ', component)
            const { name, arabic_name, resources, trainer_mode, component_type, mode_of_learning, status } = component
            setName(name)
            setarabic_name(arabic_name)
            setresources(resources)
            setTrainingmode(trainer_mode)
            // console.log(communication_mode)
            setCommuniction_type(component_type)
            setmode_of_learning(mode_of_learning)
            setStatus(status)
          }
        }
      }
    } catch (e) {
      console.log(e)
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
            // console.log(response.data.data.result)
            setcommunicationOptions(response.data.data.result)
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
            setcommunication_modes(types)
          }
        }
      }
    } catch (e) {
      //ErrorHandler(e)
      console.log("Error for Resources", e)
    }
  }
  const handleSubmit = (index, e) => {
    e.preventDefault()
  }


  const handleSelect = (e) => {
    setresources(Array.isArray(e) ? e.map(x => x.value) : [])
  }
  const getSessions = async () => {

    try {
      const response = await All_sessions(schools_id)
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
            console.log(sessions)
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
    getComponentId(paramsFromRoute.id)
    getRources()
    getCommunicationmode()
    getCommunicationtypes()
    getSessions()
  }, [paramsFromRoute.id])
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Edit Component</CardTitle>
      </CardHeader>
      <CardBody>
        <AvForm >
          <Row>
            <Col sm='6'>
              <AvGroup>
                <Label for='name_english'>Component Name (English)</Label>
                <AvInput name='name_english' id='name_english' onChange={(e) => {
                  setName(e.target.value)
                }} value={name} required placeholder="Name" />
                <AvFeedback>Please enter a valid Component Name!</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='name_arabic'>Component Name (Arabic)</Label>
                <AvInput name='name_arabic' id='name_arabic' onChange={(e) => {
                  setarabic_name(e.target.value)
                }} value={arabic_name} requied placeholder="Name" />
                <AvFeedback>Please enter a valid first Component Name!</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <Label>Resources</Label>
              <Select
                isClearable={false}
                theme={selectThemeColors}
                defaultValue={ResourcesOptions[resources]}
                value={resources ? ResourcesOptions.filter(obj => resources.includes(obj.value)) : ''}
                // value={ [Array.isArray(colorOptions) ? colorOptions.resources.map(x => value[x]) : []]}
                // defaultValue = { [Array.isArray(resources) ? resources.map(x => colorOptions[x]) : []] }
                isMulti
                name='multi_select'
                options={ResourcesOptions}
                className='react-select'
                classNamePrefix='select'
                onChange={(e) => {
                  handleSelect(e)
                }}>
              </Select>
            </Col>
            <Col sm='6'>
              <AvGroup>
                {/* {console.log(communication_mode)} */}
                <Label for='trainer'>Trainer Mode </Label>
                <AvField type='select' name='trainer' onChange={(e) => {
                  setTrainingmode(e.target.value)
                }} value={parseInt(communication_mode)} id='trainer' required>
                  <option value={null}>Select Mode</option>
                  {communication_modes ? communication_modes.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  )) : null}
                </AvField>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>

                <Label for='communication'>Componet Type</Label>
                <AvField type='select' name='communication' onChange={(e) => {
                  setCommuniction_type(e.target.value)
                }} value={parseInt(component_type)} required>
                  <option value=''> Select</option>
                  {communicationOptions ? communicationOptions.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  )) : null}
                </AvField>

              </AvGroup>
            </Col>
            <Col sm='6'>

              <AvRadioGroup name='Status' onChange={(e) => {
                setStatus(e.target.value)
              }} value={parseInt(status)} required >
                <Label for='status'>Status</Label>
                <AvRadio className='mb-1' customInput label='Active' value={1} />
                <AvRadio customInput label='Inactive' value={0} />

              </AvRadioGroup>
            </Col>
            <Col sm='12'>
              <CardText>
                Mode Of Learn
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
                <AvField type='select' id={`animation-item-name-${i}`} name='sessions'  onChange={event => handleChange(i, event)} value={data.sessions} >
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
                      <span className='align-middle ml-25'>Add New</span>
                    </Button.Ripple>
                  </Col>

                </Row>
              </Form>
            </Col>
            <Col sm='4'>

            </Col>
            <Col sm='4'>
              <Button.Ripple type="submit" className='btn-icon' color='success' onClick={updateComponents}>
                <span className='align-middle ml-25'>Submit</span>
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