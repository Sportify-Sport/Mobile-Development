import React, { Component } from "react";

class ColorChanger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "white",
    };
  }

  changeColor = (color) => {
    this.setState({ backgroundColor: color });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.backgroundColor !== this.state.backgroundColor) {
      console.log(
        `The color has changed from [${prevState.backgroundColor}] to [${this.state.backgroundColor}]`
      );
    }
  }

  render() {
    const colors = [
      "red",
      "blue",
      "green",
      "yellow",
      "pink",
      "purple",
      "orange",
      "brown",
    ];

    return (
      <div
        style={{
          backgroundColor: this.state.backgroundColor,
          padding: "100px",
          textAlign: "center",
          border: "2px solid black",
          borderRadius: "5px",
        }}
      >
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => this.changeColor(color)}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: color,
              color: "white",
              border: "2px solid black",
              borderRadius: "3px",
              cursor: "pointer",
              width: "90px",
            }}
          >
            {color}
          </button>
        ))}
      </div>
    );
  }
}

export default ColorChanger;

