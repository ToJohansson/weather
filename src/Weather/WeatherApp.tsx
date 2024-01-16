import axios from "axios";
import { useEffect, useState } from "react";
import symbols from "./symbols/index";

interface Props {
  objectData: {
    name: string;
    longitude: string;
    latitude: string;
  };
}
type UserData = {
  name: string;
  longitude: string;
  latitude: string;
};
type WeatherData = {
  airTemperature: string;
  symbolCode: string;
};
const WeatherApp = ({ objectData }: Props) => {
  const { name, longitude, latitude } = objectData as UserData;
  const [weather, setWeather] = useState<WeatherData>({
    airTemperature: "",
    symbolCode: "",
  });

  useEffect(() => {
    axios
      .get(
        ` https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`
      )
      .then((res) => {
        setWeather({
          ...weather,
          symbolCode:
            res.data.properties.timeseries[0].data.next_1_hours.summary
              .symbol_code,

          airTemperature:
            res.data.properties.timeseries[0].data.instant.details
              .air_temperature,
        });
      })
      .catch((err) => console.log(err));
  }, [objectData]);

  const temp = Math.round(parseInt(weather.airTemperature));

  const date = new Date();

  const monthsArray = [
    "Januari",
    "Februari",
    "Mars",
    "April",
    "Maj",
    "Junei",
    "Juli",
    "Augusti",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysOfWeek = ["Sön", "Mon", "Tis", "Ons", "Tors", "Fre", "Lör"];

  const currentMonth = monthsArray.find(
    (month, index) => index === date.getMonth()
  );
  const currentDay = daysOfWeek.find((day, index) => index === date.getDay());

  return (
    <>
      <div
        className="weather-navbar"
        style={{
          paddingTop: "20px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "flex-end",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        <div className="weather-icon">
          <img width="60px" src={(symbols as any)[weather.symbolCode]} />
        </div>

        <div
          className="weather-temp-c"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.0em",
            fontWeight: "bolder",
          }}
        >
          {temp}
          &deg;C
        </div>
        <div
          className="weather-place"
          style={{ fontSize: "1.3em", fontWeight: "bold" }}
        >
          {name}
        </div>
        <div
          className="weather-current date"
          style={{ fontSize: "0.7em", fontWeight: "lighter" }}
        >
          {currentDay} {date.getDate()} {currentMonth}
        </div>
      </div>
    </>
  );
};

export default WeatherApp;
