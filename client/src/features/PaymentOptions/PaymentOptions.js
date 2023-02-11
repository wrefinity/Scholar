import React from "react";
import FlutterWavePayment from "../../FlutterWavePayment";

const PaymentOptions = ({ scholarship, reset, reseter }) => {
  return (
    <div className="mb-5 pb-5">
      <Container className="mt-5 pt-5 mb-5">
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className=" bg-nav p-4 mb-4">
                    <h2 className="fw-bold mb-2  text-center text-light">
                      Choose Payment Method
                    </h2>
                  </div>
                  <div className="mb-3">
                    <p>Flutter Waves</p>
                    <Button
                      variant="danger"
                      onClick={
                        <FlutterWavePayment
                          scholarship={scholarship}
                          reset={reset}
                          reseter={reseter}
                        />
                      }
                      className="mt-3"
                    >
                      FlutterWave
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PaymentOptions;
