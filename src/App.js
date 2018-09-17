import React, { Component } from "react";
import WOW from "wow.js";
import Animate from "animate.css";
import weather from "./services/weather";
import BigWeather from "./components/BigWeather";

import "./App.css";
import "antd/dist/antd.css";
import { Button, Row, Col, Spin, Divider, Select } from "antd";

const Option = Select.Option;

class App extends Component {
  state = {
    data: null,
    loading: true,
    error: null,
    criteria: "Buenos Aires",
    format: "kelvin"
  };
  componentDidMount() {
    const wow = new WOW.WOW();
    wow.init();
  }
  componentDidMount() {
    this.getForecast(this.state.criteria);
  }

  async getForecast(city) {
    this.setState({
      data: [],
      loading: true
    });

    const { data } = await weather.byCity.forecast(city);

    this.setState({
      data,
      loading: false
    });
  }

  render() {
    const { data, loading, criteria, format } = this.state;

    if (loading) {
      return (
        <div className="example">
          <Row type="flex" justify="center" align="middle">
            <Col>
              <Spin tip="Loading..." />
            </Col>
          </Row>
        </div>
      );
    }

    const [main, ...forecast] = data.list;

    return (
      <div>
        <h1 className="api">
          Api Weather
          <img
            className="App-logo"
            src={require("./img/sunny.svg")}
            alt="Icon Sun"
          />
        </h1>
        <Row gutter={16} type="flex" justify="center" align="middle">
          <Col>
            <Select
              defaultValue={criteria}
              style={{ width: 200 }}
              onChange={e => {
                this.setState({ criteria: e });
                this.getForecast(e);
              }}
            >
              <Option value="Buenos Aire">Buenos Aires</Option>
              <Option value="London">London</Option>
              <Option value="New York">New York</Option>
              <Option value="Lima">Lima</Option>
              <Option value="Sidney">Sidney</Option>
            </Select>
          </Col>
          <Col>
            <Button.Group>
              <Button
                type="default"
                onClick={() => this.setState({ format: "kelvin" })}
                ghost
              >
                K °
              </Button>
              <Button
                type="default"
                onClick={() => this.setState({ format: "celsius" })}
                ghost
              >
                C °
              </Button>
            </Button.Group>
          </Col>
        </Row>
        <Divider>
          <h2 className="titles">Today</h2>
        </Divider>
        <Row type="flex" justify="center" align="middle">
          <Col span={6}>
            <BigWeather
              icon={main.weather[0].icon}
              name={data.city.name}
              temp={main.main.temp}
              humidity={main.main.humidity}
              wind={main.wind.speed}
              pressure={main.main.pressure}
              date={main.dt}
              format={format}
            />
          </Col>
        </Row>
        <Divider>
          <h2 className="titles">Next 5 days</h2>
        </Divider>
        <Row gutter={16} type="flex" justify="center" align="middle">
          {forecast.map((day, index) => (
            <Col span={4} key={index}>
              <BigWeather
                key={index}
                icon={day.weather[0].icon}
                name={data.city.name}
                temp={day.main.temp}
                humidity={day.main.humidity}
                wind={day.wind.speed}
                pressure={day.main.pressure}
                date={day.dt}
                format={format}
              />
            </Col>
          ))}
        </Row>
        <p className="by">
          <em>Milton Arce - Test</em>
        </p>
      </div>
    );
  }
}

export default App;
