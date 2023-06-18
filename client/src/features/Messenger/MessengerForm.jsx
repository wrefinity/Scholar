import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Card, Form } from "react-bootstrap";
import { LineWave } from "react-loader-spinner";
import { toast } from "react-toastify";
import {
    handleInput,
    validateEmpty,
    loaderSize,
    loaderColor,
} from "../../Utils/InputHelpers";
import { sendNotification, reseter } from "../../Slicer/Utils";

const MessengerForm = () => {
    const [formData, setFormData] = useState({ note: "" ,  subject:""});
    const { status, message } = useSelector((state) => state.subcribe);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const referal = useRef();
    const dispatchMess = useDispatch();
    useEffect(() => {
        referal.current();
    }, [formErrors, status, message, dispatchMess]);

    const reset = () => {
        setFormData({
            note: "",
            subject:""
        });
    };

    const dispatchFormData = () => {
        if (Object.keys(formErrors).length === 0 && isSubmit && status === "idle") {
            dispatchMess(sendNotification(formData));
            dispatchMess(reseter());
            setIsSubmit(false);
        }
        if (status === "succeeded") {
            reset();
            dispatchMess(reseter());
            toast.success(message, { autoClose: 2000 });
            setIsSubmit(false);
        }
        if (status === "failed") {
            dispatchMess(reseter());
            toast.error(message, { autoClose: 4000 });
            setIsSubmit(false);
        }
    };
    referal.current = dispatchFormData;

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormErrors(validateEmpty(formData));
        setIsSubmit(true);
    };

    return (
        <div className="mb-5 pb-5">
            <Container className="mt-5 pt-5 mb-5">

                <Card className="shadow">
                    <Card.Body>
                        <div className="mb-3 mt-md-4">
                            <div className=" bg-nav p-4 mb-4">
                                <h5 className="fw-bold mb-2  text-center text-uppercase text-light">
                                    Subcribers Message Dispatcher
                                </h5>
                            </div>
                            <div className="mb-3">
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="text-center">
                                            Subject
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={(e) => handleInput(e, setFormData)}
                                            placeholder="Enter subject"
                                        />
                                    </Form.Group>

                                    <p className="text-danger">{formErrors?.email}</p>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Message</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            name="note"
                                            value={formData.note}
                                            className="form-control"
                                            onChange={(e) => handleInput(e, setFormData)}
                                        />
                                    </Form.Group>
                                    <p className="text-danger">{formErrors?.note}</p>

                                    <div className="d-grid">
                                        {status === "loading" ? (
                                            <div className="d-flex justify-content-center">
                                                <LineWave
                                                    color={loaderColor}
                                                    height={loaderSize}
                                                    width={loaderSize}
                                                />
                                            </div>
                                        ) : (
                                            <Button
                                                variant="primary"
                                                type="submit"
                                                className="mt-3"
                                            >
                                                Send
                                            </Button>
                                        )}
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default MessengerForm;