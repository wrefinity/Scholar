import React from "react";
import { Row, Container, Col } from "react-bootstrap";
import success from "../assets/img/check.png";

const Thanks = () => {
  return (
    <Container fluid className="mbt">
      <Row className="mt-5 pt-5 d-flex align-items-center justify-content-center text-center">
        <h3 className="cus_txt_color fw-5 text-center text-decoration-underline">
          THANK YOU
        </h3>
        <img src={success} style={{ width: "20vw", height: "40vh" }} />
        <i className="fs-3">Transaction successful</i>
      </Row>
    </Container>
  );
};

export default Thanks;
