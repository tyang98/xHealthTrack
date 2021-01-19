import React, { useState, useEffect } from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";



ReactFC.fcRoot(FusionCharts, TimeSeries, FusionTheme);

const WChart = () => {

  const [items, setItems] = useState();

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

  const dataFetch = () => {fetch(
    "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json"
    ).then((res: { json: () => any; }) => res.json()
    ).then((json) => setItems(json));
  }

  const fetchData = () => {
    fetch("/getWeightData")
      .then((res) => res.json())
      .then((json) => setItems(json));
    console.log(items);
  };

  let tempdata = [
    [
        "1/4/2011",
        16.448
    ],
    [
        "1/5/2011",
        272.736
    ],
    [
        "1/5/2011",
        11.784
    ],
    [
        "12/31/2014",
        20.72
    ],
    [
        "12/31/2014",
        13.904
    ]
  ]
  let fusionDataStore = new FusionCharts.DataStore();
  let fusionTable = fusionDataStore.createDataTable(tempdata, schema);

  // useEffect(() => fetchData(), []);
  useEffect(() => dataFetch(), []);

  const chartConfigs = {
    type: "timeseries",
    width: "500",
    height: "500",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Your weight history",
        subCaption: "Past ???? days",
        xAxisName: "Date",
        yAxisName: "Weight",
        numberSuffix: "lb",
        theme: "fusion",
      },
      // Chart Data
      data: fusionTable
    },
  };

  return <ReactFC {...chartConfigs} />;
};

export default WChart;