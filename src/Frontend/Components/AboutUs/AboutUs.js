import './AboutUs.scss'
import { Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import aboutUsImage from '../../assets/images/aboutusimg.png'
import React, { useState, useEffect } from 'react'
import { LandingPageData } from "../../../services/frontend/landingpage"
import ErrorHandler from "../../../common/ErrorHandler" 
import { ExternalLink } from 'react-external-link'
import HeaderNavbar from '../../shared/Header/Header'
import Footer from '../../shared/Footer/Footer'
const AboutUs = () => {
    const [entitle, setEnAboutUSTitle] = useState('')
  const [endescription, setEnAboutUSDescription] = useState('')
  const [enimage, setEnAboutUSImage] = useState('')
  const [enreadmore, setEnReadMore] = useState('')
  
  const  getAboutUsenContent = async () => {
    try {
        const response = await LandingPageData()
        if (response) {
            console.log(response)
            const { data: { result: { about_us } } }  = response.data
            console.log(about_us)
          if (about_us) {
            const { about_title, about_description, about_us_image, read_more_redirect_url } = about_us
            setEnAboutUSTitle(about_title)
            setEnAboutUSDescription(about_description)
            setEnAboutUSImage(about_us_image)
            setEnReadMore(read_more_redirect_url)
          }
        }
    } catch (e) {
      ErrorHandler(e)
    }
}
useEffect(() => {
    getAboutUsenContent()
  }, [])
    return (
      <div>
        {/* <HeaderNavbar/> */}
        <div className="aboutUs-block">
            <Row className="no-gutters justify-content-center">
                <Col xxl={4} xl={4} lg={4} md={12} sm={12} xs={12}>
                    <div className="leftImg-block">
                        <img className='w-100' src={enimage} />
                    </div>
                </Col>
                <Col xxl={8} xl={8} lg={8} md={12} sm={12} xs={12} className="right-block">
                    <h4>{entitle}</h4>
                    <p dangerouslySetInnerHTML={{__html: endescription}} >
                    </p>
                    {/* <h1 className='mt-3'>We give the best  training to suit your requirements</h1>
                    <p className="mt-4">Lorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesettingLorem</p>
                    <p className='mt-4'>Lorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum.</p> */}
                    {/* <Link to={{pathname:`${enreadmore}`}}><h6>Read More </h6></Link> */}
                    {/* <ExternalLink href={enreadmore}>
      <span>Read More</span>
    </ExternalLink> */}
                </Col>
            </Row>
        </div>
        {/* <Footer/> */}
        </div>
    )
}

export default AboutUs