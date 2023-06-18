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
  handleInputImage,
} from "../../Utils/InputHelpers";
import { FileInput } from "../../Utils/FileInput";
import { createMembers, reseter } from "../../Slicer/Members";

const MemberForm = () => {
  const [member, setMembers] = useState({
    fullname: "",
    position: "",
    email: "",
    twitter: "",
    instagram: "",
    facebook: "",
    image: "",
    about: "",
  });
  const { status, message } = useSelector((state) => state.members);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const referal = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    referal.current();
  }, [formErrors, status, message, dispatch]);

  const reset = () => {
    setMembers({
      fullname: "",
      position: "",
      email: "",
      twitter: "",
      instagram: "",
      facebook: "",
      image: "",
      about: "",
    });
  };

  const dispatchMember = () => {
    if (Object.keys(formErrors).length === 0 && isSubmit && status === "idle") {
      dispatch(createMembers(member));
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
  referal.current = dispatchMember;

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validateEmpty(member));
    setIsSubmit(true);
  };

  return (
    <div className="mb-5">
      <Container className="mt-5 pt-5 mb-5">
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className=" bg-nav p-4 mb-4">
                    <h2 className="fw-bold mb-2  text-center text-light">
                      Create Member{" "}
                    </h2>
                  </div>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicFull">
                        <Form.Label className="text-center">
                          Fullname
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="fullname"
                          value={member.fullname}
                          onChange={(e) => handleInput(e, setMembers)}
                          placeholder="enter fullname"
                        />
                      </Form.Group>
                      <p className="text-danger">{formErrors?.fullname}</p>
                      <Form.Group className="mb-3" controlId="formBasicPos">
                        <Form.Label className="text-center">
                          Position
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="position"
                          value={member.position}
                          onChange={(e) => handleInput(e, setMembers)}
                          placeholder="enter position"
                        />
                      </Form.Group>
                      <p className="text-danger">{formErrors?.position}</p>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="enter email"
                          name="email"
                          value={member.email}
                          onChange={(e) => handleInput(e, setMembers)}
                        />
                      </Form.Group>
                      <p className="text-danger">{formErrors?.email}</p>

                      <Form.Group className="mb-3" controlId="formBasicLink">
                        <Form.Label className="text-center">
                          Facebook Link
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="facebook"
                          placeholder="enter facebook link"
                          value={member.facebook}
                          onChange={(e) => handleInput(e, setMembers)}
                        />
                      </Form.Group>
                      <p className="text-danger">{formErrors?.facebook}</p>
                      <Form.Group className="mb-3" controlId="formBasicLink">
                        <Form.Label className="text-center">
                          Twitter Link
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="twitter"
                          value={member.twitter}
                          onChange={(e) => handleInput(e, setMembers)}
                          placeholder="enter twitter link"
                        />
                      </Form.Group>
                      <p className="text-danger">{formErrors?.twitter}</p>
                      <Form.Group className="mb-3" controlId="formBasicInst">
                        <Form.Label className="text-center">
                          Instagram Link
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="instagram"
                          value={member.instagram}
                          onChange={(e) => handleInput(e, setMembers)}
                          placeholder="enter instagram link"
                        />
                      </Form.Group>
                      <p className="text-danger">{formErrors?.instagram}</p>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>About</Form.Label>
                        <Form.Control
                          name="about"
                          value={member.about}
                          as="textarea"
                          rows={6}
                          onChange={(e) => handleInput(e, setMembers)}
                        />
                      </Form.Group>
                      <p className="text-danger">{formErrors?.about}</p>

                      <FileInput
                        namer="image"
                        label="Choose Image"
                        handleInputImage={handleInputImage}
                        setHook={setMembers}
                        type="image"
                        value={member.image}
                        formErrors
                      />

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
                            Create Member
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

export default MemberForm;
