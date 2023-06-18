import React, { useState, useRef, useEffect } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  handleInput,
  handleInputImage,
  validateEmpty,
} from "../../Utils/InputHelpers";
import { FileInput } from "../../Utils/FileInput";
import { createScholarship, reseter } from "../../Slicer/ScholarApply";

const ScholarApply = () => {
  const [scholar, setScholar] = useState({
    postId: "",
    firstname: "",
    lastname: "",
    email: "",
    city: "",
    state: "",
    zip: "",
    localGovt: "",
    country: "",
    scholarType: "",
    scholarName: "",
    idCard: "",
    letter: "",
    result: "",
    passport: "",
    signature: "",
  });
  const dispatch = useDispatch();
  const referal = useRef();
  const { status, message } = useSelector((state) => state.posts);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const reset = () => {
    setScholar({
      postId: "",
      firstname: "",
      lastname: "",
      email: "",
      city: "",
      state: "",
      zip: "",
      localGovt: "",
      country: "",
      scholarType: "",
      scholarName: "",
      idCard: "",
      letter: "",
      result: "",
      passport: "",
      signature: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validateEmpty(scholar));
    setIsSubmit(true);
  };

  useEffect(() => {
    referal.current();
  }, [formErrors, message, dispatch]);

  const addScholar = async () => {
    if (Object.keys(formErrors).length === 0 && status === "idle" && isSubmit) {
      dispatch(reseter());
      dispatch(createScholarship(scholar));
    }

    if (status === "succeeded") {
      toast.success("record added", { autoClose: 2000 });
      reset();
      dispatch(reseter());
    }
    if (status === "failed") {
      toast.error(message, { autoClose: 4000 });
      dispatch(reseter());
    }
  };
  referal.current = addScholar;

  useEffect(() => {
    referal.current();
  }, []);

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
                    <Form hasValidation onSubmit={handleSubmit}>
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
                            value={scholar.lastname}
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
                      <Button type="submit">Save and Continue </Button>
                    </Form>
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

export default ScholarApply;
