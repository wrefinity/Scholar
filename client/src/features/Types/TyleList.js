import React from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectAllTypes, deleteType } from "../../Slicer/Types";
import moment from "moment";
const TyleList = () => {
  const categories = useSelector(selectAllTypes);
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    await dispatch(deleteType(id));
  };
  const categoryTable = !categories
    ? ""
    : categories.map((cat) => {
        return (
          <tr key={cat._id}>
            <td>{moment(cat.createdAt).format("DD/MM/YYYY")}</td>
            <td>{cat.name}</td>
            <td>
              <button
                className="btn btn-sm btn-danger m-1 mb-1"
                onClick={() => {
                  handleDelete(cat._id);
                }}
              >
                delete
              </button>
            </td>
          </tr>
        );
      });

  return (
    <div className="mb-5 mt-5 justify-content-center align-items-center">
      <Table striped className="mb-5" align="middle">
        <thead>
          <tr>
            <th scope="col"> Date</th>
            <th scope="col"> Applicant Type</th>
            <th scope="col"> Controls </th>
          </tr>
        </thead>
        <tbody>{categoryTable}</tbody>
      </Table>
    </div>
  );
};

export default TyleList;
