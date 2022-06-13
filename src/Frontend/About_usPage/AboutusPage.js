import '../Style.scss'
import GroupBanner from '../GroupComponents/GroupBanner/GroupBanner'
import FindArea from '../GroupComponents/GroupFindArea/GroupFindArea'
// import AboutUs from '../GroupComponents/GroupAboutUs/GroupAboutUs'
import HeaderNavbar from '../shared/Header/Header'
import Footer from '../shared/Footer/Footer'
import OurSpeciality from '../GroupComponents/GroupSpecialities/GroupSpeciality'
import News from '../GroupComponents/GroupNews/GroupNews'
import Testimonial  from '../GroupComponents/GroupTestimonial/GroupTestimonial'
import ContactUs  from '../GroupComponents/GroupContactUs/GroupContactUs'
import TypeofLicense from '../GroupComponents/GroupTypesofLicense/GroupTypeofLicense'
// import AboutUs from '../Frontend/Components/AboutUs/AboutUs'
import AboutUs from '../../Frontend/Components/AboutUs/AboutUs'
function AboutusPage() {
    return (
        <div>
            
            <HeaderNavbar />
            <div className="landing-container">
              
                <div className="px-5">
                   
                    <AboutUs />
                    
                </div>
               
            </div>
            <Footer />
        </div>

    )
}

export default AboutusPage