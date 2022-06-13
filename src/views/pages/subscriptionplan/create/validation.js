import { useState, useEffect, Fragment } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Label, Button, Row, Col, CustomInput, CardText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {
  AvForm,
  AvGroup,
  AvField,
  AvInput,
  AvFeedback
} from 'availity-reactstrap-validation-safe'
import { toast, Slide } from "react-toastify"
import { Coffee } from "react-feather"
import Avatar from "@components/avatar"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { LicenseTypeget, LicenseType, SubLicenseType, SubLicenseType1, SubLicenseType2, SubLicenseType3, School_list, PostSubscriptionPlan } from "../../../../services/home/subscriptionApi"

// import {  SubLicenseType, SubLicenseType1, SubLicenseType2 } from "../../../../services/home/admin"
import ErrorHandler from "../../../../common/ErrorHandler"
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { AllComponent_with_session, GetPriceandhours } from '../../../../services/home/Componentsapi'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { ReactSortable } from 'react-sortablejs'

// const dragItems = [
//   {
//     id: '1',
//     title: 'Draggable Card 1',
//     content:
//       'Jelly beans sugar plum cheesecake cookie oat cake soufflé.Tootsie roll bonbon liquorice tiramisu pie powder.Donut sweet roll marzipan pastry cookie cake tootsie roll oat cake cookie.'
//   },
//   {
//     id: '2',
//     title: 'Draggable Card 2',
//     content:
//       'Jelly beans sugar plum cheesecake cookie oat cake soufflé.Tootsie roll bonbon liquorice tiramisu pie powder.Donut sweet roll marzipan pastry cookie cake tootsie roll oat cake cookie.'
//   },
//   {
//     id: '3',
//     title: 'Draggable Card 3',
//     content:
//       'Jelly beans sugar plum cheesecake cookie oat cake soufflé.Tootsie roll bonbon liquorice tiramisu pie powder.Donut sweet roll marzipan pastry cookie cake tootsie roll oat cake cookie.'
//   },
//   {
//     id: '4',
//     title: 'Draggable Card 4',
//     content:
//       'Jelly beans sugar plum cheesecake cookie oat cake soufflé.Tootsie roll bonbon liquorice tiramisu pie powder.Donut sweet roll marzipan pastry cookie cake tootsie roll oat cake cookie.'
//   }
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

const Prerequsits = ({value}) => (
  <Fragment>
    <Modal isOpen={true}>
    <ModalHeader toggle={true}>Add Prerequsits</ModalHeader>
                    <ModalBody>
                        <h1>
                          {value}
                          {console.log('hello')}
                        </h1>
                    </ModalBody>
                    <ModalFooter>
         <Button color="primary" >Add</Button>
         <Button color="secondary" >Cancel</Button>
      </ModalFooter>
     </Modal>
  </Fragment>
) 

