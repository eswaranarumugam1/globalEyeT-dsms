import './SchoolList.scss'

import HeaderNav from '../shared/Header/Header'
import Footer from '../shared/Footer/Footer'
import FindSchool from './FindSchool/FindSchool'
import { Row, Col, Card, CardBody, Button } from 'reactstrap'
import CustomMap from '../shared/Map/CustomMap'
import profileImg from '../assets/images/schoolistprofile.png'
import rating from '../assets/images/rating.png'
import Car from '../assets/images/car.png'
import phoneiconsmall from '../assets/images/phoneiconsmall.png'
import Globe from '../assets/images/globe.png'
import mapsmall from '../assets/images/mapsmall.png'
import ErrorHandler from "../../common/ErrorHandler"
import React, { useState, useEffect } from 'react'
import { fetchSchoolList } from "../../services/frontend/schoollist"
import { Link } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import ReactPaginate from 'react-paginate'
import { data } from '../../views/tables/data-tables/data'

const itemsPerPage = 5


const SchoolList = () => {
    const pageLimitForListOfSchool = 5
    const [listOfSchool, setListOfSchool] = useState([])
    const [showSchool, setShowSchools] = useState([])
    const [currentShowSchool, setCurrentShowSchool] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [offset, setOffset] = useState(0)
    const perPage = 15
    const [pageCount, setPageCount] = useState(0)
    const [searchInput, setSearchInput] = useState('')
    const [markers, setMarkers] = useState([])


    const [rating, setRating] = React.useState(0) // initial rating value

    // Catch Rating value
    const handleRating = (rate) => {
        setRating(rate)
        // other logic
    }
    
    const handleKeyword = (data, type) => {
        let temp = []
        if (!!data && data !== '') {
            if (!!type && type === 'name') {
                listOfSchool.map((item) => {
                    if (item.name.toLowerCase().includes(data.toLowerCase())) {
                        temp.push(item)
                    }
                })
            } else if (!!type && type === 'address') {
                listOfSchool.map((item) => {
                    if (item.address.toLowerCase().includes(data.toLowerCase())) {
                        temp.push(item)
                    }
                })
            } else {
                temp = [...listOfSchool]
            }
        } else {
            temp = [...listOfSchool]
        }
        const myDiveLogs = []
        temp.map((x) => {
            const lat = parseFloat(x.latitude)
            const long = parseFloat(x.longitude)
            const a = { id: x.id, latitude: lat, longitude: long, shelter: x.name }
            myDiveLogs.push(a)
        })
        setMarkers(myDiveLogs)
        setShowSchools(temp)
    }

    const get_search_location = () => {

        const query = new URLSearchParams(location.search)
        const loc = query.get('location')
        console.log('the location is ', loc)
        if (loc) {
            // handleKeyword(loc, 'address')
            const schoolArray = []
            listOfSchool.map((item) => {
                if (item.address.toLowerCase().includes(data.toLowerCase())) {
                    schoolArray.push(item)
                }
            })
            // schoolArray = [...listOfSchool]
            setListOfSchool(schoolArray)
            console.log('schoolArray', schoolArray)
         }
    }

    const getSchoolList = async () => {
        try {
            const myDiveLogs = []
            const response = await fetchSchoolList(currentPage)
            //   console.log(response)

            if (response) {
                if (response.data) {
                    const { data: { result } } = response.data
                    
                    const data = result
                    console.log(data, 'school data')

                    const totalPages = result.total
                    console.log(totalPages, 'total')
                    console.log('length', Math.ceil(data.length))
                    setPageCount(Math.ceil(data.length / itemsPerPage))

                    setCurrentPage(result.current_page)

                    const endOffset = offset + itemsPerPage
                    console.log(`Loading items from ${offset} to ${endOffset}`)
                    setCurrentShowSchool(data.slice(offset, endOffset))
                    setPageCount(Math.ceil(data.length / itemsPerPage))

                    if (data && data.length && data.length > 0) {
                        
                        setListOfSchool(data)
                        setShowSchools(data)

                        data.map((x) => {
                            const lat = parseFloat(x.latitude)
                            const long = parseFloat(x.longitude)
                            const a = { id: x.id, latitude: lat, longitude: long, shelter: x.name }

                            myDiveLogs.push(a)
                            console.log(myDiveLogs)
                            // setMarkers(...markers, a)
                        })
                        setMarkers(myDiveLogs)
                    }
                }
            }
        } catch (e) {
            ErrorHandler(e)
        }
    }

    // const getSchooldata = async () => {
    //     const response = await fetchSchoolList(currentPage)
    //     if (response.data) {
    //         const { data: {result}  } = response.data
    //         console.log(result.current_page, "data")
    //         setCurrentPage(result.current_page)
    //     }
    // }

    useEffect(() => {
        getSchoolList()
        get_search_location()
        // getSchooldata()
    }, [])

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length
        console.log(newOffset, "new Off Set")
        setOffset(newOffset)
        setCurrentPage(newOffset)
        getSchoolList()
    }
