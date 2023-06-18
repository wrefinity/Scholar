import { useState , useRef} from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../../assets/img/contact-img.svg";
import TrackVisibility from 'react-on-screen';
import emailjs from 'emailjs-com';
import { toast } from "react-toastify";

const Contact = () => {


  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});
  const form = useRef();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID
    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then(function (response) {
        toast.success(response.text, { autoClose: 2000 });
        console.log(response)
      }, function (error) {
        toast.error(error, { autoClose: 10000 })
      });
    setButtonText("Send");
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us" />
              }
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Get In Touch</h2>
                  <form  ref={form} onSubmit={handleSubmit}>
                    <Row>
                      <Col size={12} sm={6} className="px-1">
                        <input type="text" name='user_name'  placeholder="First Name"  />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input type="email" name='email' placeholder="Email Address"/>
                      </Col>
                      <Col size={12} className="px-1">
                        <textarea rows="6" name='message' placeholder="Message"  ></textarea>
                        <button type="submit"><span>{buttonText}</span></button>
                      </Col>
                      {
                        status.message &&
                        <Col>
                          <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                        </Col>
                      }
                    </Row>
                  </form>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Contact;