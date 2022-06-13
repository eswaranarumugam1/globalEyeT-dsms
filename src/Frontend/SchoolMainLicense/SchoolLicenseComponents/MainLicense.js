import {useParams} from 'react-router-dom'
//import '../Style.scss' 
function MainLicense() {

    const {id} = useParams()

    return (
        <div>
            <h2>Licenses Page</h2>
        </div>

    )
}

export default MainLicense