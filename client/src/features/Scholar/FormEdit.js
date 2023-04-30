import React, { useState, useRef, useEffect } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LineWave } from "react-loader-spinner";
import { loaderSize, loaderColor } from "../../Utils/InputHelpers";

import { updateScholarPost, reseter } from "../../Slicer/Post";

const FormEdit = ({ scholar }) => {
  const { status, message } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const referal = useRef();
  const [benefitPre, setBenefitPre] = useState(scholar?.benefit?.benefitPre);
  const [benefitUnder, setBenefitUnder] = useState(
    scholar?.benefit?.benefitUnder
  );
  const [benefitPost, setBenefitPost] = useState(scholar?.benefit?.benefitPost);
  const [body, setBody] = useState(scholar?.body);
  const [eligibilityPre, seteligibilityPre] = useState(
    scholar?.eligibility.eligibilityPre
  );
  const [eligibilityUnder, seteligibilityUnder] = useState(
    scholar?.eligibility.eligibilityUnder
  );
  const [eligibilityPost, seteligibilityPost] = useState(
    scholar?.eligibility.eligibilityPost
  );
  const [eligible_country, setEligible_country] = useState(
    scholar?.eligible_country
  );
  const [deadline, setDeadline] = useState(scholar?.deadline);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleAddScholar = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };

  useEffect(() => {
    referal.current();
  }, [message, isSubmit, dispatch]);

  const addScholar = async () => {
    if (
      [
        benefitPre,
        benefitUnder,
        benefitPost,
        body,
        eligibilityPre,
        eligibilityUnder,
        eligibilityPost,
        eligible_country,
        deadline,
      ].some((el) => el !== null) &&
      isSubmit &&
      status === "idle"
    ) {
      dispatch(reseter());
      const updatedScholar = {
        benefitPre,
        benefitUnder,
        benefitPost,
        body,
        eligibilityPre,
        eligibilityUnder,
        eligibilityPost,
        eligible_country,
        deadline,
      };
      dispatch(updateScholarPost({ ...updatedScholar, _id: scholar._id }));
      setIsSubmit(false);
    }

    if (status === "succeeded") {
      toast.success(message, { autoClose: 2000 });
      dispatch(reseter());
      setIsSubmit(false);
      navigate("/scholarships");
    }
    if (status === "failed") {
      toast.error(message, { autoClose: 4000 });
      dispatch(reseter());
      setIsSubmit(false);
    }
  };
  referal.current = addScholar;

  useEffect(() => {
    referal.current();
  }, []);

  return (
    <div className="mb-5 pb-5">
      <Container className="mt-5 pt-5 mb-5 pb-5">
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className="bg-nav p-4 mb-4">
                    <h4 className="fw-bold mb-2  text-center text-light">
                      Update {scholar?.categoryId?.name}
                    </h4>
                  </div>
                  <div className="mb-3">
                    <Form onSubmit={handleAddScholar}>
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
                          value={deadline}
                          placeholder="enter deadline"
                          onChange={(e) => setDeadline(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Benefit for Secondary School</Form.Label>
                        <Form.Control
                          name="benefitPre"
                          value={benefitPre}
                          as="textarea"
                          rows={3}
                          onChange={(e) => setBenefitPre(e.target.value)}
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
                          value={benefitUnder}
                          as="textarea"
                          rows={3}
                          onChange={(e) => setBenefitUnder(e.target.value)}
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
                          value={benefitPost}
                          as="textarea"
                          rows={3}
                          onChange={(e) => setBenefitPost(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicHost">
                        <Form.Label className="text-center">
                          Eligible Countries
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="eligible_country"
                          value={eligible_country}
                          onChange={(e) => setEligible_country(e.target.value)}
                          placeholder="enter eligble country"
                        />
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
                          value={eligibilityPre}
                          as="textarea"
                          rows={3}
                          onChange={(e) => seteligibilityPre(e.target.value)}
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
                          value={eligibilityUnder}
                          as="textarea"
                          rows={3}
                          onChange={(e) => seteligibilityUnder(e.target.value)}
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
                          value={eligibilityPost}
                          as="textarea"
                          rows={3}
                          onChange={(e) => seteligibilityPost(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                          name="body"
                          value={body}
                          as="textarea"
                          rows={6}
                          onChange={(e) => setBody(e.target.value)}
                        />
                      </Form.Group>

                      <div className="d-grid">
                        {status !== "loading" ? (
                          <Button
                            variant="primary"
                            type="submit"
                            onClick={handleAddScholar}
                          >
                            Update
                          </Button>
                        ) : (
                          <div className="d-flex justify-content-center">
                            <LineWave
                              color={loaderColor}
                              height={loaderSize}
                              width={loaderSize}
                            />
                          </div>
                        )}
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

export default FormEdit;
