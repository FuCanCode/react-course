import React from "react";
import { getWeather } from "./weatherData";

interface IWeather {
  name: string;
  flag: string;
  weekdays: string[];
  icons: string[];
  maxTemps: number[];
  minTemps: number[];
}

interface ISevenDays {
  children?: React.ReactNode;
  weather: IWeather;
}

interface IAppState {
  input: string;
  error: string;
  weather: IWeather | null;
}

const containerStyle = [
  "w-screen",
  "mx-9",
  "py-6",
  "border-solid",
  "border-2",
  "border-black",
  "flex",
  "flex-col",
  "gap-7",
  "items-center",
  "font-crazy",
  "outline",
  "outline-2",
  "outline-offset-4",
].join(" ");

class App extends React.Component<unknown, IAppState> {
  state: IAppState = { input: "Dresden", error: "", weather: null };

  handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value });
  };

  handleButtonClick = async () => {
    this.setState({ input: "" });
    const result = await getWeather(this.state.input);
    if (!result) return;
    if (typeof result === "string") {
      this.setState({ ...this.state, error: result });
    } else {
      this.setState({ ...this.state, weather: { ...result } });
    }
  };

  render() {
    const { weather } = this.state;

    return (
      <>
        {/* App Container */}
        <div className={containerStyle}>
          <h1 className="text-4xl">Classy Weather</h1>
          <div>
            <input
              value={this.state.input}
              onChange={this.handleInput}
              className="p-2 bg-red-100"
              type="text"
              placeholder="Search from location"
            />
          </div>
          <button
            className="border border-solid border-black rounded-md text-lg py-2 px-3"
            onClick={this.handleButtonClick}
          >
            Get Weather
          </button>
          {weather && (
            <>
              <h2>
                Forecast for {weather.name} {weather.flag}
              </h2>
              <SevenDays weather={this.state.weather as IWeather} />
            </>
          )}
        </div>
      </>
    );
  }
}

class SevenDays extends React.Component<ISevenDays> {
  constructor(props: ISevenDays) {
    super(props);
  }

  render() {
    const {
      weather: { icons, maxTemps, minTemps, weekdays },
    } = this.props;

    return (
      <ul className="flex flex-col sm:flex-row gap-3 font-sans">
        {weekdays.map((weekday, i) => (
          <li
            key={i}
            className="w-20 bg-white flex flex-col items-center gap-2 p-2"
          >
            <div>{weekday}</div>
            <div>{icons[i]}</div>
            <div>Max {maxTemps[i]}</div>
            <div>Min {minTemps[i]}</div>
          </li>
        ))}
      </ul>
    );
  }
}

export default App;
