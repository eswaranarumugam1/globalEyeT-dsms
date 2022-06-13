import { MoreVertical, Edit, Trash, Box } from 'react-feather'
import { Table, Button, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AllComponent, deleteComponent } from '../../../../../services/home/Componentsapi'
import ErrorHandler from "../../../../../common/ErrorHandler"

import { toast, Slide } from "react-toastify"
function TableList() {
    const [listcomponent, setListComponenet] = useState([])
    const school_id = parseInt(localStorage.getItem("schoolIdToken"))
    const getComponent = async () => {
        try {
        const response = await AllComponent(school_id)
        console.log(response)
        if (response) {
            if (response.data) {
            const { data: { result } } = response.data
            if (result && result.length && result.length > 0) {
                setListComponenet(result)
            }
            }
        }
        } catch (e) {
        ErrorHandler(e) 
        }
    }
    const deleteComponents = async (id) => {
      try {
        const response = await deleteComponent(id)
        console.log(response)
        if (response) {
          const { data: { message } } = response.data
          console.log(message)
        toast.success(message, {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000
        })
         getComponent()
        }
      } catch (e) {
        ErrorHandler(e)
      }
    }
    useEffect(() => {
        getComponent()
      }, [])
  return (
    <div>
        <br/>
        <Link to={`/pages/component/create`}>
            <Button type="button" color="success">
                Create New Component
            </Button>
        </Link>
        <br/><br/>
      <Table striped responsive>
        <thead>
            <tr>
                <th>Name English</th>
                <th>Name Arabic</th>
                <th>Sessions</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        {
          listcomponent ? listcomponent.map((ele) => (
            <>
              <tr>
                <td>
                  <span className='align-middle font-weight-bold'>{ele.name}</span>
                </td>
                <td>
                  <span className='align-middle font-weight-bold'>{ele.arabic_name}</span>
                </td>
                <td>
                  <span className='align-middle font-weight-bold'>
                  <Link to={`/pages/component/manage_sessions/${ele.id}`}>
                  <Button.Ripple color='primary' className='text-nowrap '  outline>
                           
                           <span>Manage Sessions</span>
                         </Button.Ripple>
                        </Link>
                  </span>
                </td>
                <td>
                    <UncontrolledDropdown>
                        <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                        <MoreVertical size={15} />
                        </DropdownToggle>
                        <DropdownMenu>
                        <DropdownItem href='/' onClick={e => e.preventDefault()}>
                            <Edit className='mr-50' size={15} />
                            <Link to={`/pages/component/edit/${ele.id}`}>
                          <span className='align-middle'>Edit</span>
                        </Link>
                        </DropdownItem>
                        {/* <DropdownItem> */}
                            {/* status */}
                            {/* { ele.status > 0 ? <div><Box className='mr-50' size={15} /> <span className='align-middle' onClick={ () => { deleteStudent(ele.id, '0') } }>InActive</span></div>  : <div><Box className='mr-50' size={15} /><span className='align-middle' onClick={ () => { deleteStudent(ele.id, '1') } }>Active</span></div> } */}
                        {/* </DropdownItem> */}
                        <DropdownItem href='/' onClick={e => e.preventDefault()}>
                            <Trash className='mr-50' size={15} 
                            onClick={() => {
                       //   alert("!!!!")
                          deleteComponents(ele.id)
                        }}/> 
                            <span className='align-middle' onClick={() => {
                         // alert("!!!!")
                       deleteComponents(ele.id)
                        }}>Delete</span>
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
    </div>
  )
}

export default TableList
