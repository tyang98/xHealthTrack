import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Image } from "react-bootstrap";
import { IconButton } from "@material-ui/core";
import navLogo from "frontend/src/images/nav.png";
import GitHubIcon from "@material-ui/icons/GitHub";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Home from "./Home";
import Sleep from "./Sleep";
import Fitness from "./Fitness";
import Health from "./Health";
import "../styles/NavigationBar.css";

import { Switch, Route, Link } from "react-router-dom";

type NavigationBarProps = {
  callback: () => void;
};

const NavigationBar = ({ callback }: NavigationBarProps) => {
  return (
    <div>
      <div>
        <Navbar className="color-nav" variant="light" expand="lg" sticky="top">
          <Navbar.Brand as={Link} to="/">
            <Image src={navLogo} alt={""} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/fitness">
                Fitness
              </Nav.Link>
              <Nav.Link as={Link} to="/sleep">
                Sleep
              </Nav.Link>
              <Nav.Link as={Link} to="/health">
                Health
              </Nav.Link>
            </Nav>
            <Nav.Link href="https://github.com/tyang98/xHy0rinstyx">
              <IconButton>
                <GitHubIcon
                  style={{
                    fontSize: "30",
                    color: "black",
                  }}
                />
              </IconButton>
            </Nav.Link>
            <IconButton onClick={callback}>
              <ExitToAppIcon
                style={{
                  fontSize: "30",
                  color: "black",
                }}
              />
            </IconButton>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div>
        <Switch>
          <Route path="/sleep" component={Sleep} />
          <Route path="/health" component={Health} />
          <Route path="/fitness" component={Fitness} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </div>
  );
};

export default NavigationBar;
