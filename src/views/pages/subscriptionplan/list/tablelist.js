import ReactPaginate from "react-paginate"
import { useEffect, useState, Fragment } from "react"
import { Button, Table,  Media, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import {getAllSubscriptionPlansApi_pagination, next_Subscriptionplan_pagination } from "../../../../services/home/admin"
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

function TableList() {
  const [items, setItems] = useState([])

  const [pageCount, setpageCount] = useState(0)

  const limit = 10

  const school_id = parseInt(localStorage.getItem("schoolIdToken"))

  const getAllSubscription = async () => {
    try {
      const response = await getAllSubscriptionPlansApi_pagination(school_id)
      if (response) {
        if (response.data) {
          console.log(response)
          const { data: { result: { data } } } = response.data
          const { data: { result: { total } } } = response.data
          setpageCount(Math.ceil(total / limit)) 
          setItems(data)
        }
      }
    } catch (e) {
     // ErrorHandler(e)
      console.log(e)
    }
    
  }
  
  const fetchSublicense_type = async (currentPage) => {
   //const response = await next_SubLicenceType(currentPage, school_id)
   const response = await next_Subscriptionplan_pagination(school_id, currentPage)
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
        getAllSubscription()
  // const index = items.indexOf(id) 
  // delete items[index]

      }
      }
    } catch (e) {
      ErrorHandler(e)
    }
  }

  useEffect(() => {
    getAllSubscription()
   }, [limit])
  return (
    <div className="container">
      <div className="row m-2">
      
         <Link className="mb-2" to={`/pages/subscriptionplanadd?admin=schoolAdmin`}>
             <Button type="button" color="success">
                 Create New Subscription Plan
             </Button>
         </Link>
         <br/><br/>
            <Table responsive>
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Name</th>
                 
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
                      <UncontrolledDropdown>
                        <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                          <MoreVertical size={15} />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem href='/' onClick={e => e.preventDefault()}>
                            <Edit className='mr-50' size={15} />
                              <Link to={`/pages/subscriptionplanedit/edit/${ele.id}`}>
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

export default TableList