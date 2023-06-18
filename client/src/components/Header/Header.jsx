import React, { useEffect } from "react"
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setLogout, getUser } from "../../Slicer/Auth"
import { getCategories, reseter as ResetCat } from "../../Slicer/Categories";
import { getGalleries, reseter as ResetGal } from "../../Slicer/Gallery";
import { getMembers, reseter as ResetMem } from "../../Slicer/Members";
import { getServices, reseter as ResetService } from "../../Slicer/Service";
import { getAbout, reseter as ResetAbout } from "../../Slicer/About";
import { getPartners, reseter as ResetParter } from "../../Slicer/Partners";
import { getTypes, reseter as ResetType } from "../../Slicer/Types";
import { getScholarsPost, reseter as ResetScholar } from "../../Slicer/Post";
import { getCatPergant, reseter as RestCatPergant } from "../../Slicer/CatPergant";
import { getPergant, reseter as RestPergant } from "../../Slicer/Pergent";
import { getUsers, reseter as resetUsers } from "../../Slicer/UserSlice";
import { getSubcription, reseter as resetSub } from "../../Slicer/Utils";

import decode from "jwt-decode";
import { toast } from "react-toastify";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()
  const { user } = useSelector(getUser);
  const token = user?.token;

  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      toast.error("Token expired, please login", { autoClose: 4000 });
      dispatch(setLogout());
      <Navigate to="/login" state={{ from: location }} replace />;

    }
  }

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getGalleries());
    dispatch(getMembers());
    dispatch(getAbout());
    dispatch(getTypes());
    dispatch(getPartners());
    dispatch(getServices());
    dispatch(getScholarsPost());
    dispatch(getPergant());
    dispatch(getCatPergant());
    const roler = process.env.REACT_APP_ROLER
    if (
      user?.fullname === roler||
      user?.role === roler
    ) {

      dispatch(getUsers());
      dispatch(resetUsers());
      dispatch(getSubcription());
      dispatch(resetSub())
    }
    dispatch(ResetCat())
    dispatch(ResetAbout())
    dispatch(ResetGal())
    dispatch(ResetMem())
    dispatch(ResetParter())
    dispatch(ResetService())
    dispatch(ResetScholar())
    dispatch(RestCatPergant())
    dispatch(RestPergant())
    dispatch(ResetType())
    dispatch(resetSub())

  }, [dispatch]);

  const handleLogout = () => {
    dispatch(setLogout())
    navigate("/");
  };


  return (
    <Navbar collapseOnSelect fixed="top" expand="lg" variant="light" bg="light" className="bg-nav">
      <Container fluid>
        <Navbar.Brand href="#home">SAM AFRIKA </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {user && (
              <>
              <Nav.Link href="/scholars_apply">Scholarships</Nav.Link>
              </>
            )}
            

            {user?.fullname === "admin" || user?.role === "admin" ? (
              <NavDropdown title="Menu" id="collasible-nav-dropdown ">
                <NavDropdown.Item href="/scholarships" className="mt-2">Scholarships</NavDropdown.Item>
                <NavDropdown.Item href="/application" className="mt-2">Applied - Scholarships</NavDropdown.Item>

                <NavDropdown.Item href="/scholars_add" className="mt-2" >Scholarship-Add</NavDropdown.Item>
                <NavDropdown.Item href="/scholars_category" className="mt-2" >Scholarship-Category</NavDropdown.Item>
                <NavDropdown.Item href="/gallery_admin" className="mt-2">Gallery</NavDropdown.Item>
                <NavDropdown.Item href="/member_admin" className="mt-2">Staffs</NavDropdown.Item>
                <NavDropdown.Item href="/service_admin" className="mt-2">Service</NavDropdown.Item>
                <NavDropdown.Item href="/patners" className="mt-2">Partner</NavDropdown.Item>
                <NavDropdown.Item href="/pergants_create" className="mt-2">Pargent</NavDropdown.Item>
                <NavDropdown.Item href="/categories" className="mt-2">Category</NavDropdown.Item>
                <NavDropdown.Item href="/types" className="mt-2">Applicant</NavDropdown.Item>
                <NavDropdown.Item href="/catpergant" className="mt-2">Category Pergant</NavDropdown.Item>
                <NavDropdown.Item href="/about_home" className="mt-2">About</NavDropdown.Item>
                <NavDropdown.Item href="/messenger" className="mt-2">Messenger</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/users" className="mt-2">
                  Users
                </NavDropdown.Item>
              </NavDropdown>
            ) : ""}
            <Nav.Link href="/about">About-Us</Nav.Link>
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