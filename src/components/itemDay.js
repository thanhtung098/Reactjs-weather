import React from 'react';

const ItemDays = (item) => {
    let itemDay = item.item
    let dateNow = new Date(itemDay.date) + ''
    let arr = dateNow.split(' ')
    return (
        <div className="item-day">
            <div className="block-date-txt">
                <div className="icon-weather">
                    <h1>{arr[0]}</h1>
                    <img src={itemDay.day.condition.icon} />
                </div>
            </div>
            <div className="description-txt">
                
                <div className="temp-wind">
                    <h3>{itemDay.day.condition.text}</h3>
                    <span>
                        <img src="./icon-item.png" />
                    {itemDay.day.mintemp_c} 
                    - 
                    {itemDay.day.maxtemp_c} &#8451;
                    </span>
                    <span>
                    <img src="./icon-wind-blue.png" />
                    {itemDay.day.maxwind_mph} 
                    - 
                    {itemDay.day.maxwind_kph} km/h
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ItemDays