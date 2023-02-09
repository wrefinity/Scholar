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
import { createScholarsPost, reseter } from "../../Slicer/Post";
const ScholarForm = () => {
  const [scholar, setScholar] = useState({
    image: "",
    title: "",
    benefitPre: "",
    benefitUnder: "",
    benefitPost: "",
    body: "",
    eligibilityPre: "",
    eligibilityUnder: "",
    eligibilityPost: "",
    country: "",
    eligible_country: [],
    host: "",
    deadline: "",
  });

  const dispatch = useDispatch();
  const referal = useRef();
  const { isLoading, status, message } = useSelector((state) => state.posts);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleInputImage = (name, value) => {
    setScholar((prev) => ({ ...prev, [name]: value }));
  };
  const reset = () => {
    setScholar({
      image: "",
      title: "",
      benefitPre: "",
      benefitUnder: "",
      benefitPost: "",
      body: "",
      eligibilityPre: "",
      eligibilityUnder: "",
      eligibilityPost: "",
      country: "",
      eligible_country: [],
      host: "",
      deadline: "",
    });
  };

  const handleAddScholar = async (e) => {
    e.preventDefault();
    setFormErrors(validateEmpty(scholar));
    setIsSubmit(true);
  };

  useEffect(() => {
    referal.current();
  }, [formErrors, message, dispatch]);

  const addScholar = async () => {
    if (Object.keys(formErrors).length === 0 && status === "idle") {
      dispatch(reseter());
      dispatch(createScholarsPost(scholar));
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

  if (isLoading) {
    // return <Spinner />
  }

  return (
    <div className="mb-5 pb-5">
      <Container className="mt-5 pt-5 mb-5 pb-5">
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className="bg-nav p-4 mb-4">
                    <h2 className="fw-bold mb-2  text-center text-light">
                      Post Scholarships
                    </h2>
                  </div>
                  <div className="mb-3">
                    <Form onSubmit={handleAddScholar}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">Title</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          name="title"
                          value={scholar.title}
                          onChange={(e) => handleInput(e, setScholar)}
                        >
                          <option>select scholarship </option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicDeadline"
                      >
                        <Form.Label className="text-center">
                          Deadline
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="deadline"
                          value={scholar.deadline}
                          placeholder="enter deadline"
                          onChange={(e) => handleInput(e, setScholar)}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Benefit for Secondary School</Form.Label>
                        <Form.Control
                          name="benefitPre"
                          value={scholar.benefitPre}
                          as="textarea"
                          rows={3}
                          onChange={(e) => handleInput(e, setScholar)}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>
                          Benefit for underGraduate Student
                        </Form.Label>
                        <Form.Control
                          name="benefitUnder"
                          value={scholar.benefitUnder}
                          as="textarea"
                          rows={3}
                          onChange={(e) => handleInput(e, setScholar)}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>
                          Benefit for Post graduate Students
                        </Form.Label>
                        <Form.Control
                          name="benefitPost"
                          value={scholar.benefitPost}
                          as="textarea"
                          rows={3}
                          onChange={(e) => handleInput(e, setScholar)}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicHost">
                        <Form.Label className="text-center">Host</Form.Label>
                        <Form.Control
                          type="text"
                          name="host"
                          value={scholar.host}
                          onChange={(e) => handleInput(e, setScholar)}
                          placeholder="enter host for scholarship"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Host Country
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          name="country"
                          value={scholar.benefit}
                          onChange={(e) => handleInput(e, setScholar)}
                        >
                          <option>select country </option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Eligibility Country
                        </Form.Label>
                        <Form.Select
                          onChange={(e) => handleInput(e, setScholar)}
                          name="eligible_country"
                          aria-label="Default select example"
                        >
                          <option>select country</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>
                          Eligibility Requirements for Secondary School
                        </Form.Label>
                        <Form.Control
                          name="eligibilityPre"
                          value={scholar.eligibilityPre}
                          as="textarea"
                          rows={3}
                          onChange={(e) => handleInput(e, setScholar)}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>
                          Eligibility Requirements for Under-Graduate Students
                        </Form.Label>
                        <Form.Control
                          name="eligibilityUnder"
                          value={scholar.eligibilityUnder}
                          as="textarea"
                          rows={3}
                          onChange={(e) => handleInput(e, setScholar)}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>
                          Eligibility Requirements for Post Graduate Students
                        </Form.Label>
                        <Form.Control
                          name="eligibilityPost"
                          value={scholar.eligibilityPost}
                          as="textarea"
                          rows={3}
                          onChange={(e) => handleInput(e, setScholar)}
                        />
                      </Form.Group>

                      <FileInput
                        namer="image"
                        label="Choose Image"
                        handleInputImage={handleInputImage}
                        setHook={setScholar}
                        type="image"
                        value={scholar.image}
                        formErrors
                      />

                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                          name="body"
                          value={scholar.value}
                          as="textarea"
                          rows={6}
                          onChange={(e) => handleInput(e, setScholar)}
                        />
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Post
                        </Button>
                      </div>
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

export default ScholarForm;
