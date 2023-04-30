import React from "react";
import { Container } from "react-bootstrap";
import GalleryList from "../../features/Gallery/GalleryList";
import Skills from "../../components/Skills/Skills";
import PergantList from "../../features/Pergant/PergantList";
import ServiceList from "../../features/Services/ServiceList";
import Member from "../../features/Members/Member";
import Partners from "../../features/Partners/Partners";
import Backy from "../../components/Backy";
const MainBody = () => {
  return (
    <Container fluid className="mbt mb-5 mx-0">
      <Backy />
      <ServiceList />
      <PergantList />
      <GalleryList />
      <Skills />
      <Member />
      <Partners />
    </Container>
  );
};

export default MainBody;
