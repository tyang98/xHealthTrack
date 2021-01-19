import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { Button } from "react-bootstrap";
import background from "frontend/src/images/img.png";
import ScrollLock from "react-scrolllock";

type CheckProps = {
  callback: () => void;
};

const Check = ({ callback }: CheckProps) => {
  const [weight, setWeight] = useState(+"");
  const [sleep, setSleep] = useState(+"");

  const onChangeWeight = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setWeight(+event.target.value);
  };

  const onChangeSleep = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSleep(+event.target.value);
  };

  const onSubmit = () => {
    //callback(weight, sleep, new Date());
  };

  return (
    <div>
      <div className="Wrapper" style={{ justifyContent: "center" }}>
        <div className="Sections">
          <h1>Daily Check</h1>
          <h6>Enter Your Daily Info</h6>
          <br />
          <TextField
            label="Weight today"
            className="Section"
            type="text"
            value={weight}
            variant="outlined"
            onChange={onChangeWeight}
          />{" "}
          <br /> <br />
          <TextField
            label="Sleep today"
            className="Section"
            type="text"
            value={sleep}
            variant="outlined"
            onChange={onChangeSleep}
          />{" "}
          <br /> <br />
          {/* add more stuff */}
          <br />
          <Button variant="primary" onClick={callback}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Check;
