import React, { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { handleInput, validateEmpty } from "../../Utils/InputHelpers";
import { getPergantsById} from "../../Slicer/Pergent";
import { useNavigate, useParams } from "react-router-dom";


const PergantVote = () => {
  const [formData, setFormData] = useState({
    voters: "",
    phone: "",
    email: "",
    amount: "",
  });
  const { pergentId } = useParams();
  const pergants = useSelector((state) => getPergantsById(state, pergentId));
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validateEmpty(formData));

    if (validateEmpty(formData) && Object.keys(formErrors).length === 0) {
      localStorage.setItem("voter", JSON.stringify(formData));
      navigate(`/model_payments/${pergentId}`);
    } else {
      toast.error(`${formErrors.all}`, { autoClose: 2000 });
    }
  };

  return (
    <Container fluid className="mt-5  mb-5 pt-5  justify-content-center mbt">
      <Row className=" justify-content-center">
        <Col md="4" lg="4" sm="12">
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-4">
                <div className="bg-nav p-4 mb-4">
                  <h2 className="fw-bold mb-2  text-center text-light">
                    Vote {pergants?.name}
                  </h2>
                </div>
                <div className="mb-3">
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="text-center">
                        Voter's Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="voters"
                        value={formData.name}
                        placeholder="enter your name"
                        onChange={(e) => handleInput(e, setFormData)}
                      />
                    </Form.Group>
                    <p className="text-danger">{formErrors?.name}</p>
                    <Form.Group className="mb-3" controlId="formBasicxxEmail">
                      <Form.Label className="text-center">
                        Voter's Email
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="enter your email"
                        onChange={(e) => handleInput(e, setFormData)}
                      />
                    </Form.Group>
                    <p className="text-danger">{formErrors?.email}</p>
                    <Form.Group className="mb-3" controlId="formBasicxEmail">
                      <Form.Label className="text-center">
                        Voter's Phone
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={formData.phone}
                        placeholder="enter your phone number"
                        onChange={(e) => handleInput(e, setFormData)}
                      />
                    </Form.Group>
                    <p className="text-danger">{formErrors?.phone}</p>
                    <Form.Group className="mb-3" controlId="formBasicxEmail">
                      <Form.Label className="text-center">Amount</Form.Label>
                      <Form.Control
                        type="text"
                        name="amount"
                        value={formData.amount}
                        placeholder="enter the payable amount"
                        onChange={(e) => handleInput(e, setFormData)}
                      />
                    </Form.Group>
                    <p className="text-danger">{formErrors?.phone}</p>

                    <div className="d-grid">
                      <Button variant="primary" onClick={handleSubmit}>
                        Vote
                      </Button>

                      {/* {submitted && (
                        <PergentPayment
                          voter={formData}
                          pergants={pergants}
                          reseter={reseter}
                        />
                      )} */}
                    </div>
                  </Form>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <div className="m"></div> */}
    </Container>
  );
};

export default PergantVote;
