import React from "react";
import { Table, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPatners, deletePartners } from "../../Slicer/Partners";
import moment from "moment";
const PartnerList = () => {
  const partners = useSelector(selectAllPatners);
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    await dispatch(deletePartners(id));
  };
  const partnerTable = !partners
    ? ""
    : partners.map((pat) => {
        return (
          <tr>
            <td>{moment(pat.createdAt).format("DD/MM/YYYY")}</td>
            <td>
              <img
                src={`${pat.image}`}
                alt=""
                style={{ width: "100px", height: "100px" }}
                className="rounded-circle"
              />
            </td>
            <td scope="col">
              <button
                className="btn btn-sm btn-danger m-1 mb-1"
                onClick={() => {
                  handleDelete(pat._id);
                }}
              >
                delete
              </button>
            </td>
          </tr>
        );
      });

  return (
    <div className="mb-5 mt-5 d-flex justify-content-center align-items-center">
      <Table striped className="mb-5" align="middle">
        <thead>
          <tr>
            <th scope="col"> Date </th>
            <th scope="col"> Image </th>
            <th scope="col"> Controls </th>
          </tr>
        </thead>
        <tbody>{partnerTable}</tbody>
      </Table>
    </div>
  );
};

export default PartnerList;
