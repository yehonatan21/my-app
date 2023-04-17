import React from "react";
import "./styles/App.css";
import Timer from "./conponent/Timer";
import Inbox from "./conponent/Inbox";
import { Calculator } from "./conponent/Calculator";
import Navbar from "./conponent/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./conponent/Login";
import UserProvider from "./conponent/Context/UserContext";
import Register from "./conponent/Register";
import Outbox from "./conponent/Outbox";

const App: React.FC = () => {

  return (
    <div className="App">
      <header className="App-header">
        <UserProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/timer" Component={Timer} />
              <Route path="/inbox" Component={Inbox} />
              <Route path="/outbox" Component={Outbox} />
              <Route path="/login" Component={Login} />
              <Route path="/register" Component={Register} />
              <Route path="/calculator" Component={Calculator} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </header>
    </div>
  );
};

export default App;
