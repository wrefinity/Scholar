import React from "react";
import { Col, Card } from "react-bootstrap";

const SingleList = ({ image }) => {
  return (
    <Col size={12} sm={6} md={3} lg={3}>
      <Card style={{ width: "18rem" }} className="border-0 my-2">
        <Card.Img
          variant="top"
          src={image}
          style={{ height: "10vh", width: "50%" }}
        />
      </Card>
    </Col>
  );
};

export default SingleList;
