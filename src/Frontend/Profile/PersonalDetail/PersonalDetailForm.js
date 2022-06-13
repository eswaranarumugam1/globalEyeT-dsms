import '../Profile.scss'
import { Row, Col, Container, Form, Input, FormGroup, Label, Button } from 'reactstrap'
import userProfileDefault from '../../assets/images/userprofiledefaultimage.png'
import { useState, useEffect } from 'react'
import { authConfig } from "../../../api-config/authConfig"
import Headers from "../../../api-config/Headers"

function ProfileDetailForm(props) {
    const [fname, setfname] = useState('')
    const [fnameAR, setfnameAR] = useState('')
    const [sname, setSname] = useState('')
    const [snameAR, setSnameAR] = useState('')
    const [familyName, setFamilyName] = useState('')
    const [familynameAR, setFamilyNameAr] = useState('')
    const [sex, setSex] = useState('')
    const [Nationality, setnationality] = useState('')
    const [idType, setIdtype] = useState('')
    const [idno, setIdNo] = useState('')
    const [Province, setProvince] = useState('')
    const [adress, setAddress] = useState('')
 
    function handleSave () {   
        if (!!fname && !!fnameAR && !!sname && !!snameAR && !!familyName && !!familynameAR && !!sex && !!Nationality && !!idType && !!idno && !!Province && !!adress) {   
        const reqObj = {
            student_id: props.studentID,
            province: Province,
            address: adress,
            id_number: idno,
            id_type: idType,
            nationality: Nationality,
            gender: sex,
            family_name_arabic: familynameAR,
            family_name: familyName,
            second_name_arabic: snameAR,
            second_name: sname,
            arabic_name: fnameAR,
            name: fname
        } 
        authConfig.post(`/update_student_profile`, reqObj, {
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

    useEffect(() => {
        if (!!props.data && props.data !== null) {
            setfname(props.data.student_info.name)
            setfnameAR(props.data.student_info.arabic_name)
            setSname(props.data.student_meta.second_name)
            setSnameAR(props.data.student_meta.second_name_arabic)
            setFamilyName(props.data.student_meta.family_name)
            setFamilyNameAr(props.data.student_meta.family_name_arabic)
            setSex(props.data.student_info.gender)
            setnationality(props.data.student_info.nationality)
            setIdtype(props.data.student_meta.id_type)
            setIdNo(props.data.student_meta.id_number)
            setProvince(props.data.student_meta.province)
            setAddress(props.data.student_meta.address)
        }
    }, [props])
    return (
        <div className=''>
            <div className="title-block">
                <h3>Personal Details</h3>
                <div className="title-bottom-strip"></div>
            </div>
            <div className="text-center">
                <img src={userProfileDefault} />
            </div>
            <Form className="mt-5">
                <Row className="justify-content-center">
                    <Col xxl={5} xl={5} lg={5} md={12} sm={12} xs={12}>
                        <FormGroup>
                            <Label for="exampleEmail">First Name (English)</Label>
                            <Input type="text" name="email" id="exampleEmail" placeholder="First Name" value={fname} onChange={ (e) => { setfname(e.target.value) }}/>
                        </FormGroup>
                    </Col>
                    <Col xxl={5} xl={5} lg={5} md={12} sm={12} xs={12}>
                        <FormGroup>
                            <Label for="exampleEmail">First Name (Arabic)</Label>
                            <Input type="text" name="email" id="exampleEmail" placeholder="First Name" value={fnameAR} onChange={ (e) => { setfnameAR(e.target.value) }}/>
                        </FormGroup>
                    </Col>
                    <Col xxl={5} xl={5} lg={5} md={12} sm={12} xs={12}>
                        <FormGroup>
                            <Label for="exampleNumber">Second Name (English)</Label>
                            <Input type="text" name="number" id="exampleNumber" placeholder="Second Name" value={sname} onChange={ (e) => { setSname(e.target.value) }}/>
                        </FormGroup>
                    </Col>
                    <Col xxl={5} xl={5} lg={5} md={12} sm={12} xs={12}>
                        <FormGroup>
                            <Label for="exampleNumber">Family Name (English)</Label>
                            <Input type="text" name="number" id="exampleNumber" placeholder="Second Name" value={familyName} onChange={ (e) => { setFamilyName(e.target.value) }}/>
                        </FormGroup>
                    </Col>
                    <Col xxl={5} xl={5} lg={5} md={12} sm={12} xs={12}>
                        <FormGroup>
                            <Label for="exampleNumber">Family Name (Arabic)</Label>
                            <Input type="text" name="number" id="exampleNumber" placeholder="Family Name" value={familynameAR} onChange={ (e) => { setFamilyNameAr(e.target.value) }}/>
                        </FormGroup>
                    </Col>

                    <Col xxl={5} xl={5} lg={5} md={12} sm={12} xs={12}>
                        <FormGroup>
                            <Label for="exampleNumber">Second Name (Arabic)</Label>
                            <Input type="text" name="number" id="exampleNumber" placeholder="Family Name" value={snameAR} onChange={ (e) => { setSnameAR(e.target.value) }}/>
                        </FormGroup>
                    </Col>
                    <Col xxl={5} xl={5} lg={5} md={12} sm={12} xs={12}>
                        <FormGroup>
                            <Label for="exampleSelect">Sex</Label>
                            <Input type="select" name="select" id="exampleSelect" value={sex} onChange={ (e) => { setSex(e.target.value) }}>
                                <option selected disabled>Sex</option>
                                <option>male</option>
                                <option>female</option>
                                <option>do not want to say</option>
                            </Input>
                        </FormGroup>

                    </Col>
                    <Col xxl={5} xl={5} lg={5} md={12} sm={12} xs={12}>
                        <FormGroup>
                            <Label for="exampleSelect">Nationality</Label>
                            <Input type="select" name="select" id="exampleSelect" value={Nationality} onChange={ (e) => { setnationality(e.target.value) }}>
                                <option>Country </option>
                                <option>india</option>
                                <option>arabia</option>
                                <option>united stated</option>
                                <option>dubai</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xxl={5} xl={5} lg={5} md={12} sm={12} xs={12}>
                        <FormGroup>
                            <Label for="exampleSelect">ID Type</Label>
                            <Input type="select" name="select" id="exampleSelect" value={idType} onChange={ (e) => { setIdtype(e.target.value) }}>
                                <option>ID Type</option>
                                <option>aadhar</option>
                                <option>pan</option>
                                <option>licence</option>
                                <option>passport</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xxl={5} xl={5} lg={5} md={12} sm={12} xs={12}>
                        <FormGroup>
                            <Label for="exampleSelect">ID No</Label>
                            <Input type="text" name="idno" id="exampleSelect" placeholder="ID No" value={idno} onChange={ (e) => { setIdNo(e.target.value) }}>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xxl={5} xl={5} lg={5} md={12} sm={12} xs={12}>
                        <FormGroup>
                            <Label for="exampleSelect">Province</Label>
                            <Input type="text" name="select" id="exampleSelect" placeholder='Province' value={Province} onChange={ (e) => { setProvince(e.target.value) }}>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xxl={5} xl={5} lg={5} md={12} sm={12} xs={12}>
                        <FormGroup>
                            <Label for="exampleSelect">Address</Label>
                            <Input type="text" name="select" id="exampleSelect" placeholder='Address' value={adress} onChange={ (e) => { setAddress(e.target.value) }}>
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


export default ProfileDetailForm