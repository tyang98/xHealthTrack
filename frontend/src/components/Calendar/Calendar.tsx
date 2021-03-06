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

type Activity = {
  name: string;
  type: number;
  duration: number;
  date: string;
};

const Calendar = () => {
  const firebaseUser = firebase.auth().currentUser;
  const uid = firebaseUser?.uid;

  const updateActivity = (
    uid: string,
    newActivity: any,
    activityKey: number
  ) => {
    axios
      .put(`/updateActivity?uid=${uid}`, { newActivity, activityKey })
      .then(() => console.log("updated activity!"))
      .catch((error) => console.log(`${activity}`));
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
  const [activities, setActivities] = useState<any>([]);
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
    setActivityKey(i);
    setEditing(true);
    setActivity(activity);
  };

  const retrieveData = async () => {
    let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;

    let response = await axios.get(`/getActivities?uid=${uid}`);
    const activitiesArr = response.data;
    let updatedValues: any[] = [];
    activitiesArr.forEach((val: Activity) => {
      if (val.date === queryDate) {
        updatedValues.push(val);
        setLoading(false);
        //setEditing(false);
      }
    });

    setActivities(updatedValues);

    // Update active days
    retrieveActiveDays();
  };

  const retrieveActiveDays = async () => {
    let response = await axios.get(`/getActivities?uid=${uid}`);
    const activitiesArr = response.data;

    const arr = activitiesArr.map((obj: Activity) => {
      return obj.date.length === 8
        ? obj.date.slice(0, 3)
        : obj.date.slice(0, 4);
    });
    setActiveDays(arr);
  };

  useEffect(() => {
    retrieveData();
  }, [selectedDay]); // eslint-disable-line react-hooks/exhaustive-deps

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
