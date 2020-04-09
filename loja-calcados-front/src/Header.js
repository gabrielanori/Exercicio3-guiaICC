import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import logo from "./logo-sapato.png";

export default class MyHeader extends React.Component {
  render() {
    return (
      <div className="grid-container">
        <div className="navibar">
          <img alt="logo" src={logo} />
          <h2 className="titulo">STILL STANDING SHOES </h2>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<MyHeader />, document.getElementById("root"));
