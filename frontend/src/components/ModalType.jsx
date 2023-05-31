/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

export default function ModalType({ IsModalTypeOpen, changeType }) {
  return (
    <section className="modal-type" onClick={() => IsModalTypeOpen(false)}>
      <button onClick={() => IsModalTypeOpen(false)}>X</button>
      <div className="modal-container">
        <h2>Selcet Type</h2>
        <span onClick={() => changeType("work")}>work</span>
        <span onClick={() => changeType("book")}>book</span>
        <span onClick={() => changeType("animals")}>animals</span>
        <span onClick={() => changeType("illustration")}>illustration</span>
        <span onClick={() => changeType("photo")}>photo</span>
        <span onClick={() => changeType("sport")}>sport</span>
      </div>
    </section>
  );
}
