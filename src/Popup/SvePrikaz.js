import React, { Fragment, useEffect, useState } from "react";
import Button from "../component/Button";
import Kraj from "./Kraj";
import "./SvePrikaz.css";

function SvePrikaz(props) {
   const [kraj, setKraj] = useState(false);


  function nazadHandler() {
    props.setDalje(false);
    props.clearHandler();
  }

  function daljeHandler() {
      setKraj(true);
  }

  //za mapiranje vozila
  const pokusaj = props.auto.map((i, index) =>
    i.isChecked === true ? <p key={index}> {i.value}</p> : null
  );
  const pokusaj2 = props.usluge.map((i, index) =>
    i.isChecked === true ? (
      <Fragment>
        <div >
          <p key={index}> {i.value}</p>
        </div>
        <div>
          <p key={index}>{i.price}</p>
        </div>
      </Fragment>
    ) : (
      null
    )
  );

  const pokusaj3 = !props.popust ? (
    <div className='cijene'>
    <p>Cijena : {props.cijena} kn</p>
</div>
  ):(
    <div className='cijene'>
    <p>Cijena : {props.cijena} kn</p>
    <p>Popust : {props.cijena - props.popust} kn</p>
    <p>Nova Cijena : {props.popust} kn</p>
</div>
  );
      
      
  

  useEffect(() => {
  }, [kraj]);

  return (
    <Fragment>
     { !kraj && <div>
      <div className="svegori">
        <div className="odabirauta">
          <h1>Model Vozila</h1>
          <div>{pokusaj}</div>
        </div>
        <div>
          <h1 className="odabir">Odabrane Usluge</h1>
          <div className="odabir2">{pokusaj2}</div>
          {/* <div className='cijene'>
              <p>Cijena : {props.cijena} kn</p>
              <p>Popust : {props.cijena - props.popust} kn</p>
              <p>Nova Cijena : {props.popust} kn</p>
          </div> */}
          {pokusaj3}
        </div>
      </div>
      <h1 className="prikaz">Kontakt Podatci</h1>
      <div className="svedoli">
        <p>Ime i prezime: {props.ime}</p>
        <p>Broj telefona: {props.broj}</p>
        <p>Email adresa: {props.email}</p>
        <p>Napomena: {props.napomena}</p>
      </div>
      <div className="buttons">
        <Button onClick={nazadHandler}>Nazad</Button>
         <Button onClick={daljeHandler}>Dalje</Button>
      </div>
      </div>}
      {kraj && <Kraj closeModalHandler={props.closeModalHandler} />}
    </Fragment>
  );
}

export default SvePrikaz;
