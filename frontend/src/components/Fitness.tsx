import React from "react";
import ScrollLock from "react-scrolllock";
import background from "frontend/src/images/img.png";
import { Container } from 'react-bootstrap';
import Calendar from 'frontend/src/components/Calendar/Calendar';

const Fitness = () => {
  return (
    <div className="fitness">
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
        <Calendar />
      </Container>
    </div>
  );
};

export default Fitness;
