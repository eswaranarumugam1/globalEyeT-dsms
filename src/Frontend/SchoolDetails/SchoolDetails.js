import {useParams} from 'react-router-dom'
import '../Style.scss'
import HeaderNavbar from '../shared/Header/Header'
import SchoolHeaderNavbar from '../shared/Header/SchoolHeader'
import Footer from '../shared/Footer/Footer'
import SchoolDetailsLicenceType from './SchoolDetailsComponents/SchoolDetailsLicenceTypes'
import SelectSchool from './SchoolDetailsComponents/SelectSchool'
import Reviews from './SchoolDetailsComponents/Reviews'
import Cards from './SchoolDetailsComponents/Cards'
import DrivingLicenseCard from './SchoolDetailsComponents/DrivingLicenseCard'
import Testimonial_id from '../Components/Testimonial/Testimonial_id'
function SchoolDetails() {

    const {id} = useParams()

    return (
        <div>
            <SchoolHeaderNavbar id={id} />
            <SelectSchool id={id}/>
      {/* <DrivingLicenseCard /> */}
      {/* <Cards /> */}
      <SchoolDetailsLicenceType id={id}/>
      <Testimonial_id id={id} />
      <Reviews />
            <Footer id={id} />
        </div>

    )
}

export default SchoolDetails