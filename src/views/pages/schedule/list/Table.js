import { MoreVertical, Edit, Trash, Box, Coffee} from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Row, Col, CustomInput, Label, Input } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { useState, useEffect, Fragment } from 'react'
import { Simulator, DeleteSimulator } from "../../../../services/home/admin"
// Error Handler
import ErrorHandler from "../../../../common/ErrorHandler"
import { toast, Slide } from "react-toastify"
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

const Tables = () => {
  const [scheduleList, setScheduleList] = useState([])
  const history = useHistory()

  // const getSimulatorList = async () => {
  //   try {
  //     const response = await Simulator()
  //     if (response) {
  //       if (response.data) {
  //         setSimulatorList(response.data.data.result)
  //       } else {
  //         console.log('ERROR', response.response.data.errors.msg)
  //         toast.error(<ErrorContent msg={response.response.data.errors.msg} />, {
  //           transition: Slide,
  //           hideProgressBar: true,
  //           autoClose: 2000
  //         })
  //       }
  //     }
  //   } catch (e) {
  //     ErrorHandler(e)
  //   }
  // }

  // const deleteSimulator = async (id) => {
  //   try {
  //     const response = await DeleteSimulator(id)
  //     if (response) {
  //       if (response.data) {
  //         const { data } = response.data
  //         if (data.success === 'success') {
  //           toast.success(<SuccessContent msg={data.message} />, {
  //             transition: Slide,
  //             hideProgressBar: true,
  //             autoClose: 2000
  //           })
  //           getSimulatorList()
  //         }
  //       }
  //     }
  //   } catch (e) {
  //     ErrorHandler(e)
  //   }
  // }

  // const editSimulator = (id) => {
  //   history.push(`/pages/simulator/edit/${id}`)
  // }

  useEffect(() => {
    getSimulatorList()
  }, [])

  return (
    <>
      <Row className="my-5">
        <Col xl='6' className='d-flex justify-content-center p-0'>
          <div className='d-flex align-items-center w-100'>
            <Label for='rows-per-page'>Show</Label>
            <CustomInput
              className='form-control mx-50'
              type='select'
              id='rows-per-page'
              value={null}
              style={{
                width: '5rem',
                padding: '0 0.8rem',
                backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
              }}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </CustomInput>
          </div>
        </Col>
        <Col
          xl='6'
          className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
        >
          <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1'>
            <Label className='mb-0' for='search-invoice'>
              Search:
            </Label>
            <Input
              id='search-invoice'
              className='ml-50 w-100'
              type='text'
              value={null}
              onChange={e => handleFilter(e.target.value)}
            />
          </div>
        </Col>
      </Row>
      <Table striped responsive >
        <thead>
          <tr>
            <th>Simulator ID</th>
            <th>Sex</th>
            <th>Brand</th>
            <th>Vehicle</th>
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            simulatorList ? simulatorList.map((ele, index) => (
              <>
                <tr key={index}>
                  <td>{ele.id}</td>
                  <td>{ele.sex}</td>
                  <td>{ele.brand}</td>
                  <td>{ele.type}</td>
                  <td>{ele.car_status}</td>
                  <td>{ele.status}</td>
                  <td>
                    <UncontrolledDropdown>
                      <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                        <MoreVertical size={15} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem href='/' onClick={e => e.preventDefault()}>
                          <Edit className='mr-50' size={15} />
                          <span className='align-middle' onClick={() => {
                            editSimulator(ele.id)
                          }}>
                            Edit
                          </span>
                          {/* <Link to={`/pages/students/edit/${ele.id}`}>
                            <span className='align-middle'>Edit</span>
                          </Link> */}
                        </DropdownItem>
                        {/* <DropdownItem>
                          {ele.status > 0 ? <div><Box className='mr-50' size={15} /> <span className='align-middle' onClick={() => { statusUpdate(ele.id, '0') }}>InActive</span></div> : <div><Box className='mr-50' size={15} /><span className='align-middle' onClick={() => { statusUpdate(ele.id, '1') }}>Active</span></div>}
                        </DropdownItem> */}
                        <DropdownItem href='/' onClick={e => e.preventDefault()}>
                          <Trash className='mr-50' size={15} /> 
                          <span className='align-middle' onClick={() => {
                            deleteSimulator(ele.id)
                          }}>
                            Delete
                          </span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>
              </>
            )) : null
          }
        </tbody>
      </Table>
    </>
  )
}

export default Tables