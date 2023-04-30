import React from "react";
import { useSelector } from "react-redux";
import { Table, Row, Container, Col } from "react-bootstrap";
import { selectAllPost, getPostStatus } from "../../Slicer/Post";
import { Link } from "react-router-dom";
import moment from "moment";

const PostList = () => {
  const posts = useSelector(selectAllPost);
  const status = useSelector(getPostStatus);

  let categoryTable;
  if (status === "loading") {
    categoryTable = <p>"Loading ..." </p>;
  } else if (status === "suceeded" || status === "idle") {
    categoryTable = !posts
      ? ""
      : posts.map((cat) => {
          return (
            <tr key={cat?._id}>
              <td>{moment(cat.createdAt).format("DD/MM/YYYY")}</td>
              <td
                scope="col"
                className="justify-content-center align-items-center p-4"
              >
                <img
                  src={`${cat?.image}`}
                  alt=""
                  style={{ width: "100px", height: "100px" }}
                  className="rounded-circle"
                />
              </td>
              <td>
                <p>{cat?.categoryId?.name}</p>
                <span className="text-success">FEES: </span>
                {cat?.categoryId?.amount}{" "}
              </td>
              <td>
                <p>POST-GRADUATE: {cat?.benefit?.benefitPost}</p>
                <p>UNDER-GRADUATE: {cat?.benefit?.benefitUnder}</p>
                <p>SECONDARY-SCHOOL: {cat?.benefit?.benefitPre}</p>
              </td>
              <td>{moment(cat.deadline).format("DD/MM/YYYY")}</td>
              <td>
                <p>POST-GRADUATE: {cat?.eligibility?.eligibilityPost}</p>
                <p>UNDER-GRADUATE: {cat?.eligibility?.eligibilityUnder}</p>
                <p>SECONDARY-SCHOOL: {cat?.eligibility?.eligibilityPre}</p>
              </td>
              <td>
                {cat?.eligible_country.map((c, index) => (
                  <p key={index}>{c}</p>
                ))}
              </td>
              <td>
                {cat?.host}, {cat?.country}
              </td>
              <td>
                <Link to={`/scholars_update/${cat?._id}`}>
                  <button className="btn  btn-primary m-1 mb-1">Edit</button>
                </Link>
              </td>
            </tr>
          );
        });
  }

  return (
    <Container
      fluid
      className="mb-5 mt-5 pt-5 justify-content-center align-items-center mbt"
    >
      <Row className="justify-content-center align-items-center">
        <Col md="12" lg="12" sm="12">
          <Row className="mt-5 p-4 cus_color text-center text-uppercase">
            <h2>Scholarship </h2>
          </Row>
          <Table striped className="mb-5" align="middle">
            <thead className="cus_color text-uppercase">
              <tr>
                <th scope="col"> Date </th>
                <th scope="col"> Image </th>
                <th scope="col"> Name/cost </th>
                <th scope="col"> Benefit </th>
                <th scope="col"> Deadline </th>
                <th scope="col"> Eligibility </th>
                <th scope="col"> Eligible Country </th>
                <th scope="col"> Host </th>
                <th scope="col"> Controls </th>
              </tr>
            </thead>
            <tbody>{categoryTable}</tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default PostList;
