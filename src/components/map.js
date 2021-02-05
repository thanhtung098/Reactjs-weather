import React from 'react';
const MapWeather = ({arrayDataCondition,dataNextDays,getDataCondition,session}) => {
    let dataCurrent
    let objDataCondition
    if(dataNextDays.length > 0 && Object.keys(arrayDataCondition).length !== 0) {
        dataCurrent = dataNextDays[0]
        objDataCondition = arrayDataCondition
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
        <div className="ctent-map">
                <img src="../map-singapo.jpg" />
                <div className="body-map">
                    <div className="status-weather">
                        <p>24-hour Forecast</p>
                         <div className="list-current-status">
                            <span><img src="../thermometer.png" /> Temp <br/>{dataCurrent.day.mintemp_c } - {dataCurrent.day.maxtemp_c } &#8451;</span>
                            <span><img src="../humidity.png" /> Humidity <br/>{dataCurrent.day.avghumidity }%</span>
                            <span><img src="../icon-wind-blue-white.png" /> Wind <br/>{dataCurrent.day.maxwind_mph } - {dataCurrent.day.maxwind_kph }km/h</span>
                         </div>
                         <div className="weather-location">
                            <span className="top-location">
                                <img src={objDataCondition.top.icon} />
                            </span>
                            <span className="bottom-location">
                                <img src={objDataCondition.bottom.icon} />
                            </span>
                            <span className="center-location">
                                <img src={objDataCondition.center.icon} />
                            </span>
                            <span className="right-location">
                                <img src={objDataCondition.right.icon}/>
                            </span>
                            <span className="left-location">
                                <img src={objDataCondition.left.icon} />
                            </span>
                         </div>
                        <div className="change-section-day">
                            <span className={session === "morning"? 'active': ''} onClick={() => getDataCondition('morning')}>Morning</span>
                            <span className={session === "afternoon"? 'active': ''} onClick={() => getDataCondition('afternoon')}>Afternoon</span>
                            <span className={session === "night"? 'active': ''} onClick={() => getDataCondition('night')}>Night</span>
                        </div>
                    </div>
                </div>
            </div>
    )
}
export default MapWeather