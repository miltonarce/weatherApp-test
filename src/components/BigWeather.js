import React from "react";

const toCelsius = value => {
  value = value - 273.15;
  return Math.round(value);
};

const BigWeather = ({
  icon,
  name,
  temp,
  date,
  format,
  humidity,
  wind,
  pressure
}) => (
  <div className="card animated flipInY">
    <div>
      <h3 className="nameCity">{name}</h3>
    </div>
    <div className="datos">
      <p>
        <em>Date: {new Date(date * 1000).toDateString()}</em>
      </p>
      <img
        src={`http://openweathermap.org/img/w/${icon}.png`}
        alt="Icono Clima"
      />
      <span>
        <strong className="temp">
          {format === "kelvin"
            ? Math.round(temp) + " K °"
            : toCelsius(temp) + " C °"}
        </strong>
      </span>
    </div>
    <p className="datosC">Humidity: {humidity}%</p>
    <p className="datosC">Wind Speed: {wind} Km/h.</p>
    <p className="datosC">Pressure: {pressure} hpa.</p>
  </div>
);

export default BigWeather;
