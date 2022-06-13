import './Speciality.scss'
import { Row, Col } from 'reactstrap'
import modernFacilities from '../../assets/images/modern-facilities.png'
import React, { useState, useEffect } from 'react'
import { LandingPageData } from "../../../services/frontend/landingpage"
import ErrorHandler from "../../../common/ErrorHandler"
const OurSpeciality = () => {
    
  const [enfeature_title, setEnFeatureTitle] = useState('')
  const [enfeature_description, setEnFeatureDes] = useState('')
//   const [enfeature_description1, setEnFeatureDes1] = useState('')
//   const [enfeature_description2, setEnFeatureDes2] = useState('')
//   const [enfeature_description3, setEnFeatureDes3] = useState('')
//   const [enfeature_description4, setEnFeatureDes4] = useState('')
  const [enfeature_image1, setEnFeatureimg1] = useState('')
  const [enfeature_image2, setEnFeatureimg2] = useState('')
  const [enfeature_image3, setEnFeatureimg3] = useState('')
  const [enfeature_image4, setEnFeatureimg4] = useState('')
  const [enfeature_sub_description1, setEnFeatureSubDes1] = useState('')
  const [enfeature_sub_description2, setEnFeatureSubDes2] = useState('')
  const [enfeature_sub_description3, setEnFeatureSubDes3] = useState('')
  const [enfeature_sub_description4, setEnFeatureSubDes4] = useState('')
  const [enfeature_sub_title1, setEnFeatureSubTitle1] = useState('')
  const [enfeature_sub_title2, setEnFeatureSubTitle2] = useState('')
  const [enfeature_sub_title3, setEnFeatureSubTitle3] = useState('')
  const [enfeature_sub_title4, setEnFeatureSubTitle4] = useState('')

  
const  getSpecialities = async () => {
    try {
        const response = await LandingPageData()
        if (response) {
            console.log(response)
            const { data: { result: { feature } } }  = response.data
            console.log(feature)
            if (feature) {
                const { feature_description,
                        feature_image1,
                        feature_image2,
                        feature_image3,
                        feature_image4,
                        feature_sub_description1,
                        feature_sub_description2,
                        feature_sub_description3,
                        feature_sub_description4,
                        feature_sub_title1,
                        feature_sub_title2,
                        feature_sub_title3,
                        feature_sub_title4,
                        feature_title} 
                        = feature
                        setEnFeatureDes(feature_description)
                        setEnFeatureimg1(feature_image1)
                        setEnFeatureimg2(feature_image2)
                        setEnFeatureimg3(feature_image3)
                        setEnFeatureimg4(feature_image4)
                        setEnFeatureSubDes1(feature_sub_description1)
                        setEnFeatureSubDes2(feature_sub_description2)
                        setEnFeatureSubDes3(feature_sub_description3)
                        setEnFeatureSubDes4(feature_sub_description4)
                        setEnFeatureTitle(feature_title)
                        setEnFeatureSubTitle1(feature_sub_title1)
                        setEnFeatureSubTitle2(feature_sub_title2)
                        setEnFeatureSubTitle3(feature_sub_title3)
                        setEnFeatureSubTitle4(feature_sub_title4)
              }
        }
    } catch (e) {
      ErrorHandler(e)
    }
}

useEffect(() => {
    getSpecialities()
  }, [])
    return (
        <div className='speciality-block text-center'>
            <h2>{enfeature_title}</h2>
            <p className='mt-4' dangerouslySetInnerHTML={{__html: enfeature_description}}></p>
            <Row>
                <Col xxl={3} xl={3} lg={3} md={6} sm={12} xs={12}>
                    <div className="content-block">
                        <img src={enfeature_image1} className="image" />
                        <div className="title-block">
                            <h3>{enfeature_sub_title1}</h3>
                            <div className="title-bottom-strip"></div>
                        </div>
                        <p>{enfeature_sub_description1} </p>
                    </div>
                </Col>
                <Col xxl={3} xl={3} lg={3} md={6} sm={12} xs={12}>
                    <div className="content-block">
                        <img src={enfeature_image2} className="image" />
                        <div className="title-block">
                            <h3>{enfeature_sub_title2}</h3>
                            <div className="title-bottom-strip"></div>
                        </div>
                        <p>{enfeature_sub_description2} </p>
                    </div>
                </Col>
                <Col xxl={3} xl={3} lg={3} md={6} sm={12} xs={12}>
                    <div className="content-block">
                        <img src={enfeature_image3} className="image" />
                        <div className="title-block">
                            <h3>{enfeature_sub_title3}</h3>
                            <div className="title-bottom-strip"></div>
                        </div>
                        <p>{enfeature_sub_description3} </p>
                    </div>
                </Col>
                <Col xxl={3} xl={3} lg={3} md={6} sm={12} xs={12}>
                    <div className="content-block">
                        <img src={enfeature_image4} className="image" />
                        <div className="title-block">
                            <h3>{enfeature_sub_title4}</h3>
                            <div className="title-bottom-strip"></div>
                        </div>
                        <p>{enfeature_sub_description4} </p>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default OurSpeciality