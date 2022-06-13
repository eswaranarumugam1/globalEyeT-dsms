import AvatarGroup from '@components/avatar-group'
import react from '@src/assets/images/icons/react.svg'
import vuejs from '@src/assets/images/icons/vuejs.svg'
import angular from '@src/assets/images/icons/angular.svg'
import bootstrap from '@src/assets/images/icons/bootstrap.svg'
import avatar1 from '@src/assets/images/portrait/small/avatar-s-5.jpg'
import avatar2 from '@src/assets/images/portrait/small/avatar-s-6.jpg'
import avatar3 from '@src/assets/images/portrait/small/avatar-s-7.jpg'
//import DropDown from './DropDownList'
import { Testimonial_list, DeleteTestimonial } from "../../../services/home/admin"
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, Badge, Media, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Row, Col, CustomInput, Label, Input } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import ReactPaginate from 'react-paginate'
import { SuccessContent, ErrorContent } from "@utils"

const TestimonialIndex = () => {

  const [Testimonials, SetTestimonials] = useState([])
  const getTestimonials = async () => {
    try {
      const response = await Testimonial_list()
      if (response) {
        if (response.data) {
          console.log(response.data.data.result)
          SetTestimonials(response.data.data.result)
        }
      }
    } catch (e) {
      //  ErrorHandler(e)
      console.log(e)
    }
  }
  const handlePageClick = async (data) => {
    const currentPage = data.selected + 1
    setCurrentPage(currentPage)
    const license_typeFormServer = await fetchschool_list(currentPage)
    setListOfOrganizations(license_typeFormServer)
    setSearchOrganizationData(license_typeFormServer)
  }

  const delete_testimonial = async (id) => {
    try {
      const response = await DeleteTestimonial(id)
        if (response.response) {
          const data = response.response.data
          ErrorContent({ msg: data.errors.msg })
        } else {
            const data = response.data.data
            if (data.errors) {
                ErrorContent({ msg: data.message })
            } else {
                SuccessContent({ msg: data.message })
                getTestimonials()
            }
        }
    } catch (e) {
      console.log(e)
    }
  }

  // const handleConfirmCancel = (id) => {
  //   return Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, delete it!',
  //     customClass: {
  //       confirmButton: 'btn btn-primary',
  //       cancelButton: 'btn btn-danger ml-1'
  //     },
  //     buttonsStyling: false
  //   }).then(function (result) {

  //     if (result.value) {
    
  //       delete_testimonial(id) 
  //     } else if (result.dismiss === Swal.DismissReason.cancel) { 
  //     }
  //   })
  // }

  useEffect(() => {
    getTestimonials()
  }, [])

  return (
    <div className="container" style={{ height: "100%" }}>
      <div className="row m-2">
        <Table striped responsive size={'md'} >
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Comment</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              Testimonials ? Testimonials.map((test, index) => (
                
                  <tr>
                   
                     <td>{test.title}</td>
                    <td>{test.designation}</td>
                    <td>{test.description}</td>
                    <td>
                      {/* <AvatarGroup data={test.image} /> */}
                      <Media>
                        <Media className='mr-25' left>
                          <Media object className='rounded mr-50' src={test.image} height="80" />
                        </Media>
                      </Media>
                    </td>
                    <td>
                      <UncontrolledDropdown>
                        <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                          <MoreVertical size={15} />
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem href='/' onClick={e => e.preventDefault()}>
                            <Edit className='mr-50' size={15} />
                            <Link to={`/pages/testimonials/edit/${test.id}`}>
                              <span className='align-middle'>Edit</span>
                            </Link>
                          </DropdownItem>
                          <DropdownItem href='/' onClick={e => e.preventDefault()}>
                            <Trash className='mr-50' size={15} /> <span className='align-middle' onClick={() => {
                              delete_testimonial(test.id)
                            }}>Delete</span>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
               
              )) : null}
          </tbody>
        </Table>
      </div>

      {/* <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={8}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      /> */}
    </div>
  )
}

export default TestimonialIndex