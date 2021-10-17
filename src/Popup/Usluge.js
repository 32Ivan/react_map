import React, { useState, useEffect, Fragment } from "react";
import Button from "../component/Button";
import Kontakt from "./Kontakt";
import "./Usluge.css";

const usluge = [
  {
    id: 0,
    value: "Zamjena ulja i filtera (500 kn)",
    isChecked: false,
    price: 500,
  },
  { id: 1, value: "Promjena pakni (450 kn)", isChecked: false, price: 450 },
  { id: 2, value: "Promjena guma (100 kn)", isChecked: false, price: 100 },
  {
    id: 3,
    value: "Servis klima uređaja (299 kn)",
    isChecked: false,
    price: 299,
  },
  { id: 4, value: "Balansiranje guma (50 kn)", isChecked: false, price: 50 },
  {
    id: 5,
    value: "Zamjena ulja u kočnicama (229 kn)",
    isChecked: false,
    price: 229,
  },
];

const usluge2 = [
  {
    id: 0,
    value: "",
    isChecked: false,
    price: 0,
  },
];

const Usluge = (props) => {
  const [checkusluge, updateUsluge] = useState(usluge); //izmjena usluga
  const [checkresult, updateResult] = useState(usluge2); //izmjena usluga
  const [kuponvalue, inputKupon] = useState(""); //izmjena kupona vrijednost
  const [newprice, setNewPrice] = useState(); //izmjena kupona
  const [setdalje, setShowDalje] = useState(false); //za dalje button
  const [placeholder, setPlaceholder] = useState("Unesite kupon"); //placeholder
  const [vazecikupon, setVazecikupon] = useState(false); //nova cijena
  const [show, setShow] = useState(true); // izmjena odabira cijene u input
  const [kupon, setKupon] = useState(false); //izmjena kupona

  // promjena charakters array
  const setInput = (i, value) => {
    updateUsluge(
      checkusluge.map((us) =>
        us.id === i ? { ...us, isChecked: value } : { ...us }
      )
    );
  };

  //mapiranje liste prikaza
  const listausluga = checkusluge.map((item, i) => {
    return (
      <label key={i} className="labelusluge">
        <input
          type="checkbox"
          value={item.value}
          checked={item.isChecked}
          onChange={(e) => setInput(item.id, e.target.checked)}
        />
        {item.value}
      </label>
    );
  });

  useEffect(() => {
    //
    updateResult(
      checkusluge.map((i) => (i.isChecked === true ? { ...i } : { price: 0 }))
    );
    
    let result = checkusluge.every((i) => {
        return i.isChecked === false;
    });
    if (result === false) {
        setShowDalje(true);
    } else {
        setShowDalje(false);
    }
}, [checkusluge]);
let price = checkresult.reduce((a, v) => (a = a + v.price), 0).toFixed(2);

  //izracun postotka
  function percentage(num, per) {
    return (num / 100) * per;
  }

  //na pritisak izracuna postotka
  const provjera = () => {
    if (kuponvalue === "Tokić123") {
      let izracun = percentage(price, 30);
      console.log(price - izracun);
      let kuca = price - izracun;
      setNewPrice(kuca);
      setVazecikupon(true);
    } else if (kuponvalue !== "Tokić123") {
      setPlaceholder("Kupon nije važeći");
      setVazecikupon(false);
    }
  };

  // izmjena prilikom pritiska Dalje
  function daljeHandler() {
    setShow(false);
    if (setShowDalje === true) {
      setShow(false);
    }
  }

  return (
    <Fragment>
      {show && (
        <div>
          <div className="usluge">{listausluga}</div>
          <div className="uslugeprice">
            <h3 className="kuponinput" onClick={(e) => setKupon(true)}>
              Imam Kupon
            </h3>
            {kupon && (
              <label>
                <input
                  type="text"
                  onChange={(e) => inputKupon(e.target.value)}
                  placeholder={placeholder}
                />
                <Button onClick={provjera}>Primjeni</Button>
              </label>
            )}
            {!vazecikupon && <h1>Ukupno: {price} kn</h1>}
            {vazecikupon && <h1>Cijena sa popustom : {newprice} kn</h1>}
          </div>
          <div className="buttons">
            <Button onClick={props.nazadHandler}>Nazad</Button>
            {setdalje && <Button onClick={daljeHandler}>Dalje</Button>}
          </div>
        </div>
      )}
      {!show && (
        <div>
          <Kontakt
            setShow={setShow}
            price={price}
            pricepopust={newprice}
            checkresult={checkresult}
            auto={props.auto}
            closeModalHandler={props.closeModalHandler}
          />
        </div>
      )}
    </Fragment>
  );
};

export default Usluge;
