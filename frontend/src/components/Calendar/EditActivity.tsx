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
  selectedDay: any;
  setOpenSnackbar: (e: boolean) => void;
  setSnackbarMsg: (e: string) => void;
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
  selectedDay,
  setOpenSnackbar,
  setSnackbarMsg,
}: EditActivityProps) => {
  const firebaseUser = firebase.auth().currentUser;
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

  const updateActivity = (uid, activity, activityKey) => {
    const ref = this.db.ref().child(`users/${uid}/activities/${activityKey}`);
    ref.update(activity);
    };

  const handleSubmit = () => {
    if (firebaseUser) {
      firebase.updateActivity(uid, activity);
      setActivity(defaultActivity);
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
        Update activity
      </Button>
    </form>
  );
};

export default EditActivity;
