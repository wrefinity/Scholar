import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../../Slicer/Post";
import FormEdit from "./FormEdit";

const ScholarFormUpdate = () => {
  const { scholarId } = useParams();
  const navigate = useNavigate();
  const targetScholar = useSelector((state) => getPostById(state, scholarId));
  const displayForm = !targetScholar ? (
    navigate("/scholarships")
  ) : (
    <FormEdit scholar={targetScholar} />
  );

  return <div className="mb-5 pb-5 mbt">{displayForm}</div>;
};

export default ScholarFormUpdate;
