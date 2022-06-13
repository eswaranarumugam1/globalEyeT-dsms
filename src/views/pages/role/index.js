// ** Styles
import '@styles/react/apps/app-users.scss'
import { Link } from 'react-router-dom'
import { fetchRole, deleteRole, next_role_list } from '../../../services/home/role'
import { useState, useEffect } from 'react'
import {
  Button, 
  UncontrolledDropdown, 
  DropdownMenu, 
  DropdownItem, 
  DropdownToggle
} from 'reactstrap'
import { MoreVertical, Edit, Trash } from 'react-feather'
import ErrorHandler from "../../../common/ErrorHandler"
import DataTable from 'react-data-table-component'
import ReactPaginate from 'react-paginate'
import { SuccessContent } from '@utils'

const RoleList = () => {
  const [listrole, ListRoles] = useState([]) 
  const [list, setList] = useState([])
  const [pageCount, setpageCount] = useState(0)
  const [pageStartFrom, setPageStartFrom] = useState(1)
  const [currentPage, setCurrentPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const limit = 10
  const getRole = async () => {
    try {
      const response = await fetchRole()
      console.log(response)
      if (response) {
        if (response.data) {
          console.log(response)
          const { data: { result } } = response.data
          // const { data: { result: { total } } } = response.data
          setpageCount(Math.ceil(result.length / limit)) 
          ListRoles(result)
          setList(result.slice(0, rowsPerPage))
          // setPageStartFrom(response.data.data.result.from)
         
          // setLimit(to)
        }
      }
    } catch (e) {
      // ErrorHandler(e)
      console.log(e)
    }
  }

  const fetchSublicense_type = async (currentPage) => {
    //const response = await next_SubLicenceType(currentPage, school_id)
    const response = await next_role_list(currentPage)
    const { data: { result: { data } } } = response.data
    setPageStartFrom(response.data.data.result.from)
    return data
  }
 
   const handlePageClick = async (data) => {
 
     const currentPage = data.selected + 1
     const sublicense_typeFormServer = await fetchSublicense_type(currentPage)
     ListRoles(sublicense_typeFormServer)
   }
  
  const deleteroleapi = async (id) => {
    try {
      const response = await deleteRole(id)
      if (response) {
        if (response.data) {
          const { data: { message } } = response.data
          SuccessContent({ msg: message })
          getRole()
        }
      }
    } catch (e) {
      ErrorHandler(e)
    }
  }

  useEffect(() => {
    getRole()
  }, [limit])

  const handlePagination = page => {
    console.log("page: ", page.selected)
    setList(listrole.slice((page.selected * rowsPerPage) + 1,  (page.selected * rowsPerPage) + rowsPerPage + 1))
    setCurrentPage(page.selected)
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(listrole.length / rowsPerPage))

    return (
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        pageCount={count || 1}
        forcePage={currentPage}
        onPageChange={page => handlePagination(page)}
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
    )
  }

  const columns = [
    {
      name: 'SL No.',
      selector: 'id',
      sortable: true,
      cell:  (row, index) => (currentPage * rowsPerPage) + index + 1
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      cell:  row => row.name
    },
    {
      name: 'Actions',
      cell: row => (
        <UncontrolledDropdown>
          <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
            <MoreVertical size={15} />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem href='/' onClick={e => e.preventDefault()}>
              <Edit className='mr-50' size={15} />
                <Link to={`/pages/role/edit/${row.id}`}>
                  <span className='align-middle'>Edit</span>
                </Link>
            </DropdownItem>
            <DropdownItem href='/' onClick={e => e.preventDefault()}>
              <Trash className='mr-50' size={15} /> <span className='align-middle' onClick={() => {
                deleteroleapi(row.id)
              }}>Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown> 
      )
    }
  ]

    // ** Table data to render
    const dataToRender = () => {
      // const filters = {
      //   role: currentRole.value,
      //   currentPlan: currentPlan.value,
      //   status: currentStatus.value,
      //   q: searchTerm
      // }
  
      // const isFiltered = Object.keys(filters).some(function (k) {
      //   return filters[k].length > 0
      // })
  
      if (listrole.length > 0) {
        return listrole.slice(0, rowsPerPage)
      } else if (listrole.length === 0) {
        return []
      }
    }

  const customStyles = { 
    rows: {
      style: {
        backgroundColor: "#fafafc"
      }
    },
    cells: {
      style: {
        padding:"0.72rem 2rem",
        borderTop: "1px solid #ebe9f1",
        verticalAlign: "middle"
      }
    }
  }

  return (
    <div className='app-user-list'>
       <div className="container" style={{ height: "100%" }}>

      
      <Link to={`/pages/role/create`}>
       <Button className='mt-1 mb-2 text-white' color='success' type='submit'>   
          Add Role
      </Button>
      </Link>
   
        <DataTable
          striped
          noHeader
          pagination
          subHeader
          responsive
          paginationServer
          columns={columns}
          // sortIcon={<ChevronDown />}
          className='table-responsive table-striped'
          paginationComponent={CustomPagination}
          customStyles={customStyles}
          // data={listrole}
          paginationPerPage={rowsPerPage}
          data={list}
        />
      </div>
      {/* <Table striped responsive>
      <thead>
        <tr>
          <th>Sl No.</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {
          listrole ? listrole.map((ele, index) => (
            <>
              <tr>
                <td>
                  {pageStartFrom + index}
                </td>
                <td>
                  <span className='align-middle font-weight-bold'>{ele.label_name}</span>
                </td>
                <td>
                  <UncontrolledDropdown>
                    <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                      <MoreVertical size={15} />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem href='/' onClick={e => e.preventDefault()}>
                        <Edit className='mr-50' size={15} />
                          <Link to={`/pages/role/edit/${ele.id}`}>
                            <span className='align-middle'>Edit</span>
                          </Link>
                      </DropdownItem>
                      <DropdownItem href='/' onClick={e => e.preventDefault()}>
                        <Trash className='mr-50' size={15} /> <span className='align-middle' onClick={() => {
                          deleteroleapi(ele.id)
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
      </Table> */}
    {/* <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
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

export default RoleList
