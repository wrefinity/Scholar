import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import GalleryTable from "../../features/Gallery/GalleryTable";
import GalleryForm from "../../features/Gallery/GalleryForm";

const Gallery = () => {
  return (
  <Container fluid className="mt-4 mb-4">
    <Row>
      <GalleryForm />
    </Row>
    <Row>
      <GalleryTable />
    </Row>
</Container>
  );
};

export default Gallery