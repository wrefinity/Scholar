import React from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectAllCategories, deleteCategories } from "../../Slicer/Categories";
import moment from "moment";
const CategoryList = () => {
  const categories = useSelector(selectAllCategories);
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    await dispatch(deleteCategories(id));
  };
  const categoryTable = !categories
    ? ""
    : categories.map((cat) => {
        return (
          <tr key={cat._id}>
            <td>{moment(cat.createdAt).format("DD/MM/YYYY")}</td>
            <td>{cat.name}</td>
            <td>{cat.amount}</td>
            <td>{cat.status}</td>
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
    <div className="mb-5 mt-5 d-flex justify-content-center align-items-center">
      <Table striped className="mb-5" align="middle">
        <thead>
          <tr>
            <th scope="col"> Date </th>
            <th scope="col"> Type </th>
            <th scope="col"> Amount </th>
            <th scope="col"> status </th>
            <th scope="col"> Controls </th>
          </tr>
        </thead>
        <tbody>{categoryTable}</tbody>
      </Table>
    </div>
  );
};

export default CategoryList;
