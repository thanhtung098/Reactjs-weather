
import './App.css';
import React, { Component } from 'react';
// import tide from './Api-tide.js';
import data from './data.js';
import Chart from './components/Chart.js';
import Header from './components/Header'
import WeatherNextdays from './components/weatherNextdays'
import MapWeather from './components/map'
import './components/loading.css'

import api from './Api.js'
class App extends Component {
  // state = {
  //   tranlateX: 0,
  //   coorY: 120,
    // hours: 0,
  //   initPsTie: 1,
  //   setTranlateTide: 720,
  //   dataCurrent: ''
  // }
  constructor(props) {
    super(props);
    this.state = {
      tranlateX: 0,
      coorY: 120,
      hours: 0,
      initPsTie: 1,
      setTranlateTide: 720,
      dataCurrent: [],
      dataNextDays: [],
      dataWeatherLocation: [],
      session: 'morning',
      arrayDataCondition: {},
      checkHideSun: false
    }
    this.getDataCondition = this.getDataCondition.bind(this)
 }
  drawLineSun = async () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 2000;
    canvas.height = 140;
    let start = { x: 0, y: 120 };
    let cp1 = { x: 0, y: 120 };
    let cp2 = { x: 105, y: 120 };
    let end = { x: 210, y: 120 };
    ctx.beginPath();
    ctx.font = '11px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'red'; 
    ctx.fillText('0:00 AM', 20, 135); 
    ctx.fillText('7:00 AM', 210, 135);
    ctx.fillText('7:00 PM', 570, 135);
    ctx.fillText('0:00 AM', 720, 135);
    ctx.fillText('7:00 AM', 930, 135);
    ctx.fillText('7:00 PM', 1290, 135);
    ctx.fillText('7:00 AM', 1660, 135);
    ctx.setLineDash([5, 4]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#faa23e';
    ctx.moveTo(start.x, start.y);
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    ctx.bezierCurveTo(210, 120, 390, -140, 570, 120);
    ctx.bezierCurveTo(570, 120, 720, 120, 930, 120);
    ctx.bezierCurveTo(930, 120, 1110, -140, 1290, 120);
    ctx.bezierCurveTo(1290, 120, 1470, 120, 1660, 120);
    ctx.stroke();
    ctx.fillStyle = "#aae1f6";
    ctx.fillRect(cp1.x, cp1.y - 9, 210, 10);
    ctx.fillRect(570, 120 - 9, 360, 10);
    ctx.fillRect(1290, 120 - 9, 370, 10);


  }
  drawLineTideChart = async () => {
    const canvas = document.getElementById('canvas-tide');
    const ctx = canvas.getContext('2d');
    canvas.width = 8000;
    canvas.height = 130;
    ctx.beginPath();
    ctx.setLineDash([0]);
    let arrayTide = []
    arrayTide = data.item
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#0979ab';
    ctx.lineJoin = "round";
    ctx.moveTo(0, 130);
    let dateStart = this.getDay(arrayTide[0].dt)
    arrayTide.map((data) => {
      let distanceDayP1 = this.getDay(data.dt) - dateStart
      data.x = (720 * distanceDayP1) + this.getMinutes(data.dt, 'degree')
      data.y = this.checkCoorTide(data.height)
      data.hour = this.getMinutes(data.dt, 'hour')
    })
    var m = 0;
    var dx1 = 0;
    var dy1 = 0;
    let f = 0.3
    let t = 1
    let dx2 = 0
    let dy2 = 0
    var preP = arrayTide[0];
    let setTranlateX;
    for (var i = 0; i < arrayTide.length; i++) {
      if (dateStart === this.getDay(arrayTide[i].dt)) {
        setTranlateX = this.getMinutes(arrayTide[i].dt,'degree')
      }
      var curP = arrayTide[i];
      let nexP = arrayTide[i + 1];
      if (nexP) {
        m = this.gradient(preP, nexP);
        dx2 = (nexP.x - curP.x) * -f;
        dy2 = dx2 * m * t;
      } else {
        dx2 = 0;
        dy2 = 0;
      }
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = "#ffd8f5";
      ctx.fillRect(curP.x - 34, curP.y - 44, 70, 34);
      ctx.font = '10px Arial';
      ctx.fillStyle = " #0478a7";
      ctx.textAlign = 'center';
      ctx.fillText(curP.hour, curP.x, curP.y - 18);
      ctx.stroke();
      ctx.font = 'bold 14px Arial';
      ctx.fillText(curP.height + 'm', curP.x, curP.y - 31);
      ctx.stroke();
      ctx.fillStyle = "#aae1f6";
      ctx.bezierCurveTo(preP.x - dx1, preP.y - dy1, curP.x + dx2, curP.y + dy2, curP.x, curP.y);
      dx1 = dx2;
      dy1 = dy2;
      preP = curP;
      if (i == arrayTide.length - 1) {
        ctx.bezierCurveTo(preP.x - dx1, preP.y - dy1, curP.x + dx2, curP.y + dy2, curP.x, 130 - curP.y);
      }
    }
    this.setState({ setTranlateTide: setTranlateX })
    ctx.fill();
  }
  gradient = (a, b) => {
    return (b.y - a.y) / (b.x - a.x);
  }
  checkCoorTide = (b) => {
    let y
    y = 130 - (b * 32)
    return y
  }
  getDay = (unix_timestamp) => {
    var date = new Date(unix_timestamp * 1000);
    let getday = date.getDate()
    return getday
  }
  getMinutes = (unix_timestamp, q) => {
    var date = new Date(unix_timestamp * 1000);
    let hour = date.getHours()
    let session = 'AM'
    if(hour > 12) {
      hour = hour - 12
      session = 'PM'
    }
    let getMinutes = date.getMinutes()
    let minutes = (date.getHours() * 60) + getMinutes
    let hourMinutes = hour + ':' + getMinutes + ' ' + session
    if(q == 'degree') return (minutes / 2)
    if(q == 'hour') return hourMinutes
  }
  getBezierXY = (t, sx, sy, cp1x, cp1y, cp2x, cp2y, ex, ey) => {
    return {
      x: Math.pow(1 - t, 3) * sx + 3 * t * Math.pow(1 - t, 2) * cp1x
        + 3 * t * t * (1 - t) * cp2x + t * t * t * ex,
      y: Math.pow(1 - t, 3) * sy + 3 * t * Math.pow(1 - t, 2) * cp1y
        + 3 * t * t * (1 - t) * cp2y + t * t * t * ey
    };
  }
  getTimeNow =  () => {
    let dateNow = new Date()
    if(dateNow.getHours() > 12){
      this.setState({session: 'afternoon'})
    }
    if(dateNow.getHours() > 19){
      this.setState({session: 'night'})
    }
  }

