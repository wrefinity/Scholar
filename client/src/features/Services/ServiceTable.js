import React from "react";
import { Table, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectAllServices, deleteServices } from "../../Slicer/Service";
import moment from "moment";
const ServiceTable = () => {
  const servicess = useSelector(selectAllServices);
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    await dispatch(deleteServices(id));
  };
  const serviceTable = !servicess
    ? ""
    : servicess.map((ser) => {
        return (
          <tr>
            <td>{moment(ser.createdAt).format("DD/MM/YYYY")}</td>
            <td>
              <img
                src={`${ser.image}`}
                alt=""
                style={{ width: "100px", height: "100px" }}
                className="rounded-circle"
              />
            </td>
            <td>{ser.title}</td>
            <td>{ser.content}</td>
            <td scope="col">
              <button
                className="btn btn-sm btn-danger m-1 mb-1"
                onClick={() => {
                  handleDelete(ser._id);
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
            <th scope="col"> Title </th>
            <th scope="col"> Content </th>
            <th scope="col"> Controls </th>
          </tr>
        </thead>
        <tbody>{serviceTable}</tbody>
      </Table>
    </div>
  );
};

export default ServiceTable;
