import React from "react";
import { Row, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPostById } from "../../Slicer/Post";
const ScholarTerms = () => {
    const { id } = useParams();
    const scholar = useSelector((state) => getPostById(state, id));
    const sentences = scholar?.terms.split('.');
    return (
        <Container fluid className="mt-4 mb-5 mbt pt-5">
            <Row className="mb-2 d-flex justify-content-center p-4 text-center align-items-center text-align-center">
                <h3 className="cus_txt_color fw-500"> Terms and Condition </h3>
                <ul className="mb-4 text-justify p-4" >
                {sentences.map((sentence, index) => (
                  <li key={index}>{sentence.trim()}</li>
                ))}
              </ul>
            </Row>
        </Container>
    );
};


export default ScholarTerms;