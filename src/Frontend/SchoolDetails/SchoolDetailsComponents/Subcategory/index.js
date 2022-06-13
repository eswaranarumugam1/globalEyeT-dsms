import './TypeofLicense.scss'
import { useState, useEffect } from 'react'
import { Row, Col, Container } from 'reactstrap'
import DataCard from '../DataCardSubcategory'

function Subcategory({licenses, handleSelection, activeid, nextTab, style}) {
    const [active, setActive] = useState(activeid)
    const selectLicense = (id) => {
        setActive(id)
        handleSelection(id)
    }

    useEffect(() => {
        if (activeid) {
            setActive(activeid)
        }
        return () => {
            setActive(null)
        }
    }, [])

    return (
        <div className="sublicense-block" style={style}>
            <Row className="justify-content-center ">
                {
                    licenses && licenses !== null && licenses !== "" ? licenses.map((license) => {
                        return (
                            <Col xxl={3} xl={3} lg={3} md={6} sm={12} xs={!2} key={license.id} >
                                    <div className={`card ${active && active === license.id  ? 'active' : ''}`} onClick={() => selectLicense(license.id)}>
                                        <img src={license.image} wdth={50} height={50}/>
                                        <p>{license.name}</p>
                                    </div>
                            </Col>
                        )
                    }) : (
                        <Col xxl={1} xl={1} lg={1} md={6} sm={12} xs={!2}>Subcategory not found</Col>
                    )
                }
            </Row>
            <DataCard nextTab={nextTab} />
        </div>
    )
}

export default Subcategory