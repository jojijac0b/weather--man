import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Forecast from './Forecast.js';
import Searchbar from './Searchbar.js';

class App extends Component {
  state = {
    forecast: []
  }


  handleSubmit = (location) => {
    let api;
    if(location.lat != undefined){
      api = "http://api.openweathermap.org/data/2.5/forecast?lat="+location.lat+"&lon="+location.long+"&appid=85f31f2f896a01a30807098b4ad53ca6";
    }
    else{
      api = "http://api.openweathermap.org/data/2.5/forecast?q="+location.city+","+location.country+"&appid=85f31f2f896a01a30807098b4ad53ca6";
    }

    fetch(api)
    .then(results => {
      return results.json();
    }).then(data => {
      if(data.cod == "200"){
        const list = data.list.map((f) => {
          return f;
        });

        const forecast = [];

        for(let i = 0; i < list.length; i++){
          if(i == 0 || list[i].dt_txt.substring(0,10) != list[i-1].dt_txt.substring(0,10)){
            forecast.push([]);
          }
          let f = list[i];
          forecast[forecast.length-1].push({
              day: f.dt_txt,
              condition: f.weather[0].description,
              low: Math.round(((9/5) * (f.main.temp_min - 273) + 32)),
              high: Math.round(((9/5) * (f.main.temp_max - 273) + 32)),
              icon: "http://openweathermap.org/img/w/" + f.weather[0].icon + ".png",
          });
        }

        this.setState({
          forecast: forecast,
        });
        console.log(data);
      }
      else{
        alert(data.message);
      }
    })
  }

  render() {
    return (
      <div className="App">
        <div><h2>Its the weather, man</h2></div>

        <div>
          <Searchbar
            text = {this.state.text}
            handleSubmit = {this.handleSubmit}
          />
          <Forecast weather = {this.state.forecast}/>
        </div>

      </div>
    );
  }
}

export default App;

/*
https://daveceddia.com/react-practice-projects/

Weather App:

[search bar] [submit button]
[title i.e. name of location]
[results i.e. 5 day forcast of ]

state: {
  text:'',
  forecast:[]
}








*/
