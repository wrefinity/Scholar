import React from "react";
import { Table, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { sellectAllPergants, deletePergants } from "../../Slicer/Pergent";
import moment from "moment";
const PergantTable = () => {
  const pergants = useSelector(sellectAllPergants);
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    await dispatch(deletePergants(id));
  };
  const perTable = !pergants
    ? ""
    : pergants.map((per) => {
        return (
          <tr key={per?._id}>
            <td>{moment(per?.createdAt).format("DD/MM/YYYY")}</td>
            <td>
              <img
                src={`${per?.image}`}
                alt=""
                style={{ width: "100px", height: "100px" }}
                className="rounded-circle"
              />
            </td>
            <td>{per?.name}</td>
            <td>{per?.title?.name}</td>
            <td>{per?.payments}</td>
            <td>{per?.voters}</td>
            <td>
              <button
                className="btn btn-sm btn-danger m-1 mb-1"
                onClick={() => {
                  handleDelete(per._id);
                }}
              >
                delete
              </button>
            </td>
          </tr>
        );
      });

  return (
    <Container className="mb-5 mt-5 d-flex justify-content-center align-items-center">
      <Table striped className="mb-5" align="middle">
        <thead>
          <tr>
            <th scope="col"> Date </th>
            <th scope="col"> Image </th>
            <th scope="col"> Model </th>
            <th scope="col"> Model </th>
            <th scope="col"> Title </th>
            <th scope="col"> Votes </th>
            <th scope="col"> Controls </th>
          </tr>
        </thead>
        <tbody>{perTable}</tbody>
      </Table>
    </Container>
  );
};

export default PergantTable;
