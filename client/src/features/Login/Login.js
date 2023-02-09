import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LineWave } from "react-loader-spinner";

import {
  handleInput,
  loaderSize,
  loaderColor,
  validateEmpty,
} from "../../Utils/InputHelpers";
import { reseter, login } from "../../Slicer/Auth";
const Login = () => {
  const { user, status, message } = useSelector((state) => state.auth);
  const [loginData, setLogin] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const referal = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // to navigate to where you came from
  // const backward = () => navigate(-1);
  // a scenario where user required a page and not logged in
  const redirector = () => {
    navigate(from, { replace: true });
  };

  const reset = () => {
    setLogin({
      email: "",
      password: "",
    });
  };

  useEffect(() => {
    referal.current();
  }, [formErrors, status, message, navigate, dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    setFormErrors(validateEmpty(loginData));
    setIsSubmit(true);
  };

  const dispatchLogin = () => {
    if (Object.keys(formErrors).length === 0 && isSubmit && status === "idle") {
      dispatch(login(loginData));
      dispatch(reseter());
      setIsSubmit(false);
    }

    if (status === "succeeded" || user) {
      toast.success("login sucess", { autoClose: 2000 });
      reset();
      dispatch(reseter());
      redirector();
    }
    if (status === "failed") {
      dispatch(reseter());
      toast.error(message, { autoClose: 4000 });
    }
  };
  referal.current = dispatchLogin;
  return (
    <div className="mb-5 mt-5 pb-5">
      <Container className="mb-5 mt-5 pb-5">
        <Row className=" d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className="bg-nav p-4 mb-4">
                    <h2 className="fw-bold mb-2  text-center text-light">
                      LOGIN
                    </h2>
                  </div>

                  <div className="mb-3">
                    <Form onSubmit={handleLogin}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={loginData.email}
                          onChange={(e) => handleInput(e, setLogin)}
                          placeholder="Enter email"
                        />
                      </Form.Group>

                      <p className="text-danger">{formErrors?.email}</p>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={loginData.password}
                          onChange={(e) => handleInput(e, setLogin)}
                        />
                      </Form.Group>
                      <p className="text-danger">{formErrors?.password}</p>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <p className="small">
                          <a className="text-primary" href="#!">
                            Forgot password?
                          </a>
                        </p>
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
                            Login
                          </Button>
                        )}
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-primary fw-bold">
                          Sign Up
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

export default Login;
