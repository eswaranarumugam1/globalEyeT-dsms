
import { Table, Form, Input, FormGroup, Label, FormFeedback, Button, Row, Col,  Media, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle  } from 'reactstrap'
import { useEffect, useState, Fragment } from "react"
// import { AllVehicleType, DeleteVehicleTyp, EditVehicleType } from "../../../services/home/manageVehicle"
import { All_sessions, DeleteSession, UpdateSession, Editsession } from "../../../services/home/sessions"
import { MoreVertical, Edit, Trash, ChevronLeft, ChevronRight, Coffee } from 'react-feather'
import ErrorHandler from "../../../common/ErrorHandler"
import { toast, Slide } from "react-toastify"
import Avatar from "@components/avatar"
import '../classRoom/classroom.scss'
import { authConfig } from "../../../api-config/authConfig"
import Headers from "../../../api-config/Headers"
import { data } from 'dom7'
import Swal from 'sweetalert2'

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

const create = () => {
    const [items, setItems] = useState([])

  const [nam, setName] = useState('')
  const [namArabic, setNamArabic] = useState('')
  const [namValid, setNameValid] = useState(false)
  const [namArabicValid, setNamArabicValid] = useState(false)

  const [status, setStatus] = useState('add')
  const [dynamicClass, setClass] = useState("add-form d-none")
  const [primaryId, setId] = useState(null)
  
    const schoolId = parseInt(localStorage.getItem("schoolIdToken"))
    const getSessions = async () => {
      const response = await All_sessions(schoolId)
      if (response) {
        console.log(response)
        if (response.data) {
          const { result } = response.data.data
          setItems(result)
        }
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
          getSessions()
        }
        }
      } catch (e) {
        ErrorHandler(e)
      }
    }

    function handleName (e) {
        setName(e.target.value)
        if (!!e.target.value) {
            setNameValid(false)
        }
        }
        function handleNameAr (e) {
        setNamArabic(e.target.value)
        if (!!e.target.value) {
          setNamArabicValid(false)
        }
        }
        function handleOpen (e) {
            e.preventDefault()
            setClass('add-form d-block')
            setStatus('add')
        }
        function handleClose (e) {
            e.preventDefault()
            setClass('add-form d-none')
            setName('')
            setNamArabic('')
            setNameValid(false)
            setNamArabicValid(false)
        }

    function handleregis () {
        if (!!nam && !!namArabic && status === 'add') {
            const reqObj = {
              session_name: nam,
              session_name_arabic: namArabic,
                school_id: schoolId
            }
            console.log(reqObj)
            authConfig.post(`/component_session`, reqObj, {
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
                             setName('')
                             setNamArabic('')
                             setNameValid(false)
                             setNamArabicValid(false)
                             getSessions()
                         }
                        return response
                    })
                    .catch((error) => {
                        return error
                    })
        } else if (!!nam && !!namArabic && status === 'update') {
            const reqObj = {
              session_name: nam,
              session_name_arabic: namArabic,
                school_id: schoolId,
                id: primaryId
            }
            // console.log(reqObj)
            // return false
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
                             setName('')
                             setNamArabic('')
                             setNameValid(false)
                             setNamArabicValid(false)
                             getSessions()
                         }
                        return response
                    })
                    .catch((error) => {
                        return error
                    })
        } else {
            if (!nam) {
                setNameValid(true)
            }
            if (!namArabic) {
              setNamArabicValid(true)
            }
        }
    }
    const editVehicleType = async (id) => {
        const response = await Editsession(id)
      const value = response.data.data.result
        // return false
        if (value) { 
          if (value) {
            setNamArabic(value.session_name)
            setName(value.session_name_arabic)
            setStatus('update')
            setId(id)
            setNameValid(false)
            setNamArabicValid(false)
            setClass('add-form d-block')
          }
        }
      }
  
    useEffect(() => {
      getSessions()
    }, [])
  
  return (
   <div className="classroom-type">
     <Row>
       <Col md='12'>
            <Button color="primary" style={{textAlign: 'right'}} onClick={handleOpen}>
                  Add Session
            </Button>
       </Col>
       <Col md='12'>
       <Form className={dynamicClass} >
        <Row className="justify-content-between">
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="name">Session Name (English)</Label>
                    <Input invalid={namValid} type="text" name="name" id="name" placeholder="Session Name in English" value={nam} onChange={handleName}/>
                    <FormFeedback>Please enter valid Name</FormFeedback>
                </FormGroup>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="nameAr">Session Name (Arabic)</Label>
                    <Input invalid={namArabicValid} type="text" name="nameAr" id="nameAr" placeholder="Session Name in Arabic" value={namArabic} onChange={handleNameAr}/>
                    <FormFeedback>Please enter valid Name</FormFeedback>
                </FormGroup>
            </Col> 
            <div className="button-css">
            <div className="left"><Button color='primary' onClick={handleregis}>{!!status && status === 'update' ? 'Update Session' : 'Add Session' }</Button></div>
            <div className="right"><Button color='primary' onClick={handleClose}>Close</Button></div>
            </div>
            </Row>
            </Form>
       </Col>
       <Col md='12'>
           { items.length !== 0 ? <div className="container">
                 <div className="row m-2">
            <Table responsive>
              <thead>
                <tr>
                    <th>Sl No</th>
                    <th>Name (English)</th>
                    <th>Name (Arabic)</th>
                    <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {
                items ? items.map((ele, index) => ( 
                <tr>
                  <td>
                    { index + 1}
                  </td>
                  <td>
                    {ele.session_name}
                  </td><td>
                    {ele.session_name_arabic}
                  </td>
                  <td>
                    <UncontrolledDropdown>
                      <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                        <MoreVertical size={15} />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem onClick={e => e.preventDefault()}>
                          <Edit className='mr-50' size={15} />
                              <span className='align-middle' onClick={() => {
                              editVehicleType(ele.id)
                            }}>Edit</span>
                        </DropdownItem>
                        <DropdownItem onClick={e => e.preventDefault()}>
                          <Trash className='mr-50' size={15} /> <span className='align-middle' onClick={() => {
                              deleteSession(ele.id)
                            }}>Delete</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>

            )) : null
          }
          
          </tbody>
          </Table>
      </div>
     </div> : <div className='m-3 p-3'> Loading... </div>}
    </Col>
   </Row>
   </div>
  )
}
export default create