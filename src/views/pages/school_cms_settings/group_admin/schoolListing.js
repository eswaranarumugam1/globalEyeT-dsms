
import { MoreVertical, Edit, Trash, Coffee, ThumbsDown, ThumbsUp, Archive } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useState, useEffect, Fragment } from 'react'
import { fetchSchools, deleteSchoolApi, next_SchoolList, changestatusSchoolApi } from "../../../../services/home/admin"
import SweetAlert from 'react-bootstrap-sweetalert'
import { toast, Slide } from "react-toastify"
// Error Handler
import ErrorHandler from "../../../../common/ErrorHandler"
import ReactPaginate from "react-paginate"
import Avatar from 'antd/lib/avatar/avatar'
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
const SchoolListing = () => {
  const [pageCount, setpageCount] = useState(0)
  // const [limit, setLimit] = useState(0)

  const limit = 10
  const [listOfSchools, setListOfSchools] = useState([])
  const getSchools = async () => {
    try {
      const response = await fetchSchools()
      console.log(response)
      if (response) {
        if (response.data) {
          const { data: { result: { data } } } = response.data
          if (data && data.length && data.length > 0) {
            const { data: { result: { total } } } = response.data
            // const { data: { result: { to } } } = response.data
            setpageCount(Math.ceil(total / limit))
            setListOfSchools(data)
            console.log(data)
            // setItems(data)
          }
        }
      }
    } catch (e) {
      ErrorHandler(e)
    }
  }
  const fetchschool_list = async (currentPage) => {
    const response = await next_SchoolList(currentPage)
    const { data: { result: { data } } } = response.data
    return data
  }
  const handlePageClick = async (data) => {

    const currentPage = data.selected + 1
    const license_typeFormServer = await fetchschool_list(currentPage)
    setListOfSchools(license_typeFormServer)
    // scroll to the top
    //window.scrollTo(0, 0)
  }
  const deleteSchool = async (id) => {
    try {
      const response = await deleteSchoolApi(id)
      // console.log(response)
      // if (response) {
      //   getSchools()
      // }
      if (response.data) {
        console.log(response)
        const { data: { message } } = response.data
        toast.success(<SuccessContent msg={message} />, {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000
        })
        getSchools()
      }
    } catch (e) {
      //ErrorHandler(e)
      console.log(e)
    }
  }

  const changeSchoolstatus = async (id, status) => {
    try {
      const formData = new FormData()
      formData.append('status', status)

      const response = await changestatusSchoolApi(id, formData)
      console.log(response)
      if (response) {
        getSchools()
      }

    } catch (e) {

      // ErrorHandler(e)
      console.log(e)
    }


  }

  useEffect(() => {
    getSchools()
    return () => {
      setListOfSchools([])
    }
  }, [limit])
  return (
    <div className="container" style={{ height: "100%" }}>
      <div className="row m-2">
        <Table striped responsive size={'md'} >
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Name</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              listOfSchools ? listOfSchools.map((ele, index) => (
                <>
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <span className='align-middle font-weight-bold'>{ele.name}</span>
                    </td>
                    <td>
                      {ele.address}
                    </td>
                    <td>
                      {ele.phone}
                    </td>
                    <td>


                      {(parseInt(ele.status) === 1) ? <Badge pill color='light-success' className='mr-1'> Published </Badge> : ""}
                      {(parseInt(ele.status) === 0) ? <Badge pill color='light-danger' className='mr-1'> Disabled </Badge> : ""}
                      {(parseInt(ele.status) === 2) ? <Badge pill color='light-info' className='mr-1'> Drafted </Badge> : ""}

                    </td>

                    <td height={100}>
                      <UncontrolledDropdown>
                        <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='lg' caret>
                          <MoreVertical size={15} />
                        </DropdownToggle>
                        <DropdownMenu right >
                          <DropdownItem href='/' onClick={e => e.preventDefault()}>
                            <Edit className='mr-50' size={15} />
                            <Link to={`/pages/school/edit/${ele.id}`}>
                              <span className='align-middle'>Edit</span>
                            </Link>
                          </DropdownItem>
                          <DropdownItem href='/' onClick={e => e.preventDefault()}>
                            <Trash className='mr-50' size={15} />
                            <span className='align-middle' onClick={() => {
                              deleteSchool(ele.id)
                            }}>Delete</span>
                          </DropdownItem>
                          <DropdownItem href='/' onClick={e => e.preventDefault()}>
                            <ThumbsDown className='mr-50' size={15} />
                            <span className='align-middle' onClick={() => {
                              changeSchoolstatus(ele.id, 0)
                            }}>Disable</span> </DropdownItem>
                          <DropdownItem href='/' onClick={e => e.preventDefault()}>
                            <ThumbsUp className='mr-50' size={15} />
                            <span className='align-middle' onClick={() => {
                              changeSchoolstatus(ele.id, 1)
                            }}>Publish</span> </DropdownItem>
                          <DropdownItem href='/' onClick={e => e.preventDefault()}>
                            <Archive className='mr-50' size={15} />
                            <span className='align-middle' onClick={() => {
                              changeSchoolstatus(ele.id, 2)
                            }}>Draft</span> </DropdownItem>

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

      <ReactPaginate
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
      />
    </div>
  )
}

export default SchoolListing