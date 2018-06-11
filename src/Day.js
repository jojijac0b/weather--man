import React, { Component } from 'react';

class Day extends Component {
  state = {
    isExpanded : false,
  }
  getDayOfWeek = (date) => {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date(date);
    var dayName = days[d.getDay()];
    return dayName;
  }

  getTime = (time) => {
    time = time.split(':'); // convert to array

    // fetch
    var hours = Number(time[0]);
    var minutes = Number(time[1]);

    // calculate
    var timeValue;

    if (hours > 0 && hours <= 12) {
      timeValue= "" + hours;
    } else if (hours > 12) {
      timeValue= "" + (hours - 12);
    } else if (hours == 0) {
      timeValue= "12";
    }

    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM

    return timeValue;
  }

  getAvgLow = () => {
    const temps = [];
    this.props.forecast.map((f) => {
      temps.push(f.low);
    });
    return this.getAvg(temps);
  }

  getAvgHigh = () => {
    const temps = [];
    this.props.forecast.map((f) => {
      temps.push(f.high);
    })
    return this.getAvg(temps);
  }

  getAvg = (temps) => {
    let sum = 0;
    for(let i = 0; i < temps.length; i++)sum += temps[i];

    return Math.round(sum/temps.length);
  }

  getIcon = () => {
    let forecast = this.props.forecast;
    let icons = [];
    for(let i = 0; i < forecast.length; i++){
      icons.push(forecast[i].icon);
    }

    let map = new Map();
    let ret = "";
    for(let i = 0; i < icons.length; i++){
      if(map.has(icons[i])){
        map.set(icons[i], map.get(icons[i])+1);
      }
      else{
        map.set(icons[i], 1);
      }
      if(ret.length == 0 || map.get(icons[i]) >= map.get(ret))ret = icons[i];
    }

    return ret;
  }

  toggleExpand = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
    })
  }

  render(){
    const day = this.getDayOfWeek(this.props.forecast[0].day);

    if(this.state.isExpanded){
      const forecast = this.props.forecast.map((f,index) => (
        <div key={index}>
          <h5>{this.getTime(f.day.substring(11))}</h5>
          <img src={f.icon} />
          <div><span>{f.condition}</span></div>
          <br></br>
          <span>Low: {f.low} °F </span>
          <span>High: {f.high} °F</span>
        </div>
      ));
      return (
        <div className="day" onClick={this.toggleExpand}>
          {day}
          {forecast}
        </div>
      )
    }
    else{
      return (
        <div className="day" onClick={this.toggleExpand}>
          {day}
          <div>
            <img src={this.getIcon()} />
            <br></br>
            <span>Low: {this.getAvgLow()} °F </span>
            <span>High: {this.getAvgHigh()} °F</span>
          </div>
        </div>
      );
    }

  }
}

export default Day;
