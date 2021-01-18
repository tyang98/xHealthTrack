import React, { useEffect, useState } from 'react';
import 'firebase/auth';
import Login from './Login';
import Home from './Home';
import { Switch, Route, Redirect} from 'react-router-dom';
import axios from 'axios';
import firebase from 'firebase/app';
import Snackbar from '@material-ui/core/Snackbar';
import Register from './Register';
//import { useEffect } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyDlnpgB1moM8CrTWNJSjKP2abpCA0ZGIo8",
  authDomain: "xhy0rinstyx.firebaseapp.com",
  projectId: "xhy0rinstyx",
  storageBucket: "xhy0rinstyx.appspot.com",
  messagingSenderId: "991064101408",
  appId: "1:991064101408:web:0ac09d8ff05dbcf89a2245",
  measurementId: "G-M72EDTMTTP"
};

firebase.initializeApp(firebaseConfig);

type User = {
  uid: string;
  firstName: string;
  lastName: string;
}

const Authentication = () => {

  const [user, setUser] = useState<User | null>(null);
  const [msg, setMsg] = useState('');
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  // const onAuthStateChanged = () => {
  //   return firebase.auth().onAuthStateChanged(async (currentUser) => {
  //     if (currentUser !== null) {
  //       const user = await axios.get<User>(`/getUser?uid=${currentUser.uid}`);
  //       console.log(user.data.firstName);
  //       setUser(user.data);
  //     }
  //     else {
  //       setUser(null);
  //     }
  //   });
  // }

  // useEffect(() => onAuthStateChanged(), []);


  const register = (email: string, password: string, firstName: string, lastName: string) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userInfo) => {
        if (userInfo !== null) {
          const user = userInfo.user;
          const uid = user?.uid;
          axios.post('/createUser', { uid, firstName, lastName })
            .then(async (res) => {
              const user = await axios.get<User>(`/getUser?uid=${uid}`);
              setUser(user.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error.code);
        switch (error.code) {
          case ('auth/email-already-in-use'):
            setMsg('Account with this email address already exists!');
            break;
          case ('auth/invalid-email'):
            setMsg('Please enter a valid email!');
            break;
          default:
            setMsg('Sign up unsuccessful!');
        }
        setSnackBarOpen(true);
      });
  }

  const signout = () => {
    firebase.auth().signOut().then(() => {
      setUser(null);
      setMsg('Log Out Successful');
      setSnackBarOpen(true);
    }).catch((error) => {
      setMsg('Log Out failed');
      console.log(error);
      setSnackBarOpen(true);
    });

  }

  const login = (email: string, password: string) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(async (userInfo) => {
        if (userInfo !== null) {
          const uid = userInfo.user?.uid;
          const user = await axios.get<User>(`/getUser?uid=${uid}`);
          setUser(user.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
        switch (error.code) {
          case ('auth/invalid-email'):
            setMsg('Please enter a valid email!');
            break;
          case ('auth/user-not-found'):
            setMsg('Invalid email or password!');
            break;
          case ('auth/wrong-password'):
            setMsg('Invalid email or password!');
            break;
          default:
            setMsg('Log in unsuccessful!');
        }
        setSnackBarOpen(true);
      });
  }

  return (
    <div>
      <Switch>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register callback={register} />}
        </Route>
        <Route path="/">
          {user ? <Home callback={signout} /> : <Login callback={login} />} 
        </Route>
      </Switch>
      <Snackbar
        message={msg}
        open={snackBarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackBarOpen(false)}
      />
    </div>
  )
}

export default Authentication;
export type { User };