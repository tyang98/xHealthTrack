import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import moment from "moment";
import "../styles/Home.css";
import background from "frontend/src/images/img.png";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import "firebase/auth";
import firebase from "firebase/app";
import Check from "./Check";
import WeightChart from "./WeightChart";
import SleepChart from "./SleepChart";
import { Row, Container, Col } from "react-bootstrap";

type User = {
  uid: string;
  firstName: string;
  lastName: string;
};

const Home = () => {
  const [firstName, setFirstName] = useState("Friend");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getWelcome = () => {
    const firebaseUser = firebase.auth().currentUser;
    const uid = firebaseUser?.uid;
    axios
      .get<User>(`/getUser?uid=${uid}`)
      .then((user) => {
        setFirstName(user.data.firstName);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => getWelcome(), []);

  const welcomeMessage = `Welcome ${firstName}! `;

  return (
    <div className="home">
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
      {/* daily check */}
      <div className="container-fluid pt-3">
        <div className="row">
          <div className="col">
            <h1>
              {welcomeMessage} <span className="wave">👋</span>
            </h1>
            <h3>It is {moment().format(" h:mm A, MMMM Do YYYY")}</h3>
            <br />
            <div className="card text-left text-primary bg-light border-primary">
              <div className="d-flex align-items-center">
                <div className="mr-auto p-2">
                  <div className="card-body">
                    <h5>Daily Check - Update Your Health Status</h5>
                  </div>
                </div>
                <div className="p-4">
                  <Button variant="primary" onClick={handleShow} size="lg">
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
      <Container style={{ marginTop: "2.5%" }}>
        <Row>
          <Col>
            <SleepChart />
          </Col>
          {/* large middle panel -- graph */}
          <Col>
            <WeightChart />
          </Col>
        </Row>
      </Container>
      <br />
    </div>
  );
};

export default Home;
