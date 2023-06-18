import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LineWave } from "react-loader-spinner";



import {
  handleInput,
  loaderSize,
  loaderColor,
  validateEmpty,
} from "../../Utils/InputHelpers";
import { reseter, resetPassword } from "../../Slicer/Auth";
const NewPassword = () => {
  const { user, status, message } = useSelector((state) => state.auth);
  const [formData, setResetPasswordInfo] = useState({
    password: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const referal = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, token } = useParams();

  const reset = () => {
    setResetPasswordInfo({
      password: "",
    });
  };

  useEffect(() => {
    referal.current();
  }, [formErrors, status, message, navigate, dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    setFormErrors(validateEmpty(formData));
    setIsSubmit(true);
  };

  const dispatchNewPassword = () => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(resetPassword({ ...formData, id, token }));
      setIsSubmit(false);
    }

    if (status === "succeeded" || user) {
      toast.success(message, { autoClose: 2000 });
      dispatch(reseter());
      reset();
      navigate("/login");
    }
    if (status === "failed") {
      dispatch(reseter());
      toast.error(message, { autoClose: 4000 });
      setIsSubmit(false);
    }
  };
  referal.current = dispatchNewPassword;
  return (
    <div className="mb-5 mt-5 pb-5 ">
      <Container className="mb-5 mt-5 pb-5">
        <Row className=" d-flex justify-content-center align-items-center">
          <Col md={4} lg={4} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className="bg-nav p-4 mb-4">
                    <h2 className="fw-bold mb-2  text-center text-light">
                      RESET PASSWORD
                    </h2>
                  </div>

                  <div className="mb-3">
                    <Form onSubmit={handleLogin}>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={formData.password}
                          onChange={(e) => handleInput(e, setResetPasswordInfo)}
                        />
                      </Form.Group>
                      <p className="text-danger">{formErrors?.password}</p>


                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >

                      </Form.Group>
                      <div className="d-grid">
                        {status === "laoding" ? (
                          <LineWave
                            color={loaderColor}
                            height={loaderSize}
                            width={loaderSize}
                          />
                        ) : (
                          <Button variant="primary" type="submit">
                            Reset
                          </Button>
                        )}
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        already have an account {''}
                        <Link to="/login" className="text-primary fw-bold">
                          login
                        </Link>
                      </p>
                    </div>
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

export default NewPassword;