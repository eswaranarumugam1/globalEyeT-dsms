import { MoreVertical, Edit, Trash, Coffee, ThumbsDown, ThumbsUp, Archive, Search } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Label, Button, Row, Col, Form, FormGroup, Input, CustomInput } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useState, useEffect, Fragment } from 'react'
import { fetchSchools, deleteSchoolApi, next_SchoolList, changestatusSchoolApi } from "../../../../services/home/admin"
import {
  AvForm,
  AvGroup,
  AvInput
} from 'availity-reactstrap-validation-safe'
import { toast, Slide } from "react-toastify"
// Error Handler
import ReactPaginate from "react-paginate"
import Avatar from 'antd/lib/avatar/avatar'
// import { Input } from 'antd'
import '../../../../styles/schoolList.css'
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
const Tables = () => {
  const [pageCount, setpageCount] = useState(0)
  const [pageStartFrom, setPageStartFrom] = useState(0)
  // const [limit, setLimit] = useState(0)

  const limit = 10
  const [listOfSchools, setListOfSchools] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [searchSchoolText, setSearchSchoolText] = useState('')
  const [searchSchoolData, setSearchSchoolData] = useState([])
  const getSchools = async () => {
    try {
      const response = await fetchSchools()
      if (response) {
        if (response.data) {
          const { data: { result: { data } } } = response.data
          if (data && data.length && data.length > 0) {
            const { data: { result: { total } } } = response.data
            // const { data: { result: { to } } } = response.data
            setpageCount(Math.ceil(total / limit))

            response.data.data.result.data = response.data.data.result.data.map(function (el, index) {
              const o = Object.assign({}, el)
              if (o.status && o.status.toString() === '1') {
                o.status = 'Published'
              } else if (o.status && o.status.toString() === '0') {
                o.status = 'Disabled'
              } else if (o.status && o.status.toString() === '2') {
                o.status = 'Drafted'
              }
              return o
            })
            setListOfSchools(response.data.data.result.data)
            setSearchSchoolData(response.data.data.result.data)
            setPageStartFrom(response.data.data.result.from)
            //console.log(data)
            // setItems(data)
          }
        }
      }
    } catch (e) {
      console.log(e)
      // ErrorHandler(e)
    }
  }
  const fetchschool_list = async (currentPage) => {
    const response = await next_SchoolList(currentPage)
    const { data: { result: { data } } } = response.data
    response.data.data.result.data = response.data.data.result.data.map(function (el, index) {
      const o = Object.assign({}, el)
      if (o.status.toString() === '1') {
        o.status = 'Published'
      } else if (o.status.toString() === '0') {
        o.status = 'Disabled'
      } else if (o.status.toString() === '2') {
        o.status = 'Drafted'
      }
      return o
    })
    setPageStartFrom(response.data.data.result.from)
    return response.data.data.result.data
  }
  const handlePageClick = async (data) => {
    const currentPage = data.selected + 1
    setCurrentPage(currentPage)
    const license_typeFormServer = await fetchschool_list(currentPage)
    setListOfSchools(license_typeFormServer)
    setSearchSchoolData(license_typeFormServer)
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
        if (currentPage > 0) {
          const license_typeFormServer = await fetchschool_list(currentPage)
          setListOfSchools(license_typeFormServer)
          setSearchSchoolData(license_typeFormServer)
        } else {
          getSchools()
        }
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
  const onSearchTextBox = async (e) => {
    setSearchSchoolText(e.target.value)
    if (e.target.value === '') {
      if (currentPage > 0) {
        const license_typeFormServer = await fetchschool_list(currentPage)
        setListOfSchools(license_typeFormServer)
        setSearchSchoolData(license_typeFormServer)
      } else {
        getSchools()
      }

    } else {
      const items = searchSchoolData.filter(item => item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 || item.address.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
      )
      setListOfSchools(items)
    }
  }
  return (
    <div className="container" style={{ height: "100%" }}>
      <AvForm >
        <Row>
          <Col sm='9'> </Col>
          <Col sm='3'>
            <AvGroup>
              <AvInput
                name='name_arabic'
                id='name_arabic'
                onChange={(e) => {
                  onSearchTextBox(e)
                }}
                placeholder="Search School"
              />
            </AvGroup>
          </Col>
          {/* <Col sm='2'>
            <AvGroup>
              <Button.Ripple type="submit" className='btn-icon' color='success' onClick={onSearch}>
                <span className='align-middle ml-25'>Search</span>
              </Button.Ripple>
            </AvGroup>
          </Col> */}
          <Col sm='2'>
            {/* <Edit size={20} /> */}
          </Col>
        </Row>
      </AvForm>
      <div className="row m-2">
        <Table striped responsive size={'md'}  >
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
                    <td>{pageStartFrom + index}</td>
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


                      {(ele.status === 'Published') ? <Badge pill color='light-success' className='mr-1'> Published </Badge> : ""}
                      {(ele.status === 'Disabled') ? <Badge pill color='light-danger' className='mr-1'> Disabled </Badge> : ""}
                      {(ele.status === 'Drafted') ? <Badge pill color='light-info' className='mr-1'> Drafted </Badge> : ""}

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

export default Tables