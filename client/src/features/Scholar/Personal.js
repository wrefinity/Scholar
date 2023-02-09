import React from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

const Personal = ({
  scholar,
  setScholar,
  handleInputImage,
  handleInput,
  FileInput,
  page,
  setPage,
  x,
  setX,
}) => {
  return (
    <div className="mb-5 mt-5 pb-5">
      <Container className="mb-5 mt-5 pb-5">
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={12} lg={12} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className="bg-nav p-4 mb-4">
                    <h2 className="fw-bold mb-2  text-center text-light">
                      Apply Scholarship
                    </h2>
                  </div>
                  <div className="mb-3">
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom01"
                      >
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="enter first name"
                          name="firstname"
                          value={scholar.firstname}
                          onChange={(e) => handleInput(e, setScholar)}
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom02"
                      >
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Last name"
                          name="lastname"
                          value={scholar.lastname}
                          onChange={(e) => handleInput(e, setScholar)}
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom022"
                      >
                        <Form.Label>Middle name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Last name"
                          name="lastname"
                          required
                          value={scholar.middlename}
                          onChange={(e) => handleInput(e, setScholar)}
                        />
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom01"
                      >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="email"
                          placeholder="enter a valid email"
                          value={scholar.email}
                          onChange={(e) => handleInput(e, setScholar)}
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom02"
                      >
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="city"
                          placeholder="enter city"
                          value={scholar.city}
                          onChange={(e) => handleInput(e, setScholar)}
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom022"
                      >
                        <Form.Label>Local Goverment</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="enter local goverment"
                          name="localGovt"
                          required
                          value={scholar.localGovt}
                          onChange={(e) => handleInput(e, setScholar)}
                        />
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom04"
                      >
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="enter state"
                          name="state"
                          value={scholar.state}
                          onChange={(e) => handleInput(e, setScholar)}
                          required
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom03"
                      >
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="enter country zip code"
                          name="zip"
                          value={scholar.zip}
                          onChange={(e) => handleInput(e, setScholar)}
                          required
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom05"
                      >
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Zip"
                          name="country"
                          value={scholar.country}
                          onChange={(e) => handleInput(e, setScholar)}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid zip.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                      />
                    </Form.Group>
                    <Button
                      onClick={() => {
                        setPage(page + 1);
                        setX(1000);
                      }}
                    >
                      Next{" "}
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Personal;
