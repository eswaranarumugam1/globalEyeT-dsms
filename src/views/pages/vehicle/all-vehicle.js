import { useState, useEffect, Fragment } from 'react'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { toast, Slide } from "react-toastify"
import {  Coffee, MoreVertical, Edit, Trash } from "react-feather"
import Avatar from "@components/avatar"
import { AllVehicles, DeleteVehicles } from "../../../services/home/manageVehicle"
import '../classRoom/classroom.scss'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { Link } from 'react-router-dom'
import '../../../loader.scss'
import { data } from '../../tables/data-tables/data'
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

  const AllVehiclesData = () => {

    const [dataItems, setdataItems] = useState(null)
    const [loader, setLoader] = useState(true)    

    const schoolId = parseInt(localStorage.getItem("schoolIdToken"))

    const usageStatus = {
      1 : 'Operation',
      2: 'BackUp'
    }

    const getVehicles = async () => {
            const response = await AllVehicles(schoolId)
            if (response) {
                if (response.data) {
                  const { result } = response.data.data
                  if (!!result) {
                    setdataItems(result)
                    setLoader(false)
                  }
                }
            }
        }
  
    const deleteClass = async (id) => {
        const response = await DeleteVehicles(id)
        if (response) {
          if (response.data) {
          const { data: { message } } = response.data
            toast.success(<SuccessContent msg={message} />, {
            transition: Slide,
            hideProgressBar: true,
            autoClose: 2000
          })
          getVehicles()
        }
        }
      }
  
    useEffect(() => {
      getVehicles()  
    }, [])
    return (
      <>
      <div className='titleBlock'>
        List of Vehicles
      </div>
      {loader ? <div className='d-flex justify-content-center my-4'>
          <div class="loadingio-spinner-pulse-i2lv7yef8ad"><div class="ldio-j6ki2ezptn">
<div></div><div></div><div></div>
</div></div>
          </div> : <div>
            {!!dataItems && dataItems.length !== 0 ?   <Table striped responsive>
          <thead>
            <tr>
              <th>Vehicle Brand</th>
              <th>Vehicle Id</th>
              <th>Vehicle Name</th>
              <th>Vehicle Type</th>
              <th>Registration no</th>
              <th>Chassis no</th>
              <th>Status</th>
              <th>Insurance Expiry</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          { dataItems.map((ele, index) => (
                <>
                  <tr>
                  <td>{ele.brand_name}</td>
                  <td>{ele.id}</td>
                  <td>{ele.type_name}</td>
                  <td>{ele.type_name}</td>
                  <td>{ele.vehicle_registration_no}</td>
                  <td>{ele.vehicle_chasis_no}</td>
                  <td>{usageStatus[ele.vehicle_legal_status]}</td>
                  <td>{ele.vehicle_insurance_expiry_date}</td>
                    <td>
                      <UncontrolledDropdown>
                        <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                          <MoreVertical size={15} />
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem onClick={e => e.preventDefault()}>
                            <Edit className='mr-50' size={15} />
                            <Link to={`/pages/component/add-vehicle?admin=schoolAdmin&id=${ele.id}&st=update`}>
                              <span className='align-middle'>Edit</span>
                            </Link>
                          </DropdownItem>
                          <DropdownItem onClick={e => e.preventDefault()}>
                            <Trash className='mr-50' size={15} /> <span className='align-middle' onClick={() => {
                              deleteClass(ele.id)
                            }}>Delete</span>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                </>
              )) 
           }  
          </tbody>
        </Table> : <div className='d-flex justify-content-center my-4'>
          There is nothing to show, please add first. 
          </div>}
          </div> 
         } 
      </>
    )
  }
  
  export default AllVehiclesData