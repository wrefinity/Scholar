import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { LineWave } from "react-loader-spinner";
import { toast } from "react-toastify";
import {
  validateEmpty,
  loaderSize,
  loaderColor,
  handleInputImage,
} from "../../Utils/InputHelpers";
import { FileInput } from "../../Utils/FileInput";
import { createPartners, reseter } from "../../Slicer/Partners";

const PartnerForm = () => {
  const [patner, setPatner] = useState({
    image: "",
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
    setPatner({
      image: "",
    });
  };

  const dispatchFormData = () => {
    if (Object.keys(formErrors).length === 0 && isSubmit && status === "idle") {
      dispatch(createPartners({ ...patner, image: String(patner.image) }));
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
    setFormErrors(validateEmpty(patner));
    setIsSubmit(true);
  };

  return (
    <div className="mb-5 pb-5">
      <Container className="mt-5 pt-5 mb-5">
        <Row className="">
          <Col md={12} lg={12} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className=" bg-nav p-4 mb-4">
                    <h2 className="fw-bold mb-2  text-center text-light">
                      Create Patners{" "}
                    </h2>
                  </div>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <FileInput
                        namer="image"
                        label="Choose Image"
                        handleInputImage={handleInputImage}
                        setHook={setPatner}
                        type="image"
                        value={patner.image}
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
                            Create Partner
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

export default PartnerForm;
