import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllCategories } from "../../Slicer/Categories";
import { selectAllTypes } from "../../Slicer/Types";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import ScholarPayment from "./ScholarPayment";
import { toast } from "react-toastify";
const Educational = ({
  scholar,
  handleInputImage,
  handleInput,
  setScholar,
  FileInput,
  page,
  setPage,
  x,
  setX,
  reset,
  reseter,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const categories = useSelector(selectAllCategories);
  const all_types = useSelector(selectAllTypes);
  const [checker, setChecker] = useState({
    signature: "",
    passport: "",
    idCard: "",
    letter: "",
    result: "",
    scholarType: "",
    scholarLevel: "",
  });

  const checkerReset = () => {
    setChecker({
      signature: "",
      passport: "",
      idCard: "",
      letter: "",
      result: "",
      scholarType: "",
      scholarLevel: "",
    });
  };

  const checkVals = [
    "signature",
    "letter",
    "idCard",
    "passport",
    "result",
    "scholarType",
    "scholarLevel",
  ];

  const categoriesOption = !categories
    ? ""
    : Array.from(categories)
        .sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        })
        .map((cat) => {
          return (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          );
        });
  const TypesOption = !all_types
    ? ""
    : Array.from(all_types)
        .sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        })
        .map((cat) => {
          return (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          );
        });

  const handleSubmited = (e) => {
    e.preventDefault();
    checkerReset();
    for (const x of checkVals) {
      if (scholar[x] === "" || scholar[x] === null) {
        checker[x] = `${x} required`;
        toast.error(checker[x], { autoClose: 4000 });
      }
    }
    // setFormErrors(validateEmpty(scholar));
    const check_sta = Object.values(checker).every(
      (x) => x === null || x === ""
    );
    console.warn(check_sta);
    if (check_sta) {
      setSubmitted(true);
    }

    // if (validateEmpty(scholar))
    //   if (Object.keys(formErrors).length === 0) setSubmitted(true);
    //   else toast.error(`${formErrors.all}`, { autoClose: 2000 });
  };
  return (
    <div className="mb-5 mt-5 pb-5">
      <Container className="mb-5 mt-5 pb-5">
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={12} lg={12} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className="bg-nav p-4 mb-4">
                    <h2 className="fw-bold mb-2  text-center text-light">
                      Apply Scholarship
                    </h2>
                  </div>
                  <div className="mb-3">
                    <Row className="mb-3">
                      <Form.Group as={Col} md="6" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Scholarship Type
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          name="scholarType"
                          value={scholar.scholarType}
                          onChange={(e) => handleInput(e, setScholar)}
                        >
                          <option>select scholarship </option>
                          {categoriesOption}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group as={Col} md="6" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Scholarship Level
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          name="scholarLevel"
                          required
                          value={scholar.scholarLevel}
                          onChange={(e) => handleInput(e, setScholar)}
                        >
                          <option>select scholarship level </option>
                          {TypesOption}
                        </Form.Select>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <FileInput
                        namer="idCard"
                        label="Identity Card (Preferable student id-card)"
                        handleInputImage={handleInputImage}
                        setHook={setScholar}
                        required
                        type="image"
                        value={scholar.idCard}
                        formErrors
                      />
                      <FileInput
                        namer="passport"
                        label="Provide Recent Passport photograph"
                        handleInputImage={handleInputImage}
                        setHook={setScholar}
                        type="image"
                        required
                        value={scholar.passport}
                        formErrors
                      />
                    </Row>
                    <Row className="mb-3">
                      <FileInput
                        namer="signature"
                        label="Provide an E-signature"
                        handleInputImage={handleInputImage}
                        setHook={setScholar}
                        type="image"
                        required
                        value={scholar.signature}
                        formErrors
                      />
                    </Row>
                    <Row className="mb-3">
                      <FileInput
                        namer="letter"
                        label="Provide a evidence letter from your school (Admission letter for both undergraduate and postgraduate while a consent letter from school principal )"
                        handleInputImage={handleInputImage}
                        setHook={setScholar}
                        type="image"
                        required
                        value={scholar.letter}
                        formErrors
                      />
                    </Row>
                    <Row className="mb-3">
                      <FileInput
                        namer="result"
                        label="Provide a recent result (O level, statement of result, postgraduate result)"
                        handleInputImage={handleInputImage}
                        setHook={setScholar}
                        required
                        type="image"
                        value={scholar.result}
                        formErrors
                      />
                    </Row>

                    <Button
                      onClick={() => {
                        setPage(page - 1);
                        setX(1000);
                      }}
                    >
                      Previous{" "}
                    </Button>
                    <Button onClick={handleSubmited}>Submit </Button>
                    {submitted && (
                      <ScholarPayment
                        scholar={scholar}
                        reset={reset}
                        reseter={reseter}
                      />
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

export default Educational;
