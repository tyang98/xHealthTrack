import React from "react";
import ScrollLock from "react-scrolllock";
import background from "frontend/src/images/img.png";
import { Container } from "react-bootstrap";
import BodyMassIndex from "./BodyMassIndex";

const Health = () => {
  return (
    <div className="health">
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
      <Container style={{ marginTop: "5%" }}>
        <BodyMassIndex />
      </Container>
    </div>
  );
};

export default Health;
