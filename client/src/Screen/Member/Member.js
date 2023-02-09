import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import MemberList from "../../features/Members/MemberList";
import MemberForm from "../../features/Members/MemberForm";

const Member = () => {
  return (
  <Container fluid className="mt-4 mb-4">
    <Row>
      <MemberForm />
    </Row>
    <Row>
      <MemberList />
    </Row>
</Container>
  );
};

export default Member