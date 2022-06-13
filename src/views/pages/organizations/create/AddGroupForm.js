import { useState, Fragment } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Label, Button, Row, Col } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import {
  AvForm,
  AvGroup,
  AvFeedback,
  AvField
} from 'availity-reactstrap-validation-safe'
import { toast, Slide } from "react-toastify"
import { Coffee } from "react-feather"
import Avatar from "@components/avatar"
import '@styles/react/libs/flatpickr/flatpickr.scss'
//services
// Error Handler
import ErrorHandler from "../../../../common/ErrorHandler"
import InputPasswordToggle from '../../../../@core/components/input-password-toggle'
import { OrganizationService } from "../../../../services/home/organization"

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
// const ErrorContent = ({ msg }) => (
//   <Fragment>
//     <div className="toastify-header">
//       <div className="title-wrapper">
//         <Avatar size="sm" color="danger" icon={<Coffee size={12} />} />
//         <h6 className="toast-title font-weight-bold">Error in the form</h6>
//       </div>
//     </div>
//     <div className="toastify-body">
//       <span>
//         {msg}
//       </span>
//     </div>
//   </Fragment>
// )
const AddGroupForm = () => {
  const history = useHistory()
  const [password, setPassword] = useState('')
  
  const addGroup = async (data) => {  

    const request = {
      ...data,
      password
    }

    try {
      const response = await OrganizationService.Store(request)
      if (response) {
        if (response.data) {
          const { data: { message } } = response.data
          toast.success(<SuccessContent msg={message} />, {
            transition: Slide,
            hideProgressBar: true,
            autoClose: 2000
          })
          history.push(`/pages/all_organizations/`)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  const validation = {
    group_name_english: {
      required: {value: true, errorMessage: 'Organization name in english is required'}
    },
    group_name_arabic: {
      required: {value: true, errorMessage: 'Organization name in arabic is required'}
    },
    group_url: {
      required: {value: true, errorMessage: 'Group url is required'}
    },
    group_admin_name: {
      required: {value: true, errorMessage: 'Group admin name is required'}
    },
    group_admin_email: {
      required: {value: true, errorMessage: 'Group admin email is required'}
    }
  }

  const onFormSubmit = (event, errors, values) => {
    if (errors.length === 0) {
      addGroup(values)
    }
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Add Organization</CardTitle>
      </CardHeader>
      <CardBody>
        <AvForm onSubmit={onFormSubmit}>
          <Row>
            <Col sm='6'>
              <AvGroup>
                <Label for='group_name_english'>Group Name (English)</Label>
                <AvField name='group_name_english' placeholder="Group Name" validate={validation.group_name_english} />
              </AvGroup>
            </Col>
            
            <Col sm='6'>
              <AvGroup>
                <Label for='group_name_arabic'>Group Name (Arabic)</Label>
                <AvField name='group_name_arabic' placeholder="Group Name" validate={validation.group_name_arabic} />
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='group_url'>Group Url</Label>
                <AvField name='group_url' placeholder="Group Url" validate={validation.group_url} />
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='group_admin_name'>Group Admin Name</Label>
                <AvField name='group_admin_name' placeholder="Group Admin Name" validate={validation.group_admin_name} />
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='group_admin_email'>Group Admin Email</Label>
                <AvField name='group_admin_email' placeholder="Group Admin Email" validate={validation.group_admin_email} />
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='password'>Password</Label>
                <InputPasswordToggle name='password' id='password' onChange={(e) => {
                  setPassword(e.target.value)
                }} required placeholder="password" />
                <AvFeedback>Please enter a valid password!</AvFeedback>
              </AvGroup>
            </Col>

            <Col sm='6'>
              <br />
              <Button color='primary' type='submit'>
                Add Organization
              </Button>
            </Col>
          </Row>
        </AvForm>
      </CardBody>
    </Card>
  )
}
export default AddGroupForm
