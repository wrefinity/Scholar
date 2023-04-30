import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectAllServices } from "../../Slicer/Service";
import Service from "../../assets/img/service.png";
import ServiceCard from "./ServiceCard";

const ServiceList = () => {
  const servicess = useSelector(selectAllServices);
  return (
    <section className="project mt-5" id="project">
      <Container>
        <Row className="d-flex justify-content-center p-4 text-center align-items-center">
          <h3 className="cus_txt_color fw-500">OUR SERVICES</h3>
          <p className="mb-4">SamAfrika offer services</p>
          <div>
            <img src={Service} style={{ width: 100, height: 100 }} alt="xyxyx" />
          </div>
        </Row>
        <Row>
          <Col size={12}>
            <Row>
              {servicess?.map((service, index) => {
                return <ServiceCard key={index} {...service} />;
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ServiceList;
