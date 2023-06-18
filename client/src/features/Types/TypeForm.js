import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Container, Card, Form } from "react-bootstrap";
import { LineWave } from "react-loader-spinner";
import { toast } from "react-toastify";
import {
  handleInput,
  validateEmpty,
  loaderSize,
  loaderColor,
} from "../../Utils/InputHelpers";
import { createTypes, reseter } from "../../Slicer/Types";

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
      dispatch(createTypes(category));
      dispatch(reseter());
      setIsSubmit(false);
    }
    if (status === "succeeded") {
      reset();
      dispatch(reseter());
      toast.success(message, { autoClose: 2000 });
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
    <Container fluid className="mt-5 pt-5 mb-5">
      <Row className="d-flex justify-content-center align-items-center">
        <Card className="shadow">
          <Card.Body>
            <div className="mb-3 mt-md-4">
              <div className=" bg-nav p-4 mb-4">
                <h3 className="fw-bold mb-2  text-center text-light">
                  Applicant Category{" "}
                </h3>
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
                      <Button variant="primary" type="submit" className="mt-3">
                        Create Applicant
                      </Button>
                    )}
                  </div>
                </Form>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default TypeForm;
