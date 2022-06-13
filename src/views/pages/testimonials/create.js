import Swal from 'sweetalert2'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'
import { addTestimonial } from "../../../services/home/admin"
import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardBody, 
    Label, 
    Button, 
    Media, 
    Input
} from 'reactstrap'
import {
    AvForm,
    AvGroup,
    AvInput,
    AvFeedback
} from 'availity-reactstrap-validation-safe'
import { useHistory } from 'react-router-dom'
import { SuccessContent, ErrorContent } from "@utils"
import '@styles/react/libs/flatpickr/flatpickr.scss'

const MySwal = withReactContent(Swal)

const create = () => {
    const { register, errors, handleSubmit, control, setValue, trigger } = useForm()
    const history = useHistory()
    const [avatar, setAvatar] = useState([])
    const [title, setTitle] = useState([])
    const [description, setDescription] = useState([])
    const [designation, setDesignation] = useState([])
    const [image, setImage] = useState([])
    const school_id = parseInt(localStorage.getItem("schoolIdToken"))
  
    const onChange = e => {
      const reader = new FileReader(),
        files = e.target.files[0]
      reader.onload = function () {
        setAvatar(reader.result)
      }
      reader.onload = function () {
        setAvatar(reader.result)
      }
      reader.readAsDataURL(files) 
      setImage(files)
    }
  
    const onSubmit = data => trigger()
    
    const handleSuccess = async () => {     
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('designation', designation)
        formData.append('image', image)
        formData.append('school_id', school_id)
        try {
            const response = await addTestimonial(formData)
            console.log(response.response)
            
            if (response.response) {
                const data = response.response.data
                ErrorContent({ msg: data.errors.msg })
            } else {
                const data = response.data.data
                if (data.errors) {
                    ErrorContent({ msg: data.message })
                } else {
                    SuccessContent({ msg: data.message })
                    if (school_id === 0) { 
                        history.push('/pages/testimonials/list?admin=superAdmin')
                    } else {
                        history.push('/pages/testimonials/list?admin=schoolAdmin')
                    }
                }
            }
        } catch (error) {
            console.log('error', error)
            
        }
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle tag='h4'>Create New Testimonials</CardTitle>
                </CardHeader>
                <div style={{ paddingRight: 20, paddingLeft: 20 }}>
                    <CardBody>
                        <AvForm>
                            <AvGroup>
                                <Label for='name'>Name</Label>
                                <AvInput name='name' id='name' required placeholder="Enter Name"  onChange={(e) => {
                                setTitle(e.target.value)
                            }} />
                                <AvFeedback>Please enter a valid Name!</AvFeedback>
                            </AvGroup>
                            <AvGroup>
                                <Label for='designation'>Designation</Label>
                                <AvInput name='designation' id='designation' required placeholder="Enter Designation"  onChange={(e) => {
                                setDesignation(e.target.value)
                            }} />
                                <AvFeedback>Please enter a Designation!</AvFeedback>
                            </AvGroup>
                            <AvGroup>
                                <Label for='comment'>Comment</Label>
                                <AvInput type='textarea' name='comment' id='comment'  onChange={(e) => {
                                setDescription(e.target.value)
                            }} placeholder="Enter Description" required />
                                <AvFeedback>Please enter a valid Description!</AvFeedback>
                            </AvGroup>
                            <AvGroup>
                                <Media>
                                    <Media className='mr-25' left>
                                        <Media object className='rounded mr-50' src={avatar} alt='Generic placeholder image' height='200' width='200' />
                                    </Media>
                                    <Media className='mt-75 ml-1' body>
                                        <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
                                            Upload
                                            <Input type='file'  onChange={onChange} hidden accept='image/*' />
                                        </Button.Ripple>
                                        <Button.Ripple color='secondary' size='sm' outline>
                                            Reset
                                        </Button.Ripple>
                                        <p>Allowed JPG, GIF or PNG. Max size of 800kB</p>
                                    </Media>
                                </Media>
                            </AvGroup>
                            <Button color='primary' type='submit' onClick={handleSuccess}>
                                Add Testimonial
                            </Button>
                        </AvForm>
                    </CardBody>
                </div>
            </Card>
        </div>
    )
}

export default create
