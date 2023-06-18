import { useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../firebase";
import check from "../assets/img/check.png";
import { Form, Col, Button } from "react-bootstrap";
export const FileInput = ({
  namer,
  label,
  handleInputImage,
  setHook,
  type,
  value,
  formErrors,
  ...rest
}) => {
  const inputRef = useRef();
  const [progress, setProgress] = useState(0);
  const [track, setTrack] = useState(false);

  const handleUpload = () => {
    setTrack(true);
    const fileName = new Date().getTime() + value.name;
    const storageRef = ref(storage, `/files/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, value);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percentile = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(percentile);
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          handleInputImage(namer, url, setHook);
        });
      }
    );
  };
  return (
    <Col sm="12" md="12" lg="12">
      <Form.Group className="position-relative mb-3">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type="file"
          name="image"
          id="ccIxm"
          ref={inputRef}
          onChange={(e) =>
            handleInputImage(namer, e.currentTarget?.files[0], setHook)
          }
          {...rest}
          onClick={() => inputRef.current.click()}
        />
      </Form.Group>

      {value !== null && !track && typeof value !== "string" && (
        <div className="d-grid">
          <Button
            onClick={handleUpload}
            variant="primary"
            className="d-flex bg-nav justify-content-center text-bold"
          >
            Upload
          </Button>
        </div>
      )}
      {track && progress < 100 && (
        <div className="outerbar">
          <p>{progress}%</p>
        </div>
      )}
      {progress === 100 && (
        <div className="outerbar">
          <img src={check} alt="notify" className="input_img" />
        </div>
      )}

      <p className="text-danger">{formErrors?.image}</p>
    </Col>
  );
};
