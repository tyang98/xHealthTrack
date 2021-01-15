import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { IconButton } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import logo from 'frontend/src/logo.svg';

const NavigationBar = () => {
  return (
    <Navbar className="color-nav" variant="dark" expand="lg" sticky="top">
    <Navbar.Brand href="/">
      <Image src={logo} />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/">Fitness</Nav.Link>
        <Nav.Link href="/">Sleep</Nav.Link>
        <Nav.Link href="/">Health</Nav.Link>

      </Nav>
      <Nav.Link href="https://github.com/tyang98/xHy0rinstyx">
        <IconButton>
          <GitHubIcon
            style={{
              fontSize: '30',
              color: 'white'
            }} />
        </IconButton>
      </Nav.Link>
    </Navbar.Collapse>
  </Navbar>
  )
}

export default NavigationBar;