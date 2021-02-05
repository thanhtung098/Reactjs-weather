import React from 'react';
import NowWeather from './nowWeather.js'

import './header.css'
const Header = (dataCurrent) => {
    return (
        <div className="top-content">
            <header>
                <div className="toggle-bar">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </div>
                <div className="block-location">
                    <p>myENV</p>
                    <span>Singapore</span>
                </div>
                <div className="block-icon">
                    <img src="../bell.png" />
                </div>
            </header>
           
        <NowWeather dataCurrent= {dataCurrent.dataCurrent}></NowWeather>
        
        </div>
    )
}
export default Header