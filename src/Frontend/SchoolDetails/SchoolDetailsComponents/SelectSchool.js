import './selectschool.scss'

import { useState, useEffect} from 'react'
import { AiFillCar } from "react-icons/ai"
import { RiEBikeFill, RiMotorbikeFill } from "react-icons/ri"
import { IoMdBus } from "react-icons/io"
import { FiTruck, FiPhone } from "react-icons/fi"
import { CardStyles } from './CardsStyles'
import {
    Row,
    Col
} from 'reactstrap'
import {RegistrationStyles}  from '../../../../src/styles/RegistrationStyles'
import { BsChevronDown, BsGlobe } from "react-icons/bs"
import { Rating } from 'react-simple-star-rating'
import { ImLocation } from "react-icons/im"
import SchoolImage from '../../../public/assets/images/selected_school_image.png'
import SchoolImages from '../../../public/assets/images/selected_school_images.png'
import ErrorHandler from "../../../common/ErrorHandler"
import { fetchSchoolData } from '../../../services/frontend/schoollist'
import CustomMap from '../../shared/Map/CustomMap' 


function SelectSchool({ id }) {


    const [rating, setRating] = useState(0) // initial rating value
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [markers, setMarkers] = useState([])
    const [schoolImage, setschoolImage] = useState('')

    const [entitle, setEnAboutUSTitle] = useState('')
    const [endescription, setEnAboutUSDescription] = useState('')
    const [enimage, setEnAboutUSImage] = useState('')
    const [enreadmore, setEnReadMore] = useState('')
    

    // Catch Rating value
    const handleRating = (rate) => {
        setRating(rate)
        // other logic
    }

    const getSchoolData = async () => {
            const response = await fetchSchoolData(id)
            if (response) {
                if (response.data) {
                    const { data: { result } } = response.data
                        setData(result)
                        setLoading(false)
                        const lat = parseFloat(result.latitude)
                        const long = parseFloat(result.longitude)
                        const a = {id:result.id, latitude:lat, longitude:long, shelter:result.name} 
                        const tempMark = []
                        tempMark.push(a)
                        setMarkers(tempMark)   
                        setschoolImage(result.image)
                }
            }
    }

    const  getAboutUsenContent = async () => {
        try {
            const response = await SchoolLandingPageData(id)
            if (response) {
                console.log(response)
                const { data: { result: { about_us } } }  = response.data
                console.log(about_us)
              if (about_us) {
                const { about_title, about_description, about_us_image, read_more_redirect_url } = about_us
                setEnAboutUSTitle(about_title)
                setEnAboutUSDescription(about_description)
                setEnAboutUSImage(about_us_image)
              }
            }
        } catch (e) {
         // ErrorHandler(e)
         console.log(e)
        }
    }
    
    useEffect(() => {
        if (id) {
            setLoading(true)
            getSchoolData()
            getAboutUsenContent()
        }  return () => {
            setData([])
        }
    }, [])

    return (
        <div className='cards'>
            <RegistrationStyles />
            {/* { console.log(data) } */}
            <CardStyles /> 
            {loading && <div>Loading...</div>}
            {!!data && data.length !== 0 ? (<>
            <div className='cards'>
            <Row>
                <Col sm='6' className="card-container">
                                <Row >
                                    <Col style={{ textAlign: 'center', margin: 5, justifyContent: 'center', flex: 1 }}>
                                        <div style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }} >

                                            <img height={'100px'} width={'100px'} style={{ borderRadius: 10 }} src={data.image} />

                                        </div>
                                    </Col>
                                    <Col style={{ flex: 5 }}>
                                        <div style={{ padding: 10, fontWeight: 'bold', fontSize: 20 }}>{data.name}</div>
                                        <div >
                                            <div>
                                                <Rating style={{ justifyContent: 'center', alignItems: 'center' }} size={20} onClick={handleRating} ratingValue={2} />  Reviews | <a href="#" >see the timetable</a>
                                            </div>
                                        </div>
                                        <div>
                                        </div>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col style={{ padding: 10 }}>
                                        <BsGlobe style={{ fontSize: 30, justifyContent: 'center', alignSelf: 'center', padding: 5 }} />
                                        Driving School Website
                                    </Col>
                                    <Col>
                                        <FiPhone style={{ fontSize: 30, justifyContent: 'center', alignSelf: 'center', padding: 5 }} />
                                        {data.phone ? data.phone : 'XXXXXXXXXXX'}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <ImLocation style={{ fontSize: 30, justifyContent: 'center', alignSelf: 'center', padding: 5 }} />
                                        {data.address ? data.address : '' }
                                    </Col>
                                </Row>
                                <Row>
                                    <div style={{ height: '120px', backgroundColor: '#CCD1E4', margin: 10, padding:10, borderRadius: 10  }}>
                                    <CustomMap markers={markers} />
                                    </div>
                                </Row>
                                <Row >
                                    <div  style={{ backgroundColor: '#FEECE9', margin:10, padding:10, borderRadius: 10 }}>
                                        <h4 style={{color:'black'}}>HELLO WORLD</h4>
                                        <div style={{color:'black'}} >Lorem ipsum lsdfnsfklsdskds ks sksd fkds sksdkvs vskdv sdvksdv gsd
                                            Lorem ipsum lsdfnsfklsdskds ks sksd fkds sksdkvs vskdv sdvksdv gsd</div>
                                        <button style={{borderRadius:10, margin: 10}} className='register-button'>Learn More</button>
                                    </div>
                                </Row>
                </Col>
                <Col sm='6' style={{ padding: 10 }}>
                    <Row >
                        <div className="school-image-alignment">
                            <img height={'100%'} width={'100%'} style={{ borderRadius: 15, margin:'0px auto' }} src={data.image} />
                        </div>
                    </Row>
                    {/* <br/>
                    <br/>
                    <Row style={{ width: '90%', padding: 10 }} >
                        <Col>
                            <img height={'100px'} width={'100px'} style={{ borderRadius: 15 }} src={SchoolImage} />

                        </Col>
                        <Col>
                            <img height={'100px'} width={'100px'} style={{ borderRadius: 15 }} src={SchoolImage} />

                        </Col>
                        <Col>
                            <img height={'100px'} width={'100px'} style={{ borderRadius: 15 }} src={SchoolImage} />

                        </Col>
                        <Col >
                            <a className='vertical-center'>More Images</a>
                        </Col>
                    </Row> */}
                </Col>
            </Row>
        </div>
        </>) : null }
            
        </div>

    )
}

export default SelectSchool
