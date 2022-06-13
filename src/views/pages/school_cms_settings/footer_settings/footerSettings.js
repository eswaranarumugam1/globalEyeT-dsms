import { AboutUsEnContent, AboutUsArContent, AddAboutUs } from "../../../../services/home/SchoolLandingPage"
import ErrorHandler from "../../../../common/ErrorHandler"
import './footer-setting.scss'
import Avatar from "@components/avatar"
import { MoreVertical, Edit, Trash, ChevronLeft, ChevronRight, Coffee } from 'react-feather'
import { useEffect, useState, Fragment } from "react"
import { FaTwitterSquare, FaInstagramSquare, FaYoutubeSquare, FaFacebookSquare} from 'react-icons/fa'
import { RiDeleteBinFill } from 'react-icons/ri'

import { Table, Form, Input, FormGroup, Label, FormFeedback, Button, Row, Col,  Media, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle  } from 'reactstrap'

import { authConfig } from "../../../../api-config/authConfig"
import Headers from "../../../../api-config/Headers"
import { toast, Slide } from "react-toastify"


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
function footerSettings() {
  const [items, setItems] = useState([])
  const [maturedHeader, setHeader] = useState([])

  const [description, setDescription] = useState('')
  const [logo, setLogo] = useState(null)
  const [descriptionValid, setDescriptionValid] = useState(false)
  const [logoValid, setLogoValid] = useState(false)

  const [fbLink, setFblink] = useState('')
  const [fbLinkValid, setFbLinkValid] = useState(false)
  const [instaLink, setInstalink] = useState('')
  const [instaLinkValid, setInstaLinkValid] = useState(false)
  const [ytLink, setYtlink] = useState('')
  const [ytLinkValid, setYtLinkValid] = useState(false)
  const [ttLink, setTtlink] = useState('')
  const [ttLinkValid, setTtLinkValid] = useState(false)

  const [status, setStatus] = useState('add')
  const [dynamicClass, setClass] = useState("add-form d-none")
  const [primaryId, setId] = useState(null)
  const [loader, setLoader] = useState(true)  

  const schoolId = parseInt(localStorage.getItem("schoolIdToken"))

  function handleAdd () {
    const temp = [...items]
    temp.push({parent: '', title: '', link: '', parentValid: false, titleValid: false, linkValid: false})
    setItems(temp)
  }
  function handleDelete (index) {
    const temp = [...items]
    temp.splice(index, 1)
    setItems(temp)
  }

  function handleChangeLogo (e) {
    // debugger
    setLogo(e.target.files[0])
    if (!!e.target.value) {
      setLogoValid(false)
    }
  }
  function handleChangeDesc (e) {
    setDescription(e.target.value)
    if (!!e.target.value) {
      setDescriptionValid(false)
    }
  }
  function handleChangeFb (e) {
    setFblink(e.target.value)
    if (!!e.target.value) {
      setFbLinkValid(false)
    }
  }
  function handleChangeYt (e) {
    setYtlink(e.target.value)
    if (!!e.target.value) {
      setYtLinkValid(false)
    }
  }
  function handleChangeInsta (e) {
    setInstalink(e.target.value)
    if (!!e.target.value) {
      setInstaLinkValid(false)
    }
  }
  function handleChangeTt (e) {
    setTtlink(e.target.value)
    if (!!e.target.value) {
      setTtLinkValid(false)
    }
  }

  function handleSubmit () {
    // debugger
    let submitFlag = true
    const temp = [...items]
    temp.map((it) => {
      if (!it.parent) {
        submitFlag = 0
        it.parentValid = true
      }
      if (!it.title) {
        submitFlag = 0
        it.titleValid = true
      }
      if (!it.link) {
        submitFlag = 0
        it.linkValid = true
      }
    })
    setItems(temp)
    if (!!submitFlag && !!description && !!logo) {
      const reqObj = []
      let idTemp = 1000
      items.map((item) => {
        let idFlag = 0
        let idx = null
        for (let i = 0; i < reqObj.length; i++) {
          if (item.parent === reqObj[i].Parent) {
            idFlag = 1
            idx = i
            break
          }
        }
        if (!idFlag) {
          const tempObj = {
            id: idTemp,
            Parent: item.parent,
            subItems: []
          } 
          idTemp++
          tempObj.subItems.push({
            id: idTemp,
            label: item.title,
            link: item.link,
            target: 'self'
          })
          idTemp++
          reqObj.push(tempObj)
        } else {
          reqObj[idx].subItems.push({
            id: idTemp,
            label: item.title,
            link: item.link,
            target: 'self'
          })
          idTemp++
        }
      })
      let logoFlag = 0
      let menuFlag = 0
      reqObj.position = 'footer'  
      authConfig.post('/menu', {menu_array: JSON.stringify({header: [...maturedHeader], footer: reqObj})}, {
        headers: Headers()
      })
      .then((response) => {
          if (response && response.data) {
            const { data: { message } } = response.data
                     toast.success(<SuccessContent msg={message} />, {
                     transition: Slide,
                     hideProgressBar: true,
                     autoClose: 2000
                   })
                   menuFlag = 1
                  }
          return response
      })
      .catch((error) => {
          return error
      })

      const formData = new FormData()
      formData.append('logo', logo)
      formData.append('insta_link', !!instaLink ? instaLink : '')
      formData.append('twitter_link', !!ttLink ? ttLink : '')
      formData.append('youtube_link', !!ytLink ? ytLink : '')
      formData.append('fb_link', !!fbLink ? fbLink : '')
      formData.append('about_short_text', description)

      authConfig.post(`/cms_settings_update/school`, formData, {
        headers: Headers()
      })
      .then((response) => {
          if (response && response.data) {
            const { data: { message } } = response.data
                     toast.success(<SuccessContent msg={message} />, {
                     transition: Slide,
                     hideProgressBar: true,
                     autoClose: 2000
                   })
                   logoFlag = 1
                  }
          return response
      })
      .catch((error) => {
          return error
      })
      // debugger
      setTimeout(() => {
        if (!!logoFlag && !!menuFlag) {
          window.location.href = window.location.href  = `/schooldetails/${schoolId}`
        }
      }, 800)
    } else {
      if (!description) {
        setDescriptionValid(true)
      }
      if (!logo) {
        setLogoValid(true)
      }
      // if (!ytLink) {

      // }
      // if (!ttLink) {

      // }
      // if (!instaLink) {

      // }
      // if (!fbLink) {

      // }
    }
  }
  function  setData () {
    authConfig.get('/menu?position=footer', {
      headers: Headers()
    })
    .then((response) => {
        if (response && response.data) {
          if (response) {
            if (response.data) {
              const { result } = response.data.data
              if (!!result) {
                const temp = [...[]]
                const tempHeader = [...result.menu_array.header]
                result.menu_array.footer.map((item) => {
                  item.subItems.map((it) => {
                    temp.push({
                      parent: item.Parent,
                      title: it.label, 
                      link: it.link, 
                      parentValid: false, 
                      titleValid: false, 
                      linkValid: false
                    })
                  })
                })
                setItems(temp)
                setHeader(tempHeader)
              }
            }
        }
      }
        return response
    })
    .catch((error) => {
        return error
    })

    authConfig.get(`cms_settings/${schoolId}/school`, {
      headers: Headers()
    })
    .then((response) => {
        if (response && response.data) {
          if (response) {
            if (response.data) {
              const { result } = response.data.data
              if (!!result) {
                setLogo(result.logo)
                setInstalink(result.insta_link)
                setYtlink(result.youtube_link)
                setTtlink(result.twitter_link)
                setFblink(result.fb_link)
                setDescription(result.about_short_text)
              }
            }
        }
      }
        return response
    })
    .catch((error) => {
        return error
    })
  }

  useEffect(() => {
    setData()
  }, [])

  return (
    <div className="footer-setting">
    <div>
    <h1 className='main-head'>Footer setting</h1>
    </div>  
      <Row>
        <Col md='6' className='footer-col-6'>
          <div className='inner-footer-col-6'>
        <div className='sub-head'>About Footer Widget</div>
                <FormGroup>
                    <Label style={{cursor: 'pointer', display: 'block'}} for="exampleFile" className="lebel my-1">Footer Logo</Label>
                    <Label style={{cursor: 'pointer'}} for="exampleFile" className="mr-3 logo-button">Upload Footer Logo</Label>
                    <span>{!!logo && typeof logo === 'object' ? logo.name.slice(0, 30) : !!logo && typeof logo === 'string' ? logo.slice(0, 30) : ''}</span>
                    <Input style={{display: 'none', cursor: 'pointer'}} invalid={logoValid} type="file" name="file" id="exampleFile" placeholder="Upload Footer Logo" onChange={handleChangeLogo}/>
                    <FormFeedback>Please Upload Valid Logo</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="nameAr" className="lebel">Description</Label>
                    <Input invalid={descriptionValid} type="text" name="nameAr" id="nameAr" placeholder="Type description" value={description} onChange={handleChangeDesc}/>
                    <FormFeedback>Please enter valid Description</FormFeedback>
                </FormGroup>
                </div>
        </Col>
        <Col md='6' className='footer-col-6'>
        <div className='inner-footer-col-6'>
        <div className='sub-head'>Social Link Widget</div>
        <FormGroup className='d-flex'>
                    <FaFacebookSquare size={40} />
                    <Input invalid={fbLinkValid} type="text" name="name" id="name" placeholder="Paste facebook Link here" value={fbLink} onChange={handleChangeFb}/>
                    <FormFeedback>Please enter valid Link</FormFeedback>
                </FormGroup>
                <FormGroup className='d-flex'>
                <FaTwitterSquare size={40} />
                    <Input invalid={ttLinkValid} type="text" name="nameAr" id="nameAr" placeholder="Paste Twitter Link here" value={ttLink} onChange={handleChangeTt}/>
                    <FormFeedback>Please enter valid Link</FormFeedback>
                </FormGroup>
                <FormGroup className='d-flex'>
                <FaInstagramSquare size={40} />
                    <Input invalid={instaLinkValid} type="text" name="name" id="name" placeholder="Paste Insta Link here" value={instaLink} onChange={handleChangeInsta}/>
                    <FormFeedback>Please enter valid Link</FormFeedback>
                </FormGroup>
                <FormGroup className='d-flex'>
                <FaYoutubeSquare size={40} />
                    <Input invalid={ytLinkValid} type="text" name="nameAr" id="nameAr" placeholder="Paste Youtube Link here" value={ytLink} onChange={handleChangeYt}/>
                    <FormFeedback>Please enter valid Link</FormFeedback>
                </FormGroup>
                </div>
        </Col>
      </Row> 
      {!!items && items.length !== 0 ? items.map((item, index) => {
        return (
          <div className='mx-2'>
          <Row className='inner-footer-col-6 pseudo-adjust'>
            <Col md='12'>
            <div className='head2'>Widget {index + 1}</div>
            </Col>
            <Col md='12'>
            <Row >
            <Col md='3'>
            <FormGroup>
                    <Label for="parent" className="lebel">Widget-Parent</Label>
                    <Input invalid={item.parentValid} type="text" name="parent" id="parent" placeholder="Upload Footer Logo" value={item.parent} 
                    onChange={ (e) => {
                      const temp = [...items]
                      temp[index].parent = e.target.value
                      if (!!e.target.value) {
                        temp[index].parentValid = false
                      }
                      setItems(temp)
                    }}
                    />
                    <FormFeedback>Please Enter Parent Name</FormFeedback>
                </FormGroup>
                </Col>
                <Col md='3'>
                <FormGroup>
                    <Label for="child" className="lebel lebel2">Widget-Title</Label>
                    <Input invalid={item.titleValid} type="text" name="child" id="child" placeholder="Type description" value={item.title}
                    onChange={ (e) => {
                      const temp = [...items]
                      temp[index].title = e.target.value
                      if (!!e.target.value) {
                        temp[index].titleValid = false
                      }
                      setItems(temp)
                    }}
                    />
                    <FormFeedback>Please enter Title of the footer</FormFeedback>
                </FormGroup>
                </Col>
                <Col md='3'>
                <FormGroup>
                    <Label for="link" className="lebel">Link</Label>
                    <Input invalid={item.linkValid} type="text" name="link" id="link" placeholder="Type description" value={item.link} 
                    onChange={ (e) => {
                      const temp = [...items]
                      temp[index].link = e.target.value
                      if (!!e.target.value) {
                        temp[index].linkValid = false
                      }
                      setItems(temp)
                    }}
                    />
                    <FormFeedback>Please enter Link for the footer</FormFeedback>
                </FormGroup>
                </Col>
                <Col md='3'>
                <Label for="linkqwe" className="lebel">&nbsp; &nbsp; </Label>
                <div><Button color='danger' className='margin-6' onClick={handleDelete.bind(index)}><RiDeleteBinFill size='16' className='cursor-pointer'/></Button></div>
                </Col>
              </Row>
            </Col>
          </Row>
          </div>
        )
      }) : <></> }
      <div className='d-flex justify-content-between'>
      <Button color='primary' className='m-2' onClick={handleAdd}>Add New Widget</Button>
      <Button color='primary' className='m-2' onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  ) 
}

export default footerSettings