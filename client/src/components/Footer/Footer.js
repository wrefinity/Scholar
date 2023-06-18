import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// import { MailchimpForm } from "./MailchimpForm";
import { Newsletter } from "./Newsletter";
import logo from "../../assets/img/sss.png";
import navIcon1 from "../../assets/img/nav-icon1.svg";
import navIcon2 from "../../assets/img/nav-icon2.svg";
import navIcon3 from "../../assets/img/nav-icon3.svg";
import navIcon4 from "../../assets/img/twitter.svg";

const Footer = () => {
  return (
    <Container fluid className="footer">
      <Newsletter />
      <Row>
        <Col size={12} sm={6}>
          <img src={logo} alt="Logo" />
        </Col>
        <Col size={12} sm={6} className="text-center text-sm-end">
          <div className="social-icon">
            <a href="https://www.linkedin.com/in/sam-afrika-group-250766274">
              <img src={navIcon1} alt="Icon" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100076290695866&mibextid=ZbWKwL">
              <img src={navIcon2} alt="Icon" />
            </a>
            <a href="https://instagram.com/officialsamafrikagroup?igshid=YmMyMTA2M2Y=">
              <img src={navIcon3} alt="Icon" />
            </a>
            <a href="https://twitter.com/SamAfrica01?t=q1ZEapd5kj70uurbecFidg&s=09">
              <img src={navIcon4} alt="Icon" />
            </a>
          </div>
          <p>
            WrashTech &copy;
            {new Date().getFullYear()}
          </p>
        </Col>
      </Row>
    </Container>
  );
};
export default Footer;
