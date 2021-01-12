import React, { useState } from 'react';
import 'firebase/auth';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import firebase from 'firebase/app';
import { useEffect } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyDlnpgB1moM8CrTWNJSjKP2abpCA0ZGIo8",
  authDomain: "xhy0rinstyx.firebaseapp.com",
  projectId: "xhy0rinstyx",
  databaseURL: "https://xhy0rinstyx.firebaseio.com",
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
  return (
    <div>

    </div>
  )
}

export default Authentication;
export type { User };