import React from "react";
import moment from "moment";

import { Grid, Paper, Snackbar } from "@material-ui/core";
import Body from "./CalendarBody";
import Head from "./CalendarHeader";
import firebase from "firebase";
import { useState } from "react";

const Calendar = () => {
  const firebaseUser = firebase.auth().currentUser;
  const uid = firebaseUser?.uid;

  let defaultSelectedDay = {
    day: moment().format("D"),
    month: moment().month(),
  };

  const allMonths = moment.months();
  const [date, setDate] = useState(moment());
  const [toggle, setToggle] = useState(false);
  const [selectedDay, setSelected] = useState(defaultSelectedDay);

  /*** ADDING AN ACTIVITY ***/
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState(null);

  /*** ACTIVITY LIST ***/
  const [activities, setActivities] = useState(true);
  const [loading, setLoading] = useState([]);
  const [activeDays, setActiveDays] = useState([]);

  /*** EDIT AN ACTIVITY ***/
  const [editing, setEditing] = useState(false);
  const [activity, setActivity] = useState(null);
  const [activityKey, setActivityKey] = useState(null);

  const currentMonth = () => date.format("MMMM");
  const currentYear = () => date.format("YYYY");
  const currentMonthNum = () => date.month();
  const daysInMonth = () => date.daysInMonth();
  const currentDay = () => date.format("D");
  const actualMonth = () => moment().format("MMMM");

  const setMonth = (month: string) => {
    const number = allMonths.indexOf(month);
    const newDate = date.set("month", number);
    setDate(newDate);
    setToggle(false);
  };

  const changeToggle = () => {
    setToggle(!toggle);
  };

  const setSelectedDay = (day: any) => {
    setSelected({
      day,
      month: currentMonthNum(),
    });
  };

  const firstDay = () => moment(date).startOf("month").format("d");

  const editActivity = (activity: any, i: number) => {
    //setActivityKey(Object.keys(activities)[i]);
    setEditing(true);
    setActivity(activity);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <Head
          allMonths={allMonths}
          setMonth={setMonth}
          toggleMonthSelect={changeToggle}
          currentMonth={currentMonth}
          currentYear={currentYear}
          showMonthTable={toggle}
        />
        <Body
          firstDayOfMonth={firstDay}
          daysInMonth={daysInMonth}
          currentDay={currentDay}
          currentMonth={currentMonth}
          currentMonthNum={currentMonthNum}
          actualMonth={actualMonth}
          setSelectedDay={setSelectedDay}
          selectedDay={selectedDay}
          weekdays={moment.weekdays()}
          activeDays={activeDays}
        />
      </Grid>
    </Grid>
  );
};

export default Calendar;
