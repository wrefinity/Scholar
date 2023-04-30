import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { getUser } from "./Slicer/Auth";
import { createPayments, reseter as resetPayment } from "./Slicer/payment";
import {
  createScholarship,
  reseter as scholarReset,
} from "./Slicer/ScholarApply";
export default function FlutterWavePayment({ scholarship, reset, reseter }) {
  // Card number 4187427415564246
  // CVV 828
  // Expiry 09/32
  // https://dev.to/drsimplegraffiti/process-payment-react-flutterwave-1f1
  const publicId = process.env.FLUTTER_WAVE_PUBLIC_KEY;
  const { user } = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, amount } = scholarship;

  const config = {
    public_key: publicId,
    tx_ref: Date.now(),
    amount: amount,
    currency: "NG",
    payment_options: "card, mobilemoney, ussd",
    customer: {
      email: email,
      phone_number: user.phone,
      name: user.fullname,
    },
    customizations: {
      title: "SamAfrika Notifications",
      description: "Payment for ScholarShip Programmes",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave!",
    callback: (response) => {
      console.log(response);
      if (response.status === "successful") {
        dispatch(
          createPayments({
            ...scholarship,
            reference: response.transaction_id,
            amount,
          })
        );
        dispatch(createScholarship({ ...scholarship, userId: user?._id }));
        reset();
        dispatch(reseter());
        dispatch(resetPayment());
        dispatch(scholarReset());
      }
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {},
  };

  return (
    <Fragment>
      <FlutterWaveButton {...fwConfig} />
    </Fragment>
  );
}
