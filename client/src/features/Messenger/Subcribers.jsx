import React from "react";
import { Table, Container } from "react-bootstrap";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { selectAllSub, unSubcribe } from "../../Slicer/Utils";
const Subcribers = () => {
    const subs = useSelector(selectAllSub);
    const dispatch = useDispatch();
    const handleDelete = async (id) => {
        await dispatch(unSubcribe(id));
    };

    const SubTable = !subs
        ? ""
        : subs.map((sb) => {
            return (
                <tr>
                    <td>{moment(sb.createdAt).format("DD/MM/YYYY")}</td>
                    <td>{sb.email}</td>
                    <td>              <button
                    className="btn btn-sm btn-danger m-1 mb-1"
                    onClick={() => {
                      handleDelete(sb._id);
                    }}
                  >
                    delete
                  </button> </td>
                </tr>
            );
        });

    return (
        <Container fluid className="mb-5 mt-5">
            <Table striped className="mt-5 mb-5" align="middle">
                <thead>
                    <tr>
                        <th scope="col"> Date </th>
                        <th scope="col"> Email </th>
                        <th scope="col"> UnSubcribe </th>
                    </tr>
                </thead>
                <tbody>{SubTable}</tbody>
            </Table>
        </Container>
    );
};

export default Subcribers;