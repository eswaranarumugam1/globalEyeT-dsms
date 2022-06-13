import React, { useState, useEffect, Fragment } from 'react'
import ErrorHandler from "../../../../common/ErrorHandler"
import { BannerEnContent, BannerArContent, AddBanner, RegLink, Update_link_url } from "../../../../services/home/AdminLandingPage"
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { toast, Slide } from "react-toastify"
import Avatar from "@components/avatar"
import {  Coffee } from "react-feather"
import { TabContent, 
         TabPane, 
         Nav, 
         NavItem, 
         NavLink, 
         Button, 
         Media, 
         Label, 
         Row, 
         Col, 
         Input } from 'reactstrap'
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation-safe'

const SuccessContent = ({ msg }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
        <h6 className="toast-title font-weight-bold">Success</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        {msg}
      </span>
    </div>
  </Fragment>
)

const RegistrationSettings = () => {
  const [active, setActive] = useState('1')
 
  const [link_url, setLinkurl] = useState('')


  const resigrationLink = async () => { }

  useEffect(() => {
    resigrationLink()
  }, [])

  // const onSubmit = data => trigger()
  const fileuploaden = async () => { }
  
  return (
    <React.Fragment>
     
      <TabContent className='py-50' activeTab={active}>
        <TabPane tabId='1'>
          <p>
           <AvForm>
             <center><h5>Registration Settings</h5><hr/></center>
             <Row>
               <Col sm='12'>              
                <AvGroup>
                 <Label for='banner_title'><h5><b>Absher Link</b></h5></Label>                    
                <AvInput name='name' id='name' onChange={(e) => {
                        setLinkurl(e.target.value)
                      }}  required value={link_url} />    
                  <AvFeedback>Please enter the Link !</AvFeedback>
                </AvGroup>
              </Col>
       
              <Col className='mt-2' sm='12'>
                <Button.Ripple type='submit' className='mr-1' color='primary' onClick={fileuploaden}>
                  Save
                </Button.Ripple>
              </Col>
            </Row>
          </AvForm>
          </p>
        </TabPane>
      </TabContent>
    </React.Fragment>
  )
}
export default RegistrationSettings
