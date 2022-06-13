import './TypeofLicense.scss'
import { useState } from 'react'
import { Row, Col, Container } from 'reactstrap'
import Licence_type from '../../../../views/pages/licence_type'
import DataCard from '../DataCardLicense'

function SubLicenses({licenses, handleSelection, activeid, nextTab}) {
    const [active, setActive] = useState(activeid)
    const selectLicense = (id) => {
        setActive(id)
        handleSelection(id)
    }
    return (
        <div className="sublicense-block">
            <Row className="justify-content-center">
                {
                    licenses && licenses.map((license) => {
                        return (
                            <Col xxl={3} xl={3} lg={3} md={6} sm={12} xs={!2} key={license.id} >
                                    <div className={`card ${active && active === license.id ? 'active' : ''}`} onClick={() => selectLicense(license.id)}>
                                        <img src={license.image} wdth={50} height={50}/>
                                        <p>{license.label}</p>
                                    </div>
                            </Col>
                        )
                    })
                }
            </Row>
            <DataCard nextTab={nextTab}/>
        </div>
    )
}

export default SubLicenses