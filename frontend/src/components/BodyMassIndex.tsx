import React, { useState, useEffect } from "react";


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
    setBMI(calcBMI.toFixed(2))
  }

  const getBMIResults = (bmi: number) => {

    let bmiResults = {
      label: '',
      alertClass: '',
    };
    
    if (bmi <= 18.5){
      bmiResults.label = 'Underweight';
      bmiResults.alertClass = 'alert-danger';
    } 
    else if (bmi <= 24.9) {
      bmiResults.label = 'Normal weight';
      bmiResults.alertClass = 'alert-success';
    }
    else if (bmi <= 29.9){
      bmiResults.label = 'Overweight';
      bmiResults.alertClass = 'alert-warning';
    }
    else if (bmi >= 30) {
      bmiResults.label = 'Obesity';
      bmiResults.alertClass = 'alert-danger';
    } else {
      bmiResults.label = 'BMI';
      bmiResults.alertClass = 'alert-primary';
    }

    return bmiResults;
  }


  return (
    <div>

    </div>
  )

}

export default BodyMassIndex;