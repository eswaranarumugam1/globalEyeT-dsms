import '../Profile.scss'
import { Row, Col, Container, Form, Input, FormGroup, Label, Button } from 'reactstrap'
import userProfileDefault from '../../assets/images/userprofiledefaultimage.png'
import { useState, useEffect } from 'react'
import { authConfig } from "../../../api-config/authConfig"
import Headers from "../../../api-config/Headers"
function LicenseDetailForm(props) {
    const [Phone, setPhone] = useState('')
    const [Level, SetLevel] = useState('')
    const [subLicence, SetSubLicence] = useState('')
    const [Email, SetEmail] = useState('')
    const [DOB, SetDOB] = useState('')
    const [lType, SetLtyoe] = useState('')
 
    function handleSave () {  
        if (!!Phone && !!Level && !!subLicence && !!Email && !!DOB && !!lType) {   
        const reqObj = {
            student_id: props.studentID,
            email: Email,
            phone: Phone,
            dob: DOB,
            level: Level,
            license_type: lType,
            sub_license: subLicence
        } 
        authConfig.post(`/update_license_details`, reqObj, {
            headers: Headers()
        })
        .then((response) => {
            if (response && response.data.data.success === 'sucess') {
                props.handleTab()
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
        <div className=''>
            <div className="title-block">
                <h3>License Details</h3>
                <div className="title-bottom-strip"></div>
            </div>
            <div className="text-center">
                <img src={userProfileDefault} />
            </div>
            <Form className="mt-5">
                <Row className="justify-content-center">
                    <Col xxl={5} xl={5} lg={5} md={12} sm={12} xs={12}>
                        <FormGroup>
                            <Label for="exampleEmail">Mobile Number</Label>
                            <Input type="text" name="email" id="exampleEmail" placeholder="Mobile Number" value={Phone} onChange={ (e) => { setPhone(e.target.value) }}/>
                        </FormGroup>
                    </Col>
                    <Col xxl={5} xl={5} lg={5} md={12} sm={12} xs={12}>
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="email" id="exampleEmail" placeholder="Email" value={Email} onChange={ (e) => { SetEmail(e.target.value) }}/>
                        </FormGroup>
                    </Col>
                    <Col xxl={5} xl={5} lg={5} md={12} sm={12} xs={12}>
                        <FormGroup>
                            <Label for="exampleSelect">Level</Label>
                            <Input type="select" name="select" id="exampleSelect" value={Level} onChange={ (e) => { SetLevel(e.target.value) }}>
                                <option>Level</option>
                                <option>beginner</option>
                                <option>intermediate</option>
                                <option>expert</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xxl={5} xl={5} lg={5} md={12} sm={12} xs={12}>
                        <FormGroup>
                            <Label for="exampleEmail">Date of Birth</Label>
                            <Input type="date" name="email" id="exampleEmail" placeholder="Email" value={DOB} onChange={ (e) => { SetDOB(e.target.value) }}/>
                        </FormGroup>
                    </Col>
                    <Col xxl={5} xl={5} lg={5} md={12} sm={12} xs={12}>
                        <FormGroup>
                            <Label for="exampleSelect">Sub License</Label>
                            <Input type="text" name="select" id="exampleSelect" value={subLicence} onChange={ (e) => { SetSubLicence(e.target.value) }}>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xxl={5} xl={5} lg={5} md={12} sm={12} xs={12}>
                        <FormGroup>
                            <Label for="exampleSelect">License Type</Label>
                            <Input type="select" name="select" id="exampleSelect" value={lType} onChange={ (e) => { SetLtyoe(e.target.value) }}>
                                <option>License Type</option>
                                <option>two wheeler</option>
                                <option>four wheeler</option>
                                <option>lmv</option>
                                <option>hmv</option>
                            </Input>
                        </FormGroup>
                    </Col>
                   
                </Row>
                <div>
                    <Button className="btn-block" onClick={handleSave}>Save</Button>
                </div>
            </Form>
        </div>
    )
}


export default LicenseDetailForm