import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ServiceTable from "../../features/Services/ServiceTable";
import ServiceForm from "../../features/Services/ServiceForm";

const Services = () => {
  return (
  <Container fluid className="mt-4 mb-4">
    <Row>
      <ServiceForm />
    </Row>
    <Row>
      <ServiceTable />
    </Row>
</Container>
  );
};

export default Services