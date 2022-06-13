import './GroupBanner.scss'
import background from '../../assets/images/banner-two.png'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
function GroupBanner() {
    return (
        <div className="banner-block" style={{backgroundImage: `url(${background})`}}>
            <div className="banner-content">
                <div>
                    <h1 className='mb-0'>Aligre Group </h1><br/><br/>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesettingLorem Ipsum is simply dummy text of the printing and typesettinglorem.</p>
                    <Link
                to='/school-list'><Button className="find-btn">Find School</Button></Link>
                </div>
            </div>
        </div>
    )
}

export default GroupBanner