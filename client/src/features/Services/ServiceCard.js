import React from "react";
import { Col, Card } from "react-bootstrap";


export const ServiceCard = ({ title, content, image }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <Card className="justify-content-center align-items-center border-0">
        <Card.Img
          variant="top"
          src={image}
          style={{ height: 150, width: 150 }}
        />
        <Card.Body>
          <Card.Title className="text-center">{title}</Card.Title>
          <Card.Text>{content}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
    // <Col size={12} sm={6} md={4}>
    //   <div className="proj-imgbx mt-5 ">
    //     <img src={image} />
    //     <div className="proj-txtx text-white">
    //       <h4>{title}</h4>
    //       <span>{content}</span>
    //     </div>
    //   </div>
    // </Col>
  );
};

export default ServiceCard;
