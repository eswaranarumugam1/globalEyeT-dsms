import React, { useState, useContext, Fragment } from 'react'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast, Slide } from 'react-toastify'
import { handleLogin } from '@store/actions/auth'
import { AbilityContext } from '@src/utility/context/Can'
import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { getHomeRouteForLoggedInUser, isObjEmpty } from '@utils'
import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee } from 'react-feather'
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
    Button,
    Card
} from 'reactstrap'

import {RegistrationStyles}  from '../../../../src/styles/RegistrationStyles'
import { useTheme } from 'styled-components'
import SideImage from '../../../public/assets/images/image1.jpg'
import './App.css'
import aboutImg from '../../../assets/images/pages/card-image-4.jpg'

const DrivingLicenseCard = props => {

    const [readMore, setReadMore] = React.useState(false)
  const extraContent = <div>
      <p className="extra-content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, consectetur neque ab 
        porro quasi culpa nulla rerum quis minus voluptatibus sed hic ad quo sint, libero 
        commodi officia aliquam! Maxime.
      </p>
  </div>
  const linkName = readMore ? 'read less <<' : 'read more >>'

       return (
        <Row style={{padding:'15px'}}>
                    <div className='aboutUs'>
        <div className='container-fluid'>
         <img src={aboutImg} alt='About Us' />
         <div className='aboutUsText'>
           <h3>How to Get a Driving License</h3>
           <p>Lorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesettingLorem</p>
           <p>Lorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum.</p>
           <a href="#">Read More</a>
         </div>
        </div>
      </div>                    
      </Row>
    )
}

export default DrivingLicenseCard
