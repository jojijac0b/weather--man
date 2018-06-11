import React, { Component } from 'react';
import './Searchbar.css';
import geolocation from 'react-geolocation';

class Searchbar extends Component {
  state = {
    city: '',
    country: '',
  }

  handleSubmit = (e) => {
    this.props.handleSubmit({
      city: this.state.city.trim(),
      country: this.state.country.trim(),
    });
    e.preventDefault();
  }

  onCityChange = (e) => {
    this.setState({
      city: e.target.value
    });
  }

  onCountryChange = (e) => {
    this.setState({
      country: e.target.value
    });
  }

  getLocation = () => {
    const geolocation = navigator.geolocation;
    const location = new Promise((resolve, reject) => {
        if (!geolocation) {
            reject(new Error('Not Supported'));
        }

        geolocation.getCurrentPosition((position) => {
            resolve(position);
            this.props.handleSubmit({
              lat: position.coords.latitude,
              long: position.coords.longitude,
            });
        }, () => {
            reject (new Error('Permission denied'));
        });
    });

  }

  render(){
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        City: <input value={this.state.city} onChange={this.onCityChange}></input>
        Country: <input value={this.state.country} onChange={this.onCountryChange}></input>
        <button className="submit">Search</button>
      </form>

      </div>
    )
  }
  //<button className="submit" onClick={this.getLocation}>My Location</button> : button to get exact coordinates
}

export default Searchbar;
