import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { MoreVertical, Edit, Trash } from 'react-feather'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {Link} from 'react-router-dom'

const MySwal = withReactContent(Swal)

const BasicSweetCallback = () => {

  const handleConfirmCancel = () => {
    return MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: 'Cancelled',
          text: 'Your imaginary file is safe :)',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }
    })
  }

  return (
      <UncontrolledDropdown>
        <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
          <MoreVertical size={15} />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem href='/' onClick={e => e.preventDefault()}>
            <Edit className='mr-50' size={15} />
              <Link to="/pages/students/edit">
                <span className='align-middle'>Edit</span>
              </Link>
          </DropdownItem>
          <DropdownItem href='/' onClick={e => e.preventDefault()}>
            <Trash className='mr-50' size={15} /> <span className='align-middle' onClick={handleConfirmCancel}>Delete</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown> 
  )
}

export default BasicSweetCallback
