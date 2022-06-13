import './GroupAboutUs.scss'
import { Row, Col } from 'reactstrap'
import aboutUsImage from '../../assets/images/aboutusimg.png'
function GroupAboutUs() {
    return (
        <div className="aboutUs-block">
            <Row className="no-gutters justify-content-center">
                <Col xxl={4} xl={4} lg={4} md={12} sm={12} xs={12}>
                    <div className="leftImg-block">
                        <img className='w-100' src={aboutUsImage} />
                    </div>
                </Col>
                <Col xxl={8} xl={8} lg={8} md={12} sm={12} xs={12} className="right-block">
                    <h4>About Us</h4>
                    <h1 className='mt-3'>We give the best  training to suit your requirements</h1>
                    <p className="mt-4">Lorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesettingLorem</p>
                    <p className='mt-4'>Lorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum.</p>
                    <h6>Read More</h6>
                </Col>
            </Row>
        </div>
    )
}

export default GroupAboutUs