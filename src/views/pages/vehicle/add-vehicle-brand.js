
import { Table, Form, Input, FormGroup, Label, FormFeedback, Button, Row, Col,  Media, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle  } from 'reactstrap'
import { useEffect, useState, Fragment } from "react"
import { AllVehicleBrand, DeleteVehicleBrand, EditVehicleBrand } from "../../../services/home/manageVehicle"
import { MoreVertical, Edit, Trash, ChevronLeft, ChevronRight, Coffee } from 'react-feather'
import ErrorHandler from "../../../common/ErrorHandler"
import { toast, Slide } from "react-toastify"
import Avatar from "@components/avatar"
import '../classRoom/classroom.scss'
import { authConfig } from "../../../api-config/authConfig"
import Headers from "../../../api-config/Headers"
import { data } from 'dom7'
import '../../../loader.scss'
import { BsChevronCompactLeft } from 'react-icons/bs'

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

const VehicleBrand = () => {
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
    const getVehicleBrand = async () => {
      const response = await AllVehicleBrand(schoolId)
      if (response) {
        if (response.data) {
          const { result } = response.data.data
          setItems(result)
          setLoader(false)
        }
      }
    }

    const deleteVehicleBrand = async (id) => {
      try {
        const response = await DeleteVehicleBrand(id)
        if (response) {
          if (response.data) {
            console.log(response)
          const { data: { message } } = response.data
            toast.success(<SuccessContent msg={message} />, {
            transition: Slide,
            hideProgressBar: true,
            autoClose: 2000
          })
          getVehicleBrand()
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
      function checkVehicleBrand(name) {
        return /^[A-Za-z\s]*$/.test(name)
      }

      function checkVehicleBrandArabic(name) {
        return /^[A-Za-z\s\u0600-\u06FF]*$/.test(name)
      }


      function checkLengthOfBrand(name) {
        return name.length < 17
      }

      console.log(checkVehicleBrandArabic(namArabic), "arabic")

        if (!!nam && !!namArabic && status === 'add' && checkVehicleBrand(nam) && checkVehicleBrandArabic(namArabic) && checkLengthOfBrand(nam) && checkVehicleBrand(namArabic)) {
            const reqObj = {
                brand_name: nam,
                brand_name_arabic: namArabic,
                school_id: schoolId
            }
            console.log(checkVehicleBrandArabic(namArabic), "arabic")
            authConfig.post(`/add_vehicle_brand`, reqObj, {
                        headers: Headers()
                    })
                    .then((response) => {
                        if (response && response.data) {
                          console.log(checkVehicleBrandArabic(namArabic), "arabic")
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
                             getVehicleBrand()
                         }
                        return response
                    })
                    .catch((error) => {
                        return error
                    })
        } else if (!!nam && !!namArabic && status === 'update') {
            const reqObj = {
                brand_name: nam,
                brand_name_arabic: namArabic,
                school_id: schoolId,
                id: primaryId
            }
            authConfig.post(`/update_vehicle_brand`, reqObj, {
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
                             getVehicleBrand()
                         }
                        return response
                    })
                    .catch((error) => {
                        return error
                    })
        } else {
            if (!checkVehicleBrand(nam) || !nam || !checkLengthOfBrand(nam)) {
                setNameValid(true)
            }
            if (!checkVehicleBrandArabic(namArabic) || !namArabic || !checkLengthOfBrand(namArabic)) {
              setNamArabicValid(true)
            }
        }
    }
    const editVehicleBrand = async (id) => {
        const response = await EditVehicleBrand(id)
        if (response) {
          if (response.data) {
            const { result } = response.data.data
            setNamArabic(result[0].brand_name_arabic)
            setName(result[0].brand_name)
            setStatus('update')
            setId(id)
            setNameValid(false)
            setNamArabicValid(false)
            setClass('add-form d-block')
          }
        }
      }
  
    useEffect(() => {
      getVehicleBrand()
    }, [])
  
  return (
   <div className="classroom-type">
     <Row>
       <Col md='12'>
            <Button color="primary" style={{textAlign: 'right'}} onClick={handleOpen}>
                  Add Vehicle Brand
            </Button>
       </Col>
       <Col md='12'>
       <Form className={dynamicClass} >
        <Row className="justify-content-between">
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="name">Vehicle Brand Name (English)</Label>
                    <Input invalid={namValid} type="text" name="name" id="name" placeholder="Vehicle Brand Name in English" value={nam} onChange={handleName}/>
                    <FormFeedback>Please enter valid Name</FormFeedback>
                </FormGroup>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                <FormGroup>
                    <Label for="nameAr">Vehicle Brand Name (Arabic)</Label>
                    <Input invalid={namArabicValid} type="text" name="nameAr" id="nameAr" placeholder="Vehicle Brand Name in Arabic" value={namArabic} onChange={handleNameAr}/>
                    <FormFeedback>Please enter valid Name</FormFeedback>
                </FormGroup>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
            <div className="d-flex justify-content-between mt-3">     
            <div className="left"><Button color='primary' onClick={handleregis}>{!!status && status === 'update' ? 'Update Vehicle Brand' : 'Add Vehicle Brand' }</Button></div>
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
              {items.map((ele, index) => ( 
                <tr>
                  <td>
                    { index + 1}
                  </td>
                  <td>
                    {ele.brand_name}
                  </td><td>
                    {ele.brand_name_arabic}
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
                              editVehicleBrand(ele.id)
                            }}>Edit</span>
                        </DropdownItem>
                        <DropdownItem onClick={e => e.preventDefault()}>
                          <Trash className='mr-50' size={15} /> <span className='align-middle' onClick={() => {
                              deleteVehicleBrand(ele.id)
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
          </div>
          }
          </div>
          }
           
    </Col>
   </Row>
   </div>
  )
}
export default VehicleBrand