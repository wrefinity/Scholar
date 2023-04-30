import React from "react";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import PergantForm from "../../features/Pergant/PergantForm";
import PergantTable from "../../features/Pergant/PergantTable";

const PergantScreen = () => {
  return (
    <section>
      <Container fluid className="mt-4 mb-5 mbt">
        <Row className="mt-4 mb-5">
          <Col md={4} lg={4} xs={12}>
            <PergantForm />
          </Col>
          <Col md={8} lg={8} xs={12}>
            <PergantTable />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PergantScreen;
