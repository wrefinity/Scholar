import React from "react";
import TimeAgo from "../TimeAgo";
import { Link } from "react-router-dom";

const PostElement = ({ post }) => {
  return (
    <Link to={`/user/${post.id}`}>
      <article>
        <h3>{post.title}</h3>
        <p>{post.body.substring(0, 100)} ...</p>
        <p>
          <TimeAgo timestamp={post.createdAt} />
        </p>
      </article>
    </Link>
  );
};
export default PostElement;
