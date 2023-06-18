import React, { useState } from "react";
import Personal from "./Personal";
import Educational from "./Educational";
import { useSelector } from "react-redux";

import { handleInput, handleInputImage } from "../../Utils/InputHelpers";
import { FileInput } from "../../Utils/FileInput";
import { getPostById } from "../../Slicer/Post.js";
import { reseter } from "../../Slicer/ScholarApply";
import { useParams } from "react-router-dom";

const ScholarIndex = () => {
  const [page, setPage] = useState(0);
  const [x, setX] = useState(0);
  const { scholarId } = useParams();
  const targetScholar = useSelector((state) => getPostById(state, scholarId));
  const [scholar, setScholar] = useState({
    postId: "",
    firstname: "",
    lastname: "",
    middlename: "",
    email: "",
    city: "",
    state: "",
    amount: "",
    zip: "",
    localGovt: "",
    country: "",
    scholarType: "",
    scholarLevel: "",
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
      amount: "",
      zip: "",
      localGovt: "",
      country: "",
      scholarType: "",
      scholarLevel: "",
      idCard: "",
      letter: "",
      result: "",
      passport: "",
      signature: "",
    });
  };

  // set amount before checking for empty field;
  scholar.postId = targetScholar?._id;
  scholar.amount = targetScholar?.categoryId?.amount;
  
  const componentList = [
    <Personal
      scholar={scholar}
      handleInput={handleInput}
      scholarId={scholarId}
      setScholar={setScholar}
      page={page}
      setPage={setPage}
      x={x}
      setX={setX}
    />,
    <Educational
      scholar={scholar}
      scholarId={scholarId}
      handleInputImage={handleInputImage}
      handleInput={handleInput}
      setScholar={setScholar}
      FileInput={FileInput}
      page={page}
      setPage={setPage}
      x={x}
      setX={setX}
      reset={reset}
      reseter={reseter}
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
