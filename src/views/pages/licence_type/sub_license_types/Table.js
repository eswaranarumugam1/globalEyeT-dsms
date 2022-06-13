import ReactPaginate from "react-paginate"
import { useEffect, useState, Fragment } from "react"
import { Button, Table,  Media, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { AllSubLicenceType, DeleteSubLicTyp, next_SubLicenceType } from "../../../../services/home/LicensePage"
import { Link } from 'react-router-dom'
import { MoreVertical, Edit, Trash, ChevronRight, Coffee } from 'react-feather'
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

function App() {
  const [items, setItems] = useState([])

  const [pageCount, setpageCount] = useState(0)

  const limit = 6

  const school_id = parseInt(localStorage.getItem("schoolIdToken"))

  const getSublicense_type = async () => {
    try {
      const response = await AllSubLicenceType(school_id)
      if (response) {
        if (response.data) {
          const { data: { result: { data } } } = response.data
          const { data: { result: { total } } } = response.data
          // const { data: { result: { to } } } = response.data
          setpageCount(Math.ceil(total / limit)) 
          setItems(data)
          console.log('this is data', data)
          // setLimit(to)
        }
      }
    } catch (e) {
      ErrorHandler(e)
    }
    
  }
  
  const fetchSublicense_type = async (currentPage) => {
    const response = await next_SubLicenceType(currentPage, school_id)
    const { data: { result: { data } } } = response.data
    return data
  }

  const handlePageClick = async (data) => {

    const currentPage = data.selected + 1
    const sublicense_typeFormServer = await fetchSublicense_type(currentPage)
    setItems(sublicense_typeFormServer)
  }
 
  const deletesublicencetype = async (id) => {  
    // const index = items.indexOf(id) 
    // delete items[index]
    try {
      const response = await DeleteSubLicTyp(id, school_id)
      if (response) {
        if (response.data) {
          console.log(response)
        const { data: { message } } = response.data
          toast.success(<SuccessContent msg={message} />, {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000
        })
        getSublicense_type()
  // const index = items.indexOf(id) 
  // delete items[index]

      }
      }
    } catch (e) {
      ErrorHandler(e)
    }
  }

  useEffect(() => {
    getSublicense_type()
   }, [limit])
  return (
    <div className="container">
      <div className="row m-2">
      <br/>
         <Link to={`/pages/sub_licence_type/create`}>
             <Button type="button" color="success">
                 Create New Sub Licence Type
             </Button>
         </Link>
         <br/><br/>
            <Table responsive>
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Name</th>
                  <th>License Type</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {
              items ? items.map((ele, index) => ( 
                  <tr>
                    <td>
                      { index + 1}
                    </td>
                    <td>
                      {ele.name}
                    </td>
                    <td>
                      {ele.main_license}
                    </td>
                    <td>
                      <Media>
                            <Media className='mr-25' left>
                              <Media object className='rounded mr-50' src={ele.image} alt='Choose a Image to Upload' height="80" />
                            </Media>
                        </Media>
                    </td>
                    <td>
                      <UncontrolledDropdown>
                        <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                          <MoreVertical size={15} />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem href='/' onClick={e => e.preventDefault()}>
                            <Edit className='mr-50' size={15} />
                              <Link to={`/pages/sub_licence_type/edit/${ele.id}`}>
                                <span className='align-middle'>Edit</span>
                              </Link>
                          </DropdownItem>
                          <DropdownItem href='/' onClick={e => e.preventDefault()}>
                            <Trash className='mr-50' size={15} /> <span className='align-middle' onClick={() => {
                                deletesublicencetype(ele.id)
                              }}>Delete</span>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
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
      />
    </div>
  )
}

export default App