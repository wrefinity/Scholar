import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import PostList from "../../features/Posts/PostList";
import PostForm from "../../features/Posts/PostForm";

const Post = () => {
  return (
  <Container fluid>
    <Row>
      <PostForm />
    </Row>
    <Row>
      <PostList />
    </Row>
</Container>
  );
};

export default Post;