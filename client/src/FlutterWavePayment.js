import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { logout, setLogout, getUser } from "../../Slicer/Auth";

export default function FlutterWavePayment({ payment, reset, cartId }) {
  // Card number 4187427415564246
  // CVV 828
  // Expiry 09/32
  // FLWPUBK_TEST-*****************************-X
  // https://dev.to/drsimplegraffiti/process-payment-react-flutterwave-1f1
  const publicId = process.env.FLUTTER_WAVE_PUBLIC_KEY;
  const { user } = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    email,
    amount,
    products,
    address,
    phoneNo,
    country,
    state,
    city,
    zip_code,
    fullname,
    userId,
  } = payment;

  const config = {
    public_key: process.env.publicId,
    tx_ref: Date.now(),
    amount: amount * 100,
    currency: "NGN",
    payment_options: "card, mobilemoney, ussd",
    customer: {
      email: email,
      phone_number: phoneNo,
      name: user.fullname,
    },
    customizations: {
      title: "SamAfrika Notifications",
      description: "Payment for ScholarShip Programmes",
      //   logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave!",
    callback: (response) => {
      console.log(response);
      if (response.status === "successful") {
        dispatch(
          createPayments(
            { ...payment, reference: response.transaction_id },
            user.token
          )
        );
        reset();
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
