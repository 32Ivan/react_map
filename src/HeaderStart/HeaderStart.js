import React, { Fragment } from "react";
import tokiclogo from "../assets/tokic.jpg";
import Card from "../Popup/Card";
import "./HeaderStart.css";

function HeaderStart() {
  return (
    <Fragment>
      <div className="head">
        <div className="logotokic">
          <img src={tokiclogo} alt="tokic" />
        </div>
        <div className="texthead">
          <h1>Konfigurator servisa</h1>
          <p>Izračunajte trošak servisa</p>
        </div>
      </div>
      <div className="buttonhead">
        <Card></Card>
      </div>
    </Fragment>
  );
}

export default HeaderStart;
