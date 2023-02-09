import React from "react";
import PostReaction from "./PostReaction";
import TimeAgo from "../TimeAgo";
import { Link } from "react-router-dom";

const PostElement = ({ post }) => {
  return (
    <Link to={`/user/${post.id}`}>
      <article>
        <h3>{post.title}</h3>
        <p>{post.content.substring(0, 100)} ...</p>
        <p>
          <TimeAgo timestamp={posts.date} />
        </p>
        <PostReaction post={post} />
      </article>
    </Link>
  );
};
export default PostElement;
