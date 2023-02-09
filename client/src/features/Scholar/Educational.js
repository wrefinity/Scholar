import React from "react";
import { useSelector } from "react-redux";
import { selectAllCategories } from "../../Slicer/Categories";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
const Educational = ({
  scholar,
  setScholar,
  handleInputImage,
  handleInput,
  FileInput,
  page,
  setPage,
  x,
  setX,
  handleSubmit,
}) => {
  const categories = useSelector(selectAllCategories);
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
                          name="scholarName"
                          value={scholar.scholarName}
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
                          name="scholarType"
                          required
                          value={scholar.scholarType}
                          onChange={(e) => handleInput(e, setScholar)}
                        >
                          <option>select scholarship level </option>
                         
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
                    <Button onClick={handleSubmit}>Submit </Button>
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