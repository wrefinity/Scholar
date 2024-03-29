import React from "react";
import { Container, Row, Col} from "react-bootstrap";
import { PergantCard } from "./PergantCard";
import { useSelector } from "react-redux";
import colorSharp2 from "../../assets/img/color-sharp2.png";
import { sellectAllPergants } from "../../Slicer/Pergent";

const GalleryList = () => {
  const pergants = useSelector(sellectAllPergants);
  return (
    <section className="project mt-5" id="project">
      <Container>
        <Row>
          <h3 className="cus_txt_color fw-500 text-center">
          MODEL COMMERCIALS
          </h3>
          <Col size={12}>
            <Row>
              {pergants?.map((pergant, index) => {
                return <PergantCard key={index} {...pergant} />;
              })}
            </Row>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" alt='xwc' src={colorSharp2}/>
    </section>
  );
};
export default GalleryList;
