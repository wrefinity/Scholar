import React from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser } from "../../Slicer/UserSlice";
import moment from "moment";
const UsersTable = () => {
  // get all the users from the store
  const userx = useSelector(fetchUsers);
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    await dispatch(deleteUser(id));
  };
  const usersList = !userx
    ? ""
    : userx.map((us) => {
        return (
          <tr>
            <td>{moment(us?.createdAt).format("DD/MM/YYYY")}</td>
            <td>
              <img
                src={`${us?.image}`}
                alt=""
                style={{ width: "100px", height: "100px" }}
                className="rounded-circle"
              />
            </td>
            <td>{us?.fullname}</td>
            <td>
              {us?.email} <br />
              {us?.phone} <br />
            </td>
            <td>{us?.role}</td>
            <td>
              <button
                className="btn btn-sm btn-danger m-1 mb-1"
                onClick={() => {
                  handleDelete(us?._id);
                }}
              >
                delete
              </button>
            </td>
          </tr>
        );
      });

  return (
    <div className="mb-5 mt-5 d-flex justify-content-center align-items-center mbt">
      <Table striped className="mb-5" align="middle">
        <thead>
          <tr>
            <th scope="col"> Date </th>
            <th scope="col"> Image </th>
            <th scope="col"> Fullname </th>
            <th scope="col"> Contact </th>
            <th scope="col"> Role </th>
            <th scope="col"> Controls </th>
          </tr>
        </thead>
        <tbody>{usersList}</tbody>
      </Table>
    </div>
  );
};

export default UsersTable;
