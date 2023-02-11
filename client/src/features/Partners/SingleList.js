import React from 'react'

const SingleList = ({image}) => {
    return (
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={image} />
        </Card>
      );
}

export default SingleList