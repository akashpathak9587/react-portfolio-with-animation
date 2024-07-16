import { Col, Container, Row } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import contactImg from "../assets/img/contact-img.svg";
import { useState } from "react";
import "animate.css";

interface FormProps {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  phone: string;
}

interface statusProps {
  success: boolean;
  message: string;
}
const Contact = () => {
  const formInitialValue: FormProps = {
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    phone: "",
  };

  const [formValues, setFormValues] = useState(formInitialValue);
  const [buttonText, setButtonText] = useState("Send");
  const [status, setStatus] = useState<statusProps>({
    success: false,
    message: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setButtonText("Sending...");
    const response = await fetch("http://localhost:5001/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });
    setButtonText("Send");
    const result = await response.json();
    setFormValues(formInitialValue);
    if (result.code === 200) {
      setStatus({ success: true, message: "Message sent successfully" });
    } else {
      setStatus({
        success: false,
        message: "Something went wrong, please try again later.",
      });
    }
  };
  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <img
                  src={contactImg}
                  alt="contact us"
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                />
              )}
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }>
                  <h2>Get In Touch</h2>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="text"
                          value={formValues.firstName}
                          placeholder="First Name"
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              firstName: e.target.value,
                            })
                          }
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="text"
                          value={formValues.lastName}
                          placeholder="Last Name"
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="email"
                          value={formValues.email}
                          placeholder="Email"
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              email: e.target.value,
                            })
                          }
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="text"
                          value={formValues.phone}
                          placeholder="Phone Number"
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              phone: e.target.value,
                            })
                          }
                        />
                      </Col>
                      <Col size={12} className="px-1">
                        <textarea
                          placeholder="Message"
                          value={formValues.message}
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              message: e.target.value,
                            })
                          }
                        />
                        <button type="submit">
                          <span>{buttonText}</span>
                        </button>
                      </Col>
                      {status.message && (
                        <Col>
                          <p
                            className={
                              status.success === false ? "danger" : "success"
                            }>
                            {status.message}
                          </p>
                        </Col>
                      )}
                    </Row>
                  </form>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
