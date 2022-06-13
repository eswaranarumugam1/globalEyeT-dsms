import { useState, useEffect, Fragment } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Label, Button, Row, Col, CustomInput } from 'reactstrap'
import { useParams, useHistory } from 'react-router-dom'
import {
  AvRadioGroup,
  AvRadio,
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

//services
import { OrganizationService } from "../../../../services/home/organization"

// Error Handler
import ErrorHandler from "../../../../common/ErrorHandler"
import InputPasswordToggle from '../../../../@core/components/input-password-toggle'

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

const Validation = () => {
  const history = useHistory()
  const [group_name_english, setName] = useState('')
  const [group_name_arabic, setArabicName] = useState('')
  const [group_url, setGroupUrl] = useState('')
  const [group_admin_name, setAdminName] = useState('')
  const [group_admin_email, setAdminEmail] = useState('')
  const [password, setPassword] = useState('')
  const paramsFromRoute = useParams()


  const updateGroup = async () => {
    const request = {
      group_name_english,
      group_name_arabic,
      group_url,
      group_admin_name,
      group_admin_email,
      password
    }

    try {
      const response = await OrganizationService.Update(paramsFromRoute.id, request)
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
      ErrorHandler(e)
    }
  }

  const setFormData = (data) => {
    if (data) {
      setName(data.group_name_english)
      setArabicName(data.group_name_arabic)
      setGroupUrl(data.group_url)
      setAdminName(data.group_admin_name)
      setAdminEmail(data.group_admin_email)
      setPassword(data.password)
    }
  }

  const getOrganizationById = async () => {
    try {
      const { data } = await OrganizationService.Show(paramsFromRoute.id)
      if (data.status_code && data.status_code === 200) {
        const { data: { result } } = data
        console.log("organization data", result)
        setFormData(result)
      }
    } catch (e) {
      ErrorHandler(e)
    }
  }

  const handleValidSubmit = () => {
    updateGroup()
  }

  const handleInvalidSubmit = () => {
    console.log('This is invalid submit!!!')
  }

  useEffect(() => {
    getOrganizationById()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Edit Organization</CardTitle>
      </CardHeader>
      <CardBody>
        <AvForm onValidSubmit={handleValidSubmit} onInvalidSubmit={handleInvalidSubmit}>
          <Row>
            <Col sm='6'>
              <AvGroup>
                <Label for='group_name_english'>Group Name (English)</Label>
                <AvInput name='group_name_english' id='group_name_english' value={group_name_english} onChange={(e) => {
                  setName(e.target.value)
                }} required placeholder="Group Name" />
                <AvFeedback>Please enter a valid name!</AvFeedback>
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='group_name_arabic'>Group Name (Arabic)</Label>
                <AvInput name='group_name_arabic' id='group_name_arabic' value={group_name_arabic} onChange={(e) => {
                  setArabicName(e.target.value)
                }} required placeholder="Group Name" />
                <AvFeedback>Please enter a valid name!</AvFeedback>
              </AvGroup>
            </Col>
            <Col sm='6'>
              <AvGroup>
                <Label for='group_url'>Group Url</Label>
                <AvInput name='group_url' id='group_url' value={group_url} onChange={(e) => {
                  setGroupUrl(e.target.value)
                }} required placeholder="Group Url" />
                <AvFeedback>Please enter a valid URL!</AvFeedback>
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='group_admin_name'>Group Admin Name</Label>
                <AvInput name='group_admin_name' id='group_admin_name' value={group_admin_name} onChange={(e) => {
                  setAdminName(e.target.value)
                }} required placeholder="Group Admin Name" />
                <AvFeedback>Please enter a valid name!</AvFeedback>
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='group_admin_email'>Group Admin Email</Label>
                <AvInput name='group_admin_email' id='group_admin_email' value={group_admin_email} onChange={(e) => {
                  setAdminEmail(e.target.value)
                }} required placeholder="Group Admin Email" />
                <AvFeedback>Please enter a valid Email!</AvFeedback>
              </AvGroup>
            </Col>

            <Col sm='6'>
              <AvGroup>
                <Label for='number_of_student'>Password</Label>
                <InputPasswordToggle name='password' value={password} id='password' onChange={(e) => {
                  setPassword(e.target.value)
                }} required placeholder="password" />
                <AvFeedback>Please enter a valid password!</AvFeedback>
              </AvGroup>
            </Col>

            <Col sm='6'>
              <br />
              <Button color='primary' type='submit'>
                Update Organization
              </Button>
            </Col>
          </Row>
        </AvForm>
      </CardBody>
    </Card>
  )
}
export default Validation
