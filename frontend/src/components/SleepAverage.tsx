import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import firebase from "firebase";
import SleepAverageDisplay from "./SleepAverageDisplay";

const BodyMassIndex = () => {
  const [sleep, setSleep] = useState([] as any);
  const [avgSleep, setAvgSleep] = useState("0.0");
  const [results, setResults] = useState({
    label: "",
    alertClass: "",
  });

  const getSleepResults = (sleep: number) => {
    let sleepResults = {
      label: "",
      alertClass: "",
    };

    if (sleep < 7) {
      sleepResults.label = "Too Little Sleep";
      sleepResults.alertClass = "alert-danger";
    } else if (sleep >= 7 && sleep <= 10) {
      sleepResults.label = "Healthy Amount of Sleep";
      sleepResults.alertClass = "alert-success";
    } else if (sleep > 10) {
      sleepResults.label = "Too Much Sleep";
      sleepResults.alertClass = "alert-warning";
    } else {
      sleepResults.label = "";
      sleepResults.alertClass = "alert-primary";
    }

    return sleepResults;
  };

  const fetchData = async () => {
    const firebaseUser = firebase.auth().currentUser;
    const uid = firebaseUser?.uid;
    const tempItems = await axios.get(`/getWeekSleep?uid=${uid}`);
    setSleep(tempItems.data);
    const avg =
      tempItems.data.reduce((a: number, b: number) => a + b, 0) /
      tempItems.data.length;
    setAvgSleep(avg.toFixed(2));
    setResults(getSleepResults(parseFloat(avgSleep)));
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Average Sleep In Past Week</Card.Title>
          <SleepAverageDisplay
            avgSleep={avgSleep}
            label={results.label}
            alertClass={results.alertClass}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default BodyMassIndex;
