import logo from "./logo.svg";
// import "./App.css";
import React, { useEffect, useRef, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import MinMaxForm from "./components/MinMaxForm";
import Accordion from "./components/Accordion";
import Viewport from "./components/Viewport";

function App() {
  return (
    <div className="App">
      <div
        style={{
          position: "absolute",
          maxWidth: "550px",
          top: "2vh",
          left: "2vw",
          backgroundColor: "aliceblue",
          padding: "25px",
        }}
      >
        <MinMaxForm />
        <MinMaxForm />
        <MinMaxForm />

        <Viewport className="App-background-scene" />

        <Accordion />
      </div>
      ;
    </div>
  );
}

export default App;
