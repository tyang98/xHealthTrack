import React from 'react';
import ScrollLock from "react-scrolllock";
import background from "frontend/src/images/img.png";

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
      <h1>Fitness</h1>
    </div>
  )
}

export default Fitness;