  handleScroll = () => {
    const el = document.getElementById('block-sun-line');
    let time = 0.001
    let coor = {
      x: 0,
      y: 0
    }
    if (el.scrollLeft <= 210 && el.scrollLeft >= 1) {
      time = (el.scrollLeft) / 210
      coor = this.getBezierXY(time, 0, 120, 0, 120, 105, 120, 210, 120)
      this.setState({ tranlateX: coor.x, coorY: coor.y, checkHideSun: false, hour: coor.x -210 })
    }
    if (el.scrollLeft <= 570 && el.scrollLeft > 210) {
      time = (el.scrollLeft - 210) / 360
      coor = this.getBezierXY(time, 210, 120, 210, 120, 390, -140, 570, 120)
      this.setState({ tranlateX: coor.x, coorY: coor.y, checkHideSun: true, hour: coor.x -570 })
    }
    if (el.scrollLeft <= 930 && el.scrollLeft > 570) {
      time = (el.scrollLeft - 570) / 360
      coor = this.getBezierXY(time, 570, 120, 570, 120, 720, 120, 930, 120)
      this.setState({ tranlateX: coor.x, coorY: coor.y, checkHideSun: false, hour: coor.x -930 })
    }
    if (el.scrollLeft <= 1290 && el.scrollLeft > 930) {
      time = (el.scrollLeft - 930) / 360
      coor = this.getBezierXY(time, 930, 120, 930, 120, 1110, -140, 1290, 120)
      this.setState({ tranlateX: coor.x, coorY: coor.y, checkHideSun: true, hour: coor.x -1290 })
    }
    if (el.scrollLeft <= 1660 && el.scrollLeft > 1290) {
      time = (el.scrollLeft - 1290) / 360
      coor = this.getBezierXY(time, 1290, 120, 1290, 120, 1470, 120, 1660, 120)
      this.setState({ tranlateX: coor.x, coorY: coor.y, checkHideSun: false, hour: coor.x -1660 })

    }
  }
  
