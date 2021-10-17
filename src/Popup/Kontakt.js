import React, { Fragment, useState, useEffect } from "react";
import "./Kontakt.css";
import Button from "../component/Button";
import SvePrikaz from "./SvePrikaz";

function Kontakt(props) {
  const [ime, setIme] = useState(); //za ime
  const [email, setEmil] = useState(); //za email
  const [broj, setBroj] = useState(); //za broj
  const [napomena, setNapomena] = useState(""); //za napomenu
  const [dalje, setDalje] = useState(false); //za dalje odradivanje

  //izmjena za nazad
  function nazadHandler() {
    props.setShow(true);
  }
  //izmjena za ciscenje
  function clearHandler() {
    setIme("");
    setEmil("");
    setBroj("");
  }

  // izmjena prilikom pritiska Dalje
  function daljeHandler() {
    setDalje(true);
    if (setDalje === true) {
      setDalje(false);
    }
  }

  useEffect(() => {}, [ime, email, broj, napomena]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (e.isTrusted) {
      daljeHandler();
    }
  };

  return (
    <Fragment>
      {!dalje && (
        <form onSubmit={onSubmit}>
          <div className="kontakt">
            <label>
              <input
                type="text"
                onChange={(e) => setIme(e.target.value)}
                placeholder="Ime i prezime*"
                required
              />
            </label>
            <label>
              <input
                type="email"
                onChange={(e) => setEmil(e.target.value)}
                placeholder="Email*"
                required
              />
            </label>
            <label>
              <input
                type="text"
                onChange={(e) => setBroj(e.target.value)}
                placeholder="Broj mobitela*"
                required
              />
            </label>
            <label>
              <input
                type="note"
                onChange={(e) => setNapomena(e.target.value)}
                placeholder="Napomena(opcionalno)"
              />
            </label>
          </div>
          <div className="buttons">
            <Button onClick={nazadHandler}>Nazad</Button>
            {/* <input type="submit" value="Dalje" /> */}
            {<Button onSubmit={onSubmit}>Dalje</Button>}
          </div>
        </form>
      )}
      {dalje && (
        <div>
          <SvePrikaz
            ime={ime}
            email={email}
            broj={broj}
            napomena={napomena}
            clearHandler={clearHandler}
            setDalje={setDalje}
            auto={props.auto}
            usluge={props.checkresult}
            popust={props.pricepopust}
            cijena={props.price}
            closeModalHandler={props.closeModalHandler}
          />
        </div>
      )}
    </Fragment>
  );
}

export default Kontakt;
