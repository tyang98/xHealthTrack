import React from "react";
import background from "frontend/src/images/img.png";
import { Container } from "react-bootstrap";
import Calendar from "frontend/src/components/Calendar/Calendar";

const Fitness = () => {
  return (
    <div className="fitness">
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

      <Container style={{ marginTop: "2.5%" }}>
        <Calendar />
      </Container>
    </div>
  );
};

export default Fitness;
