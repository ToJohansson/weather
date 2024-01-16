import WeatherApp from "./Weather/WeatherApp";

const App = () => {
  const objData = { name: "Halmstad", longitude: "12.85", latitude: "56.67" };
  // const objData = { name: "Varberg", longitude: "12.25", latitude: "57.11" };
  // const objData = { name: "Cape Town", longitude: "18.42", latitude: "33.92" };
  // const objData = { name: "Whistler", longitude: "-122.96", latitude: "50.12" };
  // const objData = { name: "Umeå", longitude: "20.26", latitude: "63.83" };

  return (
    <>
      <div
        className="header"
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2>Header</h2>
        <WeatherApp objectData={objData} />
      </div>
      <div className="main">
        <h1>MAIN</h1>
      </div>
    </>
  );
};

export default App;
