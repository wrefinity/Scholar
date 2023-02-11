import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { LineWave } from "react-loader-spinner";
import { toast } from "react-toastify";
import {
  handleInput,
  validateEmpty,
  loaderSize,
  loaderColor,
} from "../../Utils/InputHelpers";
import { createCategory, reseter } from "../../Slicer/Categories";

const TypeForm = () => {
  const [category, setCategory] = useState({
    name: "",
  });
  const { status, message } = useSelector((state) => state.categories);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const referal = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    referal.current();
  }, [formErrors, status, message, dispatch]);

  const reset = () => {
    setCategory({
      name: "",
    });
  };

  const dispatchFormData = () => {
    if (Object.keys(formErrors).length === 0 && isSubmit && status === "idle") {
      dispatch(createCategory(category));
      dispatch(reseter());
      setIsSubmit(false);
    }
    if (status === "succeeded") {
      reset();
      dispatch(reseter());
      toast.success("record added", { autoClose: 2000 });
      setIsSubmit(false);
    }
    if (status === "failed") {
      dispatch(reseter());
      toast.error(message, { autoClose: 4000 });
      setIsSubmit(false);
    }
  };
  referal.current = dispatchFormData;

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validateEmpty(category));
    setIsSubmit(true);
  };

  return (
    <div className="mb-5 pb-5">
      <Container className="mt-5 pt-5 mb-5">
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className=" bg-nav p-4 mb-4">
                    <h2 className="fw-bold mb-2  text-center text-light">
                      Create Applicant Category{" "}
                    </h2>
                  </div>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicFull">
                        <Form.Label className="text-center">
                          Name of Applicant
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          required
                          value={category.name}
                          onChange={(e) => handleInput(e, setCategory)}
                          placeholder="enter name"
                        />
                      </Form.Group>
                      <p className="text-danger">{formErrors?.fullname}</p>

                      <div className="d-grid">
                        {status === "loading" ? (
                          <div className="d-flex justify-content-center">
                            <LineWave
                              color={loaderColor}
                              height={loaderSize}
                              width={loaderSize}
                            />
                          </div>
                        ) : (
                          <Button
                            variant="primary"
                            type="submit"
                            className="mt-3"
                          >
                            Create Applicant
                          </Button>
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

export default TypeForm;
