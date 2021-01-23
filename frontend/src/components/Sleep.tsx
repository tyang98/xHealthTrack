import React from "react";
import ScrollLock from "react-scrolllock";
import background from "frontend/src/images/img.png";
import { Row, Container, Col } from "react-bootstrap";
import SleepHistogram from "./SleepHistogram";
import SleepAverage from "./SleepAverage";

const Sleep = () => {
  return (
    <div className="sleep">
      <ScrollLock>
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
      </ScrollLock>
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
