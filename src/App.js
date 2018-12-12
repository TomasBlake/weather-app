import React, { Component } from 'react';
import WeatherQue from './containers/WeatherQue/WeatherQue';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <WeatherQue />
      </div>
    );
  }
}

export default App;
