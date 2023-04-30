import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import CategoryForm from "../../features/Scholar/ScholarCategory";
import CategoryList from "../../features/Scholar/ScholarCategoryList";

const Category = () => {
  return (
    <Container fluid className="mt-4 mb-4">
      <Row>
        <CategoryForm />
      </Row>
      <Row>
        <CategoryList />
      </Row>
    </Container>
  );
};

export default Category;
