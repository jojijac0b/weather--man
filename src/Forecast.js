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

    return (
      <div className='wrapper'>{forecast}</div>
    );
  }
}

export default Forecast;
