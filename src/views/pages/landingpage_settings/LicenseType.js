import React, { useEffect, useState } from 'react'
import { 
    TabContent, 
    TabPane, 
    Nav, 
    NavItem, 
    NavLink, 
    Button, 
    Media, 
    Label, 
    Row, 
    Col, 
    Input, 
    Tooltip
} from 'reactstrap'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation-safe'


const license = {
    description: "",
    image: ""
}

const LicenseType = () => {
    const [active, setActive] = useState('1')
    const [enimage, setEnBannerImage] = useState('')
    const [arimage, setArBannerImage] = useState('')
    const [enLicenses, setEnLicenses] = useState([license])
    const [arLicenses, setArLicenses] = useState([license])

    // UI Actions
    const toggle = tab => {
        setActive(tab)
    }
    const changeEnImage = e => {
        const reader = new FileReader()
        const files = e.target.files[0]
        reader.onload = function () {
          setEnBannerImage(reader.result)
        }
        reader.readAsDataURL(files)
    }
    const changeArImage = e => {
        const reader = new FileReader()
        const files = e.target.files[0]
        reader.onload = function () {
          setArBannerImage(reader.result)
        }
        reader.readAsDataURL(files)
    }
    const addEnLicense = () => {
        const newLicences = enLicenses.concat(license)
        setEnLicenses(newLicences)
    }
    const addArLicense = () => {
        const newLicences = arLicenses.concat(license)
        setArLicenses(newLicences)
    }
    const removeEnLicense = (key) => {
        const newLicences = enLicenses.filter((license, index) => index !== key)
        setEnLicenses(newLicences)
    }

  return (
    <>
    <Nav pills>
        <NavItem>
          <NavLink
            active={active === '1'}
            onClick={() => {
              toggle('1')
            }}
          >
            English
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '2'}
            onClick={() => {
              toggle('2')
            }}
          >
            Arabic
          </NavLink>
        </NavItem>

    </Nav>
    <TabContent className='py-50' activeTab={active}>
        <TabPane tabId='1'>
            <AvForm>
                    <center><h5>Licence Content in english</h5><hr/></center>
                {enLicenses && 
                    enLicenses.length > 0 && 
                    enLicenses.map((license, key) => {
                        return (
                            <Row key={key}>
                                <Col sm='12'>
                                    <AvGroup>
                                        <Label for='banner_description'><h5><b>License Description</b></h5></Label>
                                        <CKEditor
                                            // data={endescription}
                                            editor={ ClassicEditor }
                                            onChange={ (event, editor) => { 
                                                // const data = editor.getData()
                                                // setEnBannerDescription(data)
                                            } }
                                        />
                                    </AvGroup>
                                </Col>
                                <Col>
                                    <Media>
                                        <Media className='mr-25' left>
                                            <Media 
                                                object 
                                                className='rounded mr-50' 
                                                src={enimage} 
                                                onChange={(e) => { setEnBannerImage(e.target.value) }} 
                                                alt='Choose a Image to Upload' 
                                                height='150' 
                                                width='150' 
                                            />
                                        </Media>
                                        <Media className='mt-75 ml-1 d-flex' body>
                                            <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                                                Upload
                                                <Input type='file' onChange={changeEnImage}
                                                // onFocus={(e) => { getEnBannerImage(e.target.value) }}
                                                hidden accept='image/*' 
                                                />
                                            </Button.Ripple>
                                        </Media>
                                    </Media>
                                </Col>
                                <Col>
                                    {enLicenses.length !== 1 && (
                                            <Button.Ripple 
                                            className='mr-1' 
                                            color='danger' 
                                            onClick={() => removeEnLicense(key)}  
                                        >
                                            Remove
                                        </Button.Ripple>
                                    )}
                                    <Button.Ripple 
                                        className='mr-1' 
                                        color='primary' 
                                        onClick={addEnLicense}  
                                    >
                                        Add
                                    </Button.Ripple>
                                </Col>
                            </Row>
                        )        
                    })
                }
                
                <Row>
                    <Col className='mt-2' sm='12'>
                        <Button.Ripple type='submit' className='mr-1' color='primary' >
                        Save changes
                        </Button.Ripple>
                    </Col>
                </Row>
            </AvForm>
        </TabPane>
        <TabPane tabId='2'>
            <AvForm>
                <center><h5>Licence Content in arabic</h5><hr/></center>
                {arLicenses && 
                arLicenses.length > 0 &&
                arLicenses.map((license, key) => {
                   return (
                    <Row key={key}>
                    <Col sm='12'>
                        <AvGroup>
                            <Label for='banner_description'><h5><b>License Description</b></h5></Label>
                            <CKEditor
                                // data={endescription}
                                editor={ ClassicEditor }
                                onChange={ (event, editor) => { 
                                    // const data = editor.getData()
                                    // setEnBannerDescription(data)
                                } }
                            />
                        </AvGroup>
                    </Col>
                    <Col>
                        <Media>
                            <Media className='mr-25' left>
                            <Media 
                                object 
                                className='rounded mr-50' 
                                src={arimage} 
                                onChange={(e) => { setArBannerImage(e.target.value) }} 
                                alt='Choose a Image to Upload' 
                                height='150' 
                                width='150' 
                            />
                            </Media>
                            <Media className='mt-75 ml-1 d-flex' body>
                                <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                                    Upload
                                    <Input type='file' onChange={changeArImage}
                                    // onFocus={(e) => { getEnBannerImage(e.target.value) }}
                                    hidden accept='image/*' 
                                    />
                                </Button.Ripple>
                                
                            </Media>
                        </Media>
                    </Col>
                    <Col>
                        <Button.Ripple 
                            className='mr-1' 
                            color='primary' 
                            onClick={addArLicense}  
                        >
                            Add
                        </Button.Ripple>
                    </Col>
                    </Row>
                   )
                })}

                
                <Row>
                    <Col className='mt-2' sm='12'>
                        <Button.Ripple type='submit' className='mr-1' color='primary' >
                        Save changes
                        </Button.Ripple>
                    </Col>
                </Row>
            </AvForm>
        </TabPane>
    </TabContent>
    
    </>
  )
}

export default LicenseType