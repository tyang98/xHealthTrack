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

type EditActivityProps = {
  activity: any;
  activityKey: any;
  selectedDay: any;
  setEditing: any;
  updateActivity: any;
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

const EditActivity = ({
  activity,
  activityKey,
  selectedDay,
  setEditing,
  updateActivity,
  setOpenSnackbar,
  setSnackbarMsg,
}: EditActivityProps) => {
  const firebaseUser = firebase.auth().currentUser;
  const uid = firebaseUser?.uid;
  const classes = useStyles();
  selectedDay.year = new Date().getFullYear();
  let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;

  // Set default activity object
  const defaultActivity = {
    name: activity.name,
    type: activity.type,
    duration: activity.duration,
    date: activity.date,
  };

  const [newActivity, setNewActivity] = useState(defaultActivity);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewActivity({
      ...newActivity,
      date: queryDate,
      [name]: value,
    });
  };

  const handleSlider = (e: any) => {
    const duration = e.target.getAttribute("aria-valuenow");
    setNewActivity({ ...newActivity, duration: duration });
  };

  const isValid = newActivity.name === "";

  const handleSubmit = () => {
    if (firebaseUser) {
      updateActivity(uid, newActivity, activityKey);
      setNewActivity(defaultActivity);
      // Show notification
      setOpenSnackbar(true);
      setSnackbarMsg("Added activity");
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
          value={newActivity.name}
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
            value={newActivity.type}
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
          defaultValue={newActivity.duration}
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
        Update activity
      </Button>
    </form>
  );
};

export default EditActivity;
