import React, { useEffect } from "react"
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout, setLogout, getUser } from "../../Slicer/Auth"
import { getCategories, reseter as ResetCat } from "../../Slicer/Categories";
import { getGalleries, reseter as ResetGal } from "../../Slicer/Gallery";
import { getMembers, reseter as ResetMem } from "../../Slicer/Members";
import { getServices, reseter as ResetService } from "../../Slicer/Service";
import { getAbout, reseter as ResetAbout } from "../../Slicer/About";
import { getPartners, reseter as ResetParter } from "../../Slicer/Partners";
import { getScholarsPost, reseter as ResetScholar } from "../../Slicer/Post";
import decode from "jwt-decode";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user } = useSelector(getUser);


  const token = user?.token;

  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getGalleries());
    dispatch(getMembers());
    dispatch(getAbout());
    dispatch(getPartners());
    dispatch(getServices());
    dispatch(getScholarsPost());
    // if (
    //   user?.fullname === "admin" ||
    //   user?.role === "academic" ||
    //   user?.role === "student"
    // ) {
    //   dispatch(getResult());
    //   dispatch(getUsers());
    //   dispatch(getCourseAssign());
    //   dispatch(getCourseRegistered());
    //   resetUsers();
    //   resetRes();
    //   resetBooks();
    //   resetAssign();
    // }
    dispatch(ResetCat())
    dispatch(ResetAbout())
    dispatch(ResetGal())
    dispatch(ResetMem())
    dispatch(ResetParter())
    dispatch(ResetService())
    dispatch(ResetScholar())

  }, [dispatch]);

  const handleLogout = () => {
    dispatch(setLogout())
    // setLogout()
    navigate("/");
  };


  return (
    <Navbar collapseOnSelect fixed="top" expand="lg" variant="light" bg="light" className="bg-nav">
      <Container fluid>
        <Navbar.Brand href="#home">SAM AFRIKA </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Product</Nav.Link>
            <NavDropdown title="Menu" id="collasible-nav-dropdown ">
              <NavDropdown.Item href="/scholars_apply" className="mt-2">Scholarships</NavDropdown.Item>
              <NavDropdown.Item href="/scholars_add" className="mt-2" >Scholarship-Add</NavDropdown.Item>
              <NavDropdown.Item href="/scholars_category" className="mt-2" >Scholarship-Category</NavDropdown.Item>
              <NavDropdown.Item href="/gallery_admin" className="mt-2">Gallery</NavDropdown.Item>
              <NavDropdown.Item href="/member_admin" className="mt-2">Member</NavDropdown.Item>
              <NavDropdown.Item href="/service_admin" className="mt-2">Service</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2" className="mt-2">
                Agriculture
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3" className="mt-2">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" className="mt-2">
                More
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#">About-Us</Nav.Link>
            <Nav.Link href="#">Services</Nav.Link>
            <Nav.Link href="/contact_us">Contact</Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <Nav.Link eventKey={2} href="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;