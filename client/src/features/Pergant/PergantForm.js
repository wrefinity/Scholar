import React, { useState, useRef, useEffect } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LineWave } from "react-loader-spinner";
import {
  handleInput,
  validateEmpty,
  loaderSize,
  loaderColor,
  handleInputImage,
} from "../../Utils/InputHelpers";
import { FileInput } from "../../Utils/FileInput";
import { reseter, createPergant } from "../../Slicer/Pergent";
import { sellectAllCatPergants } from "../../Slicer/CatPergant";

const PergantForm = () => {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    title: "",
  });
  const { status, message } = useSelector((state) => state.catpergants);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const referal = useRef();
  const dispatch = useDispatch();

  //get catgories
  const categories = useSelector(sellectAllCatPergants);
  const categoriesOption = !categories
    ? ""
    : Array.from(categories)
        .sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        })
        .map((category) => {
          return (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          );
        });
  useEffect(() => {
    referal.current();
  }, [formErrors, status, message, dispatch]);

  //TODO: get title
  const reset = () => {
    setFormData({
      image: "",
      name: "",
      title: "",
    });
  };

  const dispatchFormData = () => {
    if (Object.keys(formErrors).length === 0 && isSubmit && status === "idle") {
      dispatch(reseter());
      dispatch(createPergant(formData));
      setIsSubmit(false);
    }

    if (status === "succeeded") {
      toast.success("record added", { autoClose: 2000 });
      reset();
      dispatch(reseter());
      setIsSubmit(false);
    }
    if (status === "failed") {
      toast.error(message, { autoClose: 4000 });
      dispatch(reseter());
      setIsSubmit(false);
    }
  };
  referal.current = dispatchFormData;

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validateEmpty(formData));
    setIsSubmit(true);
  };

  return (
    <Container className="mt-5  mb-5 pt-5">
      <Card className="shadow">
        <Card.Body>
          <div className="mb-3 mt-4">
            <div className="bg-nav p-4 mb-4">
              <h2 className="fw-bold mb-2  text-center text-light">
                Post Pergants{" "}
              </h2>
            </div>
            <div className="mb-3">
              <Form onSubmit={handleSubmit}>
                <Form.Group
                  className="mb-3"
                  as={Col}
                  md="12"
                  controlId="formBasicXXEmail"
                >
                  <Form.Label className="text-center">Pergant Title</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="title"
                    value={formData.title}
                    onChange={(e) => handleInput(e, setFormData)}
                  >
                    <option>select pergant title</option>
                    {categoriesOption}
                  </Form.Select>
                </Form.Group>
                <p className="text-danger">{formErrors?.title}</p>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="text-center">Pergant Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="enter pergant name"
                    onChange={(e) => handleInput(e, setFormData)}
                  />
                </Form.Group>
                <p className="text-danger">{formErrors?.name}</p>

                <FileInput
                  namer="image"
                  label="Choose Image"
                  handleInputImage={handleInputImage}
                  setHook={setFormData}
                  type="image"
                  value={formData.image}
                  formErrors
                />
                <div className="d-grid">
                  {status !== "loading" ? (
                    <Button variant="primary" type="submit">
                      Post Pergant
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
      {/* <div className="m"></div> */}
    </Container>
  );
};

export default PergantForm;
