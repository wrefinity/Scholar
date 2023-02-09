import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPost,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "./postslice";
import PostElement from "./PostElement";

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPost);
  const status = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  let displayPosts;
  if (status === "loading") {
    displayPosts = <p>"Loading ..." </p>;
  } else if (status === "suceeded") {
    const ascendPost = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    displayPosts = ascendPost.map((post) => {
      <PostElement key={post.id} post={post} />;
    });
  } else if (status === "failed") {
    displayPosts = <p>"Error" </p>;
  }

  return (
    <div>
      <h3>Posts</h3>
      {displayPosts}
    </div>
  );
};

export default PostList;
