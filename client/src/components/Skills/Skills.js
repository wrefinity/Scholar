  import meter1 from "../../assets/img/meter1.svg";
import meter2 from "../../assets/img/meter2.svg";
import meter3 from "../../assets/img/meter3.svg";
import Carousel from "react-multi-carousel";
import { Container, Row } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";

const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <section className="skill mb-5" id="skills">
      <Container fluid className=" mb-5">
        <Row>
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>WHY SAM AFRIKA</h2>
              <p>
                Our primary objective is to surpass your expectations by
                delivering perfect products and services, based on our
                Commitment to Perfection. we leverage on the amalgamation of:
              </p>
              <Carousel
                responsive={responsive}
                infinite={true}
                className="owl-carousel owl-theme skill-slider"
              >
                <div className="item">
                  <img src={meter1} alt="Imagex" />
                  <h5>Skills</h5>
                </div>
                <div className="item">
                  <img src={meter2} alt="Imagexx" />
                  <h5>Creativity</h5>
                </div>
                <div className="item">
                  <img src={meter3} alt="Imagexxx" />
                  <h5>Innovation</h5>
                </div>
              </Carousel>
            </div>
          </div>
        </Row>
      </Container>
    </section>
  );
};
export default Skills;
