import React, { useState, useEffect } from "react";
import moment from "moment";
import { Grid, Paper, Snackbar } from "@material-ui/core";
import Body from "./CalendarBody";
import Head from "./CalendarHeader";
import firebase from "firebase/app";
import EditActivity from "./EditActivity";
import AddActivity from "./AddActivity";
import ActivityList from "./ActivityList";
import axios from "axios";

const Calendar = () => {
  const firebaseUser = firebase.auth().currentUser;
  const uid = firebaseUser?.uid;

  const db = firebase.database();

  const updateActivity = (uid: string, activity: any, activityKey: number) => {
    const ref = db.ref().child(`users/${uid}/activities/${activityKey}`);
    ref.update(activity);
  };

  let defaultSelectedDay = {
    day: moment().format("D"),
    month: moment().month(),
    year: moment().year(),
  };

  const allMonths = moment.months();
  const currentMonth = () => date.format("MMMM");
  const currentYear = () => date.format("YYYY");

  const [date, setDate] = useState(moment());
  const [toggle, setToggle] = useState(false);
  const [selectedDay, setSelected] = useState(defaultSelectedDay);

  /*** ADDING AN ACTIVITY ***/
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState(null);

  /*** ACTIVITY LIST ***/
  const [activities, setActivities] = useState(true);
  const [loading, setLoading] = useState<any>([]);
  const [activeDays, setActiveDays] = useState<any>([]);

  /*** EDIT AN ACTIVITY ***/
  const [editing, setEditing] = useState(false);
  const [activity, setActivity] = useState(null);
  const [activityKey, setActivityKey] = useState<any>(null);

  const currentMonthNum = () => date.month();
  const currentYearNum = () => date.year();
  const daysInMonth = () => date.daysInMonth();
  const currentDay = () => date.format("D");
  const actualMonth = () => moment().format("MMMM");

  const firstDay = () => moment(date).startOf("month").format("d");

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
      year: currentYearNum(),
    });
  };

  const editActivity = (activity: any, i: number) => {
    setActivityKey(Object.keys(activities)[i]);
    setEditing(true);
    setActivity(activity);
  };

  const retrieveData = () => {
    let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;

    let ref = db.ref().child(`users/${uid}/activities`);
    ref
      .orderByChild("date")
      .equalTo(queryDate)
      .on("value", (snapshot) => {
        let data = snapshot.val();
        setActivities(data);
        console.log(data);
        setLoading(false);
        // setEditing(false); Add later
      });

    // Update active days
    retrieveActiveDays();
  };

  const retrieveActiveDays = () => {
    let ref = db.ref().child(`users/${uid}/activities`);
    ref.on("value", (snapshot) => {
      let data = snapshot.val();
      const values = Object.values(data);
      // Store all active day/month combinations in array for calendar
      const arr = values.map((obj: any) => {
        return obj.date.length === 8
          ? obj.date.slice(0, 3)
          : obj.date.slice(0, 4);
      });
      console.log(arr);
      setActiveDays(arr);
    });
  };

  useEffect(() => retrieveData(), [selectedDay]); // eslint-disable-line react-hooks/exhaustive-deps

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
      <Grid item xs={12} md={4} lg={3}>
        <Paper className="paper">
          {editing ? (
            <>
              <h3>
                Edit activity on {selectedDay.day}-{selectedDay.month + 1}{" "}
              </h3>
              <EditActivity
                activity={activity}
                activityKey={activityKey}
                updateActivity={updateActivity}
                setEditing={setEditing}
                selectedDay={selectedDay}
                setOpenSnackbar={setOpenSnackbar}
                setSnackbarMsg={setSnackbarMsg}
              />
            </>
          ) : (
            <>
              <h3>
                Add activity on {selectedDay.month + 1}/{selectedDay.day}{" "}
              </h3>
              <AddActivity
                selectedDay={selectedDay}
                setOpenSnackbar={setOpenSnackbar}
                setSnackbarMsg={setSnackbarMsg}
              />
            </>
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} md={7}>
        <Paper className="paper">
          <h3>
            Activities on {selectedDay.month + 1}/{selectedDay.day}
          </h3>
          <ActivityList
            loading={loading}
            activities={activities}
            updateActivity={updateActivity}
            setOpenSnackbar={setOpenSnackbar}
            setSnackbarMsg={setSnackbarMsg}
            editActivity={editActivity}
            setEditing={setEditing}
          />
        </Paper>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={openSnackbar}
        message={snackbarMsg}
      />
    </Grid>
  );
};

export default Calendar;
