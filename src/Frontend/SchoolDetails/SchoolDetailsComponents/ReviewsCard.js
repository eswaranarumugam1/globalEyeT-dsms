import React from 'react'
import { AiFillCar } from "react-icons/ai"
import { RiEBikeFill, RiMotorbikeFill } from "react-icons/ri"
import { IoMdBus } from "react-icons/io"
import { FiTruck, FiPhone } from "react-icons/fi"
import { CardStyles } from './CardsStyles'
import {
    Alert,
    Row,
    Col,
    CardTitle,
    CardText,
    Form,
    Input,
    FormGroup,
    Label,
    CustomInput,
    UncontrolledTooltip,
    Card
} from 'reactstrap'
import {RegistrationStyles}  from '../../../../src/styles/RegistrationStyles'
import { BsChevronDown, BsGlobe } from "react-icons/bs"
import { Rating } from 'react-simple-star-rating'
import { ImLocation } from "react-icons/im"


function ReviewsCard() {


    const [rating, setRating] = React.useState(0) // initial rating value

    // Catch Rating value
    const handleRating = (rate) => {
        setRating(rate)
        // other logic
    }

    return (
                        <div className="row card">
                            <div className="column">
                                <div
                                    style={{ width: '650px', padding: 10 }}
                                >
                                    <Row>
                                        <div  style={{ width: '600px', backgroundColor: 'white', margin:10, padding:10, borderRadius: 10 }}>
                                        <Row >
                                        <Col style={{ padding: 10, color: 'black', flex:3 }}>

                                            <BsGlobe style={{ fontSize: 30, justifyContent: 'center', alignSelf: 'center', padding: 5 }} />
                                            Mahummadh
                                        </Col>
                                        <Col style={{ padding: 10, color: 'black' }} >
                                        <Rating style={{ justifyContent: 'center', alignItems: 'center' }} size={20} onClick={handleRating} ratingValue={2} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div style={{color: 'black'}}>
                                            ghfgfhd gf hhgfj f hg gjghjkhghjkgg jhg jkh hj jhg jh jgkgfjfhgfdfdhgfdfhgfhgf dgf dgf dfgdf 
                                            ghfgfhd gf hhgfj f hg gjghjkhghjkgg jhg jkh hj jhg jh jgkgfjfhgfdfdhgfdfhgfhgf dgf dgf dfgdf
                                            ghfgfhd gf hhgfj f hg gjghjkhghjkgg jhg jkh hj jhg jh jgkgfjfhgfdfdhgfdfhgfhgf dgf dgf dfgdf
                                            ghfgfhd gf hhgfj f hg gjghjkhghjkgg jhg jkh hj jhg jh jgkgfjfhgfdfdhgfdfhgfhgf dgf dgf dfgdf
                                        </div>
                                    </Row>
                                        </div>
                                    </Row>
                                </div>
                                </div>
                                </div>

    )
}

export default ReviewsCard
