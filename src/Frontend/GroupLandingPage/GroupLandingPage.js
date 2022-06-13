import '../Style.scss'
import GroupBanner from '../GroupComponents/GroupBanner/GroupBanner'
import FindArea from '../GroupComponents/GroupFindArea/GroupFindArea'
import AboutUs from '../GroupComponents/GroupAboutUs/GroupAboutUs'
import HeaderNavbar from '../shared/Header/Header'
import Footer from '../shared/Footer/Footer'
import OurSpeciality from '../GroupComponents/GroupSpecialities/GroupSpeciality'
import News from '../GroupComponents/GroupNews/GroupNews'
import Testimonial  from '../GroupComponents/GroupTestimonial/GroupTestimonial'
import ContactUs  from '../GroupComponents/GroupContactUs/GroupContactUs'
import TypeofLicense from '../GroupComponents/GroupTypesofLicense/GroupTypeofLicense'

function GroupLandingPage() {
    return (
        <div>
            <HeaderNavbar />
            <div className="landing-container">
                <GroupBanner />
                <div className="px-5">
                    <FindArea />
                    <TypeofLicense />
                    <AboutUs />
                    <OurSpeciality />
                    <News />
                    <Testimonial />
                </div>
                <ContactUs />
            </div>
            <Footer />
        </div>

    )
}

export default GroupLandingPage