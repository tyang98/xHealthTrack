import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { IconButton } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import logo from 'frontend/src/logo.svg';
import '../styles/NavigationBar.css';

const NavigationBar = () => {
  return (
    <Navbar className="color-nav" variant="light" expand="lg" sticky="top">
    <Navbar.Brand href="/">
      xHy0rinstyx
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link className="labels" href="/" >Home</Nav.Link>
        <Nav.Link href="/fitness" className="labels">Fitness</Nav.Link>
        <Nav.Link href="/sleep" className="labels">Sleep</Nav.Link>
        <Nav.Link href="/health" className="labels">Health</Nav.Link>
      </Nav>
      <Nav.Link href="https://github.com/tyang98/xHy0rinstyx">
        <IconButton>
          <GitHubIcon
            style={{
              fontSize: '30',
              color: 'black'
            }} />
        </IconButton>
      </Nav.Link>
    </Navbar.Collapse>
  </Navbar>
  )
}

export default NavigationBar;