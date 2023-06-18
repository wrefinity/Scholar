import React, { useEffect, useState, useRef } from "react";
import { Col, Row, Alert } from "react-bootstrap";
  import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  validateEmpty,
} from "../../Utils/InputHelpers";
import { reseter, createSub } from "../../Slicer/Utils";

export const Newsletter = () => {
  const [email, setEmail] = useState('');

  const { status:newStatus, message:mess } = useSelector((state) => state.subcribe);
  const [messError, setMessError] = useState({});
  const [isSent, setIsSent] = useState(false);
  const referal = useRef();
  const dispatch = useDispatch();


  const clearFields = () => {
    setEmail('');
  }

  useEffect(() => {
    referal.current();
  }, [messError, newStatus, mess, dispatch]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    setMessError(validateEmpty({email}));
    setIsSent(true);
  };

  const dispatchSubcribe = () => {
    if (Object.keys(messError).length === 0 && isSent ) {
      dispatch(createSub({email}));
      setIsSent(false);
    }

    if (newStatus === "succeeded") {
      toast.success(mess, { autoClose: 2000 });
      clearFields();
      dispatch(reseter());
      setIsSent(false)
    }
    if (newStatus === "failed") {
      toast.error(mess, { autoClose: 4000 });
      dispatch(reseter());
      setIsSent(false);
    }
  };
  referal.current = dispatchSubcribe;

  return (
      <Col lg={12}>
        <div className="newsletter-bx wow slideInUp">
          <Row>
            <Col lg={12} md={6} xl={5}>
              <h3>Subscribe to our Newsletter<br></br> & Never miss latest updates</h3>
              {newStatus === 'loading' && <Alert>Sending...</Alert>}
              {newStatus === 'failed' && <Alert variant="danger">{mess}</Alert>}
              {newStatus === 'success' && <Alert variant="success">{mess}</Alert>}
            </Col>
            <Col md={6} xl={7}>
              <form onSubmit={handleSendMessage}>
                <div className="new-email-bx">
                  <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
                  <button type="submit">Submit</button>
                </div>
              </form>
            </Col>
          </Row>
        </div>
      </Col>
  )
}
