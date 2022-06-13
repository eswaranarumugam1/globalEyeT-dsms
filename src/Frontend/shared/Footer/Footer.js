import './Footer.scss'
import {
    Row,
    Col
} from 'reactstrap'
import facebook from '../../assets/images/Facebook_white.png'
import youtube from '../../assets/images/youtube.png'
import twitter from '../../assets/images/twitter.png'
import instagram from '../../assets/images/instagram.png'
function Footer() {
    return (
        <div className="footer-container">
            <div className="red-top-strip"></div>
            <div className='footer-body'>
                <Row>
                    <Col xl={3} lg={3} md={12} sm={12} xs={12} className="address-block">
                        <h2 className='text-white'>LOGO</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text</p>
                        <p>CONNECT WITH US:</p>
                        <span><img className='ml-0' src={facebook} /></span>
                        <span><img src={youtube} /></span>
                        <span><img src={twitter} /></span>
                        <span><img src={instagram} /></span>
                    </Col>
                    <Col xl={5} lg={5} md={12} sm={12} xs={12}>
                        <Row className="no-gutters">
                            <Col className="learn-more-block pl-3" xl={7} lg={7} md={12} sm={12} xs={12}>
                                <h6 className=''>LEARN MORE</h6>
                                <ul>
                                    <li>
                                        <p>exams </p>
                                    </li>
                                    <li>
                                        <p>Licenses</p>
                                    </li>
                                    <li>
                                        <p>Courses & Sessions </p>
                                    </li>
                                    <li>
                                        <p>Certificates</p>
                                    </li>
                                    <li>
                                        <p>Circuits </p>
                                    </li>
                                    <li>
                                        <p>Renewals</p>
                                    </li>
                                    <li>
                                        <p>Simulators</p>
                                    </li>
                                    <li>
                                        <p>Cancelation</p>
                                    </li>
                                    <li>
                                        <p>Teachers</p>
                                    </li>
                                    <li>
                                        <p>Refund</p>
                                    </li>
                                </ul>
                            </Col>
                            <Col className="subscription-block" xl={5} lg={5} md={12} sm={12} xs={12}>
                                <h6 className=''>SUBSCRIPTION PlANS</h6>
                                <ul>
                                    <li>
                                        <p>exams </p>
                                    </li>
                                    <li>
                                        <p>Licenses</p>
                                    </li>
                                    <li>
                                        <p>Courses & Sessions </p>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Col>
                    <Col xl={2} lg={2} md={12} sm={12} xs={12} className="about-block" >
                        <h6 className=''>ABOUT</h6>
                        <ul>
                            <li className='w-100'>
                                <p>About Us</p>
                            </li>
                            <li className='w-100'>
                                <p>Solutions</p>
                            </li>
                            <li className='w-100'>
                                <p>News & Events </p>
                            </li>
                        </ul>
                    </Col>
                    <Col xl={2} lg={2} md={12} sm={12} xs={12} className="support-block" >
                        <h6 className=''>SUPPORT</h6>
                        <ul>
                            <li className='w-100'>
                                <p>Contact Us</p>
                            </li>
                            <li className='w-100'>
                                <p>FAQs</p>
                            </li>
                            <li className='w-100'>
                                <p>Sitemap </p>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <div className="bottom-line"></div>
                <div className="text-center mt-4">
                    {/* <p>© 2021 Company Name. All rights reserved.</p> */}
                </div>
            </div>


        </div>
    )
}

export default Footer