import { useEffect, useState, Fragment } from "react"
import { Row, Col, Button, Form, Input, Label, FormGroup, Table, CustomInput } from 'reactstrap'
import { AllPermissions, Permission_Update } from '../../../../../services/home/permissions'
import { fetchRole } from '../../../../../services/home/role'
import ErrorHandler from "../../../../../common/ErrorHandler"
import { toast, Slide } from "react-toastify"
import { Lock, Coffee } from "react-feather"
import Avatar from "@components/avatar"

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

function Permissions() {

  const [rolelist, setRoles] = useState([])
  const [permissionlist, setpermission] = useState([])
  const [permission_on, setPermissionOn] = useState([])
  const [checked_per_id, setCheckPermission] = useState([])

  const getPermissions = async () => {
    const response = await AllPermissions()
    if (response && response.data) {
      const { data: { result: { permissions, selected_role_permissions } } } = response.data
      // setRoles(roles)
      // console.log("selected_role_permissions: ", selected_role_permissions)
      setpermission(permissions)
      setPermissionOn(selected_role_permissions)
    }
  }

  const UpdatePermissions = async (event, role_ids, permission_ids, check_statuss) => {

    const request = {
      role_id: role_ids,
      permission_id: permission_ids,
      check_status: check_statuss === 0 ? 0 : 1
    }
    // console.log('the data sending: ', request)
    try {
      const response = await Permission_Update(request)
      if (response) {
        if (response.data) {
          const { data: { message } } = response.data
          toast.success(<SuccessContent msg={message} />, {
            transition: Slide,
            hideProgressBar: true,
            autoClose: 2000
          })
        }
        getPermissions()
      }
    } catch (e) {
      console.log(e)
    }
  }
  const getRole = async () => {
    try {
      const response = await fetchRole()
      // console.log("get roles: ", response)
      if (response && response.data) {
        const { data: { result } } = response.data
        if (result && result.length && result.length > 0) {
          setRoles(result)
        }
      }
    } catch (e) {
      ErrorHandler(e)
    }
  }

  useEffect(() => {
    getPermissions()
    getRole()
  }, [])

  return (
    <Row>
      <Col sm='12'>
        <div className='permissions border mt-1'>
          <h6 className='py-1 mx-1 mb-0 font-medium-2'>
            <Lock size={18} className='mr-25' />
            <span className='align-middle'>Permissions</span>
          </h6>
          <Table borderless striped responsive>
            <thead className='thead-light'>
              <tr>
                <th></th>
                {
                  rolelist ? rolelist.map((ele) => (
                    <td>
                      +{ele.label_name}
                    </td>
                  )) : null
                }
              </tr>
            </thead>
            <tbody>
              {
                permissionlist ? permissionlist.map((permission) => (
                  <tr>
                    <td>{permission.label_name}</td>
                    {
                      rolelist ? rolelist.map((role) => (
                        <td>
                          {
                            Array.isArray(permission_on[role.id]) ? permission_on[role.id].includes(permission.id) ? <CustomInput
                              type='checkbox'
                              onChange={(event) => UpdatePermissions(event, role.id, permission.id, '1')}
                              name={permission.name + role.id}
                              id={permission.name + role.id}
                              label=''
                              defaultChecked
                            /> : <CustomInput
                              type='checkbox'
                              onChange={(event) => UpdatePermissions(event, role.id, permission.id, '0')}
                              name={permission.name + role.id}
                              id={permission.name + role.id}
                              label=''
                            /> : null
                          }
                        </td>
                      )) : null
                    }
                  </tr>
                )) : null
              }
            </tbody>
          </Table>
        </div>
      </Col>
      <Col className='d-flex flex-sm-row flex-column mt-2' sm='12'>
        <Button.Ripple className='mb-1 mb-sm-0 mr-0 mr-sm-1' type='submit' color='primary'>
          Save Changes
        </Button.Ripple>
        <Button.Ripple color='secondary' outline>
          Reset
        </Button.Ripple>
      </Col>
    </Row>
  )
}

export default Permissions
