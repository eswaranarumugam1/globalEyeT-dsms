import { MoreVertical, Edit, Trash, Coffee, ThumbsDown, ThumbsUp, Archive, Search } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Label, Button, Row, Col, Form, FormGroup, Input, CustomInput } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useState, useEffect, Fragment } from 'react'
import {
    AvForm,
    AvGroup,
    AvInput
} from 'availity-reactstrap-validation-safe'
import ReactPaginate from "react-paginate"
import Avatar from 'antd/lib/avatar/avatar'
import { ErrorContent, SuccessContent } from '@utils'
import { OrganizationService } from "../../../../services/home/organization"
import '../../../../styles/schoolList.css'

const OrgTable = () => {
    const [pageCount, setpageCount] = useState(0)
    const [pageStartFrom, setPageStartFrom] = useState(0)
    // const [limit, setLimit] = useState(0)

    const limit = 10
    const [listOfOrganizations, setListOfOrganizations] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [searchOrganizationText, setSearchOrganizationText] = useState('')
    const [searchOrganizationData, setSearchOrganizationData] = useState([])

    const getOrganizations = async () => {
        try {
            const response = await OrganizationService.getOrganizations()
            if (response) {
                if (response.data) {
                    const { data: { result: { data } } } = response.data
                    if (data && data.length && data.length > 0) {
                        const { data: { result: { total } } } = response.data
                        // const { data: { result: { to } } } = response.data
                        setpageCount(Math.ceil(total / limit))

                        response.data.data.result.data = response.data.data.result.data.map(function (el, index) {
                            const o = Object.assign({}, el)
                            if (o.status === '1') {
                                o.status = 'Published'
                            } else if (o.status === '0') {
                                o.status = 'Disabled'
                            } else if (o.status === '2') {
                                o.status = 'Drafted'
                            }
                            return o
                        })
                        setListOfOrganizations(response.data.data.result.data)
                        setSearchOrganizationData(response.data.data.result.data)
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
        const response = await OrganizationService.getNextOrganization(currentPage)
        const { data: { result: { data } } } = response.data
        response.data.data.result.data = response.data.data.result.data.map(function (el, index) {
            const o = Object.assign({}, el)
            if (o.status === '1') {
                o.status = 'Published'
            } else if (o.status === '0') {
                o.status = 'Disabled'
            } else if (o.status === '2') {
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
        setListOfOrganizations(license_typeFormServer)
        setSearchOrganizationData(license_typeFormServer)
    }
      
    const deleteOrganization = (id) => {
        OrganizationService.Delete(id)
            .then((response) => {
                if (response.response) {
                    const data = response.response.data
                    ErrorContent({ msg: data.errors.msg })
                } else {
                    const data = response.data.data
                    if (data.errors) {
                        ErrorContent({ msg: data.message })
                    } else {
                        SuccessContent({ msg: data.message })
                        getOrganizations()
                    }
                }
            })
            .catch((error) => {
                ErrorContent({ msg: "Please try again"})
            })
    }

    useEffect(() => {
        getOrganizations()
        return () => {
            setListOfOrganizations([])
        }
    }, [limit])

    const onSearchTextBox = async (e) => {
        setSearchOrganizationText(e.target.value)
        if (e.target.value === '') {
            if (currentPage > 0) {
                const license_typeFormServer = await fetchschool_list(currentPage)
                setListOfOrganizations(license_typeFormServer)
                setSearchOrganizationData(license_typeFormServer)
            } else {
                getOrganizations()
            }

        } else {
            const items = searchOrganizationData.filter(item => item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 || item.address.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 | item.status.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)
            setListOfOrganizations(items)
        }
    }
    return (
        <div className="container" style={{ height: "100%" }}>
            <AvForm >
                <Row>
                    <Col sm='9'> </Col>
                    <Col sm='3'>
                        <AvGroup>
                            <AvInput name='name_arabic' id='name_arabic' onChange={(e) => {
                                onSearchTextBox(e)
                            }} placeholder="Search School" />
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
                            <th>Group Name</th>
                            <th>Group Admin Email</th>
                            <th>Group Url</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOfOrganizations.length > 0 ? listOfOrganizations.map((ele, index) => (
                                <>
                                    <tr>
                                        <td>{pageStartFrom + index }</td>
                                        <td>
                                            <span className='align-middle font-weight-bold'>{ele.group_name_english}</span>
                                        </td>
                                        <td>
                                            {ele.group_admin_email}
                                        </td>
                                        <td>
                                            {ele.group_url}
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
                                                        <Link to={`/pages/organization/edit/${ele.id}`}>
                                                            <span className='align-middle'>Edit</span>
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                        <Trash className='mr-50' size={15} />
                                                        <span className='align-middle' onClick={() => {
                                                            deleteOrganization(ele.id)
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

export default OrgTable