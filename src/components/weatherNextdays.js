import React from 'react';
import './weatherNextdays.css';
import ItemDay from './itemDay.js'

const WeatherNextdays = ({dataNextDays}) => {
    let renderList =""
    if(dataNextDays.length > 0) {
        renderList = dataNextDays.map((item) => {
            return <ItemDay item={item}></ItemDay>
        })
    } else {
        return(
            <div>
                <hr></hr>
                <hr></hr>
                <hr></hr>
                <hr></hr>
                <hr></hr>
                <hr></hr>
            </div>  
        )
    }
    
    return (
        <div>
            <h2 className="number-list-days">3-day outlook</h2>
            <div className="list-weather-days">
                {renderList}
            </div>
        </div>
    )
}

export default WeatherNextdays