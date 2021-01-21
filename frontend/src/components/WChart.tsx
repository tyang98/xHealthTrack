import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";



ReactFC.fcRoot(FusionCharts, TimeSeries, FusionTheme);

const WChart = () => {

  const [items, setItems] = useState([]);

  let schema = [
    {
      name: "date",
      type: "date",
      format: "%-m/%-d/%Y",
    },
    {
      name: "weight",
      type: "number",
    }
  ];

  const fetchData = () => {
    fetch("/getWeightData")
      .then((res) => res.json())
      .then((json) => setItems(json));
    console.log(items);
  };

  let tempdata = [
    [
        "1/4/2011",
        127
    ],
    [
        "1/5/2011",
        140
    ],
    [
        "1/6/2011",
        160
    ],
    [
      "1/11/2011",
      170
    ],
    [
        "12/31/2011",
        240
    ],
    [
        "8/31/2011",
        180
    ]
  ]
  let fusionDataStore = new FusionCharts.DataStore();
  //let fusionTable = fusionDataStore.createDataTable(tempdata, schema);
  let fusionTable:any = '';

  useEffect(() => {
    fetchData();
    fusionTable = fusionDataStore.createDataTable(items, schema);
  });

  const chartConfigs = {
    type: "timeseries",
    renderAt: "container",
    width: "500",
    height: "400",
    dataFormat: "json",
    dataSource: {
      data: fusionTable,
      caption: {
        text: "Your weight history"
      },
        subcaption: {
          text: "Based off your daily check entries"
        },
        yaxis: [
        {
          columnname: "Weight",
          plottype: "line",
          plot: [
            {
              value: "Weight",
              connectnulldata: true
            }
          ],
          title: "Weight",
          connectNullData: true
        }
        ],
    }
  };

  return <ReactFC {...chartConfigs} />;
};

export default WChart;