const AddSubscriptionPlan = () => {
  const [name, setName] = useState('')
  const [arabic_name, setnameArabic] = useState('')
  const [plantype, setPlanType] = useState('')
  const [geartype, setGearType] = useState('')
  const [plan_desc_english, setEnBannerDescription] = useState('')
  const [plan_desc_arabic, setArBannerDescription] = useState('')
  const [gender, setGender] = useState(null)
  const [min_age, setMinAge] = useState('')
  const [license_type_id, setLicenseType] = useState('')
  const [sub_license_type_id, setSubLicenseType] = useState('')
  const [sub_license_type1_id, setSubLicenseType1] = useState('')
  const [sub_license_type2_id, setSubLicenseType2] = useState('')
  const [sub_license_type3_id, setSubLicenseType3] = useState('')
  const [totalhours, setTotalHours] = useState(0)
  const [totalprice, setTotalPrice] = useState(0)
  const [currency, setCurrency] = useState('')
  const [components, setComponents] = useState([])
  const [waitinglistno, setWaitingListNo] = useState('')
  const [status, setStatus] = useState('')
  const [registration, setRegistration] = useState('')
  const [mandatorysequence, setMandatorySequence] = useState('')
  //const [school_id, setSchool] = useState('')

  const [lisencetypelist, setLicenseTypeList] = useState([])
  const [sublisencetypelist, setSubLicenseTypeList] = useState([])
  const [sublisencetypelist1, setSubLicenseType1List] = useState([])
  const [sublisencetypelist2, setSubLicenseType2List] = useState([])
  const [sublisencetypelist3, setSubLicenseType3List] = useState([])

  const [planlist, setPlanList] = useState([])
  const [Schoollist, SetSchoollist] = useState([])
  const [componentlist, setComponentList] = useState([])
  const options = {}


  const school_id = parseInt(localStorage.getItem("schoolIdToken"))

  // console.log(school_id)
  const getLicenseType = async () => {
    try {
      const response = await LicenseTypeget(school_id)
      if (response) {
        if (response.data) {
          const { data: { result } } = response.data
          if (result && result.length && result.length > 0) {
            setLicenseTypeList(result)
          }
        }
      }
    } catch (e) {
      ErrorHandler(e)
    }
  }

  // const School_list_function = async () => {
  //   try {
  //     const response = await School_list()
  //     if (response) {
  //       if (response.data) {
  //         const { data: { result: { data } } } = response.data
  //         if (data && data.length && data.length > 0) {
  //           SetSchoollist(data)
  //         }
  //       }
  //     }
  //   } catch (e) {
  //     ErrorHandler(e)
  //   }
  // }

  const getSubLicenseType = async (id) => {
    try {
      const response = await SubLicenseType(id, school_id)
      if (response) {
        if (response.data) {
          const { data: { result: { sub_license_list } } } = response.data
          if (sub_license_list && sub_license_list.length && sub_license_list.length > 0) {
            setSubLicenseTypeList(sub_license_list)
          }
          const { data: { result: { plans } } } = response.data
          if (plans && plans.length && plans.length > 0) {
            setPlanList(plans)
          }
        }
      }
    } catch (e) {
      ErrorHandler(e)
    }
  }

  const getSubLicenseType1 = async (id) => {
    try {
      const response = await SubLicenseType1(id, school_id)
      if (response) {
        if (response.data) {
          const { data: { result: { sub_license_lv1 } } } = response.data
          if (sub_license_lv1 && sub_license_lv1.length && sub_license_lv1.length > 0) {
            setSubLicenseType1List(sub_license_lv1)
          }
          const { data: { result: { plans } } } = response.data
          if (plans && plans.length && plans.length > 0) {
            setPlanList(plans)
          }
        }
      }
    } catch (e) {
      ErrorHandler(e)
    }
  }

  const getSubLicenseType2 = async (id) => {
    try {
      const response = await SubLicenseType2(id, school_id)
      if (response) {
        if (response.data) {
          const { data: { result: { sub_license_lv2 } } } = response.data
          if (sub_license_lv2 && sub_license_lv2.length && sub_license_lv2.length > 0) {
            setSubLicenseType2List(sub_license_lv2)
          }
          const { data: { result: { plans } } } = response.data
          if (plans && plans.length && plans.length > 0) {
            setPlanList(plans)
          }
        }
      }
    } catch (e) {
      ErrorHandler(e)
    }
  }

  const getSubLicenseType3 = async (id) => {
    try {
      const response = await SubLicenseType3(id, school_id)
      if (response) {
        if (response.data) {
          const { data: { result: { sub_license_lv3 } } } = response.data
          if (sub_license_lv3 && sub_license_lv3.length && sub_license_lv3.length > 0) {
            setSubLicenseType3List(sub_license_lv3)
          }
          const { data: { result: { plans } } } = response.data
          if (plans && plans.length && plans.length > 0) {
            setPlanList(plans)
          }
        }
      }
    } catch (e) {
      ErrorHandler(e)
    }
  }
  const getcomponents = async () => {
    try {
      const response = await AllComponent_with_session()
      // console.log(response)
      if (response) {
        if (response.data) {
          const { data: { result } } = response.data
          if (result && result.length && result.length > 0) {
            setComponentList(result)
          }
        }
      }
    } catch (e) {
      ErrorHandler(e)
    }
  }
  const cost_price_calculation = async (component_id) => {

    try {
      const response = await GetPriceandhours(component_id)
      if (response) {
        // console.log(response)
        if (response.data) {
          
          const result_key = response.data.data.result
           console.log(result_key)    
           setTotalHours(parseFloat(totalhours) + parseFloat(result_key.hours))
           setTotalPrice(parseFloat(totalprice) + parseFloat(result_key.price))
           console.log(totalhours)
           console.log(totalprice)
        }
      }
    } catch (e) {
      console.log(e)
    }

  }

  const cost_price_calculation_uncheck = async (component_id) => {

    try {
      const response = await GetPriceandhours(component_id)
      if (response) {
        // console.log(response)
        if (response.data) {
          
          const result_key = response.data.data.result
           console.log(result_key)    
           setTotalHours(parseFloat(totalhours) - parseFloat(result_key.hours))
           setTotalPrice(parseFloat(totalprice) - parseFloat(result_key.price))
        }
      }
    } catch (e) {
      console.log(e)
    }

  }


  useEffect(() => {
    getLicenseType()
    getcomponents()
    // School_list_function()
  }, [])

  const addStudent = async () => {
    if (status === '') {
      alert('Status is Required')
      return
    }

    const request = {
      name,
      arabic_name,
      plan_type: plantype,
      gear_type: geartype,
      description: plan_desc_english,
      arabic_description: plan_desc_arabic,
      gender,
      min_age,
      license_type_id,
      sub_license_id: sub_license_type_id,
      sub_license_lv1_id: sub_license_type1_id,
      sub_license_lv2_id: sub_license_type2_id,
      sub_license_lv3_id: sub_license_type3_id,
      school_id,
      total_hrs: totalhours,
      total_amount: totalprice,
      currency,
      components,
      no_of_wl_restrict_for_register: waitinglistno,
      status,
      online_registration_allowed: registration,
      mandatory_sequence: mandatorysequence
    }
    try {
      // console.log('this is request data', request)
      const response = await PostSubscriptionPlan(request)
      if (response) {
        if (response.data) {
          const { data: { message } } = response.data
          toast.success(<SuccessContent msg={message} />, {
            transition: Slide,
            hideProgressBar: true,
            autoClose: 2000
          })
          history.push(`pages/subscriptionplanlist?admin=schoolAdmin`)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  const [valuelist, setValue] = useState([])
  const handleChange = (value) => {
    setValue(value)
    console.log('this is the data', valuelist)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Create New Subscription Plan</CardTitle>
      </CardHeader>
      <CardBody>
        <AvForm>
          <Row>

            <Col sm='6'>
              <AvGroup>
                <Label for='name_english'>Plan Name</Label>
                <AvInput name='name_english' id='name_english' onChange={(e) => {
                  setName(e.target.value)
                }} required placeholder="Name" />
                <AvFeedback>Please enter a valid name!</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='name_arabic'>Plan Name (Arabic)</Label>
                <AvInput name='name_arabic' id='name_arabic' onChange={(e) => {
                  setnameArabic(e.target.value)
                }} required placeholder="Name" />
                <AvFeedback>Please enter a valid first name!</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <Label for='plan'>Plan Type</Label>
              <Row>
                <Col sm='6'>
                  <CustomInput type='radio' id='main_plan' name='plan_type' inline label='Main Plan' value='main_plan' onClick={(e) => {
                    setPlanType(e.target.value)
                  }} />
                </Col>
                <Col sm='6'>
                  <CustomInput type='radio' id='sub_plan' name='plan_type' inline label='Sub Plan' value='sub_plan' onClick={(e) => {
                    setPlanType(e.target.value)
                  }} />
                </Col>
              </Row>
            </Col>
            <Col sm='6'>
              <Label for='gear'>Gear</Label>
              <Row>
                <Col sm='6'>
                  <CustomInput type='radio' id='gear_auto' name='gear' inline label='Automatic' value='gear_auto' onClick={(e) => {
                    setGearType(e.target.value)
                  }} />
                </Col>
                <Col sm='6'>
                  <CustomInput type='radio' id='gear_manual' name='gear' inline label='Manual' value='gear_manual' onClick={(e) => {
                    setGearType(e.target.value)
                  }} />
                </Col>
              </Row>
            </Col>
            <Col sm='12'>
              <br />
              <AvGroup>
                <Label for='banner_description'><h5><b>Plan Description</b></h5></Label>
                <CKEditor
                  // data={endescription}
                  editor={ClassicEditor}
                  onChange={(event, editor) => {
                    const data = editor.getData()
                    setEnBannerDescription(data)
                  }}
                />
              </AvGroup>
            </Col>
            <Col sm='12'>
              <AvGroup>
                <Label for='banner_description'><h5><b>Arabic Plan Description</b></h5></Label>
                <CKEditor
                  // data={endescription}
                  editor={ClassicEditor}
                  onChange={(event, editor) => {
                    const data = editor.getData()
                    setArBannerDescription(data)
                  }}
                />
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='gender'>Gender</Label>
                <AvField type='select' name='gender' id='gender' onChange={(e) => {
                  setGender(e.target.value)
                }} required>
                  <option value={null}>Select Gender</option>
                  <option value={0}>Male</option>
                  <option value={1}>Female</option>
                  <option value={2}>Others</option>
                </AvField>
                <AvFeedback>Please select a Gender Type</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='min_age'>Min Age</Label>
                <AvInput name='min_age' id='min_age' onChange={(e) => {
                  setMinAge(e.target.value)
                }} required placeholder="Enter Min Age" />
                <AvFeedback>Please enter a valid Min Age!</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='license_type'>License Type</Label>
                <AvField type='select' name='license_type' id='license_type' onChange={(e) => {
                  setLicenseType(e.target.value)
                  getSubLicenseType(e.target.value)
                }} required>
                  <option value={null}>Select License Type</option>
                  {
                    lisencetypelist ? lisencetypelist.map((ele) => (
                      <option value={ele.id}>{ele.name}</option>
                    )) : null
                  }
                </AvField>
                <AvFeedback>Please select a License Type</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='sub_license_type'>Sub License Type</Label>
                <AvField type='select' name='sub_license_type' id='sub_license_type' onChange={(e) => {
                  setSubLicenseType(e.target.value)
                  getSubLicenseType1(e.target.value)
                }} required>
                  <option value={null}>Select Sub License Type</option>
                  {
                    sublisencetypelist ? sublisencetypelist.map((ele) => (
                      <option value={ele.id}>{ele.name}</option>
                    )) : null
                  }
                </AvField>
                <AvFeedback>Please select a Sub License Type</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='sub_license_type1'>Sub License Type 1</Label>
                <AvField type='select' name='sub_license_type1' id='sub_license_type1' onChange={(e) => {
                  setSubLicenseType1(e.target.value)
                  getSubLicenseType2(e.target.value)
                }}>
                  <option value={null}>Select Sub License Type 1</option>
                  {
                    sublisencetypelist1 ? sublisencetypelist1.map((ele) => (
                      <option value={ele.id}>{ele.name}</option>
                    )) : null
                  }
                </AvField>
                <AvFeedback>Please select a Sub License Type 1</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='sub_license_type2'>Sub License Type 2</Label>
                <AvField type='select' name='sub_license_type2' id='sub_license_type2' onChange={(e) => {
                  setSubLicenseType2(e.target.value)
                  getSubLicenseType3(e.target.value)
                }}>
                  <option value={null}>Select Sub License Type 2</option>
                  {
                    sublisencetypelist2 ? sublisencetypelist2.map((ele) => (
                      <option value={ele.id}>{ele.name}</option>
                    )) : null
                  }
                </AvField>
                <AvFeedback>Please select a Sub License Type 2</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='sub_license_type3'>Sub License Type 3</Label>
                <AvField type='select' name='sub_license_type3' id='sub_license_type3' onChange={(e) => {
                  setSubLicenseType3(e.target.value)
                }} >
                  <option value={null}>Select Sub License Type 3</option>
                  {
                    sublisencetypelist3 ? sublisencetypelist3.map((ele) => (
                      <option value={ele.id}>{ele.name}</option>
                    )) : null
                  }
                </AvField>
                <AvFeedback>Please select a Sub License Type 3</AvFeedback>
              </AvGroup>
            </Col>

            {/* <Col sm='6'>
              <AvGroup>
                <Label for='sub_license_type3'>school</Label>
                <AvField type='select' name='school_id' id='school-id' onChange={(e) => {
                  setSchool(e.target.value)
                }} >
                  <option value={null}>Select School</option>
                  {
                    Schoollist ? Schoollist.map((ele) => (
                      <option value={ele.id}>{ele.name}</option>
                    )) : null
                  }
                </AvField>
                <AvFeedback>Please select a School </AvFeedback>
              </AvGroup>
            </Col> */}

            <Col sm='6'>

            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='t_hours'>Total Hours</Label>
                <AvInput name='t_hours' id='t_hours' onChange={(e) => {
                  setTotalHours(e.target.value)
                }} required placeholder="Total Hours" readOnly value={totalhours} />
                <AvFeedback>Please enter a valid Total Hours</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <Row>
                <Col sm='8'>
                  <AvGroup>
                    <Label for='t_price'>Total Price</Label>
                    <AvInput readOnly name='t_price' id='t_price' onChange={(e) => {
                      setTotalPrice(e.target.value)
                    }} required placeholder="Total Price" value={totalprice} />
                    <AvFeedback>Please enter a valid Total Price</AvFeedback>
                  </AvGroup>
                </Col>
                <Col sm='4'>
                  <AvGroup>
                    <Label for='currency'>Currency</Label>
                    <AvField type='select' name='currency' id='currency' onChange={(e) => {
                      setCurrency(e.target.value)
                    }} required>
                      <option value={null}>Select Currency</option>
                      <option value={0}>Currency 1</option>
                      <option value={1}>Currency 2</option>
                      <option value={2}>Currency 3</option>
                    </AvField>
                    <AvFeedback>Please select a Currency</AvFeedback>
                  </AvGroup>
                </Col>
              </Row>
            </Col>
            <Col sm='6'>
              <Label for='currency'>Components</Label>
              {/* {console.log(componentlist)} */}
              <ReactSortable className='row sortable-row' list={componentlist} setList={setComponentList}>
                {componentlist.map((ele, index) => (
                  <Col sm='12'>
                    <CustomInput
                      inline type='checkbox'
                      id={ele.id}
                      value={ele.id}
                      label={ele.name}

                      onChange={(e) => {

                        const isChecked = e.target.checked

                        if (isChecked) {
                         { <Prerequsits value="checkboxes" /> }

                         cost_price_calculation(ele.id)

                          components.push({ compid: e.target.value, order: ele.id })
                          const getCompDetails = componentlist.find(x => x.id === e.target.value)
                          // console.log(getCompDetails, "getCompDetailss")
                         
                        } else {

                          cost_price_calculation_uncheck(ele.id)

                          const filteredArray = components.filter(item => item.compid !== e.target.value)
                          setComponents(filteredArray)
                        }
                      }}

                    />
                  </Col>
                ))}
              </ReactSortable>

            </Col>
          
            <Col sm='6'>
              <AvGroup>
                <Label for='waitlist_no'>No Of Waiting List Restrict For Registration</Label>
                <AvInput name='waitlist_no' id='waitlist_no' required placeholder="Waiting List No" onChange={(e) => {
                  setWaitingListNo(e.target.value)
                }} />
                <AvFeedback>Please enter a valid Waiting List No!</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <br />
              <Label for='status'>Status</Label>
              <Row>
                <Col sm='6'>
                  <CustomInput type='radio' id='status_ac' name='status' inline label='Activate' onClick={(e) => {
                    setStatus(e.target.value)
                  }} />
                </Col>
                <Col sm='6'>
                  <CustomInput type='radio' id='status_de' name='status' inline label='Deactivate' onClick={(e) => {
                    setStatus(e.target.value)
                  }} />
                </Col>
              </Row>
            </Col>
            {/* <Col sm='6'>

            </Col> */}
            {/* <Col sm='6'>
              <br />
              <h6>No Mandatory Sequence</h6>
            </Col> */}
            <Col sm='6'>
              <br />
              <Row>
                <Label for="Sequence">No Mandatory Sequence</Label>
              </Row>
              <Row>
                <Col sm='6'>
                  <CustomInput type='radio' id='Sequence1' name='Sequence' inline label='Yes' onClick={(e) => {
                    setMandatorySequence(e.target.value)
                  }} />
                </Col>
                <Col sm='6'>
                  <CustomInput type='radio' id='Sequence2' name='Sequence' inline label='No' onClick={(e) => {
                    setMandatorySequence(e.target.value)
                  }} />
                </Col>
              </Row>
            </Col>
            {/* <Col sm='6'>
            
            </Col> */}
            <br />
            <Row></Row>
            <Col sm='6'>

              <Row>
                <Label for="Registration">Online Registration</Label>
              </Row>
              <Row>

                <Col sm='6'>
                  <CustomInput type='radio' id='Registration1' name='Registration' inline label='Yes' onClick={(e) => {
                    setRegistration(e.target.value)
                  }} />
                </Col>
                <Col sm='6'>
                  <CustomInput type='radio' id='Registration2' name='Registration' inline label='No' onClick={(e) => {
                    setRegistration(e.target.value)
                  }} />
                </Col>
              </Row>
            </Col>
            <Col sm='9'>

            </Col>
            <Col sm='3'>
              <br />
              <Button color='primary' type='submit' onClick={addStudent}>
                Save
              </Button>

            </Col>
          </Row>
        </AvForm>
      </CardBody>
    </Card>
  )
}
export default AddSubscriptionPlan
