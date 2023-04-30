import React from "react";
import { Table, Row, Container, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectAllPost } from "../../Slicer/Post";
import { Link } from "react-router-dom";

const ScholarSelect = () => {
    const scholars = useSelector(selectAllPost);
    const categoryTable = !scholars
        ? ""
        : scholars.map((cat) => {
            return (
                <tr key={cat?._id}>
                    <td scope="col" className="justify-content-center align-items-center p-4">
                        <img
                            src={`${cat?.image}`}
                            alt=""
                            style={{ width: "100px", height: "100px" }}
                            className="rounded-circle"
                        /><br />
                        <h3>
                            <i>
                                {cat?.categoryId?.name}
                            </i>
                        </h3>
                        {/* <h4><span className="text-success">FEES: </span>{cat?.categoryId?.amount} </h4> */}
                        <Link to={`/scholars_apply/${cat?._id}`}>
                            <button
                                className="btn  btn-success m-1 mb-1"
                            >
                                Apply
                            </button>

                        </Link>
                        <p> {cat?.body}</p>
                    </td>
                </tr>
            );
        });


    return (
        <Container fluid className="mb-5 mt-5 pt-5 justify-content-center align-items-center mbt">
            <Row className="mt-5 mb-3 text-center text-uppercase">
                <h2>Select Scholarship </h2>
            </Row>
            <Row className="justify-content-center align-items-center">
                <Col md="4" lg="4" sm="12">
                    <Table striped className="mb-5" align="middle">
                        <tbody>{categoryTable}</tbody>
                    </Table>
                </Col>

            </Row>
        </Container>
    )
}

export default ScholarSelect