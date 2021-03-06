import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Slider,
  Typography,
} from "@material-ui/core";
import firebase from "firebase";
import axios from "axios";

type AddActivityProps = {
  selectedDay: any;
  setOpenSnackbar: (e: boolean) => void;
  setSnackbarMsg: any;
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AddActivity = ({
  selectedDay,
  setOpenSnackbar,
  setSnackbarMsg,
}: AddActivityProps) => {
  const firebaseUser = firebase.auth().currentUser;
  const uid = firebaseUser?.uid;
  const classes = useStyles();
  selectedDay.year = new Date().getFullYear();
  let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;

  // Set default activity object
  const defaultActivity = {
    name: "",
    type: 1,
    duration: 60,
    date: queryDate,
  };

  const [activity, setActivity] = useState(defaultActivity);

  const addActivity = (uid: any, activity: any) => {
    axios
      .put(`/addActivity?uid=${uid}`, { activity })
      .then(() => console.log("added activity!"))
      .catch((error) => console.log(error));
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setActivity({
      ...activity,
      date: queryDate,
      [name]: value,
    });
  };

  const handleSlider = (e: any) => {
    const duration = e.target.getAttribute("aria-valuenow");
    setActivity({ ...activity, duration: duration });
  };

  const isValid = activity.name === "";

  // Add the activity to firebase via the API made in this app
  const handleSubmit = () => {
    if (firebaseUser) {
      addActivity(uid, activity);
      setActivity(defaultActivity);
      // Show notification
      setOpenSnackbar(true);
      setSnackbarMsg("Added Activity! Refresh to see changes.");
      setTimeout(() => {
        setOpenSnackbar(false);
      }, 3000);
    }
  };

  return (
    <form noValidate onSubmit={(e) => e.preventDefault()}>
      <FormControl className={classes.formControl}>
        <TextField
          style={{ marginTop: "5px" }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Activity name"
          value={activity.name}
          name="name"
          onChange={handleChange}
        />
        <div style={{ marginTop: "20px", marginBottom: "30px" }}>
          <Typography id="discrete-slider" gutterBottom>
            Type
          </Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={activity.type}
            style={{ minWidth: "100%" }}
            name="type"
            onChange={handleChange}
          >
            <MenuItem value={1}>Lifting Weights</MenuItem>
            <MenuItem value={2}>Running</MenuItem>
            <MenuItem value={3}>Cycling</MenuItem>
          </Select>
        </div>
        <Typography id="discrete-slider" gutterBottom>
          Duration
        </Typography>
        <Slider
          defaultValue={activity.duration}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={10}
          marks
          min={10}
          max={120}
          name="duration"
          onChange={handleSlider}
          style={{ marginBottom: "20px" }}
        />
      </FormControl>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={isValid}
      >
        Add activity
      </Button>
    </form>
  );
};

export default AddActivity;
