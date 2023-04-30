import React, { useState, useRef, useEffect } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LineWave } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import {
  handleInput,
  validateEmpty,
  loaderSize,
  loaderColor,
} from "../../Utils/InputHelpers";
import {
  reseter,
  createCategory,
  updateCategories,
} from "../../Slicer/Categories";

const ScholarCategory = () => {
  const [category, setCategory] = useState({
    name: "",
    amount: "",
    status: "",
  });
  const { status, message } = useSelector((state) => state.categories);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const { id } = useParams();
  const referal = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    referal.current();
  }, [formErrors, status, message, dispatch]);

  const reset = () => {
    setCategory({
      name: "",
      amount: "",
      status: "",
    });
  };

  const dispatchCat = () => {
    reseter();
    if (Object.keys(formErrors).length === 0 && isSubmit && status === "idle") {
      dispatch(createCategory(category));
      dispatch(reseter());
      setIsSubmit(false);
    }

    // if (
    //   id &&
    //   Object.keys(formErrors).length === 0 &&
    //   isSubmit &&
    //   status === "idle"
    // ) {
    //   dispatch(updateCategories({ _id: id, ...category }));
    //   setIsSubmit(false);
    // }

    if (status === "succeeded") {
      toast.success("Operation Successful", { autoClose: 2000 });
      reset();
      dispatch(reseter());
      setIsSubmit(false);
    }
    if (message === "failed") {
      toast.error(message, { autoClose: 4000 });
      dispatch(reseter());
      setIsSubmit(false);
    }
  };
  referal.current = dispatchCat;

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validateEmpty(category));
    setIsSubmit(true);
  };

  return (
    <div className="mb-5 pb-5">
      <Container className="mt-5 pt-5 pb-5">
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className="bg-nav p-4 mb-4">
                    <h2 className="fw-bold mb-2  text-center text-light">
                      Post Scholarship Category{" "}
                    </h2>
                  </div>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <p className="text-danger">{formErrors?.all}</p>
                        <Form.Label className="text-center">
                          Scholarship name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={category.name}
                          placeholder="enter scholarship name"
                          onChange={(e) => handleInput(e, setCategory)}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                          name="amount"
                          value={category.amount}
                          onChange={(e) => handleInput(e, setCategory)}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea111"
                      >
                        <Form.Label className="text-center">
                          Scholarship Status
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          name="status"
                          value={category.status}
                          onChange={(e) => handleInput(e, setCategory)}
                        >
                          <option>select scholarship state </option>
                          <option value={"active"}>active </option>
                          <option value={"inactive"}>in-active </option>
                        </Form.Select>
                      </Form.Group>
                      <div className="d-grid mt-4">
                        {isSubmit !== "loading" ? (
                          <Button variant="primary" type="submit">
                            Submit
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

export default ScholarCategory;
