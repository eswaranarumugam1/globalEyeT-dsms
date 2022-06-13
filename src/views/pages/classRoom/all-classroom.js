import { useState, useEffect, Fragment } from 'react'
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { toast, Slide } from "react-toastify"
import {  Coffee, MoreVertical, Edit, Trash } from "react-feather"
import Avatar from "@components/avatar"
// import { useParams, useHistory } from 'react-router-dom'
import { AllClassRooms, DeleteClassRoom } from "../../../services/home/manageClassroom.js"
import './classroom.scss'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { Link } from 'react-router-dom'
import '../../../loader.scss'
// import { Trainers, StudentStatusUpdateApi, deleteStudentApi } from "../../../../services/home/admin"
// // Error Handler
// import { toast, Slide } from "react-toastify"
// import Avatar from "@components/avatar"
// const MySwal = withReactContent(Swal)
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

  const AllClassrooms = () => {

    const [dataItems, setdataItems] = useState(null)
    const [loader, setLoader] = useState(true)  

    const schoolId = parseInt(localStorage.getItem("schoolIdToken"))

    const getClassRoom = async () => {
            const response = await AllClassRooms(schoolId)
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
        const response = await DeleteClassRoom(id)
        if (response) {
          if (response.data) {
          const { data: { message } } = response.data
            toast.success(<SuccessContent msg={message} />, {
            transition: Slide,
            hideProgressBar: true,
            autoClose: 2000
          })
          getClassRoom()
        }
        }
      }
  
    useEffect(() => {
      getClassRoom()  
    }, [])
    return (
      <>
      <div className='titleBlock'>
        List of Class Rooms
      </div>
      {!!loader ? <div className='d-flex justify-content-center my-4'>
          <div class="loadingio-spinner-pulse-i2lv7yef8ad"><div class="ldio-j6ki2ezptn">
<div></div><div></div><div></div>
</div></div>
          </div> : <div>
            {!!dataItems && dataItems.length !== 0 ? <Table striped responsive>
        <thead>
          <tr>
            <th>Name (Eng)</th>
            <th>Name (Arab)</th>
            <th>Room Type</th>
            <th>Room Function</th>
            <th>Maximum Capacity</th>
            <th>Legal Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { dataItems.map((ele, index) => (
              <>
                <tr>
                <td>{ele.room_name}</td>
                <td>{ele.room_name_arabic}</td>
                <td>{ele.room_type_name}</td>
                <td>{ele.function_name}</td>
                <td>{ele.room_max_capacity}</td>
                <td>{ele.room_legal_capacity}</td>
                  {/* <td>
                    <span className='align-middle font-weight-bold'>{ele.name_english}</span>
                  </td>                */}
                  <td>
                    <UncontrolledDropdown>
                      <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                        <MoreVertical size={15} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={e => e.preventDefault()}>
                          <Edit className='mr-50' size={15} />
                          <Link to={`/pages/component/add-classroom?admin=schoolAdmin&id=${ele.id}&st=update`}>
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
          </div> }
            </div>}
     
      </>
    )
  }
  export default AllClassrooms