  componentDidMount = () => { 
    this.getTimeNow()

    this.getAPIweather()
    this.getAPIweatherLocation()
    this.drawLineSun()
    this.drawLineTideChart()
    window.addEventListener('scroll', this.handleScroll, true);
  }
  getAPIweatherLocation = async () => {

    let arrayDataWeatherLocation = []
    const topWeather = await api.get('forecast.json',{
      params: {
        q: '1.391667, 103.894444',
        days: '3'
      }
    })
    const bottomWeather = await api.get('forecast.json',{
      params: {
        q: '1.291667, 103.85',
        days: '3'
      }
    })
    const leftWeather = await api.get('forecast.json',{
      params: {
        q: '1.328883, 103.739947',
        days: '3'
      }
    })
    const rightWeather = await api.get('forecast.json',{
      params: {
        q: '1.349592, 103.956789',
        days: '3'
      }
    })
    const centerWeather = await api.get('forecast.json',{
      params: {
        q: '1.391667, 103.894444',
        days: '3'
      }
    })
    arrayDataWeatherLocation.push({topWeather: {morning:topWeather.data.forecast.forecastday[0].hour[7].condition,afternoon:topWeather.data.forecast.forecastday[0].hour[15].condition, night:topWeather.data.forecast.forecastday[0].hour[22].condition}})
    arrayDataWeatherLocation.push({bottomWeather: {morning:topWeather.data.forecast.forecastday[0].hour[7].condition,afternoon:topWeather.data.forecast.forecastday[0].hour[15].condition, night:topWeather.data.forecast.forecastday[0].hour[22].condition}})
    arrayDataWeatherLocation.push({leftWeather: {morning:topWeather.data.forecast.forecastday[0].hour[7].condition,afternoon:topWeather.data.forecast.forecastday[0].hour[15].condition, night:topWeather.data.forecast.forecastday[0].hour[22].condition}})
    arrayDataWeatherLocation.push({rightWeather:{morning:topWeather.data.forecast.forecastday[0].hour[7].condition,afternoon:topWeather.data.forecast.forecastday[0].hour[15].condition, night:topWeather.data.forecast.forecastday[0].hour[22].condition}})
    arrayDataWeatherLocation.push({centerWeather:{morning:centerWeather.data.forecast.forecastday[0].hour[7].condition,afternoon:topWeather.data.forecast.forecastday[0].hour[15].condition, night:topWeather.data.forecast.forecastday[0].hour[22].condition}})
    
    this.setState({dataWeatherLocation: arrayDataWeatherLocation})
    let val = 'morning'
    this.getDataCondition(this.state.session)
  }
  getDataCondition  = async (val) => {
    let arrayDataCondition = {}
    this.setState({session: val})
    this.state.dataWeatherLocation.map((data) => {
      if(data.topWeather) {
        arrayDataCondition.top = data.topWeather[val]
      }
      if(data.bottomWeather) {
        arrayDataCondition.bottom = data.bottomWeather[val]
      }
      if(data.leftWeather) {
        arrayDataCondition.left = data.leftWeather[val]
      }
      if(data.rightWeather) {
        arrayDataCondition.right = data.rightWeather[val]
      }
      if(data.centerWeather) {
        arrayDataCondition.center = data.centerWeather[val]
      }
    })
    this.setState({arrayDataCondition: arrayDataCondition})
  }
  alert = () => {
    console.log(1)
  }
  getAPIweather = async () => {
    const respone = await api.get('forecast.json',{
      params: {
        q:'singapore',
        days: '3'
      }
    })
    console.log(respone.data.current)
    this.setState({dataNextDays: respone.data.forecast.forecastday,dataCurrent: respone.data.current})
  }
  
  render() {
    return (
      <div className="container-page">
        <Header dataCurrent = {this.state.dataCurrent}/>
        <Chart 
          tranlateX={this.state.tranlateX} 
          setTranlateTide= {this.state.setTranlateTide}
          hours= {this.state.hours}
          coorY= {this.state.coorY}
          checkHideSun= {this.state.checkHideSun}
        />
        <MapWeather  
          alert = {this.alert}
          getDataCondition = {this.getDataCondition}
          session = {this.state.session}
          dataNextDays={this.state.dataNextDays}
          arrayDataCondition = {this.state.arrayDataCondition}>
        </MapWeather>
        <WeatherNextdays 
        dataNextDays={this.state.dataNextDays}
        
        ></WeatherNextdays>
      </div>
    );
  }

}

export default App;

