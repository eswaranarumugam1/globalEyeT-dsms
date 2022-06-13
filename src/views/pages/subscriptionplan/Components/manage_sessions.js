import { useState, useEffect, Fragment } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Label, Button, CardText, Row, Col, div, Form, FormGroup, Input, CustomInput } from 'reactstrap'
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
import { authConfig } from "../../../../api-config/authConfig"
import Headers from "../../../../api-config/Headers"
// import ErrorHandler from "../../../../common/ErrorHandler"
import { useParams, useHistory, Link } from 'react-router-dom'
import { All_sessions, DeleteSession, Editsession } from "../../../../services/home/sessions"
import { AddComponents, fetchComponent, updateComponent, getCommunicationMode, getCommunicationtype, Addsession } from '../../../../services/home/Componentsapi'
import { render } from '@fullcalendar/react'

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
        <h6 className="toast-title font-weight-bold">Error</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        {msg}
      </span>
    </div>
  </Fragment>
)
function manage_sessions() {
  const [options, setOptions] = useState('')
  const paramsFromRoute = useParams()
  const history = useHistory()
  const [mode_of_learning, setmode_of_learning] = useState([])
  const [resources, setresources] = useState([])
  const [nam, setNam] = useState('')
  const [namArabic, setNamArabic] = useState('')
  const [arabic_name, setarabic_name] = useState()
  const [communication_mode, setTrainingmode] = useState()
  const [component_type, setCommuniction_type] = useState()
  const [status, setStatus] = useState()
  const [sessions, setSessions] = useState([])
  const [session_name, setSessionname] = useState('')
  const [session_name_arabic, setSessionnameAr] = useState('')
  const [dynamicClass, setClass] = useState("add-form d-none")
  const [name, setName] = useState('')
  const [primaryId, setId] = useState(null)
  
  const schools_id = parseInt(localStorage.getItem("schoolIdToken"))
  const school_id = parseInt(localStorage.getItem("schoolIdToken"))

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
        const result = response.data.data.result
        setName(result.component.name)
        setarabic_name(result.component.arabic_name)
        setmode_of_learning(result.mode_of_learn)
        console.log(result.mode_of_learn)
        console.log(result)
      }
    } catch (e) {
      console.log(e)
    }
  }
 
  const createSession = async (mode_of_learning, plan_components) => {

    const request = {session_name, session_name_arabic, mode_of_learning, plan_components, school_id  }

    try {
      const response = await Addsession(request)
      if (response) {
        if (response.status === 200) {
        // if (response.data) {
          console.log(response.status_code)
          const { data: { message } } = response.data
          toast.success(<SuccessContent msg={message} />, {
            transition: Slide,
            hideProgressBar: true,
            autoClose: 2000
          })
          setSessionname('')
          setSessionnameAr('')
          getComponentId(paramsFromRoute.id)
          // history.push('/pages/component/list')
        // }
      } else if (response.status === 422) {
        console.log(response)

        toast.error(<ErrorContent msg={response.msg} />, {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000
        })
      } else {
        console.log(response)
          toast.error(<ErrorContent msg={response.message} />, {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000
        })

      }
      }
    } catch (e) {
      console.log("hello")
      console.log(JSON.stringify(e))
      toast.error(<ErrorContent msg={e} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000
      })
      getComponentId(paramsFromRoute.id)
    }

  }
  
  const deleteSession = async (id) => {
    try {
      const response = await DeleteSession(id)
      if (response) {
        if (response.data) {
          console.log(response)
        const { data: { message } } = response.data
          toast.success(<SuccessContent msg={message} />, {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000
        })
        getComponentId(paramsFromRoute.id)
      }
      }
    } catch (e) {
      console.log(e)
    }
  }
  
  function handleClose (e) {
    e.preventDefault()
    setClass('add-form d-none')
    // setName('')
    // setNamArabic('')
   
}
const edit_session = async (id) => {
  const response = await Editsession(id)
const value = response.data.data.result
  // return false
  if (value) { 
    if (value) {
      setNamArabic(value.session_name_arabic)
      setNam(value.session_name)
      setId(id)
      setClass('add-form d-block')
    }
  }
}
function handleregis () {
  const reqObj = {
    session_name: nam,
    session_name_arabic: namArabic,
      school_id,
      id: primaryId
  }
  authConfig.put(`/component_session/${primaryId}`, reqObj, {
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
         setClass('add-form d-none')
         setNam('')
         setNamArabic('')
         getComponentId(paramsFromRoute.id)
     }
    return response
})
.catch((error) => {
    return error
})
}

  useEffect(() => {
    getComponentId(paramsFromRoute.id)
  }, [paramsFromRoute.id])
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Manage Sessions</CardTitle>
      </CardHeader>
      <CardBody>
        
        <AvForm >
          <Row>
            <Col sm='6'>
              <AvGroup>
                <Label for='name_english'>Component Name (English)</Label>
                <AvInput name='name_english' readOnly id='name_english' value={name} required placeholder="Name" />
                <AvFeedback>Please enter a valid Component Name!</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='name_arabic'>Component Name (Arabic)</Label>
                <AvInput name='name_arabic' readOnly id='name_arabic' value={arabic_name} requied placeholder="Name" />
                <AvFeedback>Please enter a valid first Component Name!</AvFeedback>
              </AvGroup>
            </Col>
           
            <Col sm='12'>
              <CardText>
                Mode Of Learn
              </CardText>
              <Row>
        <Col md='12'>
       <Form className={dynamicClass} >
        <Row className="justify-content-between">
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="name">Session Name (English)</Label>
                    <Input  type="text" name="name"  value={nam} onChange={(e) => {
                  setNam(e.target.value)
                }} placeholder="Session Name in English"/>
                  
                </FormGroup>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="nameAr">Session Name (Arabic)</Label>
                    <Input type="text" onChange={(e) => {
                  setNamArabic(e.target.value) 
                }} name="nameAr"  value={namArabic} placeholder="Session Name in Arabic"/>
                  
                </FormGroup>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}> 
            <div className="button-css float-right">
            <Button className="btn btn-primary" color='primary' onClick={handleregis} >Update</Button>
           <Button className="btn btn-danger" color='primary' onClick={handleClose} >Close</Button>
            </div>
            </Col>
            </Row>
            </Form>
       </Col>
        </Row>
              <Form>
                {
                  mode_of_learning ? mode_of_learning.map((data, i) => {

                    return (
                      <Row className='justify-content-between align-items-center ' style={{ margin:'10px', border: '2px solid #eee' }} >
                        <Col md={3}>
                          <FormGroup>
                            <Label >Name (English)</Label>
                            <Input type='text' readOnly  name='eng_name' placeholder='Name English' required
                              
                              value={data.name}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={3}>
                          <FormGroup>
                            <Label >Name (Arabic)</Label>
                            <Input type='text' readOnly name='arb_name' placeholder='Name Arabic' required
                            
                              value={data.arb_name}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                     
                     <h7>Sessions</h7>
                
                  { data.sessions ? data.sessions.map((session, i) => {
                    return (
                      <div>
                     <Row>
                       <Col md={4}>
                      <FormGroup>
                        <Label>Name</Label>
                      <Input type='text' readOnly name='arb_name' value={session.session_name} placeholder='' required
                          />
                      </FormGroup>
                      </Col>
                      <Col md={4}>
                      <FormGroup>
                        <Label>Arabic Name</Label>
                      <Input type='text' readOnly name='arb_name' value={session.session_name_arabic} placeholder='' required
                          />
                      </FormGroup>
                      </Col>
                      <Col md={4}>
                      <FormGroup>
                        
                    <Button className="btn btn-info mt-2" onClick={() => {
                      edit_session(session.id)
                    }}>Edit</Button>
                    <Button onClick={() => {
                      deleteSession(session.id)
                    } } className="btn btn-danger mt-2">Delete</Button>
                      </FormGroup>
                      </Col>
                  
                      </Row>
                     
                      </div>
                   
                    )

                  }) : null
                }
            
                        </Col>
                        <Row>
                        <Col md={12}>
                        <Label className="float-left"><h4>Create Session</h4></Label>
                        </Col>
                        </Row>
                      <Row>
                        
                      <Col md={4}>
                       
                      <FormGroup>
                        <Label>Name</Label>
                      <Input type='text' name='name' autoComplete="new-name"  onChange={(e) => {
                  setSessionname(e.target.value)
                }} placeholder='Name' required  />
                      </FormGroup>
                      </Col>
                      <Col md={4}>
                      <FormGroup>
                        <Label>Arabic Name</Label>
                      <Input type='text' autoComplete="off" name='arb_name'  onChange={(e) => {
                  setSessionnameAr(e.target.value)
                }}  placeholder='Arabic name' required
                          />
                      </FormGroup>
                      </Col>
                      <Col md={4}>
                      <FormGroup>
                        
                    <Button className="btn btn-success mt-2" onClick={() => {
                      createSession(data.id, paramsFromRoute.id)
                    }}>Create</Button>
                    
                      </FormGroup>
                      </Col>
                  
                      </Row>
                      
                      </Row>
                  
                    )
                 
                  }) : null
                }
                <Row>
                  

                </Row>
              </Form>
            </Col>
            <Col sm='4'>

            </Col>
            <Col sm='4'>
               
              <Button.Ripple  onClick={() => history.goBack()} className='btn-icon'  color='success' >
                <span className='align-middle ml-25'>Back</span>
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

export default manage_sessions