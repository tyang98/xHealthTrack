import React from "react";
import background from "frontend/src/images/img.png";
import { Row, Container, Col } from "react-bootstrap";
import SleepHistogram from "./SleepHistogram";
import SleepAverage from "./SleepAverage";

const Sleep = () => {
  return (
    <div className="sleep">
      <img
        src={background}
        alt={""}
        style={{
          minHeight: "100%",
          minWidth: "100%",
          position: "fixed",
          top: "0",
          left: "0",
          zIndex: -1,
        }}
      />
      <Container>
        <Row style={{ marginTop: "5%" }}>
          <Col>
            <SleepHistogram />
          </Col>{" "}
          <Col>
            <SleepAverage />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Sleep;
