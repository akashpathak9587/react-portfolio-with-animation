import { FormEvent, useEffect, useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";

interface NewsLetterProps {
  status: "sending" | "error" | "success" | null;
  message?: string | null | Error;
  onValidated: (formData: { EMAIL: string }) => void;
}
const NewsLetter = ({ status, message, onValidated }: NewsLetterProps) => {
  const [email, setEmail] = useState<string>("");
  useEffect(() => {
    if (status === "success") clearFields();
  }, [status]);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    email && email.indexOf("@") > -1 && onValidated({ EMAIL: email });
  };

  const clearFields = () => {
    setEmail("");
  };
  return (
    <Col lg={12}>
      <div className="newsletter-bx wow slideInUp">
        <Row>
          <Col lg={12} md={6} xl={5}>
            <h3>
              Subscribe to our Newsletter <br /> & Never miss latest updates
            </h3>
            {status === "sending" && <Alert>Sending...</Alert>}
            {status === "error" && (
              <Alert variant="danger">{message?.toString()}</Alert>
            )}
            {status === "success" && (
              <Alert variant="success">{message?.toString()}</Alert>
            )}
          </Col>
          <Col md={6} xl={7}>
            <form onSubmit={handleSubmit}>
              <div className="new-email-bx">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                />
                <button type="submit">Submit</button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default NewsLetter;
