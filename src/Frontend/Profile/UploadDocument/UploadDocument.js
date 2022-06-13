import '../Profile.scss'
import { Row, Col, Container, Form, Input, FormGroup, Label, Button } from 'reactstrap'
import userProfileDefault from '../../assets/images/userprofiledefaultimage.png'
import upload from '../../assets/images/upload.png'
import userIconRed from '../../assets/images/user-outline-red.png'
import MedicalForm from '../../assets/images/MedicalForm.png'
import drivingLicense from '../../assets/images/driving-license.png'
import { useState, useEffect } from 'react'
import { authConfig } from "../../../api-config/authConfig"
import Headers from "../../../api-config/Headers"

function UploadDocumentForm(props) {
    const [IMG, setImg] = useState(null)
    const [DL, setDL] = useState(null)
    const [medical, setMedical] = useState(null)
    const [id, setId] = useState(null)
 
    function handleSave () {
        if (!!IMG && !!DL && !!medical && !!id) { 
            const formdata = new FormData()  
            formdata.append('student_id', props.studentID) 
            formdata.append('medical_report', medical) 
            formdata.append('id_proof', id) 
            formdata.append('current_license', DL) 
            formdata.append('photo', IMG) 

        authConfig.post(`/upload_documents`, formdata, {
            headers: Headers()
        }) 
        .then((response) => {  
            if (response && response.data.data.success === 'sucess') {
                alert('sucessfully uploaded')
            }
            return response
        })
        .catch((error) => {
            return error
        })

        } else {
            alert('please fill all fields')
        }
    }
    return (
        <div className='upload-container'>
            <div className="title-block">
                <h3>Upload Documents</h3>
                <div className="title-bottom-strip"></div>
            </div>
            <div className='text-center'>
                <img src={userProfileDefault} />
            </div>
            <Form className="mt-5">
                <Row className="justify-content-center">
                    <Col xxl={5} xl={5} lg={6} md={12} sm={12} xs={12}>
                        <div className="custom-upload-outer">
                            <div className='icon-block'>
                                <span>
                                    <img src={userIconRed} />
                                </span>
                            </div>
                            <div className='file-block'>
                                <FormGroup>
                                    <img src={upload} />
                                    <div>
                                        <p className="mb-0">Photo</p>
                                        {!!IMG ? (<p className="mb-0">Uploaded</p>) : (<p className="mb-0">jpg/pdf/doc (max 1 MB)</p>)}
                                    </div>

                                    <Input type="file" name="file" id="exampleFile"  onChange={ (e) => { setImg(e.target.files[0]) }}/>
                                </FormGroup>
                            </div>
                        </div>
                    </Col>
                    <Col xxl={5} xl={5} lg={6} md={12} sm={12} xs={12}>
                        <div className="custom-upload-outer">
                            <div className='icon-block'>
                                <span>
                                    <img src={userIconRed} />
                                </span>
                            </div>
                            <div className='file-block'>
                                <FormGroup>
                                    <img src={upload} />
                                    <div>
                                        <p className="mb-0">Medical Report</p>
                                        {!!medical ? (<p className="mb-0">Uploaded</p>) : (<p className="mb-0">jpg/pdf/doc (max 1 MB)</p>)}
                                    </div>
                                    <Input type="file" name="file" id="exampleFile" onChange={ (e) => { setMedical(e.target.files[0]) }}/>
                                </FormGroup>
                            </div>

                        </div>
                    </Col>
                    <Col xxl={5} xl={5} lg={6} md={12} sm={12} xs={12}>
                        <div className="custom-upload-outer">
                            <div className='icon-block'>
                                <span>
                                    <img src={MedicalForm} />
                                </span>
                            </div>
                            <div className='file-block'>
                                <FormGroup>
                                    <img src={upload} />
                                    <div>
                                        <p className="mb-0"> ID or Iqama</p>
                                        {!!id ? (<p className="mb-0">Uploaded</p>) : (<p className="mb-0">jpg/pdf/doc (max 1 MB)</p>)}
                                    </div>
                                    <Input type="file" name="file" id="exampleFile" onChange={ (e) => { setId(e.target.files[0]) }}/>
                                </FormGroup>
                            </div>

                        </div>
                    </Col>
                    <Col xxl={5} xl={5} lg={6} md={12} sm={12} xs={12}>
                        <div className="custom-upload-outer">
                            <div className='icon-block'>
                                <span>
                                    <img src={drivingLicense} />
                                </span>
                            </div>
                            <div className='file-block'>
                                <FormGroup>
                                    <img src={upload} />
                                    <div>
                                        <p className="mb-0">Driving License</p>
                                        {!!DL ? (<p className="mb-0">Uploaded</p>) : (<p className="mb-0">jpg/pdf/doc (max 1 MB)</p>)}
                                    </div>
                                    <Input type="file" name="file" id="exampleFile"  onChange={ (e) => { setDL(e.target.files[0]) }}/>
                                </FormGroup>
                            </div>

                        </div>
                    </Col>
                </Row>
                <div>
                    <Button className="btn-block" onClick={handleSave}>Save</Button>
                </div>
            </Form>
        </div>
    )
}


export default UploadDocumentForm