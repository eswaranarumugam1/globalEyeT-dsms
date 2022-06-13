import { useState, useEffect, Fragment } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Label, Button, Row, Col, CustomInput } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation-safe'
import { toast, Slide } from "react-toastify"
import { Coffee } from "react-feather"
import Avatar from "@components/avatar"
import '@styles/react/libs/flatpickr/flatpickr.scss'
//services
import { SimulatorService } from "../../../../services/home/simulator"
import { AllVehicleType, AllVehicleBrand, AllVehiclePurpose } from "../../../../services/home/manageVehicle"

// Error Handler
import ErrorHandler from "../../../../common/ErrorHandler"


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
const AddSimulatorForm = () => {
  const history = useHistory()
  const schools_id = parseInt(localStorage.getItem("schoolIdToken"))
  const [vehicleTypeData, setvehicleTypeData] = useState([])
  const [vehicleBrandData, setvehicleBrandData] = useState([])
  const [vehiclePurpose, setvehiclePurpose] = useState([])


  const getVehicleType = async () => {
    const response = await AllVehicleType(schools_id)
    if (response) {
      if (response.data) {
        const { result } = response.data.data
        setvehicleTypeData(result)
      }
    }
  }

  const getVehicleBrand = async () => {
    const response = await AllVehicleBrand(schools_id)
    if (response) {
      if (response.data) {
        const { result } = response.data.data
        setvehicleBrandData(result)
      }
    }
  }

  const getVehiclePurpose = async () => {
    const response = await AllVehiclePurpose(schools_id)
    if (response) {
      if (response.data) {
        const { result } = response.data.data
        setvehiclePurpose(result)
      }
    }
  }

  useEffect(() => {
    getVehicleType()
    getVehicleBrand()
    getVehiclePurpose()
  }, [])

  const addSimulator = async (data) => {
    const request = {
      ...data
    }

    try {
      const response = await SimulatorService.Store(request)
      if (response) { 
        if (response.data) {
          const { data: { message } } = response.data
          toast.success(<SuccessContent msg={message} />, {
            transition: Slide,
            hideProgressBar: true,
            autoClose: 2000
          })
          history.push(`/pages/all_simulator`)
        } else { 
          console.log('ERROR', response.response.data.errors.msg)
          toast.error(<ErrorContent msg={response.response.data.errors.msg} />, {
            transition: Slide,
            hideProgressBar: true,
            autoClose: 2000
          })
        }  
      } 
    } catch (e) {
      console.log(e)
    }
  }

  const onFormSubmit = (event, errors, values) => {
    if (errors.length === 0) {
      addSimulator(values)
    }
  }

  const validation = {
    id: {
      required: {value: true, errorMessage: 'Simulator id is required'}
    },
    sex: {
      required: {value: true, errorMessage: 'Sex is required'}
    },
    brand: {
      required: {value: true, errorMessage: 'Brand name is required'}
    },
    type: {
      required: {value: true, errorMessage: 'Vehicle type is required'}
    },
    car_status: {
      required: {value: true, errorMessage: 'Type is required'}
    },
    status: {
      required: {value: true, errorMessage: 'Status is required'}
    },
    purpose: {
      required: {value: true, errorMessage: 'Used for is required'}
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Add Simulator</CardTitle>
      </CardHeader>
      <CardBody>
        <AvForm onSubmit={onFormSubmit}>
          <Row>
            <Col sm='6'>
              <AvGroup>
                <Label for='id'>Simulator ID</Label>
                <AvField type='number' name='id' placeholder="Enter Simulator ID" validate={validation.id} />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='sex'>Sex</Label>
                <AvField type='select' name='sex' placeholder="Enter Sex" validate={validation.sex}>
                  <option value={null} hidden={true}>Select Sex</option>
                  <option value={'Male'}>Male</option>
                  <option value={'Female'}>Female</option>
                  <option value={'Others'}>Other</option>
                </AvField>
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='brand'>Brand</Label>
                <AvField type='select' name='brand' placeholder="Enter Brand" validate={validation.brand} >
                  <option value={null} hidden={true}>Select Brand</option>
                  {
                    vehicleBrandData ? vehicleBrandData.map((ele) => (
                      <option value={ele.id}>{ele.brand_name}</option>
                    )) : null
                  } 
                </AvField>
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='purpose'>Used For</Label>
                <AvField type='select' name='purpose' placeholder="Enter Purpose" validate={validation.purpose} >
                  <option value={null} hidden={true}>Select Purpose</option>
                  {
                    vehiclePurpose ? vehiclePurpose.map((ele) => (
                      <option value={ele.id}>{ele.purpose}</option>
                    )) : null
                  } 
                </AvField>
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='type'>Vehicle Type</Label>
                <AvField type='select' name='type' validate={validation.type}>
                  <option value={null} hidden={true}>Select type</option>
                  {
                    vehicleTypeData ? vehicleTypeData.map((ele) => (
                      <option value={ele.id}>{ele.type_name}</option>
                    )) : null
                  }  
                </AvField>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='car_status'>Type</Label>
                <AvField type='select' name='car_status' placeholder="Enter Type" validate={validation.car_status} >
                  <option value={null} hidden={true}>Select type</option>
                  <option value={'Purchased'}>Purchased</option>
                  <option value={'Rental'}>Rental</option>
                </AvField>
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='status'>Status</Label>
                <AvField type='select' name='status' validate={validation.status}>
                  <option value={null} hidden={true}>Select status</option>
                  <option value={'Available'}>Available</option>
                  <option value={'Non-Available'}>Non-Available</option>
                </AvField>
              </AvGroup>
            </Col>
           

            <Col sm='12'>
              <br />
              <Button color='primary' type='submit'>
                Add Simulator
              </Button>
            </Col>
          </Row>
        </AvForm>
      </CardBody>
    </Card>
  )
}
export default AddSimulatorForm
