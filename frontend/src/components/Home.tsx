import React, { useState, useEffect } from 'react';
import ScrollLock from 'react-scrolllock';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import background from 'frontend/src/images/img.png';
import "bootstrap/dist/css/bootstrap.css";

const Home = () => {
  
  return (
    <div className="home">
      <NavigationBar />
      <ScrollLock>
      <img src={background} alt={""} style={{ minHeight: '100%', minWidth: '100%', position: 'fixed', top: '0', left: '0', zIndex: -1 }} />
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
                  <a href="/check" className="btn btn-primary">Go</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* graph section */}
      <div className="container-fluid pt-3">
        <div className="row align-items-center">
          {/* first panel */}
          <div className="col algin-self-end"> {/* col-lg ? */}
            <div className="card text-center bg-default">
                <div className="card-body">
                  <div className="chart">
                    <canvas id="chart" className="chart-canvas"></canvas>
                  </div>
                </div>
            </div>
          </div>
          {/* large middle panel -- graph */}
          <div className="col-5">
            Something
          </div>
          {/* 3rd panel */}
          <div className="col">
            3rd panel for something else? 
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;