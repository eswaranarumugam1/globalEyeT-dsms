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
import ReviewsCard from './ReviewsCard'
import aboutImg from '../../../assets/images/pages/card-image-4.jpg'


function Reviews() {


    const [rating, setRating] = React.useState(0) // initial rating value

    // Catch Rating value
    const handleRating = (rate) => {
        setRating(rate)
        // other logic
    }

    return (
        <div className='cards'>
            <RegistrationStyles />
            <CardStyles />
            <div className='cards'>
                
                <div style={{fontSize: 25}}>Reviews</div>
                <br />
                    <Row style={{padding:'15px'}}>
                        <ReviewsCard />
                    </Row>
                    <Row style={{padding:'15px'}}>
                        <ReviewsCard />
                    </Row>
                    {/* <Row style={{padding:'15px'}}>
                        <ReviewsCard />
                    </Row> */}
                    {/* <Row style={{padding:'15px'}}>
                        <ReviewsCard />
                    </Row>
                    <Row style={{padding:'15px'}}>
                        <ReviewsCard />
                    </Row>
                    <Row style={{padding:'15px'}}>
                        <ReviewsCard />
                    </Row> */}
                    
            </div>
        </div>

    )
}

export default Reviews
