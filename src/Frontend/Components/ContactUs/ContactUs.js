import banner from '../../assets/images/landing-contact-banner.png'
import map from '../../assets/images/map.png'
import { Row, Col, Container, Form, Input, FormGroup, Label, Button } from 'reactstrap'
import './ContactUs.scss'
import React, { useState, useEffect } from 'react'
import { LandingPageData } from "../../../services/frontend/landingpage"
import ErrorHandler from "../../../common/ErrorHandler"
const ContactUs = () =>  {
    const [encontactus_title, setEnContactUsTitle] = useState('')
    const [encontact_description, setEnContactUsDes] = useState('')
    const [enncontact_address, setEnContactUsAddress] = useState('')
    const [encontact_email, setEnContactUsEmail] = useState('')
    const [encontact_phone, setEnContactUsPhone] = useState('')

    const  getContactUs = async () => {
        try {
            const response = await LandingPageData()
            if (response) {
                console.log(response)
                const { data: { result: { contact_us } } }  = response.data
                console.log(contact_us)
                if (contact_us) {
                    const { contact_title,
                        contact_description,
                        contact_address,
                        contact_email,
                        contact_phone} 
                            = contact_us
                            setEnContactUsTitle(contact_title)
                            setEnContactUsDes(contact_description)
                            setEnContactUsAddress(contact_address)
                            setEnContactUsEmail(contact_email)
                            setEnContactUsPhone(contact_phone)
                  }
            }
        } catch (e) {
          ErrorHandler(e)
        }
    }
    
    useEffect(() => {
        getContactUs()
      }, [])
    return (
        <div className="contactus-block">
            <div className='contact-outer-block'>
                <div className='contactus-content'>
                    <h6>Contact Us</h6>
                    <h2 dangerouslySetInnerHTML={{__html: encontactus_title}}></h2>
                    <p dangerouslySetInnerHTML={{__html: encontact_description}} ></p>
                </div>
                <img className="w-100" src={banner} />
            </div>
            <div className='address-form-block'>
                <Row className="justify-content-around">
                    <Col xxl={4} xl={4} lg={4} md={6} sm={12} xs={12} >
                        <div className='left-block'>
                            <Row className="justify-content-start">
                                <Col xxl={2} xl={2} lg={2} md={2} sm={2} xs={3}>
                                    <img src={map} />
                                </Col>
                                <Col className="" xxl={9} xl={9} lg={9} md={9} sm={9} xs={9}>
                                    <p>{enncontact_address}</p>
                                </Col>
                            </Row>
                            <Row className="justify-content-start mt-3">
                                <Col xxl={2} xl={2} lg={2} md={2} sm={2} xs={3}>
                                    <img src={map} />
                                </Col>
                                <Col className="" xxl={9} xl={9} lg={9} md={9} sm={9} xs={9}>
                                    <p className='mt-sm-2'>{encontact_email}</p>
                                </Col>
                            </Row>
                            <Row className="justify-content-start mt-3">
                                <Col xxl={2} xl={2} lg={2} md={2} sm={2} xs={3}>
                                    <img src={map} />
                                </Col>
                                <Col className="" xxl={9} xl={9} lg={9} md={9} sm={9} xs={9}>
                                    <p className='mt-sm-2'>{encontact_phone}</p>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col xxl={4} xl={4} lg={4} md={6} sm={12} xs={12} className="right-block">
                        <div className='form-outer'>
                            <h5>Say Something</h5>
                            <Form>

                                <FormGroup>
                                    <Input type="text" name="email" id="exampleEmail" placeholder="Name" />
                                </FormGroup>
                                <FormGroup>
                                    <Input type="number" name="password" id="examplePassword" placeholder="Phone Number" />
                                </FormGroup>
                                <FormGroup>
                                    <Input type="email" name="password" id="examplePassword" placeholder="Email" />
                                </FormGroup>
                                <FormGroup>
                                    <Input type="textarea" className="message" name="text" id="exampleText" placeholder="Message" />
                                </FormGroup>
                                <Button className="submit-btn">Submit</Button>
                            </Form>
                        </div>

                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ContactUs