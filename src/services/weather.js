import request from "../utils/request";

const URL =
  "https://api.openweathermap.org/data/2.5/forecast?appid=2c6c70f0bd52586fffbcc67383a2e9e8&cnt=6&q=";

const weather = {
  byCity: {
    forecast: function(city) {
      return request(URL + city);
    }
  }
};

export default weather;
