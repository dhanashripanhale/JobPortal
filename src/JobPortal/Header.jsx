import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Form,
  Input,
} from 'reactstrap';
import logo from './images/jobportal.jpg'; // Replace with the path to your logo
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching...');
  };

  return (
    <Navbar color="primary" dark expand="md">
      <NavbarBrand href="#home">
        Job Portal
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <div className="d-flex w-100 justify-content-between align-items-center">
          <Nav className="mx-auto" navbar>
            <NavItem className="nav-item-spacing" style={{ marginRight: '10px' }}>
              <NavLink href="#home">Home</NavLink>
            </NavItem>
            <NavItem className="nav-item-spacing" style={{ marginRight: '10px' }}>
              <NavLink href="#about">About</NavLink>
            </NavItem>
            <NavItem className="nav-item-spacing" style={{ marginRight: '10px' }}>
              <NavLink href="#contact">Contact</NavLink>
            </NavItem>

            <NavItem className="nav-item-spacing">
              <Form inline onSubmit={handleSearch} className="d-flex">
                <Input type="text" placeholder="Search Job Here" />
                <Button color="light" outline type="submit">
                  <SearchIcon/>
                </Button>
              </Form>
            </NavItem>
          </Nav>

          <div className="ml-auto">
            <Button color="light" outline className="mr-2">Register</Button>
            <Button color="light" outline>Login</Button>
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
};

export default Header;
