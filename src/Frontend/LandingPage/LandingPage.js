import '../Style.scss'
import Banner from '../Components/Banner/Banner'
import FindArea from '../Components/FindArea/FindArea'
import AboutUs from '../Components/AboutUs/AboutUs'
import HeaderNavbar from '../shared/Header/Header'
import Footer from '../shared/Footer/Footer'
import OurSpeciality from '../Components/Specialities/Speciality'
import News from '../Components/News/News'
import Testimonial  from '../Components/Testimonial/Testimonial'
import ContactUs  from '../Components/ContactUs/ContactUs'
import TypeofLicense from '../Components/TypesofLicense/TypeofLicense'

function LandingPage() {
    //HHP Landing Page
    return (
        <div>
            <HeaderNavbar />
            <div className="landing-container">
                <Banner />
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

export default LandingPage