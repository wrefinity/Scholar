import React from "react";
import { Container } from "react-bootstrap";
import GalleryList from "../../features/Gallery/GalleryList";
import Skills from "../../components/Skills/Skills";
const MainBody = () => {
  return (
    <Container fluid>
      <GalleryList />
      <Skills />
    </Container>
  );
};

export default MainBody;
