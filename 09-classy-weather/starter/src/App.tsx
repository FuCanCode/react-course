import React from "react";

const containerStyle = [
  "w-screen",
  "mx-9",
  "py-6",
  "border-solid",
  "border-2",
  "border-black",
  "flex",
  "flex-col",
  "gap-3",
  "items-center",
  "font-crazy",
  "outline",
  "outline-2",
  "outline-offset-4",
].join(" ");

class App extends React.Component {
  state = { input: "" };

  handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value });
  };

  render() {
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
        </div>
      </>
    );
  }
}

export default App;
