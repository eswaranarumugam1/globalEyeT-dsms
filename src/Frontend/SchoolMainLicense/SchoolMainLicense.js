import {useParams} from 'react-router-dom'
//import '../Style.scss'
//import HeaderNavbar from '../shared/Header/Header'
import SchoolHeaderNavbar from '../shared/Header/SchoolHeader'
import Footer from '../shared/Footer/Footer' 
import MainLicense from './SchoolLicenseComponents/MainLicense'
function SchoolMainLicense() {

    const {id} = useParams()

    return (
        <div>
            <SchoolHeaderNavbar />
            <MainLicense  />  
            <Footer />
        </div>

    )
}

export default SchoolMainLicense