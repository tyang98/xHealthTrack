import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer>
    Built from scratch with React, TypeScript, HTML5, and CSS3.
    <br /> 
    &copy; xHealthTrack {new Date().getFullYear()}
  </footer>
  )
}

export default Footer;