import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectAllPatners } from "../../Slicer/Partners";
import SingleList from "./SingleList";

const Partners = () => {
  const partners = useSelector(selectAllPatners);
  return (
    <section className="project mt-5 mb-5" id="project">
      <Container>
        <Row className="mb-2 d-flex justify-content-center p-4 text-center align-items-center">
          <h3 className="cus_txt_color fw-500"> OUR PARTNERS </h3>
          <p className="mb-4">We partner to achieve our goals</p>
        </Row>
        <Row>
          <Col size={12}>
            <Row>
              {partners?.map((partner, index) => {
                return <SingleList key={index} {...partner} />;
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Partners;
