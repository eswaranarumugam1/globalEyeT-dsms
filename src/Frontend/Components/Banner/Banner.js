import './Banner.scss'
import React, { useState, useEffect } from 'react'
import background from '../../assets/images/banner-one.png'
import { Button } from 'reactstrap'
import { LandingPageData } from "../../../services/frontend/landingpage"
import ErrorHandler from "../../../common/ErrorHandler"

import { Link } from 'react-router-dom'
const Banner = () => {
const [entitle, setEnBannerTitle] = useState('')
const [endescription, setEnBannerDescription] = useState('')
const [enimage, setEnBannerImage] = useState('')
const [artitle, setArBannerTitle] = useState('')
const [ardescription, setArBannerDescription] = useState('')

const  getBannerenContent = async () => {
    try {
        const response = await LandingPageData()
        if (response) {
            console.log(response)
            const { data: { result: { banner } } }  = response.data
            console.log(banner)
          if (banner) {
            const { banner_title, banner_description, banner_image } = banner
            setEnBannerTitle(banner_title)
            setEnBannerDescription(banner_description)
            setEnBannerImage(banner_image)
          }
        }
    } catch (e) {
      ErrorHandler(e)
    }
}

useEffect(() => {
    getBannerenContent()
  }, [])
    return (
        <div className="banner-block" style={{backgroundImage:`url(${enimage})`}}>
            <div className="banner-content">
                <div>
                    <h1 className='mb-0'>
                      {entitle}
                         </h1>
                    {/* <h1>dolor sit dummy</h1> */}
                    
                    <p dangerouslySetInnerHTML={{__html: endescription}}> 
                    </p>
                    <Link
                to='/school-list'><Button className="find-btn">Find School</Button></Link>
                </div>
            </div>
        </div>
    )
}

export default Banner