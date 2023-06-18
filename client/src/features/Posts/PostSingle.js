import React from 'react';
import {useSelector} from 'react-redux';
import {selectPostById} from './postslice';
import {Link, useParams} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
const PostSingle = () => {
    const {postId} = useParams();
    const post = useSelector(state => selectPostById(state, postId))
  return (
    <Container fluid>
    <Row>
      <Col>Single Post</Col>
    </Row>
  </Container>
  )
}

export default PostSingle