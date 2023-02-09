import React from 'react'

const SingleList = ({image, fullname, position, facebook, twitter, instagram }) => {
    return (
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={image} />
          <Card.Body>
            <Card.Title> {fullname}</Card.Title>
            <Card.Text>
              {position}
            </Card.Text>
            <Button variant="primary">Profile</Button>
          </Card.Body>
        </Card>
      );
}

export default SingleList