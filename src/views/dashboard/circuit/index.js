
/* eslint-disable */
import { useState, useEffect, useCallback } from "react"
import { Link } from 'react-router-dom'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { DataTable } from '../../components/table'
import { DeleteConfirmationModal } from '../../components/modal/delete-confirmation'
import { Circuit } from "../../../services/home/circuit"

const Index = () => {
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [limit, setLimit] = useState(10)
    const [total, setTotal] = useState(0)
    const [searchLoading, setsearchLoading] = useState(false)
    const [isDelete, setDelete] = useState({ value: null, show: false, loading: false })

    /* fetch data */
    const fetchData = useCallback(async (limit, page, query) => {
        try {
            setLoading(true)
            const response = await Circuit.Index({ per_page: limit, page: page, query })
            if (
                response.status === 200 &&
                response.data &&
                response.data.data &&
                response.data.data.result &&
                response.data.data.result.data
            ) {
                setData(response.data.data.result.data)
                setTotal(response?.data?.data?.result?.total)
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

    // handle paginate page change
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

        await Circuit.Destroy(isDelete.value)
        fetchData()
        setDelete({ ...isDelete, show: false, loading: false })
    }

    // data columns
    const columns = [
        {
            name: "Circuit Function",
            sortable: true,
            selector: row => row.type
        },
        {
            name: "Availability",
            sortable: true,
            selector: row => row.avability
        },
        {
            name: "Circuit Name",
            sortable: true,
            selector: row => row.name
        },
        {
            name: "Circuit Capacity",
            sortable: true,
            selector: row => row.max_capacity
        },
        {
            name: "No of Vehicles",
            sortable: true,
            selector: row => row.no_of_vehicles
        },
        {
            name: "Status",
            sortable: true,
            selector: row => { return row.status > 0 ? 'Available' : 'Unavailable'}
        },
        {
            name: "Action",
            cell: row =>
                <UncontrolledDropdown>
                    <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                        <MoreVertical size={15} />
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem href='/' onClick={e => e.preventDefault()}>
                            <Edit className='mr-50' size={15} />
                            <Link to={`/pages/edit-circuit/${row.id}?admin=schoolAdmin`}>
                                <span className='align-middle'>Edit</span>
                            </Link>
                        </DropdownItem>
                        <DropdownItem href='/' onClick={e => e.preventDefault()}>
                            <Trash
                                className='mr-50'
                                size={15}
                            />
                            <span
                                className='align-middle'
                                onClick={() => setDelete({ value: row.id, show: true })}
                            >Delete</span>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
        }
    ]

    return (
        <div>
            <DataTable
                data={data}
                columns={columns}
                loading={isLoading}
                totalRows={total}
                handlePerRowsChange={handleLimitChange}
                handlePageChange={handlePageChange}
                noDataMessage="Circuit not available."

                searchable
                placeholder={"Search circuit"}
                search={handleSearch}
                searchLoading={searchLoading}
                clearSearch={() => fetchData()}
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

export default Index