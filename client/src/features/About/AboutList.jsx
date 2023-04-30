import React from "react";
import { Table, Container } from "react-bootstrap";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { selectAllAbout, updateAbout } from "../../Slicer/About";
const AboutList = () => {
    const about = useSelector(selectAllAbout);
    const dispatch = useDispatch();
    const handleDelete = async (abt) => {
        await dispatch(updateAbout(abt));
    };
    const AboutTable = !about
        ? ""
        : about.map((abt) => {
            return (
                <tr>
                    <td>{moment(abt.createdAt).format("DD/MM/YYYY")}</td>
                    <td>{abt.name}</td>
                    <td>{abt.note}</td>
                </tr>
            );
        });

    return (
        <Container fluid className="mb-5 mt-5">
            <Table striped className="mt-5 mb-5" align="middle">
                <thead>
                    <tr>
                        <th scope="col"> Date </th>
                        <th scope="col"> Note </th>
                    </tr>
                </thead>
                <tbody>{AboutTable}</tbody>
            </Table>
        </Container>
    );
};

export default AboutList;