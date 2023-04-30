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
import { createCatPergant, reseter } from "../../Slicer/CatPergant";

const CatPergantFrom = () => {
    const [category, setCategory] = useState({ name: "", amount: "" });
    const { status, message } = useSelector((state) => state.catpergants);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const referal = useRef();
    const dispatch = useDispatch();
    useEffect(() => {
        referal.current();
    }, [formErrors, status, message, dispatch]);

    const reset = () => {
        setCategory({
            name: "",
            amount: ""
        });
    };

    const dispatchFormData = () => {
        if (Object.keys(formErrors).length === 0 && isSubmit && status === "idle") {
            dispatch(createCatPergant(category));
            dispatch(reseter());
            setIsSubmit(false);
        }
        if (status === "succeeded") {
            reset();
            dispatch(reseter());
            toast.success(message, { autoClose: 2000 });
            setIsSubmit(false);
        }
        if (status === "failed") {
            dispatch(reseter());
            toast.error(message, { autoClose: 4000 });
            setIsSubmit(false);
        }
    };
    referal.current = dispatchFormData;

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormErrors(validateEmpty(category));
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
                                    Create Pergant Category{" "}
                                </h5>
                            </div>
                            <div className="mb-3">
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicFull">
                                        <Form.Label className="text-center">
                                            Pergant Title
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            required
                                            value={category.name}
                                            onChange={(e) => handleInput(e, setCategory)}
                                            placeholder="enter pergant title"
                                        />
                                    </Form.Group>
                                    <p className="text-danger">{formErrors?.name}</p>
                                    <Form.Group className="mb-3" controlId="formBasicFull">
                                        <Form.Label className="text-center">
                                            Pergant Fee
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="amount"
                                            required
                                            value={category.amount}
                                            onChange={(e) => handleInput(e, setCategory)}
                                            placeholder="enter pergant contest fee"
                                        />
                                    </Form.Group>
                                    <p className="text-danger">{formErrors?.amount}</p>

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
                                                Create Category
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

export default CatPergantFrom;