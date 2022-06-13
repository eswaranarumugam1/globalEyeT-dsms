import {useParams} from 'react-router-dom'
import '../../Style.scss'
import HeaderNavbar from '../../shared/Header/Header'
import Footer from '../../shared/Footer/Footer'
import SchoolDetailsLicenceType from '../../SchoolDetails/SchoolDetailsComponents/SchoolDetailsLicenceTypes'
import SelectSchool from '../../SchoolDetails/SchoolDetailsComponents/SelectSchool' 
import Reviews from '../../SchoolDetails/SchoolDetailsComponents/Reviews'
//import Cards from './SchoolDetailsComponents/Cards'
//import DrivingLicenseCard from './SchoolDetailsComponents/DrivingLicenseCard'
function SchoollandingPage() {

    const {id} = useParams()

    return (
        <div>
            <HeaderNavbar />
            <SelectSchool />
      {/* <DrivingLicenseCard /> */}
      {/* <Cards /> */}
      <SchoolDetailsLicenceType id={id}/>
      <Reviews />
            <Footer />
        </div>

    )
}

export default SchoollandingPage