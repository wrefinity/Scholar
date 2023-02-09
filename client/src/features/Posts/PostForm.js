import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import { addPost, reseter } from "./postslice";
import { HandleInput, validateEmpty } from "../FormHelper";

const PostForm = () => {
  const [post, setPost] = useState({
    title: "",
    content: "",
    userId: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const { status, message } = useSelector((state) => state.posts);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validateEmpty(post));
    setIsSubmit(true);
  };

  const reset = () => {
    setPost({
      title: "",
      image: "",
      content: "",
      userId: "",
    });
  };
  useEffect(() => {
    referal.current();
  }, [formErrors, status, message, dispatch]);


  const dispatchPost = () => {
    if (Object.keys(formErrors).length === 0 && isSubmit && status === "idle") {
      dispatch(addPost(post));
      reset();
      dispatch(reseter())
    }
    if (status === "succeeded") {
      reset();
      dispatch(reseter());
      toast.success("record added", { autoClose: 2000 });
    }
    if (status === "failed") {
      dispatch(reseter());
      toast.error(message, { autoClose: 4000 });
    }
  };
  referal.current = dispatchPost;

  return (
    <Form>
      <Form.Group className="mb-3" onSubmit={handleSubmit}>
        <Form.Label> Title </Form.Label>
        <Form.Control 
         type="text"
         name="name"
         value={post.name}
         placeholder="enter post title"
         onChange={(e) => {
           HandleInput(e, setPost);
         }}
        />
      </Form.Group>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Image</Form.Label>
        <Form.Control 
        type="file"
        name="image"
        value={post.image}
        onChange={(e) => {
          HandleInput(e, setPost);
        }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Content</Form.Label>
        <Form.Control 
        as="textarea"
         rows={3} 
        name="description"
        value={post.content}
        className="form-control"
        onChange={(e) => handleInput(e, setPost)}
        />
      </Form.Group>
    </Form>
  );
};

export default PostForm;