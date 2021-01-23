import React from "react";
import "../styles/BodyMassIndexDisplay.css";

type avgSleepProps = {
  avgSleep: string;
  label: string;
  alertClass: string;
};

const SleepAverageDisplay = ({
  avgSleep,
  label,
  alertClass,
}: avgSleepProps) => {
  return (
    <div className={"sleep-result alert " + alertClass}>
      <div>{avgSleep} hrs</div>
      <div>{label}</div>
    </div>
  );
};

export default SleepAverageDisplay;
