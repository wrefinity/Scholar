import React from "react";
import { useSelector } from "react-redux";
import { selectPostByUserId } from "./UserSlice";
import { useParams } from "react-router-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const UserPost = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectPostByUserId(state, userId));

  const postsForUser = useSelector((state) => {
    const allPosts = selectAllPost(state);
    return allPosts.filter((post) => post.userId === userId);
  });

  return (
    <Container fluid>
    <Row>
      <Col>Users Post</Col>
    </Row>
  </Container>
  );
};
export default UserPost;