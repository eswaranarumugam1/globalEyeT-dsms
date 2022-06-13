import '../Style.scss'
import './Profile.scss'
import { Row, Col, Container, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import backImagRounded from '../assets/images/backarrowroundedwhite.png'
import { useState, useEffect } from 'react'
import ProfileDetailForm from './PersonalDetail/PersonalDetailForm'
import LicenseDetailForm from './LicenseDetail/LicenseDetail'
import UploadDocumentForm from './UploadDocument/UploadDocument'
import HeaderNavbar from '../shared/Header/Header'
import Footer from '../shared/Footer/Footer'
import queryString from 'query-string'
import { authConfig } from "../../api-config/authConfig"
import Headers from "../../api-config/Headers"

function Profile() {
    const [activeTab, setActiveTab] = useState('1')
    const [data, setData] = useState(null)

    const params = queryString.parse(window.location.search)

    function callstudentData (id) {
         authConfig.get(`/get_student_id/${id}`, {
            headers: Headers()
        })
        .then((response) => {
            if (response.data.data.result) {
                setData(response.data.data.result)
            }
            return response
        })
        .catch((error) => {
            return error
        })


    }
    function handleTab () {
        setActiveTab('2')
    }
    useEffect(() => {
        if (!!params.studentId) {
            callstudentData(params.studentId)
        }
    }, [])
    return (
        <div>
            <HeaderNavbar />
            <div className="profile-container">
                <div className="bg-dark-box">
                    <Row className="text-center align-items-center h-100">
                        <Col xxl={2} xl={2} lg={2} md={2} sm={2} xs={2}>
                            <img className="backImg" src={backImagRounded} />
                        </Col>
                        <Col xxl={9} xl={9} lg={9} md={9} sm={9} xs={9}>
                            <h1 className="text-uppercase title">Complete your profile</h1>
                        </Col>
                    </Row>
                </div>
                <Row className="tab-container">
                    <Col className="tab-btn-block pr-0" xxl={2} xl={2} lg={2} md={2} sm={12} xs={12}>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={activeTab === '1' ? 'active' : ''}
                                    onClick={() => setActiveTab('1')}
                                >
                                    Personal Details
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={activeTab === '2' ? 'active' : ''}
                                    onClick={() => setActiveTab('2')}>
                                    License Details
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={activeTab === '3' ? 'active' : ''}
                                    onClick={() => setActiveTab('3')}>
                                    Upload Documents
                                </NavLink>
                            </NavItem>
                        </Nav>

                    </Col>
                    <Col xxl={10} xl={10} lg={10} md={10} sm={12} xs={12}>
                        <div className='tab-content-block'>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <ProfileDetailForm data={data} studentID={params.studentId} handleTab={handleTab}/>
                                </TabPane>
                                <TabPane tabId="2">
                                    <LicenseDetailForm handleTab={ () => setActiveTab('3')} studentID={params.studentId}/>
                                </TabPane>
                                <TabPane tabId="3">
                                    <UploadDocumentForm studentID={params.studentId}/>
                                </TabPane>
                            </TabContent>
                        </div>

                    </Col>
                </Row>
            </div>
            <Footer />
        </div>


    )
}

export default Profile