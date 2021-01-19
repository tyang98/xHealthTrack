import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactFC from "react-fusioncharts";
import * as FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { items } from "fusionmaps";

const WChart = () => {
  ReactFC.fcRoot(FusionCharts, TimeSeries, FusionTheme);
  const data = [];
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

  let tempdata = [
    ["1/4/2011", 16.448],
    ["1/5/2011", 272.736],
    ["1/5/2011", 11.784],
    ["12/31/2014", 20.72],
    ["12/31/2014", 13.904],
    ["12/31/2014", 3.024],
  ];

  const fetchData = () => {
    fetch("/getWeightData")
      .then((res) => res.json())
      .then((json) => setItems(json));
    console.log(items);
  };

  useEffect(() => fetchData(), []);
  // useEffect(() => {
  //   Tabletop.init({
  //     key: "1OsV0V-ffEF4-BkCqhoKXPlaJN__g_B94fZEsUt1cKXU",
  //     callback: (data: any) => {
  //       setItems(data);
  //     },
  //     simpleSheet: true,
  //   });
  // }, []);

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
      data: tempdata,
    },
  };

  return <ReactFC {...chartConfigs} />;
};

export default WChart;
