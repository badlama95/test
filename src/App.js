
import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/Weather";

const API_KEY = "e6793a065807d0d6797ce9b064ead93f";

class App extends React.Component {
  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunset: undefined,
    error: undefined,
  };

  gettingWeather = async (e) => {
    e.preventDefault();
    var city = e.target.elements.city.value;

    if (city) {
      const api_url = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`
      );
      const data = await api_url.json();

      let pressure = data.main.pressure;
      let pressureInMmHg = Math.floor(pressure * 0.75006);

      let sunsetInSec = data.sys.sunset;
      let date = new Date(sunsetInSec * 1000);
      let timeSunset = date.toLocaleTimeString();

      let temp = data.main.temp;
      let tempFToCel = Math.floor(temp - 273.15);

      this.setState({
        temp: tempFToCel,
        city: data.name,
        country: data.sys.country,
        pressure: pressureInMmHg,
        sunset: timeSunset,
        error: undefined,
      });
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        error: "Введите название города",
      });
    }
  };

  render() {
    return (
      <div clasName="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info">
                <Info />
              </div>
              <div className="col-sm-7 form">
                <Form weatherMethod={this.gettingWeather} />
                <Weather
                  temp={this.state.temp}
                  city={this.state.city}
                  country={this.state.country}
                  pressure={this.state.pressure}
                  sunset={this.state.sunset}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
