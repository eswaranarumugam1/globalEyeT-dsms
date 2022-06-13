// ** Student List Component
import { useState, useEffect, useCallback, Fragment } from "react"
import { MoreVertical, Edit, Trash, Coffee, Box} from 'react-feather'
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Table, Badge, Col, Row } from 'reactstrap'
// import { DataTable } from '../../../components/table'
import { DeleteConfirmationModal } from '../../../components/modal/delete-confirmation'
import { StudentService } from "../../../../services/home/student"
import { useHistory } from 'react-router-dom'
import ErrorHandler from "../../../../common/ErrorHandler"
import {
  AvForm,
  AvGroup,
  AvInput
} from 'availity-reactstrap-validation-safe'
import ReactPaginate from "react-paginate"
import '../../../../styles/schoolList.css'
import { SuccessContent } from "../../../../utility/Utils"

const StudentList = () => {
  const [pageCount, setpageCount] = useState(0)
  const [pageStartFrom, setPageStartFrom] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)

  const [students, setStudents] = useState([])
  const [data, setData] = useState([])
  const [searchStudentText, setSearchStudentText] = useState("")
  const [isLoading, setLoading] = useState(true)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState(0)
  const [searchLoading, setsearchLoading] = useState(false)
  const [isDelete, setDelete] = useState({ value: null, show: false, loading: false })
  const history = useHistory()

  /* fetch data */
  const fetchData = useCallback(async (limit, page, query) => {
    try {
      setLoading(true)
      const response = await StudentService.Index({per_page: limit, page, query })
      if (
        response.status === 200 &&
        response.data &&
        response.data.data &&
        response.data.data.result &&
        response.data.data.result.data
      ) {
        setpageCount(Math.ceil(response.data.data.result.total / limit))
        setData(response.data.data.result.data)
        setStudents(response.data.data.result.data)
        setTotal(response?.data?.data?.result?.total)
        setPageStartFrom(response.data.data.result.from)
      }
      setLoading(false)
    } catch (error) {
      if (error) {
        setLoading(false)
        if (error.response && error.response.data && error.response.data.errors) {
          console.log(error.response.data.errors.message)
        }
      }
    }
  }, [])

  useEffect(() => {
    fetchData(limit, 1)
  }, [fetchData])

  const handlePageChange = page => fetchData(limit, page)

  // handle paginate row change
  const handleLimitChange = async (newLimit, page) => {
    fetchData(newLimit, page)
    setLimit(newLimit)
  }

  /* handle search */
  const handleSearch = async data => {
    setsearchLoading(true)
    fetchData(limit, 1, data)
    setsearchLoading(false)
  }

  // Handle delete
  const handleDelete = async () => {
    setDelete({ ...isDelete, loading: true })

    await StudentService.Delete(isDelete.value)
    fetchData(limit)
    setDelete({ ...isDelete, show: false, loading: false })
  }

  const handleStatusChange = async (id, currentStatus) => {
    try {
      const response = await StudentService.Status(id, currentStatus)
      const { data } = response.data
      if (data.success === 'success') {
        SuccessContent({ msg: data.message })
        fetchData(limit)
      }
    } catch (e) {
      ErrorHandler(e)
    }
  }

  const handlePageClick = async (data) => {
    const currentPage = data.selected + 1
    fetchData(limit, currentPage, "")
  }
  
  const editStudent = (id) => {
    history.push(`/pages/students/edit/${id}`)
  }

  const onSearchTextBox = async (e) => {
    setSearchStudentText(e.target.value)
    if (e.target.value !== '') {
      const items = students.filter(item => item.first_name_english.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 || item.second_name_english.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 || item.family_name_english.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 || item.first_name_arabc.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 || item.second_name_arabic.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 || item.family_name_arabic.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 || item.email.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)
      setData(items)
    } else {
      fetchData(limit, currentPage, "")
    }
  }

  return (
    <div className='app-user-list'>
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
            <Col sm='2'>
            </Col>
          </Row>
        </AvForm>
        <div className="row m-2">
          <Table striped responsive size={'md'}  >
            <thead>
              <tr>
                <th>Sl No.</th>
                <th>Name</th>
                <th>Family Name</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                data ? data.map((ele, index) => (
                  <>
                    <tr>
                      <td>{pageStartFrom + index}</td>
                     
                      <td>
                        {ele.first_name_english} {ele.second_name_english}
                      </td>
                      <td>
                        {ele.family_name_english}
                      </td>
                        <td>
                        {ele.phone}
                        </td>
                      <td>
                        {(ele.status === '1') ? <Badge pill color='light-success'>Active</Badge> : <Badge pill color='light-danger'>InActive</Badge>}
                      </td>
                      <td height={100}>
                        <UncontrolledDropdown>
                          <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='lg' caret>
                            <MoreVertical size={15} />
                          </DropdownToggle>
                          <DropdownMenu right >
                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                              <Edit className='mr-50' size={15} />
                              <span className='align-middle' onClick={() => { editStudent(ele.id) }}>
                                Edit
                              </span>
                            </DropdownItem>
                            <DropdownItem>
                              {ele.status > 0 ? <a><Box className='mr-50' size={15} /> <span className='align-middle' onClick={() => { handleStatusChange(ele.id, '0') }}>InActive</span></a> : <a><Box className='mr-50' size={15} /><span className='align-middle' onClick={() => { handleStatusChange(ele.id, '1') }}>Active</span></a>}
                            </DropdownItem>
                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                              <Trash
                                className='mr-50'
                                size={15}
                              />
                              <span
                                className='align-middle'
                                onClick={() => setDelete({ value: ele.id, show: true })}
                              >Delete</span>
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

      {/* Delete confirmation */}
      <DeleteConfirmationModal
        show={isDelete.show}
        loading={isDelete.loading}
        message={"Want to delete ?"}
        onHide={() => setDelete({ value: null, show: false, loading: false })}
        doDelete={handleDelete}
      />
    </div>
  )
}

export default StudentList
