import WeatherApp from "./Weather/WeatherApp";

const App = () => {
  /** 
   *   const objUserData = {
    name: "Halmstad",
    longitude: "12.85",
    latitude: "56.67",
  };
  */

  // const objUserData = { name: "Varberg", longitude: "12.25", latitude: "57.11" };
  // const objUserData = { name: "Cape Town", longitude: "18.42", latitude: "33.92" };
  // const objUserData = { name: "Whistler", longitude: "-122.96", latitude: "50.12" };
  const objUserData = { name: "Umeå", longitude: "20.26", latitude: "63.83" };

  return (
    <>
      <WeatherApp objectUserData={objUserData} />
    </>
  );
};

export default App;
