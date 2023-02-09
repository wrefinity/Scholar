import React, { useState, useRef, useEffect } from "react";
import Personal from "./Personal";
import Educational from "./Educational";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  handleInput,
  handleInputImage,
  validateEmpty,
} from "../../Utils/InputHelpers";
import { FileInput } from "../../Utils/FileInput";
import { createScholarsPost, reseter } from "../../Slicer/Post";

const ScholarIndex = () => {
  const [page, setPage] = useState(0);
  const [x, setX] = useState(0);
  const [scholar, setScholar] = useState({
    postId: "",
    firstname: "",
    lastname: "",
    middlename: "",
    email: "",
    city: "",
    state: "",
    zip: "",
    localGovt: "",
    country: "",
    scholarType: "",
    scholarName: "",
    idCard: "",
    letter: "",
    result: "",
    passport: "",
    signature: "",
  });
  const reset = () => {
    setScholar({
      postId: "",
      firstname: "",
      lastname: "",
      middlename: "",
      email: "",
      city: "",
      state: "",
      zip: "",
      localGovt: "",
      country: "",
      scholarType: "",
      scholarName: "",
      idCard: "",
      letter: "",
      result: "",
      passport: "",
      signature: "",
    });
  };

  const dispatch = useDispatch();
  const referal = useRef();
  const { status, message } = useSelector((state) => state.posts);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validateEmpty(scholar));
    setIsSubmit(true);
  };

  useEffect(() => {
    referal.current();
  }, [formErrors, message, dispatch]);

  const addScholar = async () => {
    if (Object.keys(formErrors).length === 0 && status === "idle" && isSubmit) {
      dispatch(createScholarsPost(scholar));
    }

    if (status === "succeeded") {
      toast.success("record added", { autoClose: 2000 });
      reset();
      reseter();
    }
    if (status === "failed") {
      toast.error(message, { autoClose: 4000 });
      reseter();
    }
  };
  referal.current = addScholar;

  useEffect(() => {
    referal.current();
  }, []);

  const componentList = [
    <Personal
      scholar={scholar}
      handleInputImage={handleInputImage}
      handleInput={handleInput}
      FileInput={FileInput}
      page={page}
      setPage={setPage}
      x={x}
      setX={setX}
    />,
    <Educational
      scholar={scholar}
      setScholar={setScholar}
      handleInputImage={handleInputImage}
      handleInput={handleInput}
      FileInput={FileInput}
      page={page}
      setPage={setPage}
      x={x}
      setX={setX}
      handleSubmit={handleSubmit}
    />,
  ];
  return (
    <div className="App">
      <div className="progress-bar">
        {
          <div
            style={{
              width: page === 0 ? "50%" : page === 1 ? "100%" : "",
            }}
          ></div>
        }
      </div>

      <div className="body">{componentList[page]}</div>
    </div>
  );
};

export default ScholarIndex;
