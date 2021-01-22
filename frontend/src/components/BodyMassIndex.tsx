import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { Card } from "react-bootstrap";
import BodyMassIndexDisplay from "./BodyMassIndexDisplay";

const BodyMassIndex = () => {
  const [feet, setFeet] = useState(+"");
  const [inches, setInches] = useState(+"");
  const [weight, setWeight] = useState(+"");
  const [bmi, setBMI] = useState("");

  const onChangeWeight = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setWeight(+event.target.value);
  };

  const onChangeFeet = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFeet(+event.target.value);
  };

  const onChangeInches = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInches(+event.target.value);
  };

  const calculateBMI = () => {
    let INCHES_IN_FEET = 12;

    let convertHeight = Number(feet);

    convertHeight *= INCHES_IN_FEET;
    convertHeight += Number(inches);

    let calcBMI = (weight / (convertHeight * convertHeight)) * 703;

    if (Number(feet) === 0 || Number(inches) === 0 || Number(weight) === 0) {
      calcBMI = 0;
    }
    setBMI(calcBMI.toFixed(2));
  };

  useEffect(() => {
    calculateBMI();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getBMIResults = (bmi: number) => {
    let bmiResults = {
      label: "",
      alertClass: "",
    };

    if (bmi <= 18.5) {
      bmiResults.label = "Underweight";
      bmiResults.alertClass = "alert-danger";
    } else if (bmi <= 24.9) {
      bmiResults.label = "Normal weight";
      bmiResults.alertClass = "alert-success";
    } else if (bmi <= 29.9) {
      bmiResults.label = "Overweight";
      bmiResults.alertClass = "alert-warning";
    } else if (bmi >= 30) {
      bmiResults.label = "Obesity";
      bmiResults.alertClass = "alert-danger";
    } else {
      bmiResults.label = "";
      bmiResults.alertClass = "alert-primary";
    }

    return bmiResults;
  };

  let results = getBMIResults(parseFloat(bmi));

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>BMI</Card.Title>{" "}
          <TextField
            label="Feet"
            className="Section"
            type="text"
            value={feet}
            helperText={"(ft)"}
            variant="outlined"
            onChange={onChangeFeet}
            style={{ marginRight: 10 }}
          />{" "}
          <TextField
            label="Inches"
            className="Section"
            type="text"
            value={inches}
            helperText={"(in)"}
            variant="outlined"
            onChange={onChangeInches}
            style={{ marginLeft: 10 }}
          />
          <br /> <br />
          <TextField
            label="Weight"
            className="Section"
            type="text"
            value={weight}
            helperText={"(lbs)"}
            variant="outlined"
            onChange={onChangeWeight}
          />
          <br /> <br />
          <BodyMassIndexDisplay
            bmi={bmi}
            label={results.label}
            alertClass={results.alertClass}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default BodyMassIndex;
