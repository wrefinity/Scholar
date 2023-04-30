import React from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectAllMembers, deleteMembers } from "../../Slicer/Members";
import moment from "moment";
const MemberList = () => {
  const members = useSelector(selectAllMembers);
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    await dispatch(deleteMembers(id));
  };
  const memberTable = !members
    ? ""
    : members.map((mem) => {
        return (
          <tr>
            <td>{moment(mem.createdAt).format("DD/MM/YYYY")}</td>
            <td>
              <img
                src={`${mem.image}`}
                alt=""
                style={{ width: "100px", height: "100px" }}
                className="rounded-circle"
              />
            </td>
            <td>{mem.fullname}</td>
            <td>{mem.about}</td>
            <td>{mem.position}</td>
            <td>{mem.email}</td>
            <td>
              Facebook: {mem.facebook} <br />
              Twitter: {mem.twitter} <br />
              Instagram: {mem.instagram}
            </td>
            <td scope="col">
              <button
                className="btn btn-sm btn-danger m-1 mb-1"
                onClick={() => {
                  handleDelete(mem._id);
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
            <th scope="col"> fullname </th>
            <th scope="col"> About </th>
            <th scope="col"> Position </th>
            <th scope="col"> email </th>
            <th scope="col"> Social Handles </th>
            <th scope="col"> Controls </th>
          </tr>
        </thead>
        <tbody>{memberTable}</tbody>
      </Table>
    </div>
  );
};

export default MemberList;
