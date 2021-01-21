import React from 'react';
import '../styles/BodyMassIndexDisplay.css';


type bmiResultsProps = {
  bmi: string;
  label: string;
  alertClass: string;
}

const BodyMassIndexDisplay = ( {bmi, label, alertClass}: bmiResultsProps) => {

  return (
    <div className={"bmi-result alert " + alertClass}>
      <div>{ bmi }</div>
      <div>{ label }</div>
    </div> 
  )
}

export default BodyMassIndexDisplay;