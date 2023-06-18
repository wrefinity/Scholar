import React from "react";
import { Row, Container } from "react-bootstrap";
import pageNot from "../assets/img/404.jpg";

const NotFound = () => {
  return (
    <Container fluid className="mbt">
    <Row className="mt-5 pt-5 d-flex align-items-center justify-content-center text-center mtvh-30">
    <i className="fs-3 mt-3">Page not found</i>
        <img src={pageNot} style={{ width: "90vh", height: "90vh" }} alt="400"/>
      </Row>
    </Container>
  );
};

export default NotFound;
