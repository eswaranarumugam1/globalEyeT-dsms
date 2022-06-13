
import { Table, Form, Input, FormGroup, Label, FormFeedback, Button, Row, Col,  Media, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle  } from 'reactstrap'
import { useEffect, useState, Fragment } from "react"
import { AllVehicleType, DeleteVehicleTyp, EditVehicleType } from "../../../services/home/manageVehicle"
import { MoreVertical, Edit, Trash, ChevronLeft, ChevronRight, Coffee } from 'react-feather'
import ErrorHandler from "../../../common/ErrorHandler"
import { toast, Slide } from "react-toastify"
import Avatar from "@components/avatar"
import '../classRoom/classroom.scss'
import { authConfig } from "../../../api-config/authConfig"
import Headers from "../../../api-config/Headers"
import { data } from 'dom7'
import '../../../loader.scss'

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

const VehicleType = () => {
    const [items, setItems] = useState([])

  const [nam, setName] = useState('')
  const [namArabic, setNamArabic] = useState('')
  const [namValid, setNameValid] = useState(false)
  const [namArabicValid, setNamArabicValid] = useState(false)

  const [status, setStatus] = useState('add')
  const [dynamicClass, setClass] = useState("add-form d-none")
  const [primaryId, setId] = useState(null)
  const [loader, setLoader] = useState(true)  
  
    const schoolId = parseInt(localStorage.getItem("schoolIdToken"))
    const getVehicleType = async () => {
      const response = await AllVehicleType(schoolId)
      if (response) {
        if (response.data) {
          const { result } = response.data.data
          setItems(result)
          setLoader(false)
        }
      }
    }

    const deleteVehicleType = async (id) => {
      try {
        const response = await DeleteVehicleTyp(id)
        if (response) {
          if (response.data) {
            console.log(response)
          const { data: { message } } = response.data
            toast.success(<SuccessContent msg={message} />, {
            transition: Slide,
            hideProgressBar: true,
            autoClose: 2000
          })
          getVehicleType()
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
      function checkValid(name) {
        return /^[A-Za-z\s]*$/.test(name)
      }

      function checkValidArabicName(name) {
        return /^[A-Za-z\u0600-\u06FF\s]*$/.test(name)
      }

      // console.log(checkValid(nam))
        if (!!nam && !!namArabic && status === 'add' && checkValid(nam) && checkValidArabicName(namArabic)) {
            const reqObj = {
                type_name: nam,
                type_name_arabic: namArabic,
                school_id: schoolId
            }
            authConfig.post(`/add_vehicle_type`, reqObj, {
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
                             getVehicleType()
                         }
                        return response
                    })
                    .catch((error) => {
                        return error
                    })
        } else if (!!nam && !!namArabic && status === 'update' && checkValid(nam) && checkValid(namArabic)) {
            const reqObj = {
                type_name: nam,
                type_name_arabic: namArabic,
                school_id: schoolId,
                id: primaryId
            }
            authConfig.post(`/update_vehicle_type`, reqObj, {
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
                             getVehicleType()
                         }
                        return response
                    })
                    .catch((error) => {
                        return error
                    })
        } else {
            if (!checkValid(nam) || !nam) {
                setNameValid(true)
            }
            if (!checkValidArabicName(namArabic) || !namArabic) {
              setNamArabicValid(true)
            }
        }
    }
    const editVehicleType = async (id) => {
        const response = await EditVehicleType(id)
        if (response) {
          if (response.data) {
            const { result } = response.data.data
            setNamArabic(result[0].type_name_arabic)
            setName(result[0].type_name)
            setStatus('update')
            setId(id)
            setNameValid(false)
            setNamArabicValid(false)
            setClass('add-form d-block')
          }
        }
      }
  
    useEffect(() => {
      getVehicleType()
    }, [])
  
  return (
   <div className="classroom-type">
     <Row>
       <Col md='12'>
            <Button color="primary" style={{textAlign: 'right'}} onClick={handleOpen}>
                  Add Vehicle Type
            </Button>
       </Col>
       <Col md='12'>
       <Form className={dynamicClass} >
        <Row className="justify-content-between">
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="name">Vehicle Type Name (English)</Label>
                    <Input invalid={namValid} type="text" name="name" id="name" placeholder="Vehicle Type Name in English" value={nam} onChange={handleName}/>
                    <FormFeedback>Please enter valid Name</FormFeedback>
                </FormGroup>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="nameAr">Vehicle Type Name (Arabic)</Label>
                    <Input invalid={namArabicValid} type="text" name="nameAr" id="nameAr" placeholder="Vehicle Type Name in Arabic" value={namArabic} onChange={handleNameAr}/>
                    <FormFeedback>Please enter valid Name</FormFeedback>
                </FormGroup>
            </Col> 
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
            <div className="d-flex justify-content-between mt-3">            
            <div className="left"><Button color='primary' onClick={handleregis}>{!!status && status === 'update' ? 'Update Vehicle Type' : 'Add Vehicle Type' }</Button></div>
            <div className="right"><Button color='primary' onClick={handleClose}>Close</Button></div>
            </div>
            </Col> 
            </Row>
            </Form>
       </Col>
       <Col md='12'>
       {!!loader ? <div className='d-flex justify-content-center my-4'>
          <div class="loadingio-spinner-pulse-i2lv7yef8ad"><div class="ldio-j6ki2ezptn">
<div></div><div></div><div></div>
</div></div>
          </div> : <div>
           { !!items && items.length !== 0 ? <div className="container">
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
              { items.map((ele, index) => ( 
                <tr>
                  <td>
                    { index + 1}
                  </td>
                  <td>
                    {ele.type_name}
                  </td><td>
                    {ele.type_name_arabic}
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
                              deleteVehicleType(ele.id)
                            }}>Delete</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>

            )) 
          }
          
          </tbody>
          </Table>
      </div>
     </div> : <div className='d-flex justify-content-center my-4'>
          There is nothing to show, please add first. 
          </div>}
    </div> }
    </Col>    
   </Row>
   </div>
  )
}
export default VehicleType