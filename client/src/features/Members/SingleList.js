import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const SingleList = ({
  image,
  fullname,
  position,
  facebook,
  twitter,
  instagram,
}) => {
  return (
    <Card style={{ width: "18rem" }} className="border-0">
      <Card.Img variant="top" src={image} />
      <Card.Body className="justify-content-center align-items-center text-center">
        <Card.Title> {fullname}</Card.Title>
        <Card.Text>{position}</Card.Text>
        <span className="mb-3">
          <Link to={facebook}>
            <FaFacebookF size="1em" fill="#920058" />
          </Link>
          <Link to={twitter}>
            <FaTwitter size="1em" fill="#f40594" />
          </Link>
          <Link to={instagram}>
            <FaLinkedin size="1em" fill="#920058" />
          </Link>
        </span>
        <div>
          <Button variant="success">Profile</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SingleList;
