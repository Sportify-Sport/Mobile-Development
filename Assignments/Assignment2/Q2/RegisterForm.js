import React from "react";

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      score: "",
      activeField: null,
      psychometricMessage: "",
      errorMessages: {
        lastName: "עליך למלא שם משפחה",
        firstName: "עליך למלא שם פרטי",
        psychometricScore: "עליך למלא ציון פסיכומטרי",
      },
    };
  }

  handleFocus = (e) => {
    this.setState({ activeField: e.target.name });
  };

  handleBlur = (e) => {
    this.setState({ activeField: null });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleBlurScore = (e) => {
    let scoreInt = parseInt(this.state.score, 10);
    if (scoreInt < 200 || scoreInt > 800) {
      this.setState({
        psychometricMessage: "The psychometric range is between 200 and 800",
      });
    } else {
      this.setState({
        psychometricMessage:
          scoreInt > 555 ? "!ניתן להתקבל ללימודים" : "עליך לנסות שוב בשנה הבאה",
      });
    }
  };

  errorMessageStyle = {
    color: "red",
    fontSize: "12px",
    fontWeight: "bold",
    marginBottom: "5px",
  };

  marginLabels = {
    marginRight: "8px"
  }
  
  render() {
    return (
      <form>
        <h2>Registration Form</h2>
        <div>
          {this.state.activeField === "firstName" ? (
            <p style={this.errorMessageStyle}>
              {this.state.errorMessages.firstName}
            </p>
          ) : null}
          <label style={this.marginLabels} htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
          />
        </div>
        <div>
          {this.state.activeField === "lastName" ? (
            <p style={this.errorMessageStyle}>{this.state.errorMessages.lastName}</p>
          ) : null}
          <label style={this.marginLabels} htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
          />
        </div>
        <div>
          {this.state.activeField === "score" ? (
            <p style={this.errorMessageStyle}>
              {this.state.errorMessages.psychometricScore}
            </p>
          ) : null}
          <label style={this.marginLabels} htmlFor="score">Psychometric Score:</label>
          <input
            type="number"
            id="score"
            name="score"
            min={200}
            max={800}
            onFocus={this.handleFocus}
            onBlur={this.handleBlurScore}
            onChange={this.handleChange}
          />
          {<p>{this.state.psychometricMessage}</p>}
        </div>
      </form>
    );
  }
}
