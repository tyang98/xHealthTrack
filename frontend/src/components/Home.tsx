import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import ScrollLock from "react-scrolllock";
import NavigationBar from "./NavigationBar";
import moment from 'moment';
import Footer from "./Footer";
import '../styles/Home.css';
import background from "frontend/src/images/img.png";
import { Button, Modal } from "react-bootstrap";
import axios from 'axios';
import 'firebase/auth';
import firebase from 'firebase/app';
import Check from "./Check";
import WChart from "./WChart";

type HomeProps = {
  callback: () => void;
};

type User = {
  uid: string;
  firstName: string;
  lastName: string;
}

const Home = ({ callback }: HomeProps) => {
  const [firstName, setFirstName] = useState('br');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getWelcome = () => {
    const firebaseUser = firebase.auth().currentUser;
    const uid = firebaseUser?.uid;
    axios.get<User>(`/getUser?uid=${uid}`)
    .then((user) => { setFirstName(user.data.firstName)})
    .catch((error) => console.log(error));
  }

  useEffect(() => getWelcome(), []);

  const welcomeMessage = `Welcome ${firstName}! `;

  return (
    <div className="home">
      <NavigationBar callback={callback} />
      <ScrollLock>
        <img
          src={background}
          alt={""}
          style={{
            minHeight: "100%",
            minWidth: "100%",
            position: "fixed",
            top: "0",
            left: "0",
            zIndex: -1,
          }}
        />
      </ScrollLock>
      {/* daily check */}
      <div className="container-fluid pt-3">
        <div className="row">
          
          <div className="col">
            <h1>{welcomeMessage} <span className="wave">👋</span> It is {moment().format(' h:mm:ss A, MMMM Do YYYY')}</h1>
            <br/>
            <div className="card text-left text-primary bg-light border-primary">
              <div className="d-flex align-items-center">
                <div className="mr-auto p-2">
                  <div className="card-body">
                    <h5>Daily Check - Update Your Health Status</h5>
                  </div>
                </div>
                <div className="p-4">
                  <Button variant="primary" onClick={handleShow} size="lg" >
                    Go
                  </Button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                      <Check callback={handleClose} />
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* graph section */}
      <div className="container-fluid pt-3">
        <div className="row">
          {/* first panel */}
          <div className="col algin-self-end">
            {" "}
            {/* col-lg ? */}
            <div className="card text-center bg-default">
              <div className="card-body">
                <div className="chart">
                  <canvas id="chart" className="chart-canvas">
                    Something
                  </canvas>
                </div>
              </div>
            </div>
          </div>
          {/* large middle panel -- graph */}
          <div className="col-5 align-self-center">
            <WChart />
          </div>
          {/* 3rd panel */}
          <div className="col">3rd panel for something else?</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
