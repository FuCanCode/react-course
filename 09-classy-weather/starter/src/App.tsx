import React from "react";
import { getWeather } from "./weatherData";
import { Bars } from "react-loader-spinner";

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
  isLoading: boolean;
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
  state: IAppState = {
    input: "Dresden",
    error: "",
    weather: null,
    isLoading: false,
  };

  handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value });
  };

  handleButtonClick = async () => {
    this.setState(() => ({ isLoading: true }));
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const result = await getWeather(this.state.input);

    if (!result) return;
    if (typeof result === "string") {
      this.setState((prev) => ({ ...prev, error: result, isLoading: false }));
    } else {
      this.setState((prev) => ({
        ...prev,
        weather: { ...result },
        isLoading: false,
      }));
    }
  };

  render() {
    const { weather, isLoading } = this.state;

    return (
      <>
        {/* App Container */}
        <div className={containerStyle}>
          <h1 className="text-4xl">Classy Weather</h1>
          <div>
            <input
              value={this.state.input}
              onChange={this.handleInput}
              className="p-2 bg-red-100 text-center"
              type="text"
              placeholder="Search from location"
              disabled={isLoading}
            />
          </div>
          {!isLoading ? (
            <button
              className="border border-solid border-black rounded-md text-lg py-2 px-3"
              onClick={this.handleButtonClick}
            >
              Get Weather
            </button>
          ) : (
            <Bars color="black" visible={isLoading} />
          )}
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
          <OneDay
            key={i}
            day={i === 0 ? "Today" : weekday}
            icon={icons[i]}
            max={maxTemps[i]}
            min={minTemps[i]}
          />
        ))}
      </ul>
    );
  }
}

interface OneDayProps {
  day: string;
  icon: string;
  max: number;
  min: number;
}

class OneDay extends React.Component<OneDayProps> {
  constructor(props: OneDayProps) {
    super(props);
  }

  render() {
    const { day, icon, max, min } = this.props;

    return (
      <li className="w-24 bg-white flex flex-col items-center gap-2 p-2">
        <div>{day}</div>
        <div className="text-3xl">{icon}</div>
        <div className="font-light">
          Max <span className="text-red-400">{max}&deg;</span>
        </div>
        <div className="font-light">
          Min <span className="text-blue-400">{min}&deg;</span>
        </div>
      </li>
    );
  }
}

export default App;