console.log('demo', showSchool)
    return (
        <div>
            <HeaderNav />
            <div className="school-list-container">
                {/* <FindSchool  searchInputCallback = {(searchData)} => {} /> */}
                <FindSchool getKeyWord={handleKeyword}  />
                <Row className="mb-2">
                    <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12} className="school-list">
                        {showSchool ? showSchool.map((sl) => (


                            <div className="Card-list-block px-2" key={sl.id}>

                                <Link
                                    to={`/schooldetails/${sl.id}`}><Card>
                                        <CardBody>
                                            <Row>
                                                <Col xxl={4} xl={5} lg={12} md={12} sm={12} xs={12} className="text-center school-card-details mb-sm-2">
                                                    <img className="profileImg" src={profileImg} />
                                                    <div className='mt-2 mt-xl-3 classic-car-alignment'>
                                                        <Button className="red-outline-button image-text-alignment"><img src={Car} className="img-margin" /> Classic</Button>
                                                        <Button className="red-outline-button ml-1 ml-xl-1 image-text-alignment"><img src={Car} className="img-margin" /> Car</Button>
                                                    </div>
                                                </Col>
                                                <Col xxl={7} xl={7} lg={12} md={12} sm={12} xs={12}>
                                                    <h2 className='school-name'>{sl.name} </h2>
                                                    <div className='text-center'>
                                                        <Rating style={{ justifyContent: 'center', alignItems: 'center' }} size={20} onClick={handleRating} ratingValue={2} />
                                                        {/* <img src={rating} /> */}
                                                    </div>
                                                    <div className="review-timetable-block">
                                                        <div className='reviews'>
                                                            <p >Reviews(200)</p>
                                                        </div>
                                                        <div className="time-table">
                                                            <p >See the timetable</p>
                                                        </div>
                                                    </div>
                                                    <Row className="mt-4 mt-sm-3 address-block">
                                                        <Col className="pl-0 " xxl={1} xl={1} lg={1} md={1} sm={1} xs={1}>
                                                            <img src={Globe} className="mr-xl-1" />
                                                        </Col>
                                                        <Col className="text-left pl-0 pl-xl-1" xxl={11} xl={11} lg={11} md={11} sm={11} xs={11}>
                                                            <p>{sl.school_url}</p>
                                                        </Col>
                                                        <Col className="pl-0 " xxl={1} xl={1} lg={1} md={1} sm={1} xs={1}>
                                                            <img src={phoneiconsmall} className="mr-xl-1" />
                                                        </Col>
                                                        <Col className="text-left pl-0 pl-xl-1" xxl={11} xl={11} lg={11} md={11} sm={11} xs={11}>
                                                            <p>{sl.phone}</p>
                                                        </Col>
                                                        <Col className="pl-0 " xxl={1} xl={1} lg={1} md={1} sm={1} xs={1}>
                                                            <img src={mapsmall} />
                                                        </Col>
                                                        <Col className="text-left pl-0 pl-xl-1" xxl={11} xl={11} lg={11} md={11} sm={11} xs={11}>
                                                            <p>{sl.address} </p>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                {/* <schoolList markers={markers} /> */}
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Link>
                            </div>
                        )) : null}
                            <div className='pagination'>
                                <ReactPaginate
                                            previousLabel={"prev"}
                                            nextLabel={"next"}
                                            pageCount={pageCount}
                                            pageRangeDisplayed={5}
                                            onPageChange={handlePageClick}
                                            containerClassName={"pagination"}
                                            subContainerClassName={"pages pagination"}
                                            activeClassName={"active"}
                                            renderOnZeroPageCount={null}
                                            marginPagesDisplayed={2}
                            />
                            </div>
                        
                    </Col>
                    <Col className="mt-3" xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                        <CustomMap markers={markers} />
                    </Col>
                </Row>
            </div>
            <Footer />
        </div>
    )
}

export default SchoolList