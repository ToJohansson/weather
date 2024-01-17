import axios from "axios";
import { useEffect, useState } from "react";
import symbols from "./symbols/index";
/**
  The WeatherApp component is a React component designed to 
  display weather information and place/city name for a given location. 
  It utilizes the Met Norway weather API to fetch current weather data 
  based on latitude and longitude coordinates.
 */
interface Props {
  objectUserData?: {
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
const WeatherApp = ({
  objectUserData = { name: "Varberg", longitude: "12.25", latitude: "57.10" },
}: Props) => {
  const { name, longitude, latitude } = objectUserData as UserData;
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
  }, [objectUserData]);

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

  const navbarStyle: React.CSSProperties = {
    width: "85px",
    height: "121",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    fontFamily: "'Roboto', sans-serif",
  };
  const tempStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.6em",
    fontWeight: "bolder",
  };
  const placeStyle: React.CSSProperties = {
    fontSize: "0.9em",
    fontWeight: "bold",
  };
  const currentDateStyle: React.CSSProperties = {
    fontSize: "0.5em",
    fontWeight: "lighter",
  };
  return (
    <>
      <div style={navbarStyle}>
        <div>
          <img width="60px" src={(symbols as any)[weather.symbolCode]} />
        </div>

        <div style={tempStyle}>
          {temp}
          &deg;C
        </div>
        <div style={placeStyle}>{name}</div>
        <div style={currentDateStyle}>
          {currentDay} {date.getDate()} {currentMonth}
        </div>
      </div>
    </>
  );
};

export default WeatherApp;
