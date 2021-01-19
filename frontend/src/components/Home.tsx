import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import ScrollLock from "react-scrolllock";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import background from "frontend/src/images/img.png";
import { Button, Modal } from "react-bootstrap";
import Check from "./Check";
import WChart from "./WChart";

type HomeProps = {
  callback: () => void;
};

const Home = ({ callback }: HomeProps) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            <div className="card text-left text-primary bg-light border-primary">
              <div className="d-flex align-items-center">
                <div className="mr-auto p-2">
                  <div className="card-body">
                    <h5>Daily Check - Update your graphs</h5>
                  </div>
                </div>
                <div className="p-2">
                  <Button variant="primary" onClick={handleShow}>
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
