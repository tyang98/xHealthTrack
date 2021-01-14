import React, { Component } from 'react';
import ScrollLock from 'react-scrolllock';
import Footer from './Footer';
import background from 'frontend/src/images/img.png';

const Home = () => {

  return (
    <div>
      <ScrollLock>
      <img src={background} alt={""} style={{ minHeight: '100%', minWidth: '100%', position: 'fixed', top: '0', left: '0', zIndex: -1 }} />
      </ScrollLock>
      <Footer />
    </div>
  )
}

export default Home;