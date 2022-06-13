import { useState } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col
} from 'reactstrap'
import './Header.scss'
import search from '../../assets/images/search.png'
import globe from '../../assets/images/globe.png'

function HeaderNavbar() {
    const [isOpen, setIsOpen] = useState(false)
    function toggle() {
        const open = !isOpen
        setIsOpen(open)
    }
    return (
        <div>
            <Navbar color="light" className="navbar-container" light expand="lg">
                <NavbarBrand href="/" className="text-danger">LOGO</NavbarBrand>
                <NavbarToggler onClick={() => toggle()} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="navbar w-100" navbar>
                        <NavItem>
                            <NavLink href="#">License Type</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Add on Plans</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Our Services</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="about_us">About Us</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Contact Us</NavLink>
                        </NavItem>
                        <NavItem>
                            <Form>
                                <Row>
                                    <Col xl={6} lg={6} md={12} sm={12} xs={12} className="pl-md-0 pl-sm-0 pl-0 mt-3">
                                        <FormGroup className="search-block">
                                            <img src={search} />
                                            <Input type="search" name="select" id="exampleSelect" placeholder="Search...">
                                                
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col xl={6} lg={6} md={12} sm={12} xs={12} className="pl-md-0 pl-sm-0 pl-0 mt-3">
                                        <FormGroup className="language-block">
                                            <img src={globe} />
                                            <Input type="select" name="select" id="exampleSelect">
                                                <option selected disabled>English</option>
                                                <option>Arabic</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>

                                </Row>


                            </Form>

                        </NavItem>
                    </Nav>

                </Collapse>
            </Navbar>
        </div>
    )
}

export default HeaderNavbar