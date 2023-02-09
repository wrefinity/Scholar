import React from "react";
import { Table, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectAllGalleries, deleteGalleries } from "../../Slicer/Gallery";
import moment from "moment";
const GalleryTable = () => {
  const galleries = useSelector(selectAllGalleries);
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    await dispatch(deleteGalleries(id));
  };
  const GalleryTable = !galleries
    ? ""
    : galleries.map((gal) => {
        return (
          <tr>
            <td>{moment(gal.createdAt).format("DD/MM/YYYY")}</td>
            <td>
              <img
                src={`${gal.image}`}
                alt=""
                style={{ width: "100px", height: "100px" }}
                className="rounded-circle"
              />
            </td>
            <td>{gal.content}</td>
            <td>{gal.title}</td>
            <td>
              <button
                className="btn btn-sm btn-danger m-1 mb-1"
                onClick={() => {
                  handleDelete(gal._id);
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
            <th scope="col"> Content </th>
            <th scope="col"> Title </th>
            <th scope="col"> Controls </th>
          </tr>
        </thead>
        <tbody>{GalleryTable}</tbody>
      </Table>
    </div>
  );
};

export default GalleryTable;
