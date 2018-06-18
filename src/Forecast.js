import React, { Component } from 'react';
import Day from './Day.js';
import './Forecast.css';

class Forecast extends Component {

  render(){
    const forecast = this.props.weather.map((f, index) => (
        <div key={index}>
          <Day
            forecast = {f}
          />
        </div>
    ));

    if(forecast.length > 0){
      return (
        <div>
          <div>Click day for hourly forecast</div>
          <div className='wrapper'>{forecast}</div>
        </div>
      );
    }
    else {
      return (<div></div>)
    }
  }
}

export default Forecast;
