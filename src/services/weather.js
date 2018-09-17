import request from "../utils/request";

const URL =
  "https://api.openweathermap.org/data/2.5/forecast?appid=2c6c70f0bd52586fffbcc67383a2e9e8&q=";

const weather = {
  byCity: {
    forecast: async function(city) {
      let { data, error } = await request(URL + city);

      if (error) throw new Error("There was a problem");

      return {
        ...data,
        list: data.list
          .map(day => ({
            ...day,
            day: day.dt_txt.split(" ")[0]
          }))
          .reduce(
            (acc, day) =>
              acc.find(_day => _day.day === day.day) ? acc : [...acc, day],
            []
          )
      };
    }
  }
};

export default weather;
