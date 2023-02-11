import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { handleInput, validate } from "../../Utils/InputHelpers";
import { register, reseter } from "../../Slicer/Auth";
const SignUp = () => {
  const { status, message } = useSelector((state) => state.auth);
  const [signupData, setSignup] = useState({
    email: "",
    fullname: "",
    username: "",
    password: "",
    confirm_password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const referal = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reset = () => {
    setSignup({
      email: "",
      fullname: "",
      username: "",
      password: "",
      confirm_password: "",
    });
  };

  useEffect(() => {
    referal.current();
  }, [formErrors, status, message, navigate, dispatch]);

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(signupData);
    setFormErrors(validate(signupData));
    setIsSubmit(true);
  };

  const dispatchSignup = () => {
    if (Object.keys(formErrors).length === 0 && isSubmit && status === "idle") {
      register(signupData);
      setIsSubmit(false);
    }

    if (status === "succeeded") {
      toast.success("register success", { autoClose: 2000 });
      reset();
      dispatch(reseter());
      setIsSubmit(false);
      navigate("/login");
    }
    if (status === "succeeded") {
      toast.error(message, { autoClose: 4000 });
      dispatch(reseter());
    }
  };
  referal.current = dispatchSignup;

  return (
    <div className="mb-5 mt-5 pb-5">
      <Container className="mb-5 mt-5 pb-5 pt-5">
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className="bg-nav p-4 mb-4">
                    <h2 className="fw-bold mb-2  text-center text-light">
                      Sign Up
                    </h2>
                  </div>
                  <div className="mb-3">
                    <Form onSubmit={handleSignup}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Fullname
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="fullname"
                          value={signupData.fullname}
                          onChange={(e) => handleInput(e, setSignup)}
                          placeholder="Enter username"
                        />
                      </Form.Group>
                      <p className="text-danger">{formErrors?.fullname}</p>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Username
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="username"
                          value={signupData.username}
                          onChange={(e) => handleInput(e, setSignup)}
                          placeholder="Enter username"
                        />
                      </Form.Group>
                      <p className="text-danger">{formErrors?.username}</p>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={signupData.email}
                          onChange={(e) => handleInput(e, setSignup)}
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
                          value={signupData.password}
                          onChange={(e) => handleInput(e, setSignup)}
                        />
                      </Form.Group>
                      <p className="text-danger">{formErrors?.password}</p>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword2"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="confirm Password"
                          name="confirm_password"
                          value={signupData.confirm_password}
                          onChange={(e) => handleInput(e, setSignup)}
                        />
                      </Form.Group>
                      <p className="text-danger">
                        {formErrors?.confirm_password}
                      </p>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        {status !== "loading" ? (
                          ""
                        ) : (
                          <Button variant="primary" type="submit">
                            SignUp
                          </Button>
                        )}
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account?{" "}
                        <Link to={"/login"} className="text-primary fw-bold">
                          Login
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

export default SignUp;
