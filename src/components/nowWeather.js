import React from 'react';

const NowWeather = (dataCurrent) => {
    let dataCondition
    if(dataCurrent.dataCurrent && dataCurrent.dataCurrent != "") {
        dataCondition = dataCurrent.dataCurrent
    } else {
        return (
            <div className="ml-loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>  
        )
    }
    return (
        <div>
            <div className="now-weather">
                <div className="icon-windy"><img src={dataCondition.condition.icon} /></div>
                <div className="status-weather">
                    {dataCondition.condition.text}
                </div>
                <div className="temp-weather-percent">
                    <span className="temp-text"><img src="./thermometer.png" />{dataCondition.temp_c} &#8451; </span>
                    <span className="temp-text-humidity"><img src="./humidity.png" />{dataCondition.humidity} % </span>
                </div>
            </div>
            <div className="list-function">
            <ul>
                <li>
                    <span>PSI</span>
                    <span>{dataCondition.pressure_in}</span>
                </li>
                <li>
                    <span>FEELLIKE</span>
                    <span>{dataCondition.feelslike_c}</span>
                </li>
                <li>
                    <span>CLOUD</span>
                    <span>{dataCondition.cloud}</span>
                </li>
                <li>
                    <span>UV</span>
                    <span>{dataCondition.uv}</span>
                </li>
                <li>
                    <span>WIND</span>
                    <span>{dataCondition.wind_kph}</span>
                </li>
                <li>
                    <span>WIND DIRECTION</span>
                    <span>{dataCondition.wind_dir}</span>
                </li>
            </ul>
        </div>
        </div>
    )
}

export default NowWeather