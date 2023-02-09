import React, { useState, useRef, useEffect } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LineWave } from "react-loader-spinner";

import {
  handleInput,
  validateEmpty,
  loaderSize,
  loaderColor,
  handleInputImage,
} from "../../Utils/InputHelpers";
import { FileInput } from "../../Utils/FileInput";
import { reseter, createService } from "../../Slicer/Service";

const ServiceForm = () => {
  const [service, setService] = useState({
    image: "",
    content: "",
    title: "",
  });
  const { status, message } = useSelector((state) => state.services);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const referal = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    referal.current();
  }, [formErrors, status, message, dispatch]);

  const reset = () => {
    setService({
      image: "",
      content: "",
      title: "",
    });
  };

  const dispatchService = () => {
    if (Object.keys(formErrors).length === 0 && isSubmit && status === "idle") {
      dispatch(createService(service));
      dispatch(reseter());
      setIsSubmit(false);
    }

    if (status === "succeeded") {
      toast.success("record added", { autoClose: 2000 });
      reset();
      dispatch(reseter());
      setIsSubmit(false);
    }
    if (status === "failed") {
      toast.error(message, { autoClose: 4000 });
      dispatch(reseter());
      setIsSubmit(false);
    }
  };
  referal.current = dispatchService;

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validateEmpty(service));
    setIsSubmit(true);
  };
  return (
    <div>
      <Container className="mt-5 pt-5">
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className="bg-nav p-4 mb-4">
                    <h2 className="fw-bold mb-2  text-center text-light">
                      Post Service{" "}
                    </h2>
                  </div>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">Title</Form.Label>
                        <Form.Control
                          type="text"
                          name="title"
                          value={service.title}
                          onChange={(e) => handleInput(e, setService)}
                          placeholder="enter title"
                        />
                      </Form.Group>
                      <p className="text-danger">{formErrors?.title}</p>

                      <FileInput
                        namer="image"
                        label="Choose Image"
                        handleInputImage={handleInputImage}
                        setHook={setService}
                        type="image"
                        value={service.image}
                        formErrors
                      />

                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                          name="content"
                          value={service.value}
                          as="textarea"
                          rows={6}
                          onChange={(e) => handleInput(e, setService)}
                        />
                      </Form.Group>

                      <p className="text-danger">{formErrors?.content}</p>
                      <div className="d-grid">
                        {status !== "loading" ? (
                          <Button
                            variant="primary"
                            type="submit"
                            onClick={handleSubmit}
                          >
                            Post Service
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

export default ServiceForm;
