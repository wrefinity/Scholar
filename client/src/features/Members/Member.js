import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectAllMembers } from "../../Slicer/Members";
import SingleList from "./SingleList";

const Member = () => {
  const members = useSelector(selectAllMembers);
  return (
    <section className="project" id="project">
      <Container>
        <Row className="mb-2 d-flex justify-content-center p-4 text-center align-items-center">
          <h3 className="cus_txt_color fw-500"> THE TEAM</h3>
          <p className="mb-4">
            We have seasoned staff with tremendous expertise in various sections
            of what we do
          </p>
        </Row>
        <Row>
          <Col size={12}>
            <Row>
              {members?.map((member, index) => {
                return <SingleList key={index} {...member} />;
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Member;
