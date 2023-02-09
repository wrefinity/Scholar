import React, { Fragment } from "react";
import { PaystackButton } from "react-paystack";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import "./App.css";

import { createPayments } from "./actions/payment";
import { removeFromCart } from "./actions/cart";

const PaymentButton = ({ payment, reset, cartId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user] = useCookies();
  const publicId = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;

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

  let config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: amount * 100,
    publicKey: publicId,
  };

  const componentProps = {
    ...config,
    metadata: {
      fullname,
      userId,
      products,
      address,
      phoneNo,
      country,
      state,
      city,
      zip_code,
    },
    text: "Proceed to Payment",
    onSuccess: (reference) => {
      dispatch(createPayments({ ...payment, reference }, user.user.token));
      dispatch(removeFromCart(cartId, user.user.token));
      reset();
      navigate("/thanks");
    },
    onClose: () => {
      //   callback when payment fail
    },
  };

  return (
    <Fragment>
      <PaystackButton
        {...componentProps}
        className="btn btn-danger btn-lg btn-block bold-text"
      />
    </Fragment>
  );
};
export default PaymentButton;
