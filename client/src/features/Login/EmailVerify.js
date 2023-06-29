import React, { useRef, useEffect, useState } from "react";
import "./styler.css"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Col, Row, Container, Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LineWave } from "react-loader-spinner";
import {
  loaderSize,
  loaderColor,
} from "../../Utils/InputHelpers";
import { reseter, confirmEmail } from "../../Slicer/Auth";
import success from "../../assets/img/check.png";
const EmailVerify = () => {
  const { user, status, message } = useSelector((state) => state.auth);
  const [isSubmit, setIsSubmit] = useState(false);
  const [verified, setVerfify] = useState(false)
  const referal = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, token } = useParams();

  useEffect(() => {
    referal.current();
  }, [status, isSubmit, message, navigate, dispatch]);

  const handleConfirm = (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };

  const dispatchNewPassword = () => {
    if (isSubmit) {
      dispatch(confirmEmail({ id, token }));
      setIsSubmit(false);
      
    }

    if (status === "succeeded" || user) {
      toast.success(message, { autoClose: 2000 });
      dispatch(reseter());
      setVerfify(true)
      setTimeout(() => {
        navigate("/login");
      }, 5000);
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
      <Container className="mb-5 mt-5 pb-5" style={{ height: '50vh' }}>
        <Row className=" d-flex justify-content-center align-items-center">
          <Col md={4} lg={4} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className="bg-nav p-4 mb-4">
                    <h2 className="fw-bold mb-2  text-center text-light">
                      Email Confirmation
                    </h2>
                  </div>


                  <div className="mb-3">
                    {!verified ? (
                      <Form onSubmit={handleConfirm}>
                        <div className="d-grid">
                          {status === "loading" ? (
                            <LineWave
                              color={loaderColor}
                              height={loaderSize}
                              width={loaderSize}
                            />
                          ) : (
                            <Button variant="primary" type="submit">
                            confirm
                            </Button>
                          )}
                        </div>
                      </Form>


                    ) : (
                      <div className="mt-3">
                        <img src={success} alt="success_img" className='success_img' />
                        <p className="mb-0  text-center">
                          continue to {''}
                          <Link to="/login" className="text-primary fw-bold">
                            login
                          </Link>
                        </p>
                      </div>
                    )}
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

export default EmailVerify;