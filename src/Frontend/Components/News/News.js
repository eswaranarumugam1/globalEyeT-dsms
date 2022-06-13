import { Row, Col } from 'reactstrap'
import './News.scss'
import modernFacilities from '../../assets/images/modern-facilities.png'
import driving from '../../assets/images/driving-square.png'
import React, { useState, useEffect } from 'react'
import { LandingPageData } from "../../../services/frontend/landingpage"
import ErrorHandler from "../../../common/ErrorHandler"
const News = () => {
    const [ennews_title, setEnNewsTitle] = useState('')
    const [ennews_description, setEnNewsDes] = useState('')
    const [encontent_title, setEnContentTitle] = useState('')
    const [encontent_description, setEnContetDes] = useState('')
    const [encontent_image, setEnContentImage] = useState('')
    const [encontent_title1, setEnContentTitle1] = useState('')
    const [encontent_description1, setEnContetDes1] = useState('')
    const [encontent_image1, setEnContentImage1] = useState('')

    const  getNews = async () => {
        try {
            const response = await LandingPageData()
            if (response) {
                console.log(response)
                const { data: { result: { news } } }  = response.data
                console.log(news)
                if (news) {
                    const { news_description,
                        content_image1,
                        content_image2,
                            content_description1,
                            content_description2,
                            content_title1,
                            content_title2,
                            news_title} 
                            = news
                            setEnNewsDes(news_description)
                            setEnContentImage(content_image1)
                            setEnContentImage1(content_image2)
                            setEnContetDes(content_description1)
                            setEnContetDes1(content_description2)
                            setEnNewsTitle(news_title)
                            setEnContentTitle(content_title1)
                            setEnContentTitle1(content_title2)
                  }
            }
        } catch (e) {
          ErrorHandler(e)
        }
    }
    
    useEffect(() => {
        getNews()
      }, [])
    return (
        <div className="News-block">
            <div className='gradient-block'></div>
            <Row className="justify-content-start">
                <Col className="pl-0 whats-new-block" xxl={4} xl={4} lg={4} md={12} sm={12} xs={12} >
                    <h6 className="text-red">News</h6>
                    <h2>{ennews_title}</h2>
                    {/* <p >{ennews_description} </p> */}
                    <p dangerouslySetInnerHTML={{__html: ennews_description}}> 
                    </p>
                </Col>
                <Col className="card-block" xxl={4} xl={4} lg={4} md={12} sm={12} xs={12} >
                    <img src={encontent_image} className="image" />
                    <div className="content-block">

                        <h3 dangerouslySetInnerHTML={{__html: encontent_title}} ></h3>
                        {/* <h6>Lorem Ipsum is simply dummy text of the printing</h6>
                        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Lorem </p>
                        <p className="text-red">Read More</p> */}
                        <p dangerouslySetInnerHTML={{__html: encontent_description}}></p>
                    </div>
                </Col>
                <Col className="card-block" xxl={4} xl={4} lg={4} md={12} sm={12} xs={12} >
                    <img src={encontent_image1} className="image" />
                    <div className="content-block">

                        <h3 dangerouslySetInnerHTML={{__html: encontent_title1}} ></h3>
                        {/* <h6>Lorem Ipsum is simply dummy text of the printing</h6>
                        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Lorem </p>
                        <p className="text-red">Read More</p> */}
                        <p dangerouslySetInnerHTML={{__html: encontent_description1}}></p>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default News