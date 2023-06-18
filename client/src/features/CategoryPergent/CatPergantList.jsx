import React from "react";
import { Table, Container } from "react-bootstrap";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { sellectAllCatPergants, deleteCatPergant } from "../../Slicer/CatPergant";
const CatPergantList = () => {
    const categories = useSelector(sellectAllCatPergants);
    const dispatch = useDispatch();
    const handleDelete = async (id) => {
        await dispatch(deleteCatPergant(id));
    };
    const categoryTable = !categories
        ? ""
        : categories.map((cat) => {
            return (
                <tr>
                    <td>{moment(cat.createdAt).format("DD/MM/YYYY")}</td>
                    <td>{cat.name}</td>
                    <td>{cat.amount}</td>
                    <td >
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
        <Container fluid className="mb-5 mt-5">
            <Table striped className="mt-5 mb-5" align="middle">
                <thead>
                    <tr>
                        <th scope="col"> Date </th>
                        <th scope="col"> Pergant Title </th>
                        <th scope="col"> Pergant Fee </th>
                        <th scope="col"> Controls </th>
                    </tr>
                </thead>
                <tbody>{categoryTable}</tbody>
            </Table>
        </Container>
    );
};

export default CatPergantList;