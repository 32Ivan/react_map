import React, { useState, useEffect } from "react";
import Backdrop from "../component/Backdrop";
import Button from "../component/Button";
import "./Card.css";
import Usluge from "./Usluge";

const check = [
  { id: 0, value: "Citroen", isChecked: false },
  { id: 1, value: "Peugeot", isChecked: false },
  { id: 2, value: "Audi", isChecked: false },
  { id: 3, value: "Bmw", isChecked: false },
  { id: 4, value: "Seat", isChecked: false },
  { id: 5, value: "Kia", isChecked: false },
  { id: 6, value: "Honda", isChecked: false },
];

const Card = (props) => {
  const [showModal, setShowModal] = useState(); // prikaz card
  const [showModal2, setShowModal2] = useState(false); // prikaz odabira automobila
  const [showche, setShowChe] = useState(true); // izmjena odabira automobila u cijene
  const [auto, setAuto] = useState(); // odabir vozila
  const [characters, updateCharacters] = useState(check);

  //otvaranje prikaza Card
  function showModalHandler() {
    setShowModal(true);
  }

  // zatvaranje prikaza Card
  function closeModalHandler() {
    setShowModal(false);
  }

  // izmjena prilikom pritiska Dalje
  function daljeHandler() {
    setShowChe(false);
    if (showModal2 === true) {
      setShowModal2(false);
    }
  }

  //izmjene prilikom pritiska Nazda
  function nazadHandler() {
    setShowChe(true);
    if (showModal2 === false) {
      setShowModal2(true);
    }
  }

  // promjena charakters array
  const setInput = (i, value) => {
    updateCharacters(
      characters.map((charak) =>
        charak.id === i ? { ...charak, isChecked: value } : { ...charak }
      )
      );
    };
    
    //mapiranje liste prikaza
    
    const lista = characters.map((item, i) => {
      return (
        <label key={i}>
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
    //postavljanje prikaza Dalje button
    let result = characters.every((i) => {
      return i.isChecked === false;
    });
    setAuto(characters.map((i) => (i.isChecked === true ? { ...i } : { price: 0 })))
    if (result === false) {
      setShowModal2(true);
    } else {
      setShowModal2(false);
    }
  }, [characters]);
  

  return (
    <div>
      <div className="buttonmidel">
        <Button onClick={showModalHandler}>Pokreni konfigurator</Button>
      </div>
      {showModal && <Backdrop onClick={closeModalHandler} />}
      {showModal &&
        (characters ? (
          <div className="modal">
            {showche && <h4>Odaberite proizvođača vozila</h4>}
            {showche && (
              <div className="dropdown-content">
                <div className="dropdown-item">{lista}</div>
                {showModal2 && <Button onClick={daljeHandler}>Dalje</Button>}
              </div>
            )}
            {!showche && (
              <div>
                <Usluge auto={auto} nazadHandler={nazadHandler} closeModalHandler={closeModalHandler} />
               
              </div>
            )}
          </div>
        ) : (
          <div>Sve ce biti dobro</div>
        ))}
    </div>
  );
};

export default Card;
