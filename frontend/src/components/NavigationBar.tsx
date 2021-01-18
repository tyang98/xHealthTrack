import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Image, Button } from 'react-bootstrap';
import { IconButton } from '@material-ui/core';
import navLogo from 'frontend/src/images/nav.png';
import GitHubIcon from '@material-ui/icons/GitHub';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import logo from 'frontend/src/logo.svg';
import '../styles/NavigationBar.css';


type NavigationBarProps = {
  callback: () => void;
}

const NavigationBar = ( { callback }: NavigationBarProps ) => {
  return (
    <Navbar className="color-nav" variant="light" expand="lg" sticky="top">
    <Navbar.Brand href="/">
      <Image src={navLogo} alt={""} />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/" >Home</Nav.Link>
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
      <IconButton onClick={callback}>
        <ExitToAppIcon
          style={{
            fontSize: '30',
            color: 'black'
          }} />
      </IconButton>
    </Navbar.Collapse>
  </Navbar>
  )
}

export default NavigationBar;