import React from 'react'
import { Col } from 'react-bootstrap';

const SingleList = ({image, content, title}) => {
    return (
        <Card as={Col} style={{ width: '18rem' }}>
          <Card.Img variant="top" src={image} />
          <Card.Body>
            <Card.Title> {title}</Card.Title>
            <Card.Text>
              {content}
            </Card.Text>
          </Card.Body>
        </Card>
      );
}

export default SingleList