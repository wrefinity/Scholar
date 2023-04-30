import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export const PergantCard = ({ _id, title, payments, name, image }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <Link to={`/model/${_id}`}>
        <div className="proj-imgbx mt-5 ">
          <Row className="cus_color text-white">
            <p className="text-align-center text-white">{payments}</p>
            <p className="text-align-center text-white">{title?.name}</p>
          </Row>
          <img src={image} className="max-img" />
          <div className="proj-txtx text-white">
            <h4>{name}</h4>
            <span>{title?.amount}</span>
          </div>
        </div>
      </Link>
    </Col>
  );
};

export default PergantCard;
