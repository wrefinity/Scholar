import React, { useEffect, useState } from "react";
import { Table, Row, Container, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { myScholarship, selectAllScholarships } from "../../Slicer/ScholarApply";
import Axioss from "../../app/Axioss";


const ScholarSingleUser = () => {
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(myScholarship())
    //   }, [dispatch]);
    // const scholars = useSelector(selectAllScholarships);
    // console.log(scholars)
    const token = JSON.parse(localStorage.getItem("user")).token;

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log("running")
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await Axioss.get('scholarships/scholar', config);
                console.log(response)
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);



    // const categoryTable = !scholars
    //     ? ""
    //     : scholars.scholarships.map((cat) => {
    //         return (
    //             <tr key={cat?._id}>
    //                 <td className="justify-content-center align-items-center p-4">
    //                     <img
    //                         src={cat?.passport}
    //                         alt=""
    //                         style={{ width: "100px", height: "100px" }}
    //                         className="rounded-circle"
    //                     /><br />
    //                     <h3>
    //                         <i>
    //                             {cat?.firstname}
    //                         </i>
    //                     </h3>
    //                     <p className='text-justify'> {cat?.body}</p>
    //                 </td>
    //             </tr>
    //         );
    //     });


    return (
        <Container fluid className="mb-5 mt-5 pt-5 justify-content-center align-items-center ">
            <Row className="mt-5 mb-3 text-center text-uppercase">
                <h2>Scholarship Applied</h2>
            </Row>
            <div className='d-flex flex-row'>
                <Row className="justify-content-center align-items-center mb-5">
                    <Col md="4" lg="4" sm="12">
                        <Table striped className="mb-5" align="middle">
                            <tbody>{ }</tbody>
                        </Table>
                    </Col>

                </Row>
            </div>
        </Container>
    )
}


export default ScholarSingleUser