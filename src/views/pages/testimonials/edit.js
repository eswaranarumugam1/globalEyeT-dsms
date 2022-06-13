import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'
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
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation-safe'
import { useForm } from 'react-hook-form'
import { useParams, useHistory } from 'react-router-dom'
import { SuccessContent, ErrorContent } from "@utils"
import { getTestimonial, UpdateTestimonial } from "../../../services/home/admin"
import '@styles/react/libs/flatpickr/flatpickr.scss'

const edit = () => {
    const { register, errors, handleSubmit, control, setValue, trigger } = useForm()
    const history = useHistory()
    const [avatar, setAvatar] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [designation, setDesignation] = useState('')
    const [image, setImage] = useState('')
    const [id, setId] = useState('')
    const school_id = parseInt(localStorage.getItem("schoolIdToken"))
    const paramsFromRoute = useParams()

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
     console.log(files)
   
    }
  
    const onSubmit = data => trigger()
    
    const actionUpdateTestimonial = async () => {     
      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('designation', designation)
      formData.append('image', image)
      formData.append('id', id)
      formData.append('_method', 'PATCH')
      try {
          const response = await UpdateTestimonial(id, formData)
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
      } catch (e) {
          console.log(e)
      }
    }

      const getTestimonial_by_id = async (id) => {
        //   console.log(paramsFromRoute.id)
        try {
          const response = await getTestimonial(id)
          if (response) {
            if (response.data) {
              const { data: { result } } = response.data
              if (result) {
                  console.log(result)
                const { title, description, designation, image, id} = result[0]
                setTitle(title)
                setDescription(description)
                setDesignation(designation) 
                setAvatar(image)              
                setId(id)              
              }
            }
          }
        } catch (e) {
        //   ErrorHandler(e)
        console.log(e)
        }
      }
      useEffect(() => {
        getTestimonial_by_id(paramsFromRoute.id)
          }, [paramsFromRoute.id])

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle tag='h4'>Edit Testimonials</CardTitle>
                </CardHeader>
                <div style={{ paddingRight: 20, paddingLeft: 20 }}>
                    <CardBody>
                        <AvForm>
                            <AvGroup>
                                <Label for='name'>Name</Label>
                                <AvInput name='name' id='name' value={title}  onChange={(e) => {
                                setTitle(e.target.value)
                            }} required placeholder="Enter Name" />
                                <AvFeedback>Please enter a valid Name!</AvFeedback>
                            </AvGroup>
                            <AvGroup>
                                <Label for='designation'>Designation</Label>
                                <AvInput name='designation' id='designation' value={designation}
                                 onChange={(e) => {
                                  setDesignation(e.target.value)
                              }}  required placeholder="Enter Name" />
                                <AvFeedback>Please enter Designation!</AvFeedback>
                            </AvGroup>
                            <AvGroup>
                                <Label for='comment'>Description</Label>
                                <AvInput type='textarea' name='comment' id='comment' value={description} 
                                 onChange={(e) => {
                                  setDescription(e.target.value)
                              }}
                                placeholder="Enter Comment" required />
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
                                            <Input type='file' onChange={onChange} hidden accept='image/*' />
                                        </Button.Ripple>
                                        <Button.Ripple color='secondary' size='sm' outline>
                                            Reset
                                        </Button.Ripple>
                                        <p>Allowed JPG, GIF or PNG. Max size of 800kB</p>
                                    </Media>
                                </Media>
                            </AvGroup>
                            <Button color='primary' type='submit' onClick={actionUpdateTestimonial}>
                                Update Testimonials
                            </Button> &nbsp;
                            <Button  color='primary' type='button'  onClick={() => {
                                          history.push('/pages/testimonials/list')
                                        }}>Back</Button>
                        </AvForm>
                    </CardBody>
                </div>
            </Card>
        </div>
    )
}

export default edit
