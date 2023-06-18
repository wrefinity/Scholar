import React from "react";
import { Col } from "react-bootstrap";

export const GalleryCard = ({ title, content, image }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <div className="proj-imgbx">
        <img src={image}  className="img-pro"/>
        <div className="proj-txtx">
          <h4>{title}</h4>    
          <span>{content}</span>
        </div>
      </div>
    </Col>
  );
};

// const SingleList = ({image, title, created_at}) => {
//     return (
//         <Card className="bg-light text-dark ">
//           <Card.Img src={image} alt={_id} />
//           <Card.ImgOverlay className="m-5 d-flex justify-content-center align-items-center">
//             <Card.Title> {title}</Card.Title>
//             <Card.Title> {content}</Card.Title>
//             <Card.Text>Last updated {created_at}</Card.Text>
//           </Card.ImgOverlay>
//         </Card>
//       );
// }

export default GalleryCard;
