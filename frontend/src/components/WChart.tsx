import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { items } from "fusionmaps";

ReactFC.fcRoot(FusionCharts, TimeSeries, FusionTheme);
const Tabletop = require("tabletop");

const WChart = () => {
  const data = [];
  const [items, setItems] = useState();

  const fetchData = () => {
    fetch("/getData")
      .then((res) => res.json())
      .then((json) => setItems(json));
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
      data: items,
    },
  };

  return <ReactFC {...chartConfigs} />;
};

export default WChart;
