import React, { useState, useEffect } from 'react';
import ScrollLock from 'react-scrolllock';
import Footer from './Footer';
import background from 'frontend/src/images/img.png';
import "bootstrap/dist/css/bootstrap.css";

const Tabletop = require('tabletop');

const Home = () => {

  const [items, setItems] = useState([])

  useEffect(() => {
    Tabletop.init({
        key: '1OsV0V-ffEF4-BkCqhoKXPlaJN__g_B94fZEsUt1cKXU',
        callback: (data: any) => {
            setItems(data)
        },
        simpleSheet: true
      })
  }, [])
  
  return (
    <div>
      <ScrollLock>
      <img src={background} alt={""} style={{ minHeight: '100%', minWidth: '100%', position: 'fixed', top: '0', left: '0', zIndex: -1 }} />
      </ScrollLock>
     
    </div>
  )
}

export default Home;