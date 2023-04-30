import React from "react";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import PartnerForm from "../../features/Partners/PartnerForm";
import PartnerList from "../../features/Partners/PartnerList";

const PartnerScreen = () => {
  return (
    <section>
      <Container fluid className="mt-4 mb-5 mbt">
        <Row className="mt-4 mb-5">
          <Col md={4} lg={4} xs={12}>
            <PartnerForm />
          </Col>
          <Col md={8} lg={8} xs={12}>
            <PartnerList />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PartnerScreen;
