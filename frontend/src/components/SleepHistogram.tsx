import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { Button, Card } from "react-bootstrap";
import { Chart } from "react-google-charts";
import "firebase/auth";
import firebase from "firebase/app";
import axios from "axios";

const SleepHistogram = () => {
  const [data, setData] = useState([] as any);

  const fetchData = async () => {
    const firebaseUser = firebase.auth().currentUser;
    const uid = firebaseUser?.uid;
    let tempItems = await axios.get(`/getSleepData?uid=${uid}`);
    tempItems.data.unshift(["Dates", "Hours"]);
    setData(tempItems.data);
  };

  const options = {
    legend: { position: "none" },
    histogram: {
      maxNumBuckets: 100,
      minValue: 0,
      maxValue: 30,
    },
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Sleep Frequency</Card.Title>
          <Chart
            chartType="Histogram"
            width="100%"
            height="200px"
            loader={<div>Loading Chart</div>}
            data={data}
            options={options}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default SleepHistogram;
