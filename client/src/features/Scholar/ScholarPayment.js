import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import credit from "../../assets/img/fad.jpg";
import {
  createScholarship,
  reseter as resetScholar,
} from "../../Slicer/ScholarApply";

export default function ScholarPayment({ scholar }) {
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.scholarships);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isPayment, setSuccessPayment] = useState(false);
  const dispatch = useDispatch();

  console.log(scholar)

  const publicId = process.env.REACT_APP_FLUTTER_PUBLIC_KEY;
  const config = {
    public_key: publicId,
    tx_ref: Date.now(),
    amount: scholar?.amount,
    currency: "NGN",
    payment_options: "card",
    customer: {
      email: scholar?.email,
      name: `${scholar?.firstname} ${scholar?.lastname} `,
    },
    customizations: {
      title: "Scholarship Payment",
      description: `Payment for SamAfrika Scholarship`,
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleSuccessAction = (reference) => {
    dispatch(createScholarship(scholar));
    dispatch(resetScholar());
    setSuccessPayment(false);
    navigate("/thanks");
  };

  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave!",
    callback: (response) => {
      if (response.status === "successful") {
        handleSuccessAction(response);
      }
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {
      handlePayments();
    },
  };

  useEffect(() => {
    if (status === "succeeded" && isSubmit && isPayment) {
      navigate("/");
      setIsSubmit(false);
      dispatch(resetScholar());
      setSuccessPayment(false);
    }
  }, [status]);

  const handlePayments = () => {
    toast.error("Transaction cancelled", { autoClose: 2000 });
    navigate("/scholars_apply")
  };

  return (
    <Row
      className=" d-flex align-items-center justify-content-center text-center mbt"
      style={{
        backgroundImage: `url(${credit})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="mb-3">
        <h3 className="cus_txt_color fw-500 text-center mb-4">
          PAYMENT METHODS
        </h3>

        <FlutterWaveButton className="btn btn-success" {...fwConfig} />
      </div>
    </Row>
  );
}
