
import '../SchoolList.scss'
import backArrowRed from '../../assets/images/backarrowroundedred.png'
import { Row, Col, Container, Form, Input, FormGroup, Label, Button } from 'reactstrap'
import searchImg from '../../assets/images/search.png'
import map from '../../assets/images/mapImg.png'
import ReactDOM from "react-dom"
import React, { useEffect, useState } from "react"
import FormsTables from '../../../navigation/horizontal/forms-tables'
import { FormattedDate } from 'react-intl'


const FindSchool = props => {
        const [currentPosition, setCurrentPosition] = useState({}) 
        const searchItems = (event) => {
            const searchValue = event.target.value
            const type = event.target.name
            console.log(searchValue, type)
            props.getKeyWord(searchValue, type)
        }
    return (
        <div className="find-school-block">
            <img className="back-image-red" src={backArrowRed} />
            <Row className="align-items-center h-100 justify-content-start">
                <Col className="search-block" xxl={3} xl={3} lg={3} md={10} sm={10} xs={10}>
                    <img className='' src={searchImg}/>
                    <FormGroup className="left">
                        <Input type="search" name="name" id="exampleSelect1" placeholder="Find Your School"   onChange={(e) => searchItems(e)} autoComplete="none"/>
                        {/* <Input type="search" name="select" id="exampleSelect" placeholder="Find Your School"  searchInputCallback = {(searchData)} => {}  onChange={(e) => searchItems(e.target.value)} /> */}
                    
                    </FormGroup>
                </Col>
                <Col className="search-block" xxl={3} xl={3} lg={3} md={11} sm={11} xs={11}>
                    <img className='map' src={map}/>
                    <FormGroup>
                        <Input type="search" name="address"  id="exampleSelect2" placeholder="City, State or Zipcode" onChange={(e) => searchItems(e)} autoComplete="none"/>
                    </FormGroup>
                </Col>
                <Col className="search-block" style={{paddingRight: '20px'}} xxl={3} xl={3} lg={3} md={11} sm={11} xs={11}>
                   <Form>
                        <FormGroup>
                            <Input type="select" name="gender" id="exampleSelect3" onChange={(e) => searchItems(e)} autoComplete="none" >
                                    <option value="Male" className='option'>Male</option>
                                    <option value="Female" className='option'>Female</option>
                                    <option value="Co-education" className='option'>Co-education</option>
                            </Input>
                        </FormGroup>
                   </Form>
                </Col>
            </Row>
        </div>
    )
}

// export default FindSchool
export default React.memo(FindSchool)