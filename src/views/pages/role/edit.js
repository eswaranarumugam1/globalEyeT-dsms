import { useState, useEffect, Fragment } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Card, CardHeader, CardTitle, CardBody, Label, Button } from 'reactstrap'
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation-safe'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { getRole, UpdateRole } from '../../../services/home/role'
import { toast, Slide } from "react-toastify"
import {  Coffee } from "react-feather"
import Avatar from "@components/avatar"
import ErrorHandler from '../../../common/ErrorHandler'
import { useParams, useHistory } from 'react-router-dom'
const MySwal = withReactContent(Swal)
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
    const [name, setRole] = useState('')
    const paramsFromRoute = useParams() 
    const history = useHistory()
    const getRoleByID = async (id) => {
        try {
            console.log('the id is : ', id)
          const response = await getRole(id)
          if (response) {
            if (response.data) {
                console.log(response)
              const { data: { result } } = response.data
              if (result) {
                const { name } = result
                setRole(name)
              }
            }
          }
        } catch (e) {
          ErrorHandler(e)
        }
      }
      useEffect(() => {
        getRoleByID(paramsFromRoute.id)
          }, [paramsFromRoute.id])

    const addRole = async () => {
        if (name !== '') {
            const request = {
                name
              }
              try {
                const response = await UpdateRole(paramsFromRoute.id && paramsFromRoute.id, request)
                if (response) {
                  if (response.data) {
                      console.log(response)
                    const { data: { message } } = response.data
                    toast.success(<SuccessContent msg={message} />, {
                      transition: Slide,
                      hideProgressBar: true,
                      autoClose: 2000
                    })
                    history.push('/pages/role/list')
                  }
                }
              } catch (e) {
                console.log(e)
              }
            }
        }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle tag='h4'>Update New Role</CardTitle>
                </CardHeader>
                <CardBody>
                    <AvForm>
                    <AvGroup>
                        <Label for='role'>Role</Label>
                        <AvInput name='role' id='role'  value={name} onChange={(e) => {
                        setRole(e.target.value)
                        }} required />
                        <AvFeedback>Please enter a valid Role!</AvFeedback>
                    </AvGroup>
                    <Button color='primary' type='submit' onClick={addRole}>
                        Update Role
                    </Button>
                    <Button color='primary' className="ml-2" type='button' onClick={() => history.goBack()}>
                        Cancel
                    </Button>
                    </AvForm>
                </CardBody>
            </Card>
        </div>
    )
}

export default create
