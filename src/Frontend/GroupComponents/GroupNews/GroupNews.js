import { Row, Col } from 'reactstrap'
import './GroupNews.scss'
import driving from '../../assets/images/driving-square.png'
function GroupNews() {
    return (
        <div className="News-block">
            <div className='gradient-block'></div>
            <Row className="justify-content-start">
                <Col className="pl-0 whats-new-block" xxl={4} xl={4} lg={4} md={12} sm={12} xs={12} >
                    <h6 className="text-red">News</h6>
                    <h2>What’s the new in the world of drivers?</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Lorem </p>
                </Col>
                <Col className="card-block" xxl={4} xl={4} lg={4} md={12} sm={12} xs={12} >
                    <img src={driving} />
                    <div className="content-block">

                        <h3 className="text-red">23 Sep</h3>
                        <h6>Lorem Ipsum is simply dummy text of the printing</h6>
                        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Lorem </p>
                        <p className="text-red">Read More</p>
                    </div>
                </Col>
                <Col className="card-block" xxl={4} xl={4} lg={4} md={12} sm={12} xs={12} >
                    <img src={driving} />

                    <div className="content-block">
                        <h3 className="text-red">23 Sep</h3>
                        <h6>Lorem Ipsum is simply dummy text of the printing</h6>
                        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the Lorem </p>
                        <p className="text-red">Read More</p>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default GroupNews