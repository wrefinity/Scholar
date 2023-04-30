import React from "react";
// import { Container, Col, Row } from "react-bootstrap";
import vid from "../assets/vid/vid.mp4";
const Backy = () => {
  return (
    <video id="background-video" loop autoPlay muted>
      <source src={vid} type="video/mp4" />
    </video>
  );
};

export default Backy;
