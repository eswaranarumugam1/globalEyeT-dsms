import { useState, Fragment } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Card, CardHeader, CardTitle, CardBody, Label, Button } from 'reactstrap'
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation-safe'
import { useHistory } from "react-router-dom"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { AddRoles } from '../../../services/home/role'
import { toast, Slide } from "react-toastify"
import {  Coffee } from "react-feather"
import Avatar from "@components/avatar"
import { SuccessContent, ErrorContent } from '@utils'
const MySwal = withReactContent(Swal)

const create = () => {
    const [name, setRole] = useState('')
    const school_id = parseInt(localStorage.getItem("schoolIdToken"))
    const history = useHistory()

    const addRole = async () => {
      if (name !== '') {
        const id = '0'
        const request = { name}
        try {
          const response = await AddRoles(id, request)
          const data = response.data.data
          if (data.error) {
            ErrorContent({ msg: data.message })
          } else {
            SuccessContent({ msg: data.message })
            if (school_id === 0) {  
              history.push('list?admin=superAdmin')
            } else {
              history.push('list?admin=schoolAdmin')
            }
          }
        } catch (e) {
          console.log(e.message)
          ErrorContent({ msg: e.message })
        }
      }
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle tag='h4'>Create New Role</CardTitle>
                </CardHeader>
                <CardBody>
                    <AvForm>
                    <AvGroup>
                        <Label for='role'>Role</Label>
                        <AvInput name='role' id='role' placeholder="Enter Role Name" onChange={(e) => {
                        setRole(e.target.value)
                        }} required />
                        <AvFeedback>Please enter a valid Role!</AvFeedback>
                    </AvGroup>
                    <Button color='primary' type='submit' onClick={addRole}>
                        Add Role
                    </Button>
                    <Button color='primary' className='ml-2' type='button' onClick={() => history.goBack()}>
                        Cancel
                    </Button>
                    </AvForm>
                </CardBody>
            </Card>
        </div>
    )
}

export default create
