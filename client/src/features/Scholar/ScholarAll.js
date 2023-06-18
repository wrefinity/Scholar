import React, { useEffect } from "react";
import { Table, Row, Container} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getScholarship, selectAllScholarships } from "../../Slicer/ScholarApply";

const ScholarAll = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getScholarship())
    }, [dispatch]);
    const scholars = useSelector(selectAllScholarships);



    const categoryTable = scholars?.map((cat) => {
        return (
          <React.Fragment key={cat?._id}>
            <tr>
              <th colSpan="6">
                <h5>{cat?.userId.fullname} application</h5>
              </th>
            </tr>
            {cat?.scholarships?.map((sch, ind) => {
              return (
                <tr className="justify-content-center align-items-center p-4" key={ind}>
                  <td>
                    <h5>Passport</h5>
                    <br/>
                    <img
                      src={sch?.passport}
                      alt=""
                      style={{ width: "100px", height: "100px" }}
                      className="rounded-circle"
                    />
                  </td>
                  <td>
                  <h5>Id-Card</h5>
                    <br/>
                    <img
                      src={sch?.idCard}
                      alt=""
                      style={{ width: "100px", height: "100px" }}

                    />
                  </td>
                  <td>
                  <h5>Signature</h5>
                    <br/>
                  <img
                    src={sch?.signature}
                    alt=""
                    style={{ width: "100px", height: "100px" }}
                  />
                </td>
                  <td> <bold> [ Fullname] - </bold> {sch?.firstname} {" "} {sch?.lastname} </td>
                  <td> <bold> [ Location] - </bold> {sch?.city} {", "} {sch?.state} {", "} {sch?.country} </td>
        
                </tr>
              );
            })}
          </React.Fragment>
        );
      });
      


    return (
        <Container fluid className="mb-5 mt-5 pt-5 justify-content-center align-items-center ">
            <Row className="mt-5 mb-3 text-center text-uppercase">
                <h2>Scholarship Applied</h2>
            </Row>
            <div className='d-flex flex-row'>
    
                        <Table striped className="mb-5">
                            <tbody>{categoryTable}</tbody>
                        </Table>
            </div>
        </Container>
    )
}


export default ScholarAll