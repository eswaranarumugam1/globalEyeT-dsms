import { Row, Col, Card, CardBody, Button } from 'reactstrap'
import '../SchoolList.scss'
import profileImg from '../../assets/images/schoolistprofile.png'
import rating from '../../assets/images/rating.png'
import Car from '../../assets/images/car.png'
import phoneiconsmall from '../../assets/images/phoneiconsmall.png'
import Globe from '../../assets/images/globe.png'
import mapsmall from '../../assets/images/mapsmall.png'
import ErrorHandler from "../../../common/ErrorHandler"
import React, { useState, useEffect } from 'react'
import { fetchSchoolList } from "../../../services/frontend/schoollist"
import { Link } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import schoolList from '../SchoolList'
import Map from '../../shared/Map/Map'
//import { any } from 'prop-types'
const CardList = (props) => {
    const [listOfSchool, setListOfSchool] = useState([])
    
    const [markers, setMarkers] = useState([])
    
    
    const [rating, setRating] = React.useState(0) // initial rating value

    // Catch Rating value
    const handleRating = (rate) => {
        setRating(rate)
        // other logic
    }
    const getSchoolList = async () => {
        try {
             const myDiveLogs = []
          const response = await fetchSchoolList()
          console.log(response.data)
          if (response) {
            if (response.data) {
              const { data: { result:  { data }  } } = response.data
              if (data && data.length && data.length > 0) {
                setListOfSchool(data)
                 
                data.map((x)  => {
                    const lat = parseFloat(x.latitude)
                    const long = parseFloat(x.longitude)
                    const a = {id:x.id, latitude:lat, longitude:long, shelter:x.name}
                    
                    myDiveLogs.push(a)
                    console.log(myDiveLogs)
                    setMarkers(myDiveLogs)
                   // setMarkers(...markers, a)
                })    
              }
            }
          }
        } catch (e) {
          ErrorHandler(e)
        }
      }

    useEffect(() => {
        getSchoolList()
        return () => {
            // listOfSchool([])
        }
      }, [])
    return (
         
        listOfSchool ? listOfSchool.map((sl) => (
         

        <div className="Card-list-block px-2">
         
         <Link
            to={`/schooldetails/${sl.id}`}><Card>
                        <CardBody>
                            <Row>
                                <Col xxl={4} xl={4} lg={12} md={12} sm={12} xs={12} className="text-center">
                                    <img className="profileImg" src={profileImg} />
                                    <div className='mt-3'>
                                        <Button className="red-outline-button"><img src={Car} /> Classic</Button>
                                        <Button className="red-outline-button ml-1"><img src={Car} /> Car</Button>
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
                                    <Row className="mt-4 address-block">
                                        <Col className="pl-0" xxl={1} xl={1} lg={1} md={1} sm={1} xs={1}>
                                            <img src={Globe}/>
                                        </Col>
                                        <Col className="text-left pl-0" xxl={11} xl={11} lg={11} md={11} sm={11} xs={11}>
                                            <p>{sl.school_url}</p>
                                        </Col>
                                        <Col className="pl-0" xxl={1} xl={1} lg={1} md={1} sm={1} xs={1}>
                                            <img src={phoneiconsmall}/>
                                        </Col>
                                        <Col className="text-left pl-0" xxl={11} xl={11} lg={11} md={11} sm={11} xs={11}>
                                            <p>{sl.phone}</p>
                                        </Col>
                                        <Col className="pl-0" xxl={1} xl={1} lg={1} md={1} sm={1} xs={1}>
                                            <img src={mapsmall}/>
                                        </Col>
                                        <Col className="text-left pl-0" xxl={11} xl={11} lg={11} md={11} sm={11} xs={11}>
                                            <p>{sl.address} </p>
                                        </Col>
                                    </Row>
                                </Col>
                                <schoolList  markers={markers} />
                            </Row>
                        </CardBody>
                    </Card>
                    </Link>
          
        </div>
         )) : null
    )
}

export default CardList