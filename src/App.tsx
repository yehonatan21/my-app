import React from "react";
import "./App.css";
import Timer from "./conponent/Timer";
import {Calculator} from "./conponent/Calculator";
import Navbar from "./conponent/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        {/* #FIXME: take out to compnent? */}
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/timer" Component={Timer} />
            <Route path="/calculator" Component={Calculator} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
};

export default App;
