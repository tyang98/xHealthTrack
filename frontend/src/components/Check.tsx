import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { Button } from "react-bootstrap";
import 'firebase/auth';
import firebase from 'firebase/app';
import axios from 'axios';

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

  const onSubmit = (weight: number, height: number) => {
    const firebaseUser = firebase.auth().currentUser;
    const uid = firebaseUser?.uid;
   // const user = axios.get<User>(`/getUser?uid=${uid}`);
    axios.put(`/newEntry?uid=${uid}`, { weight, sleep })
    .then(() => console.log("submitted!"))
    .catch((error) => console.log(error));  
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
            helperText={"Enter your weight (lbs)"}
            variant="outlined"
            onChange={onChangeWeight}
          />{" "}
          <br /> <br />
          <TextField
            label="Sleep today"
            className="Section"
            type="text"
            helperText={"Enter hours slept"}
            value={sleep}
            variant="outlined"
            onChange={onChangeSleep}
          />{" "}
          <br /> <br />
          {/* add more stuff */}
          <br />
          <Button variant="primary" onClick={() => { onSubmit(weight, sleep); callback() }}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Check;
