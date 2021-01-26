import React from "react";
import loader from "../../images/loader.gif";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

import firebase from "firebase/app";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

type ActivityListProps = {
  loading: any;
  activities: any[];
  updateActivity: any;
  editActivity: any;
  setOpenSnackbar: (e: boolean) => void;
  setSnackbarMsg: any;
  setEditing: (e: boolean) => void;
};

const ActivityList = ({
  loading,
  activities,
  updateActivity,
  editActivity,
  setOpenSnackbar,
  setSnackbarMsg,
  setEditing,
}: ActivityListProps) => {
  const firebaseUser = firebase.auth().currentUser;
  const uid = firebaseUser?.uid;

  const deleteActivity = (i: number) => {
    // Get key of activity in firebase
    const activityKey = Object.keys(activities)[i];
    // Connect to our firebase API
    const emptyActivity = {
      date: null,
      duration: null,
      type: null,
      name: null,
    };

    updateActivity(uid, emptyActivity, activityKey);

    // Show notification
    setOpenSnackbar(true);
    setSnackbarMsg("Deleted activity");
    setTimeout(() => {
      setOpenSnackbar(false);
    }, 3000);

    // stop editing
    setEditing(false);
  };

  return (
    <>
      {loading === true ? <img src={loader} alt={loader}></img> : ""}

      {activities === [] || activities === null ? (
        <p>No activities added yet.</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activities.map((activity: any, index: number) => {
                let { name, type, duration } = activity;
                switch (activity.type) {
                  case 1:
                    type = "Lifting weights";
                    break;
                  case 2:
                    type = "Running";
                    break;
                  case 3:
                    type = "Cycling";
                    break;
                  default:
                    type = "Not set";
                }
                return (
                  <TableRow key={index}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{type}</TableCell>
                    <TableCell>{duration}</TableCell>
                    <TableCell>
                      <DeleteIcon onClick={(e) => deleteActivity(index)} />
                      <EditIcon
                        onClick={(e) => editActivity(activity, index)}
                        style={{ marginLeft: "20px" }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default ActivityList;
