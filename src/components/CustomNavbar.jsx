import React from 'react'
// navbar boostrap//
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';



function CustomNavbar() {

  const [searchString, setSearchString] = useState({
    'search': '',
  })

  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
  const studentLoginStatus = localStorage.getItem('studentLoginStatus')

  const handleChange = (event) => {
    setSearchString({
        ...searchString,
        [event.target.name]: event.target.value
    });
  }

  const searchCourse = () => {
    if (searchString.search!==''){
      window.location.href = '/search/'+searchString.search
    }
    
  }
    
  return (
    
  <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Container>
        <Navbar.Brand ><Link to="/" style={{ color: 'white', textDecoration: 'none'}}>LMS</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Form className="d-flex ">
            <Form.Control
              type="search"
              placeholder="Search by course title....."
              className="me-2"
              aria-label="Search "
              name="search"
              onChange={handleChange}
            />
            <Button onClick={searchCourse} variant="outline-success">Search</Button>
          </Form>


        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="nav-link active"><Link to="/" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = 'gold'} onMouseLeave={(e) => e.target.style.color = 'white'}>Home</Link></Nav.Link>
            <Nav.Link><Link to="/all-courses" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = 'gold'} onMouseLeave={(e) => e.target.style.color = 'white'}>Courses</Link></Nav.Link>
            <Nav.Link><Link to="/category" style={{ color: 'white', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = 'gold'} onMouseLeave={(e) => e.target.style.color = 'white'}>Categories</Link></Nav.Link>
            <NavDropdown title="User" id="basic-nav-dropdown">
              {studentLoginStatus!=='true' &&
              <>
              <NavDropdown.Item><Link to="/user-login" style={{  textDecoration: 'none'}}><i class="bi bi-box-arrow-in-left"></i> Login</Link></NavDropdown.Item>
              <NavDropdown.Item ><Link to="/user-register" style={{  textDecoration: 'none'}}><i class="bi bi-r-square-fill"></i> Register</Link>
              </NavDropdown.Item>
              </>
              }
              {studentLoginStatus=='true' &&
              <>
              
              <NavDropdown.Item ><Link to="/user-dashboard" style={{  textDecoration: 'none'}}><i class="bi bi-clipboard-fill"></i> Dashboard</Link>
              </NavDropdown.Item>
              <NavDropdown.Item ><Link to="/user-logout" style={{  textDecoration: 'none'}}>Logout <i className="bi bi-box-arrow-right"></i></Link>
              </NavDropdown.Item>
              </>
              }
            </NavDropdown>
            <NavDropdown title="Instructor" id="basic-nav-dropdown">
              {teacherLoginStatus!=='true' &&
              <>
              <NavDropdown.Item><Link to="/instructor-login" style={{  textDecoration: 'none'}}><i class="bi bi-box-arrow-in-left"></i> Login</Link></NavDropdown.Item>
              <NavDropdown.Item ><Link to="/instructor-register" style={{  textDecoration: 'none'}}><i class="bi bi-r-square-fill"></i> Register</Link>
              </NavDropdown.Item>
              </>
              }
              {teacherLoginStatus=='true' &&
              <>
              
              <NavDropdown.Item ><Link to="/instructor-dashboard" style={{  textDecoration: 'none'}}><i class="bi bi-clipboard-fill"></i> Dashboard</Link>
              </NavDropdown.Item>
              <NavDropdown.Item ><Link to="/instructor-logout" style={{  textDecoration: 'none'}}>Logout <i className="bi bi-box-arrow-right"></i></Link>
              </NavDropdown.Item>
              </>
              }
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  
  );
}

export default CustomNavbar;