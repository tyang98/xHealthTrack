import React, { useState, useEffect } from "react";
import ReactFC from "react-fusioncharts";
import "firebase/auth";
import firebase from "firebase/app";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import axios from "axios";

ReactFC.fcRoot(FusionCharts, TimeSeries, FusionTheme);

const WChart = () => {
  const [items, setItems] = useState([] as any);
  const temp: any[] = [];

  let schema = [
    {
      name: "Time",
      type: "date",
      format: "%-m/%-d/%Y",
    },
    {
      name: "Weight",
      type: "number",
    },
  ];

  let fusionDataStore = new FusionCharts.DataStore();
  let tempDatastore = new FusionCharts.DataStore();
  let tempDatastore2 = tempDatastore.createDataTable(temp, schema);

  const [chartConfig, setChartConfig] = useState({
    type: "timeseries",
    renderAt: "container",
    width: "500",
    height: "400",
    dataFormat: "json",
    dataSource: {
      data: tempDatastore2,
      caption: {
        text: "Your weight history",
      },
      subcaption: {
        text: "Based off your daily check entries",
      },
      yaxis: [
        {
          columnname: "Weight",
          plottype: "line",
          plot: [
            {
              value: "Weight",
              connectnulldata: true,
            },
          ],
          title: "Weight",
        },
      ],
    },
  });

  const fetchData = async () => {
    const firebaseUser = firebase.auth().currentUser;
    const uid = firebaseUser?.uid;
    const tempItems = await axios.get(`/getWeightData?uid=${uid}`);
    setItems(tempItems.data);
    const newTable = fusionDataStore.createDataTable(items, schema);
    const newConfig = {
      type: "timeseries",
      renderAt: "container",
      width: "500",
      height: "400",
      dataFormat: "json",
      dataSource: {
        data: newTable,
        caption: {
          text: "Your weight history",
        },
        subcaption: {
          text: "Based off your daily check entries",
        },
        yaxis: [
          {
            columnname: "Weight",
            plottype: "line",
            plot: [
              {
                value: "Weight",
                connectnulldata: true,
              },
            ],
            title: "Weight",
          },
        ],
      },
    };
    setChartConfig(newConfig);
  };

  useEffect(() => {
    fetchData();
  });

  return <ReactFC {...chartConfig} />;
};

export default WChart;
