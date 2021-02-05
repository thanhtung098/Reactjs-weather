import React from 'react';
import './Chart.css'
const Chart = ({tranlateX, setTranlateTide,hours,coorY,checkHideSun}) => {
    let x = tranlateX;
    const y = 0;
    const c = setTranlateTide;
    let styles = {
        transform: `translate(-${x}px, ${y}px)`
    };
    const stylesTranlateTide = {
        transform: `translate(-${520}px, ${y}px)`
    };
    let dateNow = new Date()
    let getHour = 0, minutes = 0
    getHour = Math.floor((tranlateX * 2) / 60) 
    if(getHour > 24 && getHour < 48) {
        getHour = getHour - 24
    }
    if(getHour > 48) {
        getHour = getHour - 48
    }
    minutes = Math.round(tranlateX % 60);
    let timeAmPm
    timeAmPm = getHour + ' : ' + minutes + ' AM'
    if (getHour > 12) {
        timeAmPm = (getHour - 12) + ' : ' + minutes + ' PM'
    }
    
    return (
        <div className="chart-content">
            <ul className="breadcrumb">
              <li>Tide</li>
              <li>Sunrise & sunset</li>
            </ul>
            <div className="block-canvas-linesun">
            <div className="block-sun-line" id="block-sun-line">
                <div className="set-scroll">a</div>
            </div>
            <div className="ctent-sun-line" style={styles}>
                <canvas id="canvas-tide" style={stylesTranlateTide}></canvas>
                <canvas id="canvas"></canvas>
            </div>
            <div className="time-of-day">
                <span>{timeAmPm}</span>
            </div>
            <div className="block-icon-sun">
                <div className="icon-sun" className={checkHideSun === true? 'icon-sun active': 'icon-sun icon-moon'} style={{ top: coorY - 18 }}>
                <img src="./sun-line-icon.png"  />
                </div>
            </div>
            </div>
        </div>
    )
}
export default Chart