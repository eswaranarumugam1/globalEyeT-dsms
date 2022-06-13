import './GroupSpeciality.scss'
import { Row, Col } from 'reactstrap'
import modernFacilities from '../../assets/images/modern-facilities.png'
function GroupOurSpeciality() {
    return (
        <div className='speciality-block text-center'>
            <h2>Our Specialities</h2>
            <p className='mt-4'>Lorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum.</p>
            <Row>
                <Col xxl={3} xl={3} lg={3} md={6} sm={12} xs={12}>
                    <div className="content-block">
                        <img src={modernFacilities} />
                        <div className="title-block">
                            <h3>MODERN FACILITIES</h3>
                            <div className="title-bottom-strip"></div>
                        </div>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Lorem </p>
                    </div>
                </Col>
                <Col xxl={3} xl={3} lg={3} md={6} sm={12} xs={12}>
                    <div className="content-block">
                        <img src={modernFacilities} />
                        <div className="title-block">
                            <h3>BEST METHODS</h3>
                            <div className="title-bottom-strip"></div>
                        </div>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Lorem </p>
                    </div>
                </Col>
                <Col xxl={3} xl={3} lg={3} md={6} sm={12} xs={12}>
                    <div className="content-block">
                        <img src={modernFacilities} />
                        <div className="title-block">
                            <h3>QUALIFIED TEACHERS</h3>
                            <div className="title-bottom-strip"></div>
                        </div>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Lorem </p>
                    </div>
                </Col>
                <Col xxl={3} xl={3} lg={3} md={6} sm={12} xs={12}>
                    <div className="content-block">
                        <img src={modernFacilities} />
                        <div className="title-block">
                            <h3>NEAR TO HOME</h3>
                            <div className="title-bottom-strip"></div>
                        </div>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Lorem </p>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default GroupOurSpeciality