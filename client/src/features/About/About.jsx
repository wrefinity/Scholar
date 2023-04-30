import React from "react";
import { Row, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectAllAbout } from "../../Slicer/About";
const About = () => {
    const about = useSelector(selectAllAbout)[0];
    return (
        <Container fluid className="mt-4 mb-5 mbt pt-5">
            <Row className="mb-2 d-flex justify-content-center p-4 text-center align-items-center text-align-center">
                <h3 className="cus_txt_color fw-500"> ABOUT US </h3>
                <p className="mb-4">{about?.note}</p>
            </Row>
        </Container>
    );
};

export